import { Button, Card, Divider, Row, List, Popconfirm, message, Skeleton } from 'antd'
import React, { useEffect } from 'react'
import { useDeleteUserMutation, useGetUsersQuery } from '../services/UsersApi'
import { FolderAddOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { COLORS } from '../theme'
import { routes } from '../routes'

export const UsersPage = () => {
  const { data: users, isLoading } = useGetUsersQuery(150)
  const [deleteUser, { isSuccess, isError, error }] = useDeleteUserMutation()

  const navigate = useNavigate()

  useEffect(() => {
    console.log(users)
  }, [users])

  const onDeleteUser = async (id: number | undefined) => {
    try {
      await deleteUser(id).unwrap()
      if (isSuccess) message.success('Видалено успішно!')
      if (isError) message.error(error as string)
    } catch (e: any) {
      console.log(e)
      message.error(e.data.message as string)
    }
  }
  return (
    <>
      <Divider orientation='left'>Всі користувачі</Divider>
      <Row justify='end' style={{ margin: 20 }}>
        <Button
          icon={<FolderAddOutlined />}
          type='text'
          style={{ color: COLORS.success }}
          key='add'
          onClick={() => navigate(`../${routes.ADD_USER_PAGE}`)}
        >
          Додати
        </Button>
      </Row>
      <Card style={{ margin: 20 }}>
        {isLoading && <Skeleton active />}
        <List
          className='demo-loadmore-list'
          loading={isLoading}
          itemLayout='horizontal'
          dataSource={users}
          renderItem={(item) => (
            <List.Item
              actions={[
                <Button
                  type='text'
                  style={{ color: COLORS.secondary }}
                  icon={<EditOutlined />}
                  key='edit'
                  onClick={() => navigate(`../${routes.EDIT_USER_PAGE}/${item.id}`)}
                />,
                <Popconfirm
                  title='Ви впевнені？'
                  okText='Так'
                  cancelText='Ні'
                  placement='left'
                  onConfirm={() => onDeleteUser(item.id)}
                >
                  <Button
                    type='text'
                    style={{ color: COLORS.danger }}
                    icon={<DeleteOutlined />}
                    key='delete'
                  />
                </Popconfirm>,
              ]}
            >
              <List.Item.Meta title={item.username} description={item.email} />
              <ul style={{ listStyleType: 'none' }}>
                {item.roles.map((val, idx) => (
                  <li key={idx}>статус: {val.description}</li>
                ))}
              </ul>
            </List.Item>
          )}
        />
      </Card>
    </>
  )
}
