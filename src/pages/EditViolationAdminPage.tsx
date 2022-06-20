import { Button, Input, InputNumber, message, Switch, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { PageContainer } from '../components/ui/PageContainer'
import { IViolAdmin } from '../models/IViolAdmins'
import { routes } from '../routes'
import { useGetByIdQuery, useEditMutation } from '../services/ViolAdminsApi'
import { COLORS, SIZES } from '../theme'

export const EditViolationAdminPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { data } = useGetByIdQuery(id!)
  const [updateSViol, { isLoading }] = useEditMutation()
  const [viol, setViol] = useState<IViolAdmin>({
    name: '',
    min: 0,
    multy: 0,
    status: false,
  })

  useEffect(() => {
    if (data) {
      setViol(data)
    }
  }, [data])

  const handleSave = async () => {
    try {
      await updateSViol(viol)
      message.success('Збережено успішно!')
    } catch (e: any) {
      message.error(e.data.message as string)
    }
    navigate(`../${routes.STORIES_PAGE}`)
  }
  return (
    <PageContainer title='Змінити статтю'>
      <>
        <Typography.Text>Назва</Typography.Text>
        <Input
          style={{ margin: SIZES.margin }}
          value={viol.name}
          onChange={(e) =>
            setViol((prev) => ({
              ...prev,
              name: e.target.value,
            }))
          }
        />
        <Typography.Text>Неоподатковуваний мінімум</Typography.Text>
        <InputNumber
          style={{ margin: SIZES.margin }}
          value={viol.min}
          onChange={(value: number) =>
            setViol((prev) => ({
              ...prev,
              min: value,
            }))
          }
        />
        <br />
        <Typography.Text>Штраф (кількімть неоподатковуваних мінімумів)</Typography.Text>
        <InputNumber
          style={{ margin: SIZES.margin }}
          value={viol.multy}
          onChange={(value: number) =>
            setViol((prev) => ({
              ...prev,
              multy: value,
            }))
          }
        />{' '}
        <br />
        <Typography.Text>Чинна стаття?</Typography.Text>
        <Switch
          checked={viol.status}
          onChange={(value: boolean) =>
            setViol((prev) => ({
              ...prev,
              status: value,
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
