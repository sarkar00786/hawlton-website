'use client'

import { useEffect, useRef } from 'react'
import videojs from 'video.js'
import 'video.js/dist/video-js.css'

interface VideoPlayerProps {
  src: string
  poster?: string
  title?: string
  className?: string
  autoplay?: boolean
  controls?: boolean
  width?: number
  height?: number
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  src,
  poster,
  title,
  className = '',
  autoplay = false,
  controls = true,
  width = 640,
  height = 360
}) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const playerRef = useRef<ReturnType<typeof videojs> | null>(null)

  useEffect(() => {
    if (videoRef.current && !playerRef.current) {
      const player = videojs(videoRef.current, {
        controls,
        autoplay,
        preload: 'auto',
        width,
        height,
        fluid: true,
        responsive: true,
        poster,
        html5: {
          vhs: {
            overrideNative: true
          }
        },
        // Custom Hawlton theme
        theme: 'hawlton',
        playbackRates: [0.5, 1, 1.25, 1.5, 2],
        plugins: {
          // Add analytics tracking if needed
        }
      })

      // Custom styling for Hawlton brand
      player.ready(() => {
        const controlBar = player.controlBar
        
        // Customize control bar colors
        if (controlBar && controlBar.el()) {
          controlBar.el().style.background = 'linear-gradient(90deg, rgba(26, 35, 126, 0.9) 0%, rgba(26, 35, 126, 0.7) 100%)'
          controlBar.el().style.backdropFilter = 'blur(10px)'
        }

        // Add custom CSS for Hawlton theme
        const style = document.createElement('style')
        style.textContent = `
          .video-js.hawlton-theme .vjs-big-play-button {
            background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
            border: 2px solid #FFD700;
            border-radius: 50%;
            width: 80px;
            height: 80px;
            line-height: 78px;
            font-size: 24px;
            color: #1a237e;
            transition: all 0.3s ease;
          }
          
          .video-js.hawlton-theme .vjs-big-play-button:hover {
            background: linear-gradient(135deg, #FFA500 0%, #FFD700 100%);
            transform: scale(1.1);
            box-shadow: 0 0 20px rgba(255, 215, 0, 0.5);
          }
          
          .video-js.hawlton-theme .vjs-control-bar {
            background: linear-gradient(90deg, rgba(26, 35, 126, 0.9) 0%, rgba(26, 35, 126, 0.7) 100%);
            backdrop-filter: blur(10px);
            border-radius: 8px 8px 0 0;
          }
          
          .video-js.hawlton-theme .vjs-play-progress {
            background: linear-gradient(90deg, #FFD700 0%, #FFA500 100%);
          }
          
          .video-js.hawlton-theme .vjs-volume-level {
            background: linear-gradient(90deg, #FFD700 0%, #FFA500 100%);
          }
          
          .video-js.hawlton-theme .vjs-control:focus,
          .video-js.hawlton-theme .vjs-control:hover {
            color: #FFD700;
            text-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
          }
          
          .video-js.hawlton-theme .vjs-loading-spinner {
            border-color: #FFD700 transparent transparent transparent;
          }
        `
        document.head.appendChild(style)
      })

      // Analytics tracking (if needed)
      player.on('play', () => {
        // Track video play event
        if (typeof window !== 'undefined' && 'gtag' in window) {
          (window as any).gtag('event', 'video_play', {
            event_category: 'Video Engagement',
            event_label: title || src,
            video_title: title
          })
        }
      })

      player.on('ended', () => {
        // Track video completion
        if (typeof window !== 'undefined' && 'gtag' in window) {
          (window as any).gtag('event', 'video_complete', {
            event_category: 'Video Engagement',
            event_label: title || src,
            video_title: title
          })
        }
      })

      player.on('timeupdate', () => {
        const currentTime = player.currentTime()
        const duration = player.duration()
        const percentWatched = (currentTime / duration) * 100

        // Track 25%, 50%, 75% completion
        if (percentWatched >= 25 && !(player as any).hasTracked25) {
          (player as any).hasTracked25 = true
          if (typeof window !== 'undefined' && 'gtag' in window) {
            (window as any).gtag('event', 'video_progress', {
              event_category: 'Video Engagement',
              event_label: title || src,
              video_title: title,
              progress: '25%'
            })
          }
        }
        // Similar for 50% and 75%
      })

      playerRef.current = player
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.dispose()
        playerRef.current = null
      }
    }
  }, [src, autoplay, controls, width, height, poster, title])

  return (
    <div className={`video-player-container hawlton-video ${className}`}>
      {title && (
        <h3 className="text-lg font-semibold text-primary-white mb-4 px-1">
          {title}
        </h3>
      )}
      <div className="relative rounded-lg overflow-hidden shadow-2xl">
        <video
          ref={videoRef}
          className="video-js vjs-default-skin hawlton-theme w-full"
          data-setup="{}"
          playsInline
        >
          <source src={src} type="video/mp4" />
          <p className="vjs-no-js text-primary-silver text-center py-8">
            To view this video please enable JavaScript, and consider upgrading to a web browser that{' '}
            <a 
              href="https://videojs.com/html5-video-support/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary-gold hover:underline"
            >
              supports HTML5 video
            </a>.
          </p>
        </video>
      </div>
      
      {/* Video Description/Controls */}
      <div className="mt-4 flex items-center justify-between text-sm text-primary-silver">
        <div className="flex items-center space-x-4">
          <span className="flex items-center space-x-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
              <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
            </svg>
            <span>HD Quality</span>
          </span>
          <span className="flex items-center space-x-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.793L4.59 13.467H2a1 1 0 01-1-1V7.533a1 1 0 011-1h2.59l3.793-3.326a1 1 0 011.617.793z" clipRule="evenodd"/>
            </svg>
            <span>Optimized Audio</span>
          </span>
        </div>
        <div className="text-xs text-primary-silver/70">
          Powered by Hawlton Media
        </div>
      </div>
    </div>
  )
}

export default VideoPlayer
