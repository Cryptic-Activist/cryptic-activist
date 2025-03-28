'use client'
'use client'
import { useStore } from '@nanostores/react'
import { useEffect } from 'react'

import {
  admin,
  decodeAccessToken as handleDecodeAccessToken,
  handleLoginAdmin
} from '@/stores/admin'
import { type CreateUserParams } from './types'

let counter: number = 0

const useUsers = () => {
  const $admin = useStore(admin)

  const loginAdmin = async (data: CreateUserParams) => {
    const hasLoggedIn = await handleLoginAdmin(data)
    return hasLoggedIn
  }

  useEffect(() => {
    const decodeAccessToken = async () => {
      await handleDecodeAccessToken()
    }

    if (counter === 0) {
      const decoded = decodeAccessToken().catch()
      counter += 1
    }
  }, [])

  return { loginAdmin, handleDecodeAccessToken, admin: $admin }
}

export default useUsers
