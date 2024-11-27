"use client"

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React, { PropsWithChildren } from 'react'
import { Provider } from 'react-redux'
import { store } from '@/lib/store'

type ProvidersProps = PropsWithChildren

function Providers({ children }: ProvidersProps) {
    const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient} >
      <Provider store={store} >
        {children}
      </Provider>
    </QueryClientProvider>
  )
}

export default Providers