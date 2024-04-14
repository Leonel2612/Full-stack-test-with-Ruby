import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const baseURL = import.meta.env.VITE_BASE_URL;
export const fetchComments=createAsyncThunk('fetchComments',async (
{featureId}
)=>{ 
    const response = await fetch(`${baseURL}api/features/${featureId}/comments`)
    return response.json()
})


const commentSlice = createSlice({
    name:'comment',
    initialState:{
        isLoading:false,
        data:null,
        isError:false,
    },

    extraReducers:(builder)=>{
        builder.addCase(fetchComments.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.data=action.payload;
        }),
        
        builder.addCase(fetchComments.rejected,(state,action)=>{
            console.log('Error', action.payload)
            state.isError=true
        }),
        builder.addCase(fetchComments.pending,(state)=>{
            state.isLoading=true;
        })
    }
})

export default commentSlice.reducer