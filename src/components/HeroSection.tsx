'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, TrendingUp, Users, Globe, Sparkles, Building2, Target, Shield } from 'lucide-react'
import Button from './ui/Button'
import { useScrollAnimation, useStaggerAnimation } from '@/lib/hooks'

const HeroSection = () => {
  const { ref: heroRef, inView } = useScrollAnimation(0.2)
  const staggerAnimation = useStaggerAnimation(0.15)

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center bg-gradient-navy text-text-primary overflow-hidden"
    >
      {/* Dynamic Background Pattern - Exactly as per blueprint */}
      <div className="absolute inset-0 opacity-10">
        <motion.div 
          className="absolute top-20 left-20 w-96 h-96 bg-gradient-gold rounded-full mix-blend-multiply filter blur-xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
        <motion.div 
          className="absolute top-40 right-20 w-80 h-80 bg-accent-secondary rounded-full mix-blend-multiply filter blur-xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2
          }}
        />
        <motion.div 
          className="absolute -bottom-8 left-40 w-72 h-72 bg-gradient-gold rounded-full mix-blend-multiply filter blur-xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.15, 0.35, 0.15],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 4
          }}
        />
      </div>

      {/* Subtle geometric patterns as per blueprint */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2">
          <motion.div
            className="w-48 h-48 border border-accent-primary"
            style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          />
        </div>
        <div className="absolute bottom-1/4 right-1/4 transform translate-x-1/2 translate-y-1/2">
          <motion.div
            className="w-32 h-32 border border-accent-secondary rounded-full"
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, -360]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
          />
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content - Following blueprint exactly */}
          <motion.div 
            className="text-center lg:text-left space-y-8"
            variants={staggerAnimation.container}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            {/* Headline as per blueprint */}
            <motion.div variants={staggerAnimation.item}>
              <motion.h1 
                className="text-6xl lg:text-7xl xl:text-8xl font-heading font-bold leading-tight tracking-tight"
                style={{
                  background: 'linear-gradient(135deg, #FFFFFF 0%, #FFD700 50%, #FFFFFF 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                Hawlton: Empowering Pakistan&apos;s{' '}
                <motion.span 
                  className="inline-block text-accent-primary font-black"
                  animate={{
                    textShadow: [
                      '0 0 10px rgba(255, 215, 0, 0.3)',
                      '0 0 20px rgba(255, 215, 0, 0.5)',
                      '0 0 10px rgba(255, 215, 0, 0.3)'
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  Digital Future
                </motion.span>
              </motion.h1>
            </motion.div>
            
            {/* Tagline as per blueprint */}
            <motion.div variants={staggerAnimation.item}>
              <p className="text-xl lg:text-2xl text-text-muted leading-relaxed font-medium">
                Partner. Invest. Grow.
              </p>
            </motion.div>

            {/* Sub-tagline as per blueprint */}
            <motion.div variants={staggerAnimation.item}>
              <p className="text-lg text-text-muted leading-relaxed">
                Catalyzing National Digital Transformation through Strategic Partnerships & Impactful Investment.
              </p>
            </motion.div>

            {/* Sub-text as per blueprint */}
            <motion.div variants={staggerAnimation.item}>
              <p className="text-lg lg:text-xl text-text-light leading-relaxed max-w-2xl">
                Hawlton transforms traditional enterprises into digital powerhouses and offers unparalleled opportunities for those investing in Pakistan&apos;s vibrant growth story.
              </p>
            </motion.div>

            {/* Trust Indicators as per blueprint */}
            <motion.div 
              variants={staggerAnimation.item}
              className="flex flex-wrap gap-6 justify-center lg:justify-start items-center"
            >
              <div className="flex items-center gap-2 text-accent-primary">
                <Sparkles className="w-5 h-5" />
                <span className="text-sm font-medium text-text-light">Pioneering Excellence</span>
              </div>
              <div className="flex items-center gap-2 text-accent-primary">
                <Building2 className="w-5 h-5" />
                <span className="text-sm font-medium text-text-light">Enterprise Ready</span>
              </div>
              <div className="flex items-center gap-2 text-accent-primary">
                <Target className="w-5 h-5" />
                <span className="text-sm font-medium text-text-light">Results Driven</span>
              </div>
            </motion.div>

            {/* Primary CTAs (Split) as per blueprint */}
            <motion.div 
              variants={staggerAnimation.item}
              className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start"
            >
              <Link href="/partner">
                <Button 
                  variant="primary"
                  size="lg"
                  icon={ArrowRight}
                  iconPosition="right"
                  className="transform hover:scale-105 transition-all duration-300 shadow-glow-gold"
                >
                  Partner With Us
                </Button>
              </Link>
              
              <Link href="/invest">
                <Button 
                  variant="secondary"
                  size="lg"
                  icon={TrendingUp}
                  iconPosition="right"
                  className="transform hover:scale-105 transition-all duration-300"
                >
                  Invest With Us
                </Button>
              </Link>
            </motion.div>

            {/* Sub-text as per blueprint */}
            <motion.div variants={staggerAnimation.item}>
              <p className="text-sm text-text-muted italic max-w-lg">
                &quot;Connect with our team to explore how Hawlton can empower your national expansion or secure your impactful investment.&quot;
              </p>
            </motion.div>
          </motion.div>

          {/* Right Content - Enhanced Digital Network Visualization as per blueprint */}
          <motion.div 
            className="relative flex items-center justify-center"
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative w-full h-[500px] lg:h-[600px] flex items-center justify-center">
              {/* Central Pakistan Hub with Pakistan map suggestion */}
              <motion.div 
                className="absolute w-24 h-24 bg-gradient-gold rounded-full flex items-center justify-center z-20 shadow-glow-gold"
                animate={{ 
                  scale: [1, 1.1, 1],
                  boxShadow: [
                    '0 0 20px rgba(255, 215, 0, 0.3)',
                    '0 0 40px rgba(255, 215, 0, 0.6)',
                    '0 0 20px rgba(255, 215, 0, 0.3)'
                  ]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity,
                  ease: "easeInOut" 
                }}
              >
                <Globe className="w-12 h-12 text-primary-navy" />
              </motion.div>
              
              {/* Connection Lines representing digital networks */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400">
                {[...Array(6)].map((_, i) => {
                  const angle = (i * 60) * Math.PI / 180
                  const x1 = 200
                  const y1 = 200
                  const x2 = 200 + 140 * Math.cos(angle)
                  const y2 = 200 + 140 * Math.sin(angle)
                  
                  return (
                    <motion.line
                      key={i}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke="#FFD700"
                      strokeWidth="2"
                      opacity="0.4"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ 
                        duration: 2, 
                        delay: i * 0.3,
                        ease: "easeInOut"
                      }}
                    />
                  )
                })}
              </svg>
              
              {/* Orbital Business Nodes representing collaboration */}
              {[
                { icon: Building2, label: 'Enterprise', color: 'accent-primary' },
                { icon: Users, label: 'Partners', color: 'accent-secondary' },
                { icon: TrendingUp, label: 'Growth', color: 'accent-primary' },
                { icon: Target, label: 'Results', color: 'accent-secondary' },
                { icon: Sparkles, label: 'Innovation', color: 'accent-primary' },
                { icon: Shield, label: 'Security', color: 'accent-secondary' }
              ].map((node, i) => {
                const angle = (i * 60) * Math.PI / 180
                const radius = 140
                
                return (
                  <motion.div
                    key={i}
                    className={`absolute w-16 h-16 bg-${node.color} rounded-full flex items-center justify-center shadow-lg z-10`}
                    style={{
                      left: `calc(50% + ${radius * Math.cos(angle)}px - 2rem)`,
                      top: `calc(50% + ${radius * Math.sin(angle)}px - 2rem)`,
                    }}
                    animate={{
                      y: [0, -10, 0],
                      rotate: [0, 360]
                    }}
                    transition={{
                      y: {
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: i * 0.5
                      },
                      rotate: {
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                      }
                    }}
                  >
                    <node.icon className="w-8 h-8 text-primary-navy" />
                  </motion.div>
                )
              })}
              
              {/* Floating Particles representing data flow and innovation */}
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-accent-primary rounded-full opacity-60"
                  style={{
                    left: `${20 + Math.random() * 60}%`,
                    top: `${20 + Math.random() * 60}%`,
                  }}
                  animate={{
                    y: [0, -30, 0],
                    opacity: [0.3, 1, 0.3],
                    scale: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 4 + Math.random() * 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: Math.random() * 2
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-accent-primary rounded-full flex justify-center">
          <div className="w-1 h-3 bg-accent-primary rounded-full mt-2 animate-pulse" />
        </div>
      </motion.div>
    </section>
  )
}

export default HeroSection
