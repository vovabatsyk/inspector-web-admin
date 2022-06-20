import { Button, Card, Divider, List, message, Popconfirm, Row, Skeleton, Typography } from 'antd'
import React from 'react'
import { useDeleteStoryMutation, useGetStoriesQuery } from '../services/StoryApi'
import { useGetAllQuery, useDeleteMutation } from '../services/ViolAdminsApi'
import { FolderAddOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { COLORS } from '../theme'
import { useNavigate } from 'react-router-dom'
import { routes } from '../routes'

export const StoriesPage = () => {
  const { data: stories, isLoading } = useGetStoriesQuery(10)
  const { data: violAdmins, isLoading: isViolLoading } = useGetAllQuery(20)
  const [deleteStory, { isSuccess, isError, error }] = useDeleteStoryMutation()
  const [deleteViolAdmins, { isSuccess: isViolSuccess, isError: isViolError, error: violError }] =
    useDeleteMutation()

  const navigate = useNavigate()

  const onDeleteStory = async (id: number | undefined) => {
    try {
      await deleteStory(id).unwrap()
      if (isSuccess) message.success('Видалено успішно!')
      if (isError) message.error(error as string)
    } catch (e: any) {
      message.error(e.data.message as string)
    }
  }
  const onDeleteViolAdmin = async (id: number | undefined) => {
    try {
      await deleteViolAdmins(id).unwrap()
      if (isViolSuccess) message.success('Видалено успішно!')
      if (isViolError) message.error(violError as string)
    } catch (e: any) {
      message.error(e.data.message as string)
    }
  }
  return (
    <>
      <Divider orientation='left'>КУПАП</Divider>
      <Row justify='end' style={{ margin: 20 }}>
        <Button
          icon={<FolderAddOutlined />}
          type='text'
          style={{ color: COLORS.success }}
          key='add'
          onClick={() => navigate(`../${routes.ADD_VIOL_ADMIN}`)}
        >
          Додати
        </Button>
      </Row>
      <Card style={{ margin: 20 }}>
        {isViolLoading && <Skeleton active />}
        <List
          className='demo-loadmore-list'
          loading={isViolLoading}
          itemLayout='horizontal'
          dataSource={violAdmins}
          renderItem={(item) => (
            <List.Item
              actions={[
                <Button
                  type='text'
                  style={{ color: COLORS.secondary }}
                  icon={<EditOutlined />}
                  key='edit'
                  onClick={() => navigate(`../${routes.EDIT_VIOL_ADMIN}/${item.id}`)}
                />,
                <Popconfirm
                  title='Ви впевнені？'
                  okText='Так'
                  cancelText='Ні'
                  placement='left'
                  onConfirm={() => onDeleteViolAdmin(item.id)}
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
              <List.Item.Meta title={item.name} description={`${item.min * item.multy}грн`} />
              <Typography.Text>{item.status ? 'Чинна' : 'Не чинна'}</Typography.Text>
            </List.Item>
          )}
        />
      </Card>
      <Divider orientation='left'>Всі фабули</Divider>
      <Row justify='end' style={{ margin: 20 }}>
        <Button
          icon={<FolderAddOutlined />}
          type='text'
          style={{ color: COLORS.success }}
          key='add'
          onClick={() => navigate(`../${routes.ADD_STORY}`)}
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
          dataSource={stories}
          renderItem={(item) => (
            <List.Item
              actions={[
                <Button
                  type='text'
                  style={{ color: COLORS.secondary }}
                  icon={<EditOutlined />}
                  key='edit'
                  onClick={() => navigate(`../${routes.EDIT_STORY}/${item.id}`)}
                />,
                <Popconfirm
                  title='Ви впевнені？'
                  okText='Так'
                  cancelText='Ні'
                  placement='left'
                  onConfirm={() => onDeleteStory(item.id)}
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
              <List.Item.Meta title={item.title} description={item.description} />
            </List.Item>
          )}
        />
      </Card>
    </>
  )
}
