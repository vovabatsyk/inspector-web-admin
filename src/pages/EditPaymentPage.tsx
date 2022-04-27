import {
	Card,
	Layout,
	PageHeader,
	Row,
	Form,
	Input,
	Button,
	List,
	Typography,
	Col,
	Upload
} from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IPayment } from '../models/IPayment'
import { useEditPaymentMutation } from '../services/PaymentApi'
import { COLORS, SIZES } from '../theme'

type Props = {
	payment: IPayment | undefined
}

export const EditPaymentPage = (props: Props) => {
	const navigate = useNavigate()
	const [localPayment, setLocalPayment] = useState<IPayment>({
		account: '',
		bank: '',
		code: '',
		purpose: '',
		recipient: ''
	})
	const [updatePayment] = useEditPaymentMutation()

	useEffect(() => {
		if (props.payment) {
			setLocalPayment(props.payment)
		}
	}, [])

	const handleUpdate = async () => {
		await updatePayment(localPayment)
		navigate('/')
	}

	const normFile = (e: any) => {
		console.log('Upload event:', e)
		if (Array.isArray(e)) {
			return e
		}
		return e && e.fileList
	}

	return (
		<Layout>
			<PageHeader
				ghost={false}
				onBack={() => window.history.back()}
				title='Назад'
			></PageHeader>
			<Layout.Content>
				<Row justify='center' align='middle'>
					<Card
						title='Змінити реквізити'
						style={{ width: '90%', margin: SIZES.margin }}
					>
						<List bordered>
							<List.Item>
								<Col span={24}>
									<Typography.Text>Отримувач коштів</Typography.Text>
									<Input
										value={localPayment?.recipient}
										onChange={e =>
											setLocalPayment(prev => ({
												...prev,
												recipient: e.target.value
											}))
										}
									/>
								</Col>
							</List.Item>
							<List.Item>
								<Col span={24}>
									<Typography.Text>
										Код отримувача (код за ЄДРПОУ)
									</Typography.Text>
									<Input
										value={localPayment?.code}
										onChange={e =>
											setLocalPayment(prev => ({
												...prev,
												code: e.target.value
											}))
										}
									/>
								</Col>
							</List.Item>
							<List.Item>
								<Col span={24}>
									<Typography.Text>Банк отримувача</Typography.Text>
									<Input
										value={localPayment?.bank}
										onChange={e =>
											setLocalPayment(prev => ({
												...prev,
												bank: e.target.value
											}))
										}
									/>
								</Col>
							</List.Item>
							<List.Item>
								<Col span={24}>
									<Typography.Text>Номер рахунку</Typography.Text>
									<Input
										value={localPayment?.account}
										onChange={e =>
											setLocalPayment(prev => ({
												...prev,
												account: e.target.value
											}))
										}
									/>
								</Col>
							</List.Item>
							<List.Item>
								<Col span={24}>
									<Typography.Text>
										Призначення платежу
									</Typography.Text>
									<Input
										value={localPayment?.purpose}
										onChange={e =>
											setLocalPayment(prev => ({
												...prev,
												purpose: e.target.value
											}))
										}
									/>
								</Col>
							</List.Item>
							<List.Item>
								<Upload
									name='logo'
									action='/upload.do'
									listType='picture'
								>
									<Button icon={<UploadOutlined />}>
										Загрузити квитанцію
									</Button>
								</Upload>
							</List.Item>

							<List.Item>
								<Button
									style={{
										backgroundColor: COLORS.success,
										color: COLORS.white
									}}
									onClick={handleUpdate}
								>
									Зберегти
								</Button>
							</List.Item>
						</List>
					</Card>
				</Row>
			</Layout.Content>
		</Layout>
	)
}
