import { FC, ReactNode } from 'react'

interface LayautCreateProps {
    children: ReactNode
}

export const LayautCreate: FC<LayautCreateProps> = ({children}) => {

  return (
    <div className='container mx-auto p-4'>
        {children}
    </div>
  )
}
