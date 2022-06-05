import { Button, Input, message } from 'antd'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { PageContainer } from '../components/ui/PageContainer'
import { IStory } from '../models/IStory'
import { routes } from '../routes'
import { useEditStoryMutation, useGetStoryQuery } from '../services/StoryApi'
import { COLORS, SIZES } from '../theme'

export const EditStory = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { data } = useGetStoryQuery(id!)
  const [updateStory, { isLoading }] = useEditStoryMutation()
  const [story, setStory] = useState<IStory>({
    description: '',
    title: '',
  })

  useEffect(() => {
    if (data) {
      setStory(data)
    }
  }, [data])

  const handleSave = async () => {
    try {
      await updateStory(story)
      message.success('Збережено успішно!')
    } catch (e: any) {
      message.error(e.data.message as string)
    }
    navigate(`../${routes.STORIES_PAGE}`)
  }
  return (
    <PageContainer title='Змінити фабулу'>
      <>
        <Input.TextArea
          style={{ margin: SIZES.margin }}
          value={story.title}
          onChange={(e) =>
            setStory((prev) => ({
              ...prev,
              title: e.target.value,
            }))
          }
        />
        <Input.TextArea
          style={{ margin: SIZES.margin }}
          rows={4}
          value={story.description}
          onChange={(e) =>
            setStory((prev) => ({
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
