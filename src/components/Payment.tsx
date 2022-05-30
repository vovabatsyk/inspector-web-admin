import React from 'react'
import { Button, Card, Divider, List, Row, message } from 'antd'
import { COLORS } from '../theme'
import { EditOutlined } from '@ant-design/icons'
import { routes } from '../routes'
import { useNavigate } from 'react-router-dom'
import { useGetPaymentQuery } from '../services/PaymentApi'

export const Payment = () => {
  const { data: payment } = useGetPaymentQuery(1)
  const navigate = useNavigate()

  return (
    <>
      <Divider orientation='left'>Сплатити штраф</Divider>
      <Row justify='end' style={{ margin: 20 }}>
        <Button
          icon={<EditOutlined />}
          type='text'
          style={{ color: COLORS.success }}
          key='edit'
          onClick={() => navigate(routes.EDIT_PAYMENT_PAGE)}
        >
          Змінити
        </Button>
      </Row>
      <Card style={{ margin: 20 }}>
        <List size='large' bordered>
          <List.Item>Отримувач коштів - {payment?.recipient}</List.Item>
          <List.Item>Код отримувача (код за ЄДРПОУ) - {payment?.code}</List.Item>
          <List.Item>Банк отримувача - {payment?.bank}</List.Item>
          <List.Item>Номер рахунку - {payment?.account}</List.Item>
          <List.Item>Призначення платежу - {payment?.purpose}</List.Item>
        </List>
      </Card>
    </>
  )
}
