import { type } from 'os'
import React, { useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useAppSelector } from '../hooks/redux'
import { AddNoticePage } from '../pages/AddNoticePage'
import { AddQuestionPage } from '../pages/AddQuestionPage'
import { EditNoticePage } from '../pages/EditNoticePage'
import { EditPaymentPage } from '../pages/EditPaymentPage'
import { EditQuestionPage } from '../pages/EditQuestionPage'
import HomePage from '../pages/HomePage'
import { LoginPage } from '../pages/LoginPage'
import { routes } from '../routes'
import { useGetPaymentQuery } from '../services/PaymentApi'

type Props = {
  token: string
}

export const AppRouter = (props: Props) => {
  const { data: payment } = useGetPaymentQuery(1)
  const { token } = useAppSelector((state) => state.authReducer)

  return (
    <>
      {props.token || token ? (
        <Routes>
          <Route path={routes.HOME_PAGE} element={<HomePage />} />
          <Route path={routes.ADD_NOTICE_PAGE} element={<AddNoticePage />} />
          <Route path={`${routes.EDIT_NOTICE_PAGE}/:id`} element={<EditNoticePage />} />
          <Route path={routes.ADD_QUESTION_PAGE} element={<AddQuestionPage />} />
          <Route path={`${routes.EDIT_QUESTION_PAGE}/:id`} element={<EditQuestionPage />} />
          <Route path={routes.EDIT_PAYMENT_PAGE} element={<EditPaymentPage payment={payment} />} />
          <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
      ) : (
        <Routes>
          <Route path={routes.LOGIN_PAGE} element={<LoginPage />} />
          <Route path='*' element={<Navigate to='/login' replace />} />
        </Routes>
      )}
    </>
  )
}
