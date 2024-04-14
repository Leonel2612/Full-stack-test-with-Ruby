
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    magType: ''
};

export const magTypeSlice = createSlice({
    name:'magType',
    initialState,
    reducers:{
        setMagType:(state, action) =>{
            state.magType=action.payload
        },
        clearMagType:(state)=>{
            state.magType='';
        }
    },
});

export const {setMagType, clearMagType} = magTypeSlice.actions;
export default magTypeSlice.reducer;

