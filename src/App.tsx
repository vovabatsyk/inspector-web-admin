import { Layout } from 'antd'
import { useEffect, useState } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import { NavBar } from './components/NavBar'
import { AddNoticePage } from './pages/AddNoticePage'
import { AddQuestionPage } from './pages/AddQuestionPage'
import { EditNoticePage } from './pages/EditNoticePage'
import { EditPaymentPage } from './pages/EditPaymentPage'
import { EditQuestionPage } from './pages/EditQuestionPage'
import HomePage from './pages/HomePage'
import { LoginPage } from './pages/LoginPage'
import { UsersPage } from './pages/UsersPage'
import { routes } from './routes'
import { useGetPaymentQuery } from './services/PaymentApi'

function App() {
  const navigate = useNavigate()
  const localToken = localStorage.getItem('token')
  const { data: payment } = useGetPaymentQuery(1)

  useEffect(() => {
    if (localToken) {
      console.log('localToken', localToken)

      navigate('../')
    }
  }, [localToken])

  return (
    <Layout>
      <NavBar />

      <Layout.Content>
        <Routes>
          {localToken ? (
            <>
              <Route path={routes.HOME_PAGE} element={<HomePage />} />
              <Route path={routes.ADD_NOTICE_PAGE} element={<AddNoticePage />} />
              <Route path={`${routes.EDIT_NOTICE_PAGE}/:id`} element={<EditNoticePage />} />
              <Route path={routes.ADD_QUESTION_PAGE} element={<AddQuestionPage />} />
              <Route path={routes.USERS_PAGE} element={<UsersPage />} />
              <Route path={`${routes.EDIT_QUESTION_PAGE}/:id`} element={<EditQuestionPage />} />
              <Route
                path={routes.EDIT_PAYMENT_PAGE}
                element={<EditPaymentPage payment={payment} />}
              />
              <Route path='*' element={<Navigate to='/' replace />} />
            </>
          ) : (
            <>
              <Route path={routes.LOGIN_PAGE} element={<LoginPage />} />
              <Route path='*' element={<Navigate to='/login' replace />} />
            </>
          )}
        </Routes>
      </Layout.Content>
    </Layout>
  )
}

export default App
