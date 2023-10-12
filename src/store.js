import {configureStore} from "@reduxjs/toolkit"
import customerSlice from "./reducers/customers/customerSlice"
import leadSlice from "./reducers/leads/leadSlice"
const store = configureStore({
    reducer:{
        customers: customerSlice,
        leads: leadSlice

    }
})

export default store