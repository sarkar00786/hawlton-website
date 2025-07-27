// Global type declarations for window objects

declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js' | 'consent',
      targetId: string | Date,
      config?: {
        page_path?: string
        event_category?: string
        event_label?: string
        value?: number
        analytics_storage?: 'granted' | 'denied'
        ad_storage?: 'granted' | 'denied'
        [key: string]: unknown
      }
    ) => void
    
    dataLayer: Record<string, unknown>[]
    
    Tawk_API?: {
      onLoad?: () => void
      onStatusChange?: (status: string) => void
      visitor?: {
        name?: string
        email?: string
      }
      [key: string]: unknown
    }
    
    Tawk_LoadStart?: Date
  }
}

export {}
