import { createSlice } from '@reduxjs/toolkit';

export const typeQuery = createSlice({
    name: 'typeSelected',
    initialState: 'ALLPOKEMON',
    reducers: {
        setTypeSelected: (state, action) => action.payload 
    }
})

export const { setTypeSelected } = typeQuery.actions;

export default typeQuery.reducer;
