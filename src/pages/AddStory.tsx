import { Button, Form, Input, message } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { PageContainer } from '../components/ui/PageContainer'
import { routes } from '../routes'
import { useAddStoryMutation } from '../services/StoryApi'

export const AddStory = () => {
  const [addNStory] = useAddStoryMutation()
  const navigate = useNavigate()

  const onFinish = async (values: any) => {
    try {
      await addNStory({
        title: values.title,
        description: values.description,
      }).unwrap()
      message.success('Додано успішно!')
    } catch (e: any) {
      message.error(e.data.message as string)
    }

    navigate(`../${routes.STORIES_PAGE}`)
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }
  return (
    <PageContainer title='Створити фабулу'>
      <Form name='basic' onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete='off'>
        <Form.Item label='Заголовок' name='title'>
          <Input.TextArea rows={2} />
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
