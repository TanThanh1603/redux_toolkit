import { createAsyncThunk,createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  listUsers: [],
  isLoading: false,
  isError : false
}

export const fetchAllUsers = createAsyncThunk(
  'users/fetchAllUsers',
  async (user, thunkAPI) => {
    try {
      const response = await axios.get("http://localhost:8080/users/all", {
        signal : thunkAPI.signal
      })
      return response.data
    } catch (error) {
      if (axios.isCancel(error)) {
        return;
      }
      return thunkAPI.rejectWithValue(error)
    }
  },
)

export const deleteUserById = createAsyncThunk(
  'users/deleteUserById',
  async (id, thunkAPI) => {
    try {
      const response = await axios.post(`http://localhost:8080/users/delete/${id}`)
      thunkAPI.dispatch(fetchAllUsers())
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder
      .addCase(fetchAllUsers.pending, (state, action) => {
        // Add user to the state array
        state.isLoading = true,
        state.isError = false
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        // Add user to the state array
        state.listUsers = action.payload
        state.isLoading = false,
        state.isError = false
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        // Add user to the state array
        state.isLoading = false,
        state.isError = true
      })
      .addCase(deleteUserById.pending, (state, action) => {
        // Add user to the state array
        state.isLoading = true,
        state.isError = false
      })
      .addCase(deleteUserById.fulfilled, (state, action) => {
        // Add user to the state array
        state.listUsers = action.payload
        state.isLoading = false,
        state.isError = false
      })
      .addCase(deleteUserById.rejected, (state, action) => {
        // Add user to the state array
        state.isLoading = false,
        state.isError = true
      })
  },

})

export default userSlice.reducer