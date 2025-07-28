'use client'

import { Suspense, useState, useEffect } from 'react'
import Link from 'next/link'
import { TrendingUp, DollarSign, PieChart, BarChart3, Users, Target, Award, FileText } from 'lucide-react'
import { InvestorPortalIds } from '@/config/elementIds'

const InvestorPortal = () => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading completion
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 100)
    
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-navy via-primary-navy/95 to-primary-navy text-primary-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-primary-silver">Loading your portfolio...</p>
        </div>
      </div>
    )
  }
  const stats = [
    {
      label: "Total Investment",
      value: "$125,000",
      change: "+12.5%",
      icon: DollarSign,
      color: "text-green-500"
    },
    {
      label: "Portfolio Value",
      value: "$185,750",
      change: "+48.6%",
      icon: TrendingUp,
      color: "text-blue-500"
    },
    {
      label: "Active Projects",
      value: "12",
      change: "+3",
      icon: Target,
      color: "text-purple-500"
    },
    {
      label: "ROI",
      value: "48.6%",
      change: "+5.2%",
      icon: BarChart3,
      color: "text-gold-500"
    }
  ]

  const recentInvestments = [
    {
      company: "TechFlow Solutions",
      amount: "$25,000",
      date: "2024-01-15",
      status: "Active",
      roi: "+35%"
    },
    {
      company: "Digital Commerce Hub",
      amount: "$35,000",
      date: "2024-01-08",
      status: "Active",
      roi: "+42%"
    },
    {
      company: "AI Marketing Suite",
      amount: "$20,000",
      date: "2023-12-20",
      status: "Completed",
      roi: "+67%"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-navy via-primary-navy/95 to-primary-navy text-primary-white">
      {/* Professional Header */}
      <header className="bg-black/20 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo Area */}
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-primary-gold to-primary-gold rounded-xl flex items-center justify-center">
                  <span className="text-primary-navy font-bold text-lg">H</span>
                </div>
                <div>
                  <h1 id={InvestorPortalIds.PORTAL_TITLE} className="text-white font-bold text-xl">Investor Portal</h1>
                  <p className="text-primary-silver text-sm">Welcome back, Investor</p>
                </div>
              </div>
            </div>
            
            {/* Header Actions */}
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-gradient-to-r from-primary-gold to-primary-gold rounded-full flex items-center justify-center">
                <span className="text-primary-navy font-semibold text-sm">IN</span>
              </div>
              
              {/* Back to Hawlton Button */}
              <Link href="/">
                <button className="group relative overflow-hidden bg-gradient-to-r from-primary-gold to-primary-gold text-primary-navy font-semibold px-6 py-2 rounded-xl hover:scale-105 transition-transform duration-200">
                  <div className="relative flex items-center space-x-2">
                    <span>Back to Hawlton</span>
                  </div>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </header>
      
      <div className="max-w-7xl mx-auto p-6">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-primary-gold mb-2">
              Portfolio Dashboard
            </h2>
            <p className="text-primary-silver text-lg">
              Track your investments and portfolio performance
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-primary-navy/50 backdrop-blur-sm border border-primary-gold/20 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg bg-primary-gold/10`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <span className={`text-sm ${stat.color} font-semibold`}>
                    {stat.change}
                  </span>
                </div>
                <div>
                  <p className="text-2xl font-bold text-primary-white mb-1">
                    {stat.value}
                  </p>
                  <p className="text-primary-silver text-sm">
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Investments */}
            <div className="bg-primary-navy/50 backdrop-blur-sm border border-primary-gold/20 rounded-xl p-6">
              <div className="flex items-center mb-6">
                <PieChart className="w-6 h-6 text-primary-gold mr-3" />
                <h2 className="text-xl font-bold text-primary-white">Recent Investments</h2>
              </div>
              <div className="space-y-4">
                {recentInvestments.map((investment, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-primary-navy/30 rounded-lg border border-primary-gold/10">
                    <div>
                      <h3 className="font-semibold text-primary-white">{investment.company}</h3>
                      <p className="text-sm text-primary-silver">{investment.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-primary-gold">{investment.amount}</p>
                      <p className={`text-sm ${investment.status === 'Active' ? 'text-green-400' : 'text-blue-400'}`}>
                        {investment.roi}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-primary-navy/50 backdrop-blur-sm border border-primary-gold/20 rounded-xl p-6">
              <div className="flex items-center mb-6">
                <Target className="w-6 h-6 text-primary-gold mr-3" />
                <h2 className="text-xl font-bold text-primary-white">Quick Actions</h2>
              </div>
              <div className="space-y-4">
                <button className="w-full p-4 bg-primary-gold/10 hover:bg-primary-gold/20 border border-primary-gold/30 rounded-lg transition-colors text-left">
                  <div className="flex items-center">
                    <TrendingUp className="w-5 h-5 text-primary-gold mr-3" />
                    <div>
                      <h3 className="font-semibold text-primary-white">View Portfolio Performance</h3>
                      <p className="text-sm text-primary-silver">Detailed analytics and reports</p>
                    </div>
                  </div>
                </button>
                <button className="w-full p-4 bg-primary-gold/10 hover:bg-primary-gold/20 border border-primary-gold/30 rounded-lg transition-colors text-left">
                  <div className="flex items-center">
                    <FileText className="w-5 h-5 text-primary-gold mr-3" />
                    <div>
                      <h3 className="font-semibold text-primary-white">Download Reports</h3>
                      <p className="text-sm text-primary-silver">Investment statements and documents</p>
                    </div>
                  </div>
                </button>
                <button className="w-full p-4 bg-primary-gold/10 hover:bg-primary-gold/20 border border-primary-gold/30 rounded-lg transition-colors text-left">
                  <div className="flex items-center">
                    <Users className="w-5 h-5 text-primary-gold mr-3" />
                    <div>
                      <h3 className="font-semibold text-primary-white">Contact Advisor</h3>
                      <p className="text-sm text-primary-silver">Get personalized investment guidance</p>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Investment Opportunities */}
          <div className="mt-8 bg-primary-navy/50 backdrop-blur-sm border border-primary-gold/20 rounded-xl p-6">
            <div className="flex items-center mb-6">
              <Award className="w-6 h-6 text-primary-gold mr-3" />
              <h2 className="text-xl font-bold text-primary-white">New Investment Opportunities</h2>
            </div>
            <p className="text-primary-silver mb-4">
              Discover new high-growth digital ventures in Pakistan's expanding technology sector.
            </p>
            <button className="bg-primary-gold hover:bg-primary-gold/90 text-primary-navy px-6 py-3 rounded-lg font-semibold transition-colors">
              Explore Opportunities
            </button>
          </div>
      </div>
    </div>
  )
}

export default InvestorPortal
