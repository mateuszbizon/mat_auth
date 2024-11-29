"use client"

import { Button } from '@/components/ui/button'
import useGetUsers from '@/hooks/services/users/useGetUsers'
import { AppDispatch, RootState } from '@/lib/store'
import { decrement, increment, setValue } from '@/lib/store/slices/signInSlice'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'

function DashboardPage() {
    const { users, handleGetUsers, isPending } = useGetUsers()
    const counter = useSelector((state: RootState) => state.signIn)
    const dispatch = useDispatch<AppDispatch>()

    function onGetUsers() {
        handleGetUsers()
    }

  return (
    <div>
        <div className='flex flex-col items-center space-y-3 mb-10'>
            <div className='flex flex-wrap justify-center gap-5'>
                <Button onClick={() => dispatch(increment())}>
                    Increment
                </Button>

                <Button onClick={() => dispatch(decrement())}>
                    Decrement
                </Button>

                <Button onClick={() => dispatch(setValue(10))}>
                    Set value to 10
                </Button>
            </div>
            <span>{counter.value}</span>
        </div>
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