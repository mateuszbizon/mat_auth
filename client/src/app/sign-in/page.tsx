import SignInForm from '@/components/forms/SignInForm'
import React from 'react'

function SignInPage() {
  return (
    <div className='w-full max-w-[600px] mx-auto rounded-xl bg-card p-5 border-2 border-border'>
        <h1 className='text-2xl text-center text-primary'>Sign In</h1>
        <SignInForm />     
    </div>
  )
}

export default SignInPage