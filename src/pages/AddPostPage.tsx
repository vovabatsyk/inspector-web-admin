import { Button, Form, Input, message, Upload, Row } from 'antd'
import React, { useEffect, useState } from 'react'
import { PageContainer } from '../components/ui/PageContainer'
import { UploadOutlined } from '@ant-design/icons'
import { useAddPostMutation } from '../services/PostApi'
import jwt from 'jwt-decode'
import { useNavigate } from 'react-router-dom'
import { routes } from '../routes'
import { SIZES } from '../theme'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

const AddPostPage = () => {
  const navigate = useNavigate()
  const [addPost] = useAddPostMutation()
  const [file, setFile] = useState<any>(null)
  const [id, setId] = useState('')
  const [content, setContent] = useState('')

  const handleFile = (e: any) => {
    setFile(e.target.files[0])
  }

  useEffect(() => {
    const userToken = localStorage.getItem('token')
    const decodedToken: any = jwt(userToken!)
    setId(decodedToken.id)
  }, [])

  const onFinish = async (values: any) => {
    const formData = new FormData()
    formData.append('image', file)
    formData.append('title', values.title)
    formData.append('content', content)
    formData.append('userId', id)
    try {
      await addPost(formData).unwrap()
      navigate(`../${routes.POSTS_PAGE}`)
    } catch (e) {
      message.error(e as string)
    }
  }

  const onFinishFailed = () => {}
  return (
    <PageContainer title='Створити користувача'>
      <>
        <Form name='basic' onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete='off'>
          <Form.Item>
            <Button style={{ marginTop: SIZES.margin }} type='primary' htmlType='submit'>
              Зберегти
            </Button>
          </Form.Item>
          <Form.Item label='Title' name='title'>
            <Input.TextArea rows={3} />
          </Form.Item>

          <Upload name='logo' beforeUpload={(f) => setFile(f)} maxCount={1} action='' accept='.jpg'>
            <Button style={{ marginBottom: SIZES.margin }} icon={<UploadOutlined />}>
              Загрузити картинку
            </Button>
          </Upload>
        </Form>
        <CKEditor
          editor={ClassicEditor}
          data={content}
          onChange={(e: any, editor: any) => {
            const data = editor.getData()
            setContent(data)
          }}
        />
      </>
    </PageContainer>
  )
}

export default AddPostPage
