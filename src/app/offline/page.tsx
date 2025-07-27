import { Metadata } from 'next'
import Link from 'next/link'
import { Wifi, WifiOff, ArrowLeft, RefreshCw } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Offline - Hawlton',
  description: 'You are currently offline. Please check your internet connection.',
  robots: 'noindex, nofollow'
}

export default function OfflinePage() {
  return (
    <div className="min-h-screen bg-gradient-navy flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Offline Icon Animation */}
        <div className="relative mb-8">
          <div className="w-24 h-24 mx-auto bg-primary-gold/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <WifiOff className="w-12 h-12 text-primary-gold animate-pulse" />
          </div>
          {/* Connection attempt animation */}
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-accent-secondary/30 rounded-full animate-ping"></div>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-heading font-bold text-primary-white mb-4">
          You&apos;re Offline
        </h1>

        {/* Description */}
        <p className="text-lg text-primary-silver mb-6 leading-relaxed">
          It looks like you&apos;ve lost your internet connection. Don&apos;t worry, some content may still be available.
        </p>

        {/* Connection Status */}
        <div className="bg-primary-navy/50 backdrop-blur-sm rounded-lg p-4 mb-6 border border-primary-gold/20">
          <div className="flex items-center justify-center space-x-3 mb-3">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-primary-silver">No Connection</span>
            </div>
          </div>
          
          {/* Retry Button */}
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center px-4 py-2 bg-primary-gold hover:bg-primary-gold/90 text-primary-navy font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </button>
        </div>

        {/* Available Actions */}
        <div className="space-y-4">
          <div className="text-sm text-primary-silver mb-4">
            While you&apos;re offline, you can:
          </div>
          
          <div className="grid gap-3">
            <Link
              href="/"
              className="flex items-center justify-center space-x-2 p-3 bg-primary-navy/30 hover:bg-primary-navy/50 rounded-lg transition-all duration-300 backdrop-blur-sm border border-primary-gold/10 hover:border-primary-gold/30"
            >
              <ArrowLeft className="w-4 h-4 text-primary-gold" />
              <span className="text-primary-white">Go to Homepage</span>
            </Link>
            
            <Link
              href="/about"
              className="flex items-center justify-center space-x-2 p-3 bg-primary-navy/30 hover:bg-primary-navy/50 rounded-lg transition-all duration-300 backdrop-blur-sm border border-primary-gold/10 hover:border-primary-gold/30"
            >
              <span className="text-primary-white">View About Us</span>
            </Link>
            
            <Link
              href="/contact"
              className="flex items-center justify-center space-x-2 p-3 bg-primary-navy/30 hover:bg-primary-navy/50 rounded-lg transition-all duration-300 backdrop-blur-sm border border-primary-gold/10 hover:border-primary-gold/30"
            >
              <span className="text-primary-white">Contact Information</span>
            </Link>
          </div>
        </div>

        {/* Tips Section */}
        <div className="mt-8 p-4 bg-primary-navy/30 rounded-lg backdrop-blur-sm border border-primary-gold/20">
          <h3 className="text-lg font-semibold text-primary-gold mb-3">
            Connection Tips
          </h3>
          <ul className="text-sm text-primary-silver space-y-2 text-left">
            <li>• Check your WiFi or mobile data connection</li>
            <li>• Make sure airplane mode is disabled</li>
            <li>• Try moving to a location with better signal</li>
            <li>• Restart your router if using WiFi</li>
          </ul>
        </div>

        {/* Branding */}
        <div className="mt-8 pt-6 border-t border-primary-gold/20">
          <div className="text-primary-gold font-heading font-bold text-xl mb-2">
            Hawlton
          </div>
          <p className="text-sm text-primary-silver">
            Empowering Pakistan&apos;s Digital Future
          </p>
        </div>
      </div>

      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-gold rounded-full mix-blend-multiply filter blur-xl opacity-5 animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-accent-secondary rounded-full mix-blend-multiply filter blur-xl opacity-5 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Online Detection Script */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.addEventListener('online', function() {
              window.location.reload();
            });
            
            // Check connection periodically
            setInterval(function() {
              if (navigator.onLine) {
                fetch('/', { method: 'HEAD', cache: 'no-cache' })
                  .then(function() {
                    window.location.reload();
                  })
                  .catch(function() {
                    // Still offline
                  });
              }
            }, 5000);
          `
        }}
      />
    </div>
  )
}
