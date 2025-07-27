'use client'

import { useState } from 'react'
import { Upload, Send, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

const positions = [
  { id: 1, title: "Senior Full-Stack Developer", department: "Engineering" },
  { id: 2, title: "Digital Marketing Specialist", department: "Marketing" },
  { id: 3, title: "Business Development Manager", department: "Business Development" },
  { id: 4, title: "UI/UX Designer", department: "Design" },
  { id: 0, title: "Other / General Application", department: "General" }
]

export default function JobApplicationPage() {
  const [formData, setFormData] = useState({
    position: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    experience: '',
    currentRole: '',
    expectedSalary: '',
    availableStart: '',
    motivation: '',
    skills: '',
    portfolio: '',
    linkedin: '',
    github: '',
    referral: '',
    additionalInfo: ''
  })

  const [files, setFiles] = useState<{
    resume: File | null,
    coverLetter: File | null,
    portfolio: File | null
  }>({
    resume: null,
    coverLetter: null,
    portfolio: null
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fileType: keyof typeof files) => {
    if (e.target.files && e.target.files[0]) {
      setFiles({
        ...files,
        [fileType]: e.target.files[0]
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-primary-platinum flex items-center justify-center py-20">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="bg-white rounded-xl p-12 shadow-lg">
            <div className="w-16 h-16 bg-primary-gold rounded-full flex items-center justify-center mx-auto mb-6">
              <Send className="w-8 h-8 text-primary-navy" />
            </div>
            <h1 className="text-3xl font-bold text-primary-navy mb-4">
              Application Submitted Successfully!
            </h1>
            <p className="text-lg text-primary-charcoal mb-6 leading-relaxed">
              Thank you for your interest in joining Hawlton. We&apos;ve received your application and will review it carefully. 
              Our HR team will contact you within 3-5 business days if your profile matches our requirements.
            </p>
            <div className="space-y-4">
              <Link
                href="/careers"
                className="inline-block bg-primary-gold hover:bg-primary-gold text-primary-navy px-8 py-3 rounded-lg font-semibold transition-colors duration-300"
              >
                Back to Careers
              </Link>
              <p className="text-sm text-primary-charcoal">
                Questions? Contact us at <a href="mailto:careers@hawlton.com" className="text-primary-gold font-semibold">careers@hawlton.com</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-primary-platinum py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Link
            href="/careers"
            className="inline-flex items-center text-primary-navy hover:text-primary-gold transition-colors duration-300 mb-6"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Careers
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-primary-navy mb-4">
            Join Our Team
          </h1>
          <p className="text-lg text-primary-charcoal max-w-2xl mx-auto leading-relaxed">
            Take the first step towards shaping Pakistan&apos;s digital future. Fill out the form below 
            and let&apos;s start a conversation about your career with Hawlton.
          </p>
        </div>

        {/* Application Form */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Position Selection */}
            <div>
              <label htmlFor="position" className="block text-sm font-semibold text-primary-navy mb-2">
                Position Applied For *
              </label>
              <select
                id="position"
                name="position"
                required
                value={formData.position}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-gold focus:border-transparent transition-colors"
              >
                <option value="">Select a position</option>
                {positions.map((pos) => (
                  <option key={pos.id} value={pos.id}>
                    {pos.title} - {pos.department}
                  </option>
                ))}
              </select>
            </div>

            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="firstName" className="block text-sm font-semibold text-primary-navy mb-2">
                  First Name *
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  required
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-gold focus:border-transparent transition-colors"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-semibold text-primary-navy mb-2">
                  Last Name *
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  required
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-gold focus:border-transparent transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-primary-navy mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-gold focus:border-transparent transition-colors"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-primary-navy mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+92-XXX-XXXXXXX"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-gold focus:border-transparent transition-colors"
                />
              </div>
            </div>

            {/* Professional Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="location" className="block text-sm font-semibold text-primary-navy mb-2">
                  Current Location *
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  required
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="e.g., Karachi, Pakistan"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-gold focus:border-transparent transition-colors"
                />
              </div>
              <div>
                <label htmlFor="experience" className="block text-sm font-semibold text-primary-navy mb-2">
                  Years of Experience *
                </label>
                <select
                  id="experience"
                  name="experience"
                  required
                  value={formData.experience}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-gold focus:border-transparent transition-colors"
                >
                  <option value="">Select experience level</option>
                  <option value="0-1">0-1 years (Entry Level)</option>
                  <option value="2-3">2-3 years</option>
                  <option value="4-5">4-5 years</option>
                  <option value="6-8">6-8 years</option>
                  <option value="9+">9+ years (Senior Level)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="currentRole" className="block text-sm font-semibold text-primary-navy mb-2">
                  Current Role/Position
                </label>
                <input
                  type="text"
                  id="currentRole"
                  name="currentRole"
                  value={formData.currentRole}
                  onChange={handleInputChange}
                  placeholder="e.g., Senior Developer at Tech Company"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-gold focus:border-transparent transition-colors"
                />
              </div>
              <div>
                <label htmlFor="expectedSalary" className="block text-sm font-semibold text-primary-navy mb-2">
                  Expected Salary (PKR)
                </label>
                <input
                  type="text"
                  id="expectedSalary"
                  name="expectedSalary"
                  value={formData.expectedSalary}
                  onChange={handleInputChange}
                  placeholder="e.g., 150,000 - 200,000"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-gold focus:border-transparent transition-colors"
                />
              </div>
            </div>

            {/* File Uploads */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-primary-navy">Documents</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-primary-navy mb-2">
                    Resume/CV *
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => handleFileChange(e, 'resume')}
                      className="hidden"
                      id="resume-upload"
                    />
                    <label
                      htmlFor="resume-upload"
                      className="flex items-center justify-center w-full px-4 py-8 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary-gold transition-colors"
                    >
                      <div className="text-center">
                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">
                          {files.resume ? files.resume.name : 'Upload Resume'}
                        </p>
                      </div>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-primary-navy mb-2">
                    Cover Letter
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => handleFileChange(e, 'coverLetter')}
                      className="hidden"
                      id="cover-letter-upload"
                    />
                    <label
                      htmlFor="cover-letter-upload"
                      className="flex items-center justify-center w-full px-4 py-8 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary-gold transition-colors"
                    >
                      <div className="text-center">
                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">
                          {files.coverLetter ? files.coverLetter.name : 'Upload Cover Letter'}
                        </p>
                      </div>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-primary-navy mb-2">
                    Portfolio (Optional)
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      accept=".pdf,.zip,.rar"
                      onChange={(e) => handleFileChange(e, 'portfolio')}
                      className="hidden"
                      id="portfolio-upload"
                    />
                    <label
                      htmlFor="portfolio-upload"
                      className="flex items-center justify-center w-full px-4 py-8 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary-gold transition-colors"
                    >
                      <div className="text-center">
                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">
                          {files.portfolio ? files.portfolio.name : 'Upload Portfolio'}
                        </p>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div>
              <label htmlFor="motivation" className="block text-sm font-semibold text-primary-navy mb-2">
                Why do you want to join Hawlton? *
              </label>
              <textarea
                id="motivation"
                name="motivation"
                required
                rows={4}
                value={formData.motivation}
                onChange={handleInputChange}
                placeholder="Tell us what excites you about this opportunity and how you can contribute to our mission..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-gold focus:border-transparent transition-colors resize-vertical"
              ></textarea>
            </div>

            <div>
              <label htmlFor="skills" className="block text-sm font-semibold text-primary-navy mb-2">
                Key Skills & Technologies
              </label>
              <textarea
                id="skills"
                name="skills"
                rows={3}
                value={formData.skills}
                onChange={handleInputChange}
                placeholder="List your most relevant skills, technologies, and tools..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-gold focus:border-transparent transition-colors resize-vertical"
              ></textarea>
            </div>

            {/* Links */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="linkedin" className="block text-sm font-semibold text-primary-navy mb-2">
                  LinkedIn Profile
                </label>
                <input
                  type="url"
                  id="linkedin"
                  name="linkedin"
                  value={formData.linkedin}
                  onChange={handleInputChange}
                  placeholder="https://linkedin.com/in/yourprofile"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-gold focus:border-transparent transition-colors"
                />
              </div>
              <div>
                <label htmlFor="github" className="block text-sm font-semibold text-primary-navy mb-2">
                  GitHub/Portfolio URL
                </label>
                <input
                  type="url"
                  id="github"
                  name="github"
                  value={formData.github}
                  onChange={handleInputChange}
                  placeholder="https://github.com/yourusername"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-gold focus:border-transparent transition-colors"
                />
              </div>
            </div>

            <div>
              <label htmlFor="availableStart" className="block text-sm font-semibold text-primary-navy mb-2">
                Available Start Date
              </label>
              <input
                type="date"
                id="availableStart"
                name="availableStart"
                value={formData.availableStart}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-gold focus:border-transparent transition-colors"
              />
            </div>

            <div>
              <label htmlFor="referral" className="block text-sm font-semibold text-primary-navy mb-2">
                How did you hear about us?
              </label>
              <select
                id="referral"
                name="referral"
                value={formData.referral}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-gold focus:border-transparent transition-colors"
              >
                <option value="">Select source</option>
                <option value="website">Company Website</option>
                <option value="linkedin">LinkedIn</option>
                <option value="referral">Employee Referral</option>
                <option value="job-board">Job Board</option>
                <option value="social-media">Social Media</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="additionalInfo" className="block text-sm font-semibold text-primary-navy mb-2">
                Additional Information
              </label>
              <textarea
                id="additionalInfo"
                name="additionalInfo"
                rows={3}
                value={formData.additionalInfo}
                onChange={handleInputChange}
                placeholder="Any additional information you'd like to share..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-gold focus:border-transparent transition-colors resize-vertical"
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary-gold hover:bg-primary-gold text-primary-navy px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting Application...
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    Submit Application
                    <Send className="ml-2 w-5 h-5" />
                  </span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
