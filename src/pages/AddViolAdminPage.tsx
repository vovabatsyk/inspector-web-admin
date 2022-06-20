import { Button, Form, Input, InputNumber, message, Switch } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { PageContainer } from '../components/ui/PageContainer'
import { routes } from '../routes'
import { useAddMutation } from '../services/ViolAdminsApi'

export const AddViolAdminPage = () => {
  const [addViolAdmin] = useAddMutation()
  const navigate = useNavigate()

  const onFinish = async (values: any) => {
    try {
      await addViolAdmin({ ...values }).unwrap()
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
        <Form.Item label='Назва' name='name'>
          <Input />
        </Form.Item>

        <Form.Item label='Неоподатковуваний мінімум' name='min'>
          <InputNumber min={1} style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item label='Штраф (кількімть неоподатковуваних мінімумів)' name='multy'>
          <InputNumber min={1} style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item label='Чинна стаття' initialValue={true} valuePropName='checked' name='status'>
          <Switch />
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
