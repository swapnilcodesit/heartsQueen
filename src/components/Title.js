"use client"
import { titles } from '@/utils/constants'
import { usePathname } from 'next/navigation'
import React from 'react'

const Title = () => {
    const pathName = usePathname()
  return (
   <h1 className="text-2xl font-bold">{titles[pathName.split("/")[1]]}</h1>
  )
}

export default Title