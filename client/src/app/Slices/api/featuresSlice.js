import {createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const baseURL = import.meta.env.VITE_BASE_URL;

export const fetchFeatures = createAsyncThunk('fetchFeatures',async (
    {page,perPage}
)=>{
    const response = await fetch(`${baseURL}api/features?page=${page}&per_page=${perPage}`)
    return response.json();
})

export const fethchFeaturesPerTypeMagnitude=createAsyncThunk("fetchFeaturesPerMagnitude",async({page,perPage,magType})=>{
    let magTypeStrings= magType.join('&mag_type=')
    const response = await fetch (`${baseURL}api/features?page=${page}&per_page=${perPage}&mag_type=${magTypeStrings}`)
    return response.json();

})

const featuresSlice = createSlice ({
    name: 'features',
    initialState:{
        isLoading:false,
        data:null,
        isError:false,
    },
    reducers:{
        resetFeatures:(state)=>{
            state.isLoading=false;
            state.data=null;
            state.isError=false
        },
        reducerFeaturesMgType:(state)=>{
            state.isLoading=false;
            state.data=null;
            state.isError=false
        }
    },

    extraReducers:(builder)=>{
        builder.addCase(fetchFeatures.pending,(state)=>{
            state.isLoading=true
        }),

        builder.addCase(fetchFeatures.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.data=action.payload;
        })
        builder.addCase(fetchFeatures.rejected,(state,action)=>{
            console.log('Error',action.payload)
            state.isError=true
        }),
        builder.addCase(fethchFeaturesPerTypeMagnitude.pending,(state)=>{
            state.isLoading=true;
        }),
        builder.addCase(fethchFeaturesPerTypeMagnitude.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.data=action.payload;
        }),
        builder.addCase(fethchFeaturesPerTypeMagnitude.rejected,(state,action)=>{
            console.log('Error',action.payload)
            state.isError=true
        })
    }
})


export const {resetFeatures}=featuresSlice.actions
export default featuresSlice.reducer
