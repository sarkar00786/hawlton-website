// Hawlton Website Service Worker
// Advanced caching strategy for improved performance

const CACHE_NAME = 'hawlton-v1.2'
const urlsToCache = [
  '/',
  '/about',
  '/solutions',
  '/partner',
  '/invest',
  '/contact',
  '/careers',
  '/offline',
  // Static assets
  '/favicon.ico',
  '/manifest.json',
  // Add your key CSS and JS files here
  // These will be automatically updated when you build
]

// Dynamic cache patterns
const cachePatterns = {
  images: /\.(jpg|jpeg|png|gif|webp|svg)$/i,
  fonts: /\.(woff|woff2|ttf|eot)$/i,
  api: /^https:\/\/.*\.sanity\.io/,
  cdn: /^https:\/\/cdn\./
}

// Cache strategies
const STRATEGIES = {
  CACHE_FIRST: 'cache-first',
  NETWORK_FIRST: 'network-first', 
  STALE_WHILE_REVALIDATE: 'stale-while-revalidate'
}

// Install event - cache core resources
self.addEventListener('install', (event) => {
  console.log('[SW] Installing service worker...')
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Caching core resources')
        return cache.addAll(urlsToCache)
      })
      .then(() => {
        // Skip waiting to activate immediately
        return self.skipWaiting()
      })
      .catch((error) => {
        console.error('[SW] Cache installation failed:', error)
      })
  )
})

// Activate event - cleanup old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating service worker...')
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              console.log('[SW] Deleting old cache:', cacheName)
              return caches.delete(cacheName)
            }
          })
        )
      })
      .then(() => {
        // Take control of all pages immediately
        return self.clients.claim()
      })
  )
})

// Fetch event - handle requests with appropriate strategies
self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)
  
  // Skip non-HTTP requests
  if (!request.url.startsWith('http')) {
    return
  }

  // Skip if it's a Chrome extension request
  if (url.protocol === 'chrome-extension:') {
    return
  }

  event.respondWith(
    handleRequest(request)
  )
})

async function handleRequest(request) {
  const url = new URL(request.url)
  
  try {
    // API requests - Network first with cache fallback
    if (cachePatterns.api.test(request.url)) {
      return await networkFirstStrategy(request)
    }
    
    // Images - Cache first with network fallback
    if (cachePatterns.images.test(request.url)) {
      return await cacheFirstStrategy(request)
    }
    
    // Fonts - Cache first (they rarely change)
    if (cachePatterns.fonts.test(request.url)) {
      return await cacheFirstStrategy(request)
    }
    
    // CDN resources - Stale while revalidate
    if (cachePatterns.cdn.test(request.url)) {
      return await staleWhileRevalidateStrategy(request)
    }
    
    // Navigation requests (HTML pages)
    if (request.mode === 'navigate') {
      return await navigationStrategy(request)
    }
    
    // Default to stale while revalidate for other requests
    return await staleWhileRevalidateStrategy(request)
    
  } catch (error) {
    console.error('[SW] Request handling failed:', error)
    
    // Return offline page for navigation requests
    if (request.mode === 'navigate') {
      const offlineResponse = await caches.match('/offline')
      return offlineResponse || new Response('Offline', { status: 503 })
    }
    
    // Return error response for other requests
    return new Response('Service Unavailable', { status: 503 })
  }
}

// Cache first strategy - check cache first, then network
async function cacheFirstStrategy(request) {
  const cachedResponse = await caches.match(request)
  
  if (cachedResponse) {
    return cachedResponse
  }
  
  try {
    const networkResponse = await fetch(request)
    
    if (networkResponse.ok) {
      const cache = await caches.open(CACHE_NAME)
      // Clone the response because it can only be consumed once
      cache.put(request, networkResponse.clone())
    }
    
    return networkResponse
  } catch (error) {
    console.log('[SW] Network request failed, no cache available:', error)
    throw error
  }
}

// Network first strategy - try network first, fallback to cache
async function networkFirstStrategy(request) {
  try {
    const networkResponse = await fetch(request)
    
    if (networkResponse.ok) {
      const cache = await caches.open(CACHE_NAME)
      cache.put(request, networkResponse.clone())
    }
    
    return networkResponse
  } catch (error) {
    console.log('[SW] Network failed, trying cache:', error)
    const cachedResponse = await caches.match(request)
    
    if (cachedResponse) {
      return cachedResponse
    }
    
    throw error
  }
}

// Stale while revalidate - return cached version immediately, update in background
async function staleWhileRevalidateStrategy(request) {
  const cachedPromise = caches.match(request)
  const networkPromise = fetch(request).then(async (networkResponse) => {
    if (networkResponse.ok) {
      const cache = await caches.open(CACHE_NAME)
      cache.put(request, networkResponse.clone())
    }
    return networkResponse
  }).catch(() => null)
  
  const cachedResponse = await cachedPromise
  
  if (cachedResponse) {
    // Return cached version immediately
    // Network update happens in background
    networkPromise
    return cachedResponse
  }
  
  // If no cache, wait for network
  const networkResponse = await networkPromise
  if (networkResponse) {
    return networkResponse
  }
  
  throw new Error('No cached response and network failed')
}

// Navigation strategy - special handling for page navigation
async function navigationStrategy(request) {
  try {
    // Try network first for navigation
    const networkResponse = await fetch(request)
    
    if (networkResponse.ok) {
      const cache = await caches.open(CACHE_NAME)
      // Cache successful navigation responses
      cache.put(request, networkResponse.clone())
    }
    
    return networkResponse
  } catch (error) {
    console.log('[SW] Navigation network failed, trying cache:', error)
    
    // Check for cached version
    const cachedResponse = await caches.match(request)
    if (cachedResponse) {
      return cachedResponse
    }
    
    // Check for root page cache if specific page isn't cached
    const rootResponse = await caches.match('/')
    if (rootResponse) {
      return rootResponse
    }
    
    // Return offline page as last resort
    const offlineResponse = await caches.match('/offline')
    return offlineResponse || new Response('You are offline', {
      status: 503,
      headers: { 'Content-Type': 'text/html' }
    })
  }
}

// Background sync for form submissions when online
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    console.log('[SW] Background sync triggered')
    event.waitUntil(handleBackgroundSync())
  }
})

async function handleBackgroundSync() {
  // Handle queued form submissions when back online
  // This would integrate with your form submission logic
  console.log('[SW] Processing background sync tasks...')
}

// Push notification handling (if needed)
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json()
    
    const options = {
      body: data.body,
      icon: '/icon-192x192.png',
      badge: '/icon-72x72.png',
      vibrate: [200, 100, 200],
      tag: 'hawlton-notification',
      actions: [
        {
          action: 'view',
          title: 'View',
          icon: '/icon-view.png'
        },
        {
          action: 'close',
          title: 'Close',
          icon: '/icon-close.png'
        }
      ]
    }
    
    event.waitUntil(
      self.registration.showNotification(data.title, options)
    )
  }
})

// Notification click handling
self.addEventListener('notificationclick', (event) => {
  event.notification.close()
  
  if (event.action === 'view') {
    event.waitUntil(
      clients.openWindow('https://hawlton.com')
    )
  }
})

// Performance monitoring
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }
  
  if (event.data && event.data.type === 'GET_CACHE_STATS') {
    getCacheStats().then(stats => {
      event.ports[0].postMessage(stats)
    })
  }
})

async function getCacheStats() {
  const cacheNames = await caches.keys()
  const stats = {
    cacheNames,
    totalCaches: cacheNames.length,
    currentCache: CACHE_NAME
  }
  
  for (const cacheName of cacheNames) {
    const cache = await caches.open(cacheName)
    const keys = await cache.keys()
    stats[cacheName] = keys.length
  }
  
  return stats
}
