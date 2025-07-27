'use client'

import { useState } from 'react'

export default function DebugComponent() {
  const [showDebug, setShowDebug] = useState(false)

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setShowDebug(!showDebug)}
        className="bg-red-500 text-white px-3 py-2 rounded text-sm"
      >
        Debug
      </button>
      
      {showDebug && (
        <div className="absolute bottom-12 right-0 bg-white border border-gray-300 p-4 rounded shadow-lg w-80 max-h-96 overflow-y-auto">
          <h3 className="font-bold mb-2">Website Debug Info</h3>
          
          <div className="space-y-2 text-sm">
            <div>
              <strong>Viewport:</strong> {typeof window !== 'undefined' ? `${window.innerWidth}x${window.innerHeight}` : 'N/A'}
            </div>
            
            <div>
              <strong>User Agent:</strong> {typeof window !== 'undefined' ? window.navigator.userAgent.substring(0, 50) + '...' : 'N/A'}
            </div>
            
            <div>
              <strong>Local Storage:</strong>
              <ul className="pl-4">
                <li>hawlton-language: {typeof window !== 'undefined' ? localStorage.getItem('hawlton-language') || 'Not set' : 'N/A'}</li>
              </ul>
            </div>
            
            <div>
              <strong>Console Errors:</strong>
              <div className="text-xs text-red-600">
                Check browser console for any JavaScript errors
              </div>
            </div>
            
            <div>
              <strong>CSS Test:</strong>
              <div className="bg-primary-navy text-primary-white p-2 mt-2 rounded">
                This should be navy background with white text
              </div>
              <div className="bg-primary-gold text-primary-navy p-2 mt-1 rounded">
                This should be gold background with navy text
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
