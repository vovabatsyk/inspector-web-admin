import React, { useEffect, useState } from 'react'
import { PageContainer } from '../components/ui/PageContainer'
import { useParams, useNavigate } from 'react-router-dom'
import { useEditQuestionMutation, useGetQuestionQuery } from '../services/QuestionApi'
import { IQuestion } from '../models/IQuetion'
import { message, Input, Button } from 'antd'
import { COLORS, SIZES } from '../theme'

export const EditQuestionPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [question, setQuestion] = useState<IQuestion>({
    title: '',
    description: '',
  })

  const { data } = useGetQuestionQuery(id!)
  const [updateQuestion, { isLoading }] = useEditQuestionMutation()

  useEffect(() => {
    if (data) {
      setQuestion(data)
    }
  }, [data])

  const handleUpdate = async () => {
    if (question) {
      await updateQuestion(question)
      message.success('Збережено успішно')
      navigate('/')
    }
  }

  return (
    <PageContainer title='Змінити запитання'>
      <>
        <Input.TextArea
          style={{ margin: SIZES.margin }}
          rows={3}
          value={question.title}
          onChange={(e) =>
            setQuestion((prev) => ({
              ...prev,
              title: e.target.value,
            }))
          }
        />
        <Input.TextArea
          style={{ margin: SIZES.margin }}
          rows={4}
          value={question.description}
          onChange={(e) => setQuestion((prev) => ({ ...prev, description: e.target.value }))}
        />
        <Button
          style={{
            margin: SIZES.margin,
            backgroundColor: COLORS.success,
            color: COLORS.white,
          }}
          loading={isLoading}
          onClick={handleUpdate}
        >
          Зберегти
        </Button>
      </>
    </PageContainer>
  )
}
