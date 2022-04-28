import {
	Button,
	Card,
	Divider,
	List,
	Popconfirm,
	Row,
	message
} from 'antd'
import React from 'react'
import {
	useGetNoticesQuery,
	useDeleteNoticeMutation
} from '../services/NoticeApi'
import { COLORS } from '../theme'
import {
	DeleteOutlined,
	EditOutlined,
	FolderAddOutlined
} from '@ant-design/icons'
import { routes } from '../routes'
import { useNavigate } from 'react-router-dom'

export const Notices = () => {
	const { data: notices, isLoading } = useGetNoticesQuery(5)
	const [deleteNotice, { isSuccess, isError, error }] =
		useDeleteNoticeMutation()
	const navigate = useNavigate()

	const onDeleteNotice = async (id: any) => {
		await deleteNotice(id).unwrap()
		if (isSuccess) message.success('Видалено успішно!')
		if (isError) message.error(error as string)
	}

	return (
		<>
			<Divider orientation='left'>Повідомлення</Divider>
			<Row justify='end' style={{ margin: 20 }}>
				<Button
					icon={<FolderAddOutlined />}
					type='text'
					style={{ color: COLORS.success }}
					key='add'
					onClick={() => navigate(routes.ADD_NOTICE_PAGE)}
				>
					Додати
				</Button>
			</Row>
			<Card style={{ margin: 20 }}>
				<List
					className='demo-loadmore-list'
					loading={isLoading}
					itemLayout='horizontal'
					dataSource={notices}
					renderItem={item => (
						<List.Item
							actions={[
								<Button
									type='text'
									style={{ color: COLORS.secondary }}
									icon={<EditOutlined />}
									key='edit'
									onClick={() =>
										navigate(`${routes.EDIT_NOTICE_PAGE}/${item.id}`)
									}
								/>,
								<Popconfirm
									title='Ви впевнені？'
									okText='Так'
									cancelText='Ні'
									placement='left'
									onConfirm={() => onDeleteNotice(item.id)}
								>
									<Button
										type='text'
										style={{ color: COLORS.danger }}
										icon={<DeleteOutlined />}
										key='delete'
									/>
								</Popconfirm>
							]}
						>
							<List.Item.Meta
								title={item.title}
								description={item.description}
							/>
						</List.Item>
					)}
				/>
			</Card>
		</>
	)
}
