'use client'
import { useEffect, useState } from 'react'

interface HoverInfo {
  elementId: string
  elementType: string
  position: { x: number; y: number }
  visible: boolean
}

export const useDeveloperHover = (isDevelopmentMode: boolean = true) => {
  const [hoverInfo, setHoverInfo] = useState<HoverInfo>({
    elementId: '',
    elementType: '',
    position: { x: 0, y: 0 },
    visible: false
  })
  const [currentElement, setCurrentElement] = useState<{ id: string; type: string }>({ id: '', type: '' })

  useEffect(() => {
    if (!isDevelopmentMode) return

    const handleMouseOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (!target) return

      const elementId = target.id || target.getAttribute('data-element-id') || generateElementId(target)
      const elementType = getElementType(target)

      setCurrentElement({ id: elementId, type: elementType })
      setHoverInfo({
        elementId,
        elementType,
        position: { x: event.clientX + 10, y: event.clientY - 30 },
        visible: true
      })
    }

    const handleMouseMove = (event: MouseEvent) => {
      setHoverInfo(prev => ({
        ...prev,
        position: { x: event.clientX + 10, y: event.clientY - 30 }
      }))
    }

    const handleMouseOut = () => {
      setHoverInfo(prev => ({ ...prev, visible: false }))
    }

    const copyElementDetails = async () => {
      const detailsText = `Type: ${currentElement.type}\nID: ${currentElement.id}`
      try {
        await navigator.clipboard.writeText(detailsText)
        console.log(`Copied element details to clipboard:\n${detailsText}`)
        // Show visual feedback
        const tooltip = document.querySelector('[data-developer-tooltip]')
        if (tooltip) {
          tooltip.classList.add('copied-feedback')
          setTimeout(() => tooltip.classList.remove('copied-feedback'), 1000)
        }
        return true
      } catch (err) {
        console.error('Failed to copy element details:', err)
        return false
      }
    }

    const handleKeyDown = async (event: KeyboardEvent) => {
      if (event.altKey && event.key === 'c') {
        event.preventDefault()
        await copyElementDetails()
      }
    }

    // Add event listeners to all elements
    document.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseout', handleMouseOut)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseout', handleMouseOut)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isDevelopmentMode, currentElement])

  return hoverInfo
}

// Global counter for generating unique short IDs
let elementCounter = 1
const elementIdMap = new Map<HTMLElement, string>()

const generateElementId = (element: HTMLElement): string => {
  // Return existing ID if already generated for this element
  if (elementIdMap.has(element)) {
    return elementIdMap.get(element)!
  }

  const className = element.className
  const tagName = element.tagName.toLowerCase()
  
  let prefix = ''
  
  // Check for specific patterns and assign short prefixes
  if (className.includes('hero')) prefix = 'hero'
  else if (className.includes('button') || tagName === 'button') prefix = 'btn'
  else if (className.includes('card')) prefix = 'card'
  else if (className.includes('section')) prefix = 'sec'
  else if (tagName === 'h1') prefix = 'h1'
  else if (tagName === 'h2') prefix = 'h2'
  else if (tagName === 'h3') prefix = 'h3'
  else if (tagName === 'h4') prefix = 'h4'
  else if (tagName === 'h5') prefix = 'h5'
  else if (tagName === 'h6') prefix = 'h6'
  else if (tagName === 'p') prefix = 'p'
  else if (tagName === 'div') prefix = 'div'
  else if (tagName === 'span') prefix = 'span'
  else if (tagName === 'a') prefix = 'link'
  else if (tagName === 'img') prefix = 'img'
  else if (tagName === 'svg') prefix = 'icon'
  else if (tagName === 'nav') prefix = 'nav'
  else if (tagName === 'header') prefix = 'hdr'
  else if (tagName === 'footer') prefix = 'ftr'
  else if (tagName === 'main') prefix = 'main'
  else if (tagName === 'aside') prefix = 'side'
  else if (tagName === 'article') prefix = 'art'
  else if (tagName === 'form') prefix = 'form'
  else if (tagName === 'input') prefix = 'inp'
  else if (tagName === 'textarea') prefix = 'txt'
  else if (tagName === 'select') prefix = 'sel'
  else if (tagName === 'ul' || tagName === 'ol') prefix = 'list'
  else if (tagName === 'li') prefix = 'item'
  else prefix = 'el'
  
  const shortId = `${prefix}${elementCounter}`
  elementCounter++
  
  // Store the mapping
  elementIdMap.set(element, shortId)
  
  return shortId
}

const getElementType = (element: HTMLElement): string => {
  const tagName = element.tagName.toLowerCase()
  const className = element.className
  
  if (className.includes('section')) return 'Section'
  if (className.includes('hero')) return 'Hero Element'
  if (className.includes('card')) return 'Card'
  if (className.includes('button') || tagName === 'button') return 'Button'
  if (className.includes('nav')) return 'Navigation'
  if (className.includes('footer')) return 'Footer'
  if (className.includes('header')) return 'Header'
  if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(tagName)) return 'Heading'
  if (tagName === 'p') return 'Paragraph'
  if (tagName === 'div') return 'Container'
  if (tagName === 'span') return 'Text Element'
  if (tagName === 'a') return 'Link'
  if (tagName === 'img') return 'Image'
  if (tagName === 'svg') return 'Icon'
  if (tagName === 'section') return 'Section'
  if (tagName === 'article') return 'Article'
  if (tagName === 'aside') return 'Sidebar'
  if (tagName === 'main') return 'Main Content'
  
  return `${tagName.charAt(0).toUpperCase()}${tagName.slice(1)} Element`
}
