import { configureStore } from "@reduxjs/toolkit"
import name from "./slices/nameSlice"

const store = configureStore({
    reducer: {
        name,
    }
})

export default store