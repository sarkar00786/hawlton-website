'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  BarChart3,
  Users,
  TrendingUp,
  ShoppingCart,
  Package,
  MessageSquare,
  Calendar,
  Settings,
  Bell,
  Search,
  Filter,
  Download,
  RefreshCw,
  ArrowUpRight,
  Home,
  LogOut,
  ChevronDown,
  Eye,
  Edit,
  MoreVertical,
  Activity,
  DollarSign,
  Target,
  Clock,
  CheckCircle2,
  AlertCircle,
  Star
} from 'lucide-react'
import Link from 'next/link'

export default function PartnerPortal() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [selectedProject, setSelectedProject] = useState('hawlton-electronics')
  const [isLoading, setIsLoading] = useState(true)
  const [notifications, setNotifications] = useState(3)

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  // Mock data
  const projects = [
    {
      id: 'hawlton-project-1',
      name: 'Project Alpha',
      status: 'active',
      revenue: '₨2.4M',
      growth: '+34%',
      orders: 1247,
      conversion: '3.8%'
    },
    {
      id: 'hawlton-project-2',
      name: 'Project Beta',
      status: 'scaling',
      revenue: '₨1.8M',
      growth: '+67%',
      orders: 892,
      conversion: '4.2%'
    }
  ]

  const metrics = [
    { title: 'Total Revenue', value: '₨4.2M', change: '+42%', trend: 'up', icon: DollarSign },
    { title: 'Active Orders', value: '2,139', change: '+18%', trend: 'up', icon: ShoppingCart },
    { title: 'Conversion Rate', value: '4.1%', change: '+0.3%', trend: 'up', icon: Target },
    { title: 'Customer Satisfaction', value: '4.8/5', change: '+0.2', trend: 'up', icon: Star }
  ]

  const recentActivities = [
    { type: 'order', message: 'New order #HE-2024-0847 received', time: '2 minutes ago', status: 'success' },
    { type: 'milestone', message: 'Monthly target achieved 98%', time: '1 hour ago', status: 'success' },
    { type: 'alert', message: 'Inventory low: Samsung Galaxy S24', time: '3 hours ago', status: 'warning' },
    { type: 'communication', message: 'Team message from Sarah (Marketing)', time: '5 hours ago', status: 'info' }
  ]

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-16 h-16 border-4 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <h2 className="text-2xl font-bold text-white mb-2">Loading Partner Portal</h2>
          <p className="text-slate-300">Preparing your personalized dashboard...</p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Premium Header */}
      <motion.header 
        className="bg-black/20 backdrop-blur-xl border-b border-white/10"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo Area */}
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-amber-400 to-orange-500 rounded-xl flex items-center justify-center">
                  <span className="text-black font-bold text-lg">H</span>
                </div>
                <div>
                  <h1 className="text-white font-bold text-xl">Partner Portal</h1>
                  <p className="text-slate-400 text-sm">Partner Dashboard</p>
                </div>
              </div>
              
              {/* Project Selector */}
              <div className="relative">
                <select 
                  value={selectedProject}
                  onChange={(e) => setSelectedProject(e.target.value)}
                  className="bg-white/10 text-white border border-white/20 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-amber-400"
                >
                  {projects.map(project => (
                    <option key={project.id} value={project.id} className="bg-slate-800">
                      {project.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            {/* Header Actions */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Bell className="w-6 h-6 text-slate-300 hover:text-white cursor-pointer transition-colors" />
                {notifications > 0 && (
                  <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </div>
              
              <div className="w-8 h-8 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
                <span className="text-black font-semibold text-sm">AK</span>
              </div>
              
              {/* Exceptional Home Button */}
              <Link href="/">
                <motion.button
                  className="group relative overflow-hidden bg-gradient-to-r from-amber-400 to-orange-500 text-black font-semibold px-6 py-2 rounded-xl"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-0 transition-transform duration-300"
                  />
                  <div className="relative flex items-center space-x-2">
                    <Home className="w-4 h-4" />
                    <span>Back to Hawlton</span>
                  </div>
                </motion.button>
              </Link>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="flex">
        {/* Premium Sidebar */}
        <motion.aside 
          className="w-64 bg-black/30 backdrop-blur-xl border-r border-white/10 min-h-screen"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <nav className="p-6 space-y-2">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
              { id: 'analytics', label: 'Analytics', icon: TrendingUp },
              { id: 'orders', label: 'Orders', icon: ShoppingCart },
              { id: 'inventory', label: 'Inventory', icon: Package },
              { id: 'communications', label: 'Team Chat', icon: MessageSquare },
              { id: 'calendar', label: 'Calendar', icon: Calendar },
              { id: 'settings', label: 'Settings', icon: Settings }
            ].map(item => (
              <motion.button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  activeTab === item.id 
                    ? 'bg-gradient-to-r from-amber-400/20 to-orange-500/20 text-amber-400 border border-amber-400/30' 
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </motion.button>
            ))}
          </nav>
        </motion.aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <AnimatePresence mode="wait">
            {activeTab === 'dashboard' && (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="space-y-8"
              >
                {/* Welcome Section */}
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-2">Welcome back, Ahmed!</h2>
                    <p className="text-slate-400">Here's what's happening with your business today.</p>
                  </div>
                  <div className="flex space-x-3">
                    <button className="bg-white/10 text-white px-4 py-2 rounded-lg hover:bg-white/20 transition-colors flex items-center space-x-2">
                      <RefreshCw className="w-4 h-4" />
                      <span>Refresh</span>
                    </button>
                    <button className="bg-gradient-to-r from-amber-400 to-orange-500 text-black px-4 py-2 rounded-lg font-semibold hover:from-amber-500 hover:to-orange-600 transition-all flex items-center space-x-2">
                      <Download className="w-4 h-4" />
                      <span>Export Report</span>
                    </button>
                  </div>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {metrics.map((metric, index) => (
                    <motion.div
                      key={metric.title}
                      className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02, y: -2 }}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-amber-400/20 to-orange-500/20 rounded-xl flex items-center justify-center">
                          <metric.icon className="w-6 h-6 text-amber-400" />
                        </div>
                        <span className="text-green-400 text-sm font-semibold bg-green-400/10 px-2 py-1 rounded-full">
                          {metric.change}
                        </span>
                      </div>
                      <h3 className="text-slate-400 text-sm font-medium mb-1">{metric.title}</h3>
                      <p className="text-white text-2xl font-bold">{metric.value}</p>
                    </motion.div>
                  ))}
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Revenue Chart */}
                  <motion.div 
                    className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-white text-lg font-semibold">Revenue Overview</h3>
                      <select className="bg-white/10 text-white text-sm border border-white/20 rounded-lg px-3 py-1">
                        <option value="7d">Last 7 days</option>
                        <option value="30d">Last 30 days</option>
                        <option value="90d">Last 90 days</option>
                      </select>
                    </div>
                    <div className="h-64 bg-gradient-to-t from-amber-400/10 to-transparent rounded-xl flex items-end justify-center">
                      <div className="text-slate-400 text-center">
                        <BarChart3 className="w-16 h-16 mx-auto mb-4 opacity-50" />
                        <p>Interactive Chart Component</p>
                        <p className="text-sm">Revenue: ₨2.4M this month</p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Recent Activity */}
                  <motion.div 
                    className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <h3 className="text-white text-lg font-semibold mb-6">Recent Activity</h3>
                    <div className="space-y-4">
                      {recentActivities.map((activity, index) => (
                        <motion.div
                          key={index}
                          className="flex items-center space-x-4 p-3 rounded-xl hover:bg-white/5 transition-colors"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.7 + index * 0.1 }}
                        >
                          <div className={`w-2 h-2 rounded-full ${
                            activity.status === 'success' ? 'bg-green-400' :
                            activity.status === 'warning' ? 'bg-yellow-400' : 'bg-blue-400'
                          }`} />
                          <div className="flex-1">
                            <p className="text-white text-sm">{activity.message}</p>
                            <p className="text-slate-400 text-xs">{activity.time}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>

                {/* Quick Actions */}
                <motion.div 
                  className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <h3 className="text-white text-lg font-semibold mb-6">Quick Actions</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { label: 'Add Product', icon: Package, color: 'from-blue-400 to-blue-600' },
                      { label: 'View Orders', icon: ShoppingCart, color: 'from-green-400 to-green-600' },
                      { label: 'Contact Support', icon: MessageSquare, color: 'from-purple-400 to-purple-600' },
                      { label: 'Generate Report', icon: BarChart3, color: 'from-amber-400 to-orange-500' }
                    ].map((action, index) => (
                      <motion.button
                        key={action.label}
                        className={`bg-gradient-to-r ${action.color} text-white p-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex flex-col items-center space-y-2`}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <action.icon className="w-6 h-6" />
                        <span className="text-sm">{action.label}</span>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      {/* Floating Action Button */}
      <motion.button
        className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-r from-amber-400 to-orange-500 text-black rounded-full shadow-2xl hover:shadow-amber-400/50 transition-all duration-300 flex items-center justify-center"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ scale: 0, rotate: 180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 1, type: "spring", stiffness: 200 }}
      >
        <MessageSquare className="w-6 h-6" />
      </motion.button>
    </div>
  )
}
