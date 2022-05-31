import { login } from './ActionCreators'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AuthSlice {
  token: string | null | any
}

const initialState: AuthSlice = {
  token: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ token: string | any }>) => {
      state.token = action.payload.token
    },
  },
})

export const { setUser } = authSlice.actions

export default authSlice.reducer
