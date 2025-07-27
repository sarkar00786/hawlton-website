'use client'

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Loader2, Wifi, WifiOff } from 'lucide-react'

interface LoadingContext {
  globalLoading: boolean
  setGlobalLoading: (loading: boolean) => void
  connectionStatus: 'online' | 'offline' | 'checking'
  setConnectionStatus: (status: 'online' | 'offline' | 'checking') => void
  startLoading: (key: string) => void
  stopLoading: (key: string) => void
  isLoading: (key?: string) => boolean
}

const LoadingContext = createContext<LoadingContext | undefined>(undefined)

export const useLoading = () => {
  const context = useContext(LoadingContext)
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider')
  }
  return context
}

// Loading Provider Component
interface LoadingProviderProps {
  children: ReactNode
}

export const LoadingProvider: React.FC<LoadingProviderProps> = ({ children }) => {
  const [globalLoading, setGlobalLoading] = useState(false)
  const [loadingStates, setLoadingStates] = useState<Set<string>>(new Set())
  const [connectionStatus, setConnectionStatus] = useState<'online' | 'offline' | 'checking'>('online')

  const startLoading = useCallback((key: string) => {
    setLoadingStates(prev => new Set(prev).add(key))
  }, [])

  const stopLoading = useCallback((key: string) => {
    setLoadingStates(prev => {
      const newSet = new Set(prev)
      newSet.delete(key)
      return newSet
    })
  }, [])

  const isLoading = useCallback((key?: string) => {
    if (key) {
      return loadingStates.has(key)
    }
    return loadingStates.size > 0 || globalLoading
  }, [loadingStates, globalLoading])

  // Monitor connection status
  React.useEffect(() => {
    const handleOnline = () => setConnectionStatus('online')
    const handleOffline = () => setConnectionStatus('offline')

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  return (
    <LoadingContext.Provider value={{
      globalLoading,
      setGlobalLoading,
      connectionStatus,
      setConnectionStatus,
      startLoading,
      stopLoading,
      isLoading
    }}>
      {children}
      <GlobalLoadingIndicator />
      <ConnectionStatus />
    </LoadingContext.Provider>
  )
}

// Global Loading Overlay
const GlobalLoadingIndicator: React.FC = () => {
  const { globalLoading } = useLoading()

  return (
    <AnimatePresence>
      {globalLoading && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-white/80 backdrop-blur-sm flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="bg-white rounded-xl shadow-xl p-8 flex flex-col items-center space-y-4"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <Loader2 className="w-8 h-8 text-primary-gold" />
            </motion.div>
            <p className="text-primary-navy font-medium">Loading...</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Connection Status Indicator
const ConnectionStatus: React.FC = () => {
  const { connectionStatus } = useLoading()
  const [showStatus, setShowStatus] = useState(false)

  React.useEffect(() => {
    if (connectionStatus === 'offline') {
      setShowStatus(true)
    } else if (connectionStatus === 'online' && showStatus) {
      // Show "back online" briefly
      const timer = setTimeout(() => setShowStatus(false), 3000)
      return () => clearTimeout(timer)
    }
  }, [connectionStatus, showStatus])

  return (
    <AnimatePresence>
      {showStatus && (
        <motion.div
          className={`fixed top-4 right-4 z-50 px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2 ${
            connectionStatus === 'offline' 
              ? 'bg-red-500 text-white' 
              : 'bg-green-500 text-white'
          }`}
          initial={{ opacity: 0, y: -20, x: 20 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, y: -20, x: 20 }}
          transition={{ duration: 0.3 }}
        >
          {connectionStatus === 'offline' ? (
            <>
              <WifiOff className="w-4 h-4" />
              <span className="text-sm font-medium">No internet connection</span>
            </>
          ) : (
            <>
              <Wifi className="w-4 h-4" />
              <span className="text-sm font-medium">Back online</span>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Inline Loading Component
interface InlineLoadingProps {
  loading: boolean
  children: ReactNode
  skeleton?: ReactNode
  className?: string
}

export const InlineLoading: React.FC<InlineLoadingProps> = ({ 
  loading, 
  children, 
  skeleton,
  className = ''
}) => {
  return (
    <div className={`relative ${className}`}>
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {skeleton || <LoadingSkeleton />}
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Simple Loading Skeleton
const LoadingSkeleton: React.FC = () => (
  <div className="animate-pulse space-y-3">
    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
  </div>
)

// Button Loading State
interface LoadingButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean
  loadingText?: string
  children: ReactNode
}

export const LoadingButton: React.FC<LoadingButtonProps> = ({
  loading = false,
  loadingText = 'Loading...',
  children,
  disabled,
  className = '',
  ...props
}) => {
  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={`relative ${className} ${loading ? 'pointer-events-none' : ''}`}
    >
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center justify-center space-x-2"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <Loader2 className="w-4 h-4" />
            </motion.div>
            <span>{loadingText}</span>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  )
}

export default LoadingProvider
