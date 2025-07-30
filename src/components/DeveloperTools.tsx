'use client'
import React from 'react'
import { useDeveloperHover } from '@/hooks/useDeveloperHover'
import DeveloperHoverTooltip from '@/components/ui/DeveloperHoverTooltip'

interface DeveloperToolsProps {
  children: React.ReactNode
  enabled?: boolean
}

const DeveloperTools: React.FC<DeveloperToolsProps> = ({ 
  children, 
  enabled = true 
}) => {
  const hoverInfo = useDeveloperHover(enabled)

  return (
    <>
      {children}
      <DeveloperHoverTooltip hoverInfo={hoverInfo} isDevelopmentMode={enabled} />
    </>
  )
}

export default DeveloperTools
