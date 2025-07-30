'use client'

import React, { forwardRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Eye, EyeOff, AlertCircle, Check } from 'lucide-react'

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string
  error?: string
  success?: string
  hint?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'outline' | 'ghost'
  isLoading?: boolean
  showPasswordToggle?: boolean
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({
    className,
    type = 'text',
    label,
    error,
    success,
    hint,
    leftIcon: LeftIcon,
    rightIcon: RightIcon,
    size = 'md',
    showPasswordToggle = false,
    ...props
  }, ref) => {
    const [showPassword, setShowPassword] = useState(false)
    const inputType = showPasswordToggle && showPassword ? 'text' : type

    const sizeClasses = {
      sm: 'px-3 py-2 text-sm',
      md: 'px-4 py-3 text-base',
      lg: 'px-5 py-3.5 text-lg',
    }

    const baseClasses = cn(
      'w-full bg-white border rounded-md transition-all duration-200 ease-in-out',
      'focus:outline-none focus:ring-2 focus:ring-primary-gold/50',
      (error) ? 'border-error' : 'border-primary-silver',
      (success) ? 'border-success' : 'border-primary-silver',
      sizeClasses[size],
      LeftIcon ? 'pl-10' : '',
      RightIcon || showPasswordToggle ? 'pr-10' : '',
      className
    );

    return (
      <div className="w-full space-y-2">
        {label && <label className="block text-sm font-medium text-primary-charcoal">{label}</label>}
        <div className="relative">
          {LeftIcon && <div className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-primary-silver">{LeftIcon}</div>}
          <input ref={ref} type={inputType} className={baseClasses} {...props} />
          {showPasswordToggle && (
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2">
              {showPassword ? <EyeOff className="h-5 w-5 text-primary-silver" /> : <Eye className="h-5 w-5 text-primary-silver" />}
            </button>
          )}
          {RightIcon && !showPasswordToggle && <div className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-primary-silver">{RightIcon}</div>}
        </div>
        {error && <p className="text-sm text-error flex items-center gap-1"><AlertCircle className="w-4 h-4" />{error}</p>}
        {success && <p className="text-sm text-success flex items-center gap-1"><Check className="w-4 h-4" />{success}</p>}
        {hint && !error && !success && <p className="text-sm text-primary-silver">{hint}</p>}
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input
