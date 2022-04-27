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
import { useAddQuestionMutation } from '../services/QuestionApi'

export const AddQuestionPage = () => {
	const [addQuestion] = useAddQuestionMutation()
	const navigate = useNavigate()

	const onFinish = async (values: any) => {
		await addQuestion({
			question: values.question,
			answer: values.answer
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
					<Card title='Створити запитання' style={{ width: '90%' }}>
						<Form
							name='basic'
							onFinish={onFinish}
							onFinishFailed={onFinishFailed}
							autoComplete='off'
						>
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
					</Card>
				</Row>
			</Layout.Content>
		</Layout>
	)
}
