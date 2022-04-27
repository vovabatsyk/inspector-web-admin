import { Layout, Row, Form, Input, Button, Card, message } from 'antd'
import React from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { rules } from '../utils/rules'
import { login } from '../store/reducers/ActionCreators'

export const LoginPage = () => {
	const dispatch = useAppDispatch()

	const { error, isLoading } = useAppSelector(
		state => state.userReducer
	)

	const onFinish = (values: any) => {
		dispatch(
			login({
				id: '0',
				login: values.username,
				password: values.password,
				username: ''
			})
		)
		console.log('Success:', values)
	}

	const onFinishFailed = (errorInfo: any) => {
		console.log('Failed:', errorInfo)
	}
	return (
		<Layout>
			<Row
				justify='center'
				align='middle'
				style={{ height: '100vh' }}
			>
				<>
					{error && message.error(error)}

					<Card title='Управління безпеки'>
						<Form
							name='basic'
							labelCol={{ span: 8 }}
							wrapperCol={{ span: 16 }}
							initialValues={{ remember: true }}
							onFinish={onFinish}
							onFinishFailed={onFinishFailed}
							autoComplete='off'
						>
							<Form.Item
								label='Імя'
								name='username'
								rules={[rules.required('Введіть імя користувача!')]}
							>
								<Input />
							</Form.Item>

							<Form.Item
								label='Пароль'
								name='password'
								rules={[rules.required('Введіть пароль!')]}
							>
								<Input.Password />
							</Form.Item>

							<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
								<Button
									type='primary'
									htmlType='submit'
									loading={isLoading}
								>
									Вхід
								</Button>
							</Form.Item>
						</Form>
					</Card>
				</>
			</Row>
		</Layout>
	)
}
