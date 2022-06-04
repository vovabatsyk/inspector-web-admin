import { Button, Card, Row, Skeleton } from 'antd'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { COLORS, SIZES } from '../theme'
import { FolderAddOutlined } from '@ant-design/icons'
import { routes } from '../routes'
import { useGetPostsQuery } from '../services/PostApi'
import moment from 'moment'
import { IPost } from '../models/IPost'

const PostsPage = () => {
  const { Meta } = Card
  const navigate = useNavigate()
  const { data: posts, isLoading } = useGetPostsQuery(150)

  const [allPosts, setAllPosts] = useState<IPost[]>([])

  useEffect(() => {
    if (posts) {
      setAllPosts(posts)
    }
  }, [posts])

  const onPostClick = (id: number) => {
    navigate(`../${routes.GET_POST}/${id}`)
  }

  return (
    <Card title='Новини' style={{ backgroundColor: COLORS.white }}>
      <Row justify='end' style={{ margin: 20 }}>
        <Button
          icon={<FolderAddOutlined />}
          type='text'
          style={{ color: COLORS.success }}
          key='add'
          onClick={() => navigate(`../${routes.ADD_POST_PAGE}`)}
        >
          Додати
        </Button>
      </Row>
      <Row justify='space-around'>
        {isLoading && <Skeleton active />}
        {allPosts &&
          [...allPosts].reverse().map((p, idx) => (
            <Card
              key={idx}
              hoverable
              style={{ width: 300, margin: SIZES.margin }}
              cover={<img alt='example' src={`http://localhost:5000/${p.image}`} />}
              onClick={() => onPostClick(p.id!)}
            >
              <Meta
                title={p.title}
                description={p?.createdAt ? moment(p?.createdAt).format('DD.MM.YYYY') : ''}
              />
            </Card>
          ))}
      </Row>
    </Card>
  )
}

export default PostsPage
