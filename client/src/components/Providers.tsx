"use client"

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React, { PropsWithChildren } from 'react'

type ProvidersProps = PropsWithChildren

function Providers({ children }: ProvidersProps) {
    const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient} >
        {children}
    </QueryClientProvider>
  )
}

export default Providers