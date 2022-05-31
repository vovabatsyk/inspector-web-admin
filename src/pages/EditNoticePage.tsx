import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useGetContactQuery, useEditNoticeMutation } from '../services/NoticeApi'
import { Button, Input, message } from 'antd'
import { INotice } from '../models/INotice'
import { COLORS, SIZES } from '../theme'
import { PageContainer } from '../components/ui/PageContainer'

export const EditNoticePage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { data } = useGetContactQuery(id!)
  const [updateNotice, { isLoading }] = useEditNoticeMutation()
  const [notice, setNotice] = useState<INotice>({
    description: '',
    title: '',
  })

  useEffect(() => {
    if (data) {
      setNotice(data)
    }
  }, [data])

  const handleSave = async () => {
    try {
      await updateNotice(notice)
      message.success('Збережено успішно!')
    } catch (e: any) {
      message.error(e.data.message as string)
    }
    navigate('/')
  }

  return (
    <PageContainer title='Змінити повідомлення'>
      <>
        <Input.TextArea
          style={{ margin: SIZES.margin }}
          value={notice.title}
          onChange={(e) =>
            setNotice((prev) => ({
              ...prev,
              title: e.target.value,
            }))
          }
        />
        <Input.TextArea
          style={{ margin: SIZES.margin }}
          rows={4}
          value={notice.description}
          onChange={(e) =>
            setNotice((prev) => ({
              ...prev,
              description: e.target.value,
            }))
          }
        />
        <Button
          onClick={handleSave}
          loading={isLoading}
          style={{
            backgroundColor: COLORS.success,
            color: COLORS.white,
            margin: SIZES.margin,
          }}
        >
          Зберегти
        </Button>
      </>
    </PageContainer>
  )
}
