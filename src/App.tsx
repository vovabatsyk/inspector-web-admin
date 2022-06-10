import { Layout } from 'antd'
import { useEffect } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import { NavBar } from './components/NavBar'
import { AddNoticePage } from './pages/AddNoticePage'
import AddPostPage from './pages/AddPostPage'
import { AddQuestionPage } from './pages/AddQuestionPage'
import { AddStory } from './pages/AddStory'
import { AddUserPage } from './pages/AddUserPage'
import { EditNoticePage } from './pages/EditNoticePage'
import { EditPaymentPage } from './pages/EditPaymentPage'
import { EditQuestionPage } from './pages/EditQuestionPage'
import { EditStory } from './pages/EditStory'
import { EditUserPage } from './pages/EditUserPage'
import HomePage from './pages/HomePage'
import { LoginPage } from './pages/LoginPage'
import PostPage from './pages/PostPage'
import PostsPage from './pages/PostsPage'
import { StoriesPage } from './pages/StoriesPage'
import { UsersPage } from './pages/UsersPage'
import { routes } from './routes'
import { useGetPaymentQuery } from './services/PaymentApi'

function App() {
  const navigate = useNavigate()
  const localToken = localStorage.getItem('token')
  const { data: payment } = useGetPaymentQuery(1)

  useEffect(() => {
    if (localToken) {
      navigate('../')
    }
  }, [localToken])

  return (
    <Layout>
      {localToken && <NavBar />}

      <Layout.Content>
        <Routes>
          {localToken ? (
            <>
              <Route path={routes.HOME_PAGE} element={<HomePage />} />
              <Route path={routes.ADD_NOTICE_PAGE} element={<AddNoticePage />} />
              <Route path={`${routes.EDIT_NOTICE_PAGE}/:id`} element={<EditNoticePage />} />
              <Route path={routes.ADD_QUESTION_PAGE} element={<AddQuestionPage />} />
              <Route path={routes.USERS_PAGE} element={<UsersPage />} />
              <Route path={routes.POSTS_PAGE} element={<PostsPage />}></Route>
              <Route path={routes.ADD_POST_PAGE} element={<AddPostPage />} />
              <Route path={routes.ADD_USER_PAGE} element={<AddUserPage />} />
              <Route path={routes.STORIES_PAGE} element={<StoriesPage />} />
              <Route path={routes.ADD_STORY} element={<AddStory />} />
              <Route path={`${routes.EDIT_USER_PAGE}/:id`} element={<EditUserPage />} />
              <Route path={`${routes.EDIT_QUESTION_PAGE}/:id`} element={<EditQuestionPage />} />
              <Route path={`${routes.GET_POST}/:id`} element={<PostPage />} />
              <Route path={`${routes.EDIT_STORY}/:id`} element={<EditStory />} />
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
