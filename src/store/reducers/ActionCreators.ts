import axios from 'axios'
import { INotice } from "../../models/INotice"
import { createAsyncThunk } from '@reduxjs/toolkit'
import { IUser } from '../../models/IUser'

// export const fetchNotices = () => async (dispatch: AppDispatch) => {
//     try {
//         dispatch(noticeSlice.actions.noticesFetching())
//         const response = await axios.get<INotice[]>('http://localhost:3000/notices')
//         dispatch(noticeSlice.actions.noticesFetchingSuccess(response.data))
//     } catch (error: any) {
//         dispatch(noticeSlice.actions.noticesFetchingError(error.message))
//     }
// }

export const fetchNotices = createAsyncThunk(
    'notice/fetchAll',
    async (_, thunkApi) => {
        try {
            const response = await axios.get<INotice[]>('http://localhost:3000/notices')
            return response.data
        } catch (error) {
            return thunkApi.rejectWithValue("Не вдалося загрузити повідомлення!")
        }
    }
)

export const login = createAsyncThunk(
    'login',
    async (userData: IUser, thunkApi) => {
        const { login, password } = userData
        try {
            const response = await axios.get<IUser[]>('https://parking-lviv-admin.herokuapp.com/users')
            // const response = await axios.get<IUser[]>('http://localhost:3000/users')
            const user = response.data.find(u => u.login === login && u.password === password)

            if (user) {
                localStorage.setItem('auth', 'true')
                localStorage.setItem('username', user.login)
                return user
            } else return

        } catch (error) {
            return thunkApi.rejectWithValue("Не вдалося знайти користувача!")
        }
    }
)