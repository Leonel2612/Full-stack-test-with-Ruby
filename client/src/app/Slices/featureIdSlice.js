import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    featureId:""
};


export const featureIdSlice = createSlice(
    {
        name:'featureId',
        initialState,
        reducers:{
            setFeatureId:(action,state)=> {
                state.featureId = action.payload
            },
            clearFeatureId:(state)=>{
                state.featureId=''
            }
        },
    })

export const {setFeatureId,clearFeatureId} = featureIdSlice.actions

export default featureIdSlice.reducer