import { Button, Form, Input, message } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { PageContainer } from '../components/ui/PageContainer'
import { routes } from '../routes'
import { useAddUserMutation } from '../services/UsersApi'

export const AddUserPage = () => {
  const [addUser] = useAddUserMutation()

  const navigate = useNavigate()

  const onFinish = async (values: any) => {
    try {
      await addUser({
        email: values.email,
        password: values.password,
        username: values.username,
      }).unwrap()
      message.success('Додано успішно!')
    } catch (e: any) {
      message.error(e.data.message as string)
    }

    navigate(`../${routes.USERS_PAGE}`)
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }
  return (
    <PageContainer title='Створити користувача'>
      <Form name='basic' onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete='off'>
        <Form.Item label='Email' name='email'>
          <Input />
        </Form.Item>

        <Form.Item label='П.І.Б' name='username'>
          <Input />
        </Form.Item>

        <Form.Item label='Пароль' name='password'>
          <Input />
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
