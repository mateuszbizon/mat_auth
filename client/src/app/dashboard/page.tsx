"use client"

import { Button } from '@/components/ui/button'
import useGetUsers from '@/hooks/services/users/useGetUsers'
import React from 'react'

function DashboardPage() {
    const { users, handleGetUsers, isPending } = useGetUsers()

    function onGetUsers() {
        handleGetUsers()
    }

  return (
    <div>
        <div className='flex justify-center'>
            <Button variant={"destructive"} onClick={onGetUsers}>
                {isPending ? "Loading..." : "Get users"}
            </Button>
        </div>
        {users && (
            <ul>
                {users.users.map(item => (
                    <li key={item.id}>
                        {item.username}
                    </li>
                ))}
            </ul>
        )}
    </div>
  )
}

export default DashboardPage