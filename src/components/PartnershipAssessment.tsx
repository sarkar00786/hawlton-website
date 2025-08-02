'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  CheckCircle, 
  ArrowRight, 
  Building2, 
  TrendingUp, 
  Users, 
  Star 
} from 'lucide-react'
import Button from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'

interface AssessmentResult {
  score: number
  level: 'ready' | 'developing' | 'needs-preparation'
  title: string
  description: string
  recommendations: string[]
}

const PartnershipAssessment = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [result, setResult] = useState<AssessmentResult | null>(null)
  const [showResult, setShowResult] = useState(false)

  const questions = [
    {
      question: "What is your current annual revenue?",
      options: [
        { text: "Under PKR 5M", value: 1 },
        { text: "PKR 5M - 20M", value: 2 },
        { text: "PKR 20M - 100M", value: 3 },
        { text: "Over PKR 100M", value: 4 }
      ]
    },
    {
      question: "How ready is your business for digital transformation?",
      options: [
        { text: "Just starting to explore digital options", value: 1 },
        { text: "Have basic online presence but limited sales", value: 2 },
        { text: "Active online but want to scale nationwide", value: 3 },
        { text: "Established digital presence, ready for partnership", value: 4 }
      ]
    },
    {
      question: "What is your primary partnership goal?",
      options: [
        { text: "Learn about digital opportunities", value: 1 },
        { text: "Expand to new markets gradually", value: 2 },
        { text: "Scale rapidly across Pakistan", value: 3 },
        { text: "Maximize growth through strategic partnership", value: 4 }
      ]
    }
  ]

  const handleAnswer = (value: number) => {
    const newAnswers = [...answers, value]
    setAnswers(newAnswers)

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      calculateResult(newAnswers)
    }
  }

  const calculateResult = (finalAnswers: number[]) => {
    const totalScore = finalAnswers.reduce((sum, answer) => sum + answer, 0)
    const averageScore = totalScore / finalAnswers.length

    let assessmentResult: AssessmentResult

    if (averageScore >= 3.5) {
      assessmentResult = {
        score: Math.round(averageScore * 25),
        level: 'ready',
        title: 'Partnership Ready!',
        description: 'Your business shows strong readiness for strategic partnership with Hawlton. You have the foundation and ambition needed for rapid growth.',
        recommendations: [
          'Schedule a consultation to discuss partnership models',
          'Prepare your business documentation and growth plans',
          'Consider our Premium Partnership for maximum benefits'
        ]
      }
    } else if (averageScore >= 2.5) {
      assessmentResult = {
        score: Math.round(averageScore * 25),
        level: 'developing',
        title: 'Great Potential!',
        description: 'Your business has solid potential for partnership. With some preparation, you could be ready for strategic growth collaboration.',
        recommendations: [
          'Focus on strengthening your digital foundation',
          'Develop clear growth and expansion goals',
          'Consider starting with our Consulting & Implementation model'
        ]
      }
    } else {
      assessmentResult = {
        score: Math.round(averageScore * 25),
        level: 'needs-preparation',
        title: 'Building Foundation',
        description: 'Your business is in the early stages of digital readiness. We recommend focusing on foundational growth before partnership.',
        recommendations: [
          'Strengthen your core business operations',
          'Develop a clear digital strategy',
          'Explore our Resource Library for guidance',
          'Contact us for strategic consulting services'
        ]
      }
    }

    setResult(assessmentResult)
    setShowResult(true)
  }

  const resetAssessment = () => {
    setCurrentStep(0)
    setAnswers([])
    setResult(null)
    setShowResult(false)
  }

  const getProgressPercentage = () => {
    return ((currentStep + 1) / questions.length) * 100
  }

  const getResultColor = (level: string) => {
    switch (level) {
      case 'ready': return 'text-green-600'
      case 'developing': return 'text-yellow-600'
      case 'needs-preparation': return 'text-blue-600'
      default: return 'text-primary-navy'
    }
  }

  const getResultIcon = (level: string) => {
    switch (level) {
      case 'ready': return Star
      case 'developing': return TrendingUp
      case 'needs-preparation': return Building2
      default: return CheckCircle
    }
  }

  if (showResult && result) {
    const ResultIcon = getResultIcon(result.level)
    
    return (
      <section className="py-20 bg-primary-platinum">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="p-8 text-center">
                <div className="mb-8">
                  <motion.div
                    className="w-20 h-20 bg-primary-gold rounded-full flex items-center justify-center mx-auto mb-6"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
                  >
                    <ResultIcon className="w-10 h-10 text-primary-navy" />
                  </motion.div>
                  
                  <h2 className={`text-3xl font-bold mb-4 ${getResultColor(result.level)}`}>
                    {result.title}
                  </h2>
                  
                  <div className="text-6xl font-bold text-primary-navy mb-4">
                    {result.score}%
                  </div>
                  
                  <p className="text-xl text-primary-charcoal max-w-2xl mx-auto">
                    {result.description}
                  </p>
                </div>

                <div className="mb-8">
                  <h3 className="text-xl font-bold text-primary-navy mb-4">
                    Recommended Next Steps:
                  </h3>
                  <ul className="space-y-2 text-left max-w-md mx-auto">
                    {result.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-primary-charcoal">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  {result.level === 'ready' && (
                    <a href="/partnership">
                      <Button 
                        variant="primary" 
                        size="lg"
                        icon={ArrowRight}
                        iconPosition="right"
                      >
                        Start Partnership Application
                      </Button>
                    </a>
                  )}
                  
                  <a href="/contact">
                    <Button 
                      variant="outline" 
                      size="lg"
                    >
                      Schedule Consultation
                    </Button>
                  </a>
                  
                  <Button 
                    variant="ghost" 
                    size="lg"
                    onClick={resetAssessment}
                  >
                    Retake Assessment
                  </Button>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-primary-platinum">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-primary-navy mb-8">
              Partnership Readiness Assessment
            </h2>
            <p className="text-xl text-primary-charcoal max-w-3xl mx-auto">
              Take our quick 3-question assessment to determine if your business is ready 
              for strategic partnership with Hawlton.
            </p>
          </div>

          <Card className="p-8">
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-primary-charcoal">
                  Question {currentStep + 1} of {questions.length}
                </span>
                <span className="text-sm font-medium text-primary-charcoal">
                  {Math.round(getProgressPercentage())}% Complete
                </span>
              </div>
              <div className="w-full bg-primary-silver rounded-full h-2">
                <motion.div 
                  className="bg-primary-gold h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${getProgressPercentage()}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>

            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-2xl font-bold text-primary-navy mb-8 text-center">
                {questions[currentStep].question}
              </h3>

              <div className="grid gap-4">
                {questions[currentStep].options.map((option, index) => (
                  <motion.button
                    key={index}
                    className="text-left p-6 border-2 border-primary-silver rounded-lg hover:border-primary-gold hover:bg-primary-gold/5 transition-all duration-300 group"
                    onClick={() => handleAnswer(option.value)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-lg text-primary-charcoal group-hover:text-primary-navy font-medium">
                        {option.text}
                      </span>
                      <ArrowRight className="w-5 h-5 text-primary-silver group-hover:text-primary-gold transition-colors" />
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </Card>
        </div>
      </div>
    </section>
  )
}

export default PartnershipAssessment
