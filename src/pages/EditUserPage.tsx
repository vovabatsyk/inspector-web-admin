import { Button, Input, message } from 'antd'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { PageContainer } from '../components/ui/PageContainer'
import { IUserData } from '../models/IUserData'
import { routes } from '../routes'
import { useGetUserQuery, useUpdateUserMutation } from '../services/UsersApi'
import { COLORS, SIZES } from '../theme'

export const EditUserPage = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [updateUser, { isLoading }] = useUpdateUserMutation()
  const { data } = useGetUserQuery(id!)
  const [user, setUser] = useState<IUserData>({
    banReason: '',
    banned: false,
    email: '',
    roles: [],
    username: '',
  })

  useEffect(() => {
    if (data) {
      setUser(data)
    }
  }, [data])

  const handleSave = async () => {
    try {
      await updateUser({
        id: user.id,
        username: user.username,
        email: user.email,
      })
      navigate(`../${routes.USERS_PAGE}`)
    } catch (e: any) {
      message.error(e)
    }
  }

  return (
    <PageContainer title='Змінити користувача'>
      <>
        <Input
          style={{ margin: SIZES.margin }}
          value={user.username}
          onChange={(e) =>
            setUser((prev) => ({
              ...prev,
              username: e.target.value,
            }))
          }
        />
        <Input
          style={{ margin: SIZES.margin }}
          value={user.email}
          onChange={(e) =>
            setUser((prev) => ({
              ...prev,
              email: e.target.value,
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
