import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useAppSelector } from '../hooks/redux'
import { AddNoticePage } from '../pages/AddNoticePage'
import { AddQuestionPage } from '../pages/AddQuestionPage'
import { EditPaymentPage } from '../pages/EditPaymentPage'
import HomePage from '../pages/HomePage'
import { LoginPage } from '../pages/LoginPage'
import { routes } from '../routes'
import { useGetPaymentQuery } from '../services/PaymentApi'

export const AppRouter = () => {
	const { auth } = useAppSelector(state => state.userReducer)
	const {
		data: payment,
		isLoading,
		isSuccess
	} = useGetPaymentQuery(1)
	return (
		<>
			{auth ? (
				<Routes>
					<Route path={routes.HOME_PAGE} element={<HomePage />} />
					<Route
						path={routes.ADD_NOTICE_PAGE}
						element={<AddNoticePage />}
					/>
					<Route
						path={routes.ADD_QUESTION_PAGE}
						element={<AddQuestionPage />}
					/>
					<Route
						path={routes.EDIT_PAYMENT_PAGE}
						element={<EditPaymentPage payment={payment} />}
					/>
					<Route path='*' element={<Navigate to='/' replace />} />
				</Routes>
			) : (
				<Routes>
					<Route path={routes.LOGIN_PAGE} element={<LoginPage />} />
					<Route
						path='*'
						element={<Navigate to='/login' replace />}
					/>
				</Routes>
			)}
		</>
	)
}
