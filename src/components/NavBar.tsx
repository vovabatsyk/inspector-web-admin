import { Menu, MenuProps, Layout } from 'antd'
import {
  LogoutOutlined,
  UsergroupAddOutlined,
  DribbbleOutlined,
  PicLeftOutlined,
  FormOutlined,
} from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { routes } from '../routes'

const menuItems: MenuProps['items'] = [
  {
    label: 'Користувачі',
    key: 'users',
    icon: <UsergroupAddOutlined />,
  },
  {
    label: 'Новини',
    key: 'posts',
    icon: <PicLeftOutlined />,
  },
  {
    label: 'Фабули/КУпАП',
    key: 'stories',
    icon: <FormOutlined />,
  },
  {
    label: 'Сайт',
    key: 'web',
    icon: <DribbbleOutlined />,
  },
  {
    label: 'Вийти',
    key: 'logout',
    icon: <LogoutOutlined />,
  },
]

export const NavBar = () => {
  const localToken = localStorage.getItem('token')

  const navigate = useNavigate()

  const onClickMenu: MenuProps['onClick'] = (e: any) => {
    switch (e.key) {
      case 'logout':
        localStorage.removeItem('token')
        navigate(routes.LOGIN_PAGE)
        break
      case 'web':
        navigate('/')
        break
      case 'users':
        navigate(routes.USERS_PAGE)
        break
      case 'posts':
        navigate(routes.POSTS_PAGE)
        break
      case 'stories':
        navigate(routes.STORIES_PAGE)
        break

      default:
        break
    }
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
