import React from 'react'
import { Button, Card, Divider, List, Popconfirm, Row, message } from 'antd'
import { COLORS } from '../theme'
import { DeleteOutlined, EditOutlined, FolderAddOutlined } from '@ant-design/icons'
import { routes } from '../routes'
import { useNavigate } from 'react-router-dom'
import { useGetQuestionsQuery, useDeleteQuestionMutation } from '../services/QuestionApi'

export const Questions = () => {
  const { data: questions, isLoading } = useGetQuestionsQuery(10)
  const [deleteQuestion, { isSuccess, isError, error }] = useDeleteQuestionMutation()
  const navigate = useNavigate()

  const onDeleteNotice = async (id: any) => {
    try {
      await deleteQuestion(id).unwrap()
      if (isSuccess) message.success('Видалено успішно!')
      if (isError) message.error(error as string)
    } catch (e: any) {
      message.error(e.data.message as string)
    }
  }
  return (
    <>
      <Divider orientation='left'>Часто задавані питання</Divider>
      <Row justify='end' style={{ margin: 20 }}>
        <Button
          icon={<FolderAddOutlined />}
          type='text'
          style={{ color: COLORS.success }}
          key='add'
          onClick={() => navigate(routes.ADD_QUESTION_PAGE)}
        >
          Додати
        </Button>
      </Row>
      <Card style={{ margin: 20 }}>
        <List
          className='demo-loadmore-list'
          loading={isLoading}
          itemLayout='horizontal'
          dataSource={questions}
          renderItem={(item) => (
            <List.Item
              actions={[
                <Button
                  type='text'
                  style={{ color: COLORS.secondary }}
                  icon={<EditOutlined />}
                  key='edit'
                  onClick={() => navigate(`${routes.EDIT_QUESTION_PAGE}/${item.id}`)}
                />,
                <Popconfirm
                  title='Ви впевнені？'
                  okText='Так'
                  cancelText='Ні'
                  placement='left'
                  onConfirm={() => onDeleteNotice(item.id)}
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
