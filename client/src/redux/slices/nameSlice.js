import { createSlice } from "@reduxjs/toolkit";

const NameSlice = createSlice({
    initialState: "",
    name: "Name",
    reducers: {
        setName: (state, action) => action.payload
    }
})

export const { setName } = NameSlice.actions
export default NameSlice.reducer