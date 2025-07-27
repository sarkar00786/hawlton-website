/* Advanced Error Boundary Component for graceful error handling */
'use client'

import React, { Component, ReactNode, ErrorInfo } from 'react'
import { AlertTriangle, RefreshCw, Home, Mail, Bug } from 'lucide-react'
import Link from 'next/link'

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
        <div className="min-h-screen bg-primary-platinum flex items-center justify-center px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white rounded-xl shadow-lg p-8 space-y-6">
              {/* Error Icon */}
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                  <AlertTriangle className="w-8 h-8 text-red-600" />
                </div>
              </div>

              {/* Error Message */}
              <div className="space-y-3">
                <h1 className="text-2xl font-bold text-primary-navy">
                  Oops! Something went wrong
                </h1>
                <p className="text-primary-charcoal">
                  We encountered an unexpected error. Our team has been notified and is working to fix this issue.
                </p>
                {this.state.errorId && (
                  <p className="text-sm text-primary-silver">
                    Error ID: <code className="bg-gray-100 px-2 py-1 rounded">{this.state.errorId}</code>
                  </p>
                )}
              </div>

              {/* Error Details (Development only) */}
              {this.props.showDetails && process.env.NODE_ENV === 'development' && this.state.error && (
                <details className="text-left bg-gray-50 p-4 rounded-lg">
                  <summary className="cursor-pointer text-sm font-medium text-gray-700 mb-2">
                    <Bug className="inline w-4 h-4 mr-1" />
                    Error Details (Development Only)
                  </summary>
                  <div className="text-xs text-gray-600 space-y-2">
                    <div>
                      <strong>Message:</strong> {this.state.error.message}
                    </div>
                    {this.state.error.stack && (
                      <div>
                        <strong>Stack:</strong>
                        <pre className="whitespace-pre-wrap text-xs mt-1">
                          {this.state.error.stack}
                        </pre>
                      </div>
                    )}
                  </div>
                </details>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {this.retryCount < this.maxRetries && (
                  <button
                    onClick={this.handleRefresh}
                    className="inline-flex items-center gap-2 bg-primary-gold hover:bg-primary-gold/90 text-primary-navy px-6 py-3 font-semibold rounded-lg transition-colors duration-200"
                  >
                    <RefreshCw className="w-5 h-5" />
                    Try Again
                  </button>
                )}
                
                <button
                  onClick={this.handleReset}
                  className="inline-flex items-center gap-2 border-2 border-primary-navy text-primary-navy hover:bg-primary-navy hover:text-white px-6 py-3 font-semibold rounded-lg transition-colors duration-200"
                >
                  Reset Page
                </button>
                
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 bg-primary-navy hover:bg-primary-navy/90 text-white px-6 py-3 font-semibold rounded-lg transition-colors duration-200"
                >
                  <Home className="w-5 h-5" />
                  Go Home
                </Link>
              </div>

              {/* Support Link */}
              <div className="pt-4 border-t border-gray-200">
                <p className="text-sm text-primary-silver">
                  If this problem persists, please{' '}
                  <Link href="/contact" className="text-primary-gold hover:underline font-medium">
                    contact our support team
                  </Link>
                  {' '}with the error ID above.
                </p>
              </div>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
