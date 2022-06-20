import { Button, Input, message, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { PageContainer } from '../components/ui/PageContainer'
import { IRole } from '../models/IRole'
import { IUserData } from '../models/IUserData'
import { routes } from '../routes'
import { useAddRoleMutation, useGetRolesQuery } from '../services/RoleApi'
import { useGetUserQuery, useUpdateUserMutation } from '../services/UsersApi'
import { COLORS, SIZES } from '../theme'

const { Option } = Select

export const EditUserPage = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [updateUser, { isLoading }] = useUpdateUserMutation()
  const { data } = useGetUserQuery(id!)
  const { data: rolesData } = useGetRolesQuery(150)
  const [addRole] = useAddRoleMutation()
  const [user, setUser] = useState<IUserData>({
    banReason: '',
    banned: false,
    email: '',
    roles: [],
    username: '',
  })
  const [roles, setRoles] = useState<IRole[]>([])
  const [role, setRole] = useState('')

  useEffect(() => {
    if (data) {
      setUser(data)
    }
    if (rolesData) {
      setRoles(rolesData)
    }
  }, [data, rolesData])

  const handleRoleChange = async (value: string) => {
    setRole(value)
  }

  const handleSave = async () => {
    try {
      await updateUser({
        id: user.id,
        username: user.username,
        email: user.email,
      })
      if (role) {
        await addRole({ value: role, userId: id })
      }

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
        {/* <Select defaultValue={''} style={{ width: 120 }} onChange={handleRoleChange}>
          {roles.map((role, idx) => (
            <Option key={idx} value={role.value}>
              {role.description}
            </Option>
          ))}
        </Select> */}
      </>
    </PageContainer>
  )
}
