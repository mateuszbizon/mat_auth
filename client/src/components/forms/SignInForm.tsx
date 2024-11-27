"use client"

import React from 'react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { useForm } from 'react-hook-form'
import { signInSchema, TSignInSchema } from '@/validations/signInSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '../ui/button'
import useSignIn from '@/hooks/services/users/useSignIn'

function SignInForm() {
    const { handleSignIn, isPending } = useSignIn()
    const form = useForm<TSignInSchema>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            username: "",
            password: ""
        }
    })

    function onSubmit(data: TSignInSchema) {
        console.log('sent data')

        handleSignIn(data)
    }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type='password' placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
        />

        <Button type="submit" disabled={isPending}>{isPending ? "Submitting..." : "Submit"}</Button>
      </form>
    </Form>
  )
}

export default SignInForm