import { Button, Card, message, Popconfirm, Row, Skeleton } from 'antd'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { PageContainer } from '../components/ui/PageContainer'
import { useDeletePostMutation, useGetPostQuery } from '../services/PostApi'
import { COLORS, SIZES } from '../theme'
import { ClockCircleOutlined } from '@ant-design/icons'
import moment from 'moment'
import { routes } from '../routes'
import parse from 'html-react-parser'
import { URL } from '../url'

const { Meta } = Card

const PostPage = () => {
  const { id } = useParams()
  const [deletePost] = useDeletePostMutation()
  const navigate = useNavigate()
  const [content, setContent] = useState<any>(null)

  const { data: post, isLoading } = useGetPostQuery(id!)

  const onDeletePost = async (id: any) => {
    try {
      await deletePost(id)
      navigate(`../${routes.POSTS_PAGE}`)
    } catch (e) {
      message.error(e as string)
    }
  }

  useEffect(() => {
    if (post) {
      const data = parse(post.content)
      setContent(data)
    }
  }, [post])

  return (
    <PageContainer title='Новини'>
      <Row justify='center' align='middle'>
        {isLoading && <Skeleton active />}
        <Card
          hoverable
          style={{ width: '80%' }}
          cover={<img alt='example' src={`${URL.DEFAULT}/${post?.image}`} />}
        >
          <Meta title={post?.title} />
          <div style={{ marginTop: SIZES.margin }}>{content}</div>
          <small>
            <ClockCircleOutlined />{' '}
            {post?.createdAt ? moment(post?.createdAt).format('DD.MM.YYYY') : ''}
          </small>
          <Row justify='end'>
            <Popconfirm
              title='Ви впевнені？'
              okText='Так'
              cancelText='Ні'
              placement='left'
              onConfirm={() => onDeletePost(post?.id)}
            >
              <Button type='text' style={{ backgroundColor: COLORS.danger, color: COLORS.white }}>
                Видалити
              </Button>
            </Popconfirm>
          </Row>
        </Card>
      </Row>
    </PageContainer>
  )
}

export default PostPage
