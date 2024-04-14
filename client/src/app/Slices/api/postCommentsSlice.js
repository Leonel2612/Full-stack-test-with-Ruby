import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const baseURL = import.meta.env.VITE_BASE_URL;

export const postComment = createAsyncThunk('postComment',async({featureId,body},{rejectWithValue})=>{
    const options = {
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({body})
    };

    try{
        const response = await fetch(`${baseURL}api/features/${featureId}/comments`,options)
        if (!response.ok) throw new Error("Network Response was not ok")
        console.log(response.json())
        return response.json()
    } 
    catch(error){
        return rejectWithValue(error.message)
    }
})


const commentSlice = createSlice({
    name:'comments',
    initialState:{
        isLoading:false,
        data:null,
        error:false
    },
    extraReducers:(builder)=>{
        builder.addCase(postComment.fulfilled,(state,action)=>{
            state.isLoading=false
            state.data=action.payload
        }),
        builder.addCase(postComment.pending,(state)=>{
            state.isLoading=true
        }),
        builder.addCase(postComment.rejected,(state,action)=>{
            state.error=true
            console.log("Error",action.payload)
        })
    }
})

export default commentSlice.reducer