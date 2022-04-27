import {
	Card,
	Layout,
	PageHeader,
	Row,
	Form,
	Input,
	Button,
	message
} from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAddNoticeMutation } from '../services/NoticeApi'

export const AddNoticePage = () => {
	const [addNotice] = useAddNoticeMutation()
	const navigate = useNavigate()

	const onFinish = async (values: any) => {
		await addNotice({
			title: values.title,
			description: values.description
		}).unwrap()
		message.success('Додано успішно!')

		navigate('/')
	}

	const onFinishFailed = (errorInfo: any) => {
		console.log('Failed:', errorInfo)
	}
	return (
		<Layout>
			<PageHeader
				ghost={false}
				onBack={() => window.history.back()}
				title='Назад'
			></PageHeader>
			<Layout.Content>
				<Row justify='center' align='middle' className='h100'>
					<Card
						title='Створити повідомлення'
						style={{ width: '90%' }}
					>
						<Form
							name='basic'
							onFinish={onFinish}
							onFinishFailed={onFinishFailed}
							autoComplete='off'
						>
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
					</Card>
				</Row>
			</Layout.Content>
		</Layout>
	)
}
