import { paymentApi } from './../services/PaymentApi'
import { questionApi } from './../services/QuestionApi'
import { noticesApi } from './../services/NoticeApi'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import noticeReducer from './reducers/NoticeSlice'
import userReducer from './reducers/UserSlice'
const rootReducer = combineReducers({
    userReducer,
    [noticesApi.reducerPath]: noticesApi.reducer,
    [questionApi.reducerPath]: questionApi.reducer,
    [paymentApi.reducerPath]: paymentApi.reducer,
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(noticesApi.middleware).concat(questionApi.middleware).concat(paymentApi.middleware)
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']  