import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

// db url
const db = ''

export const getUser = createAsyncThunk('user', async(name, thunkAPI) => {
    try {
        // console.log(thunkAPI)
        const response = await fetch(db)
        return response.json()
    } catch (error) {
        return thunkAPI.rejectWithValue("Something went wrong")
    }
})


const initialState = {
    user: null,
    isLoading: false
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {}
})

export default userSlice.reducer