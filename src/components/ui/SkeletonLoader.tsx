'use client'

import React from 'react'

interface SkeletonProps {
  className?: string
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded'
  width?: string | number
  height?: string | number
  lines?: number
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  variant = 'rectangular',
  width,
  height,
  lines = 1
}) => {
  const baseClasses = 'animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%]'
  
  const variantClasses = {
    text: 'h-4 rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-none',
    rounded: 'rounded-lg'
  }

  const style = {
    width: width || (variant === 'circular' ? height : '100%'),
    height: height || (variant === 'text' ? '1rem' : '100%'),
    animationDelay: `${Math.random() * 0.5}s`
  }

  if (variant === 'text' && lines > 1) {
    return (
      <div className={`space-y-2 ${className}`}>
        {Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            className={`${baseClasses} ${variantClasses[variant]}`}
            style={{
              ...style,
              width: index === lines - 1 ? '75%' : '100%',
              animationDelay: `${index * 0.1}s`
            }}
          />
        ))}
      </div>
    )
  }

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      style={style}
    />
  )
}

// Specialized skeleton components
export const CardSkeleton: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`bg-white p-6 rounded-xl shadow-sm ${className}`}>
    <div className="flex items-center space-x-4 mb-4">
      <Skeleton variant="circular" width={48} height={48} />
      <div className="flex-1">
        <Skeleton variant="text" width="60%" height={16} />
        <Skeleton variant="text" width="40%" height={14} />
      </div>
    </div>
    <Skeleton variant="text" lines={3} />
  </div>
)

export const HeroSkeleton: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`bg-primary-navy py-24 ${className}`}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <div className="space-y-8">
        <Skeleton variant="rounded" width="200px" height="32px" className="mx-auto bg-gray-600" />
        <div className="space-y-4">
          <Skeleton variant="text" width="80%" height="64px" className="mx-auto bg-gray-600" />
          <Skeleton variant="text" width="70%" height="64px" className="mx-auto bg-gray-600" />
        </div>
        <Skeleton variant="text" lines={2} className="max-w-3xl mx-auto bg-gray-600" />
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Skeleton variant="rounded" width="240px" height="48px" className="bg-gray-600" />
          <Skeleton variant="rounded" width="240px" height="48px" className="bg-gray-600" />
        </div>
      </div>
    </div>
  </div>
)

export const NavigationSkeleton: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`bg-primary-navy shadow-lg ${className}`}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-16">
        <div className="flex items-center space-x-8">
          <Skeleton variant="text" width="120px" height="32px" className="bg-gray-600" />
          <div className="hidden md:flex space-x-8">
            {Array.from({ length: 6 }).map((_, index) => (
              <Skeleton key={index} variant="text" width="80px" height="20px" className="bg-gray-600" />
            ))}
          </div>
        </div>
        <div className="hidden md:flex items-center space-x-2">
          <Skeleton variant="rounded" width="80px" height="32px" className="bg-gray-600" />
          <Skeleton variant="rounded" width="80px" height="32px" className="bg-gray-600" />
          <Skeleton variant="rounded" width="100px" height="32px" className="bg-gray-600" />
        </div>
      </div>
    </div>
  </div>
)

export default Skeleton
