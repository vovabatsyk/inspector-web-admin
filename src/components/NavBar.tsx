import { Menu, MenuProps, Layout } from 'antd'
import { LogoutOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../hooks/redux'
import { useEffect } from 'react'

const menuItems: MenuProps['items'] = [
	{
		label: 'Вийти',
		key: 'logout',
		icon: <LogoutOutlined />
	}
]
const menuItemsPrivate: MenuProps['items'] = [
	{
		label: 'Ввійти',
		key: 'login',
		icon: <LogoutOutlined />
	}
]

export const NavBar = () => {
	const { user, auth } = useAppSelector(state => state.userReducer)

	const navigate = useNavigate()

	const onClickMenu: MenuProps['onClick'] = e => {
		switch (e.key) {
			case 'logout':
				navigate('/login')
				break

			default:
				navigate('/')
		}
	}

	useEffect(() => {
		console.log('auth', auth, user)
	}, [])

	return (
		<Layout.Header>
			{auth ? (
				<>
					<Menu
						theme='dark'
						mode='horizontal'
						selectable={false}
						items={menuItems}
						style={{ justifyContent: 'flex-end' }}
						onClick={onClickMenu}
					></Menu>
				</>
			) : (
				<Menu
					theme='dark'
					mode='horizontal'
					selectable={false}
					items={menuItemsPrivate}
					style={{ justifyContent: 'flex-end' }}
					onClick={onClickMenu}
				></Menu>
			)}
		</Layout.Header>
	)
}
