import { paymentApi } from './../services/PaymentApi'
import { questionApi } from './../services/QuestionApi'
import { noticesApi } from './../services/NoticeApi'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import authReducer from './reducers/AuthSlice'
import { authApi } from '../services/AuthApi'
const rootReducer = combineReducers({
  authReducer,
  [noticesApi.reducerPath]: noticesApi.reducer,
  [questionApi.reducerPath]: questionApi.reducer,
  [paymentApi.reducerPath]: paymentApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
})

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(noticesApi.middleware)
        .concat(questionApi.middleware)
        .concat(authApi.middleware)
        .concat(paymentApi.middleware),
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
