"use client"

import SignUpForm from '@/components/forms/SignUpForm'
import publicRoute from '@/components/publicRoute'
import React from 'react'

function SignUpPage() {
  return (
    <div className='w-full max-w-[600px] mx-auto rounded-xl bg-card p-5 border-2 border-border'>
        <h1 className='text-2xl text-center text-primary'>Sign Up</h1>
        <SignUpForm />
    </div>
  )
}

export default publicRoute(SignUpPage)