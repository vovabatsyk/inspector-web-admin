import { Menu, MenuProps, Layout } from 'antd'
import { LogoutOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../hooks/redux'
import { useEffect } from 'react'
import { setUser } from '../store/reducers/AuthSlice'
import { useDispatch } from 'react-redux'

const menuItems: MenuProps['items'] = [
  {
    label: 'Вийти',
    key: 'logout',
    icon: <LogoutOutlined />,
  },
]

export const NavBar = () => {
  const localToken = localStorage.getItem('token')

  const navigate = useNavigate()

  const onClickMenu = () => {
    console.log('1')

    localStorage.removeItem('token')
    console.log('2')

    navigate('/login')
    console.log('3')
  }

  return (
    <Layout.Header>
      {localToken && (
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
      )}
    </Layout.Header>
  )
}
