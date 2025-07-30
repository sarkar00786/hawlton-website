/* Advanced Error Boundary Component for graceful error handling */
'use client'

import React, { Component, ReactNode, ErrorInfo } from 'react'
import { AlertTriangle, RefreshCw, Home, Mail, Bug } from 'lucide-react'
import Link from 'next/link'
import Button from './Button'

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
  onError?: (error: Error, errorInfo: ErrorInfo) => void
  showDetails?: boolean
}

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
  errorInfo?: ErrorInfo
  errorId?: string
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  private retryCount = 0
  private maxRetries = 3
  
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    const errorId = `error_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
    return { hasError: true, error, errorId }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
    
    // Call custom error handler
    this.props.onError?.(error, errorInfo)
    
    // Log to error reporting service in production
    if (process.env.NODE_ENV === 'production') {
      this.logErrorToService(error, errorInfo)
    }
    
    this.setState({ error, errorInfo })
  }

  private logErrorToService = (error: Error, errorInfo: ErrorInfo) => {
    const errorData = {
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      errorBoundary: 'Hawlton Error Boundary',
      timestamp: new Date().toISOString(),
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'Unknown',
      url: typeof window !== 'undefined' ? window.location.href : 'Unknown',
      errorId: this.state.errorId
    }
    
    // Log error (replace with your error logging service)
    fetch('/api/log-error', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(errorData)
    }).catch(console.error)
  }

  private handleRefresh = () => {
    this.retryCount++
    this.setState({ hasError: false, error: undefined, errorInfo: undefined })
    
    if (this.retryCount <= this.maxRetries) {
      window.location.reload()
    }
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined })
    this.retryCount = 0
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="bg-primary-navy on-dark-bg min-h-screen flex items-center justify-center p-4">
          <div className="max-w-2xl w-full mx-auto text-center bg-primary-navy/80 backdrop-blur-sm p-8 rounded-lg shadow-2xl border border-primary-gold/20">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-primary-gold/10 rounded-full flex items-center justify-center border-2 border-primary-gold/20">
                <AlertTriangle className="w-8 h-8 text-primary-gold" />
              </div>
            </div>
            <h1 className="h3 text-primary-white">Oops! Something Went Wrong</h1>
            <p className="text-primary-silver mt-4">We have encountered an unexpected error. Our team has been notified and is working diligently to resolve the issue.</p>
            {this.state.errorId && (
              <p className="text-sm text-primary-silver/70 mt-4">
                Error ID: <code className="bg-primary-charcoal/50 px-2 py-1 rounded-md">{this.state.errorId}</code>
              </p>
            )}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" onClick={this.handleReset}><RefreshCw className="mr-2 h-5 w-5"/>Reset Page</Button>
              <Link href="/"><Button><Home className="mr-2 h-5 w-5"/>Go Home</Button></Link>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children
  }
}

export default ErrorBoundary
