import { login } from './ActionCreators'
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IUser } from '../../models/IUser'

interface NoticeState {
    user: IUser
    isLoading: boolean,
    error: string,
    auth: boolean
}

const initialState: NoticeState = {
    user: {
        id: "",
        login: '',
        password: '',
        username: '',
    },
    isLoading: false,
    error: '',
    auth: false
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: {
        [login.fulfilled.type]: (state, action: PayloadAction<IUser>) => {
            state.isLoading = false
            state.error = ''
            state.user = action.payload
            state.auth = true

        },
        [login.pending.type]: (state) => {
            state.isLoading = true
            state.auth = false
        },
        [login.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false
            state.error = action.payload
            state.auth = false
        },

    }
}
)

export default userSlice.reducer