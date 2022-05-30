import { Form, Input, Button, message } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { PageContainer } from '../components/ui/PageContainer'
import { useAddQuestionMutation } from '../services/QuestionApi'

export const AddQuestionPage = () => {
  const [addQuestion] = useAddQuestionMutation()
  const navigate = useNavigate()

  const onFinish = async (values: any) => {
    await addQuestion({
      title: values.question,
      description: values.answer,
    }).unwrap()
    message.success('Додано успішно!')

    navigate('/')
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <PageContainer title='Створити запитання'>
      <Form name='basic' onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete='off'>
        <Form.Item label='Запитання' name='question'>
          <Input.TextArea rows={3} />
        </Form.Item>

        <Form.Item label='Відповідь' name='answer'>
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
