'use client'
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Copy, Check } from 'lucide-react'

interface HoverInfo {
  elementId: string
  elementType: string
  position: { x: number; y: number }
  visible: boolean
}

interface DeveloperHoverTooltipProps {
  hoverInfo: HoverInfo
  isDevelopmentMode?: boolean
}

export const DeveloperHoverTooltip: React.FC<DeveloperHoverTooltipProps> = ({ 
  hoverInfo, 
  isDevelopmentMode = true 
}) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation()
    try {
      await navigator.clipboard.writeText(hoverInfo.elementId)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  if (!isDevelopmentMode || !hoverInfo.visible) return null

  return (
    <AnimatePresence>
      {hoverInfo.visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
          className="fixed z-[9999] pointer-events-none"
          style={{
            left: hoverInfo.position.x,
            top: hoverInfo.position.y,
          }}
        >
          <div className="bg-gray-900 text-white px-3 py-2 rounded-lg shadow-lg border border-gray-700 max-w-xs pointer-events-auto">
            <div className="flex items-center justify-between gap-2">
              <div className="text-xs font-mono flex-1">
                <div className="text-yellow-400 font-semibold mb-1">
                  {hoverInfo.elementType}
                </div>
                <div className="text-green-400 break-all mb-1">
                  ID: {hoverInfo.elementId}
                </div>
                <div className="text-gray-400 text-[10px]">
                  Press Ctrl+C to copy
                </div>
              </div>
              <button
                onClick={handleCopy}
                className="flex-shrink-0 p-1 hover:bg-gray-700 rounded transition-colors duration-200 text-gray-300 hover:text-white"
                title="Copy ID"
              >
                {copied ? (
                  <Check className="w-3 h-3 text-green-400" />
                ) : (
                  <Copy className="w-3 h-3" />
                )}
              </button>
            </div>
            <div className="absolute -bottom-1 left-4 w-2 h-2 bg-gray-900 transform rotate-45 border-r border-b border-gray-700"></div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default DeveloperHoverTooltip
