import { Layout } from 'antd'
import React, { useEffect } from 'react'
import { AppRouter } from './components/AppRouter'
import { NavBar } from './components/NavBar'
import { useAppDispatch, useAppSelector } from './hooks/redux'
import { fetchNotices, login } from './store/reducers/ActionCreators'

function App() {
	const dispatch = useAppDispatch()
	const { notices, isLoading, error } = useAppSelector(
		state => state.noticeReducer
	)

	const { user, auth } = useAppSelector(state => state.userReducer)

	useEffect(() => {
		dispatch(fetchNotices())
		// dispatch(
		// 	login({
		// 		login: 'admin',
		// 		password: '1234',
		// 		id: 0,
		// 		username: ''
		// 	})
		// )
	}, [])
	return (
		<Layout>
			{auth && <NavBar />}

			<Layout.Content>
				<AppRouter />
			</Layout.Content>
		</Layout>
	)
}

export default App
