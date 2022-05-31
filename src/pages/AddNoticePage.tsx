import { Form, Input, Button, message } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { PageContainer } from '../components/ui/PageContainer'
import { useAddNoticeMutation } from '../services/NoticeApi'

export const AddNoticePage = () => {
  const [addNotice] = useAddNoticeMutation()
  const navigate = useNavigate()

  const onFinish = async (values: any) => {
    try {
      await addNotice({
        title: values.title,
        description: values.description,
      }).unwrap()
      message.success('Додано успішно!')
    } catch (e: any) {
      message.error(e.data.message as string)
    }

    navigate('/')
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }
  return (
    <PageContainer title='Створити повідомлення'>
      <Form name='basic' onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete='off'>
        <Form.Item label='Заголовок' name='title'>
          <Input />
        </Form.Item>

        <Form.Item label='Опис' name='description'>
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item>
          <Button type='primary' htmlType='submit'>
            Зберегти
          </Button>
        </Form.Item>
      </Form>
    </PageContainer>
  )
}
