import { Briefcase, Users, TrendingUp, Award, MapPin, Clock, DollarSign, Heart } from 'lucide-react'
import Link from 'next/link'
import AnimatedBackground from '@/components/AnimatedBackground'

const jobOpenings = [
  {
    id: 1,
    title: "Senior Full-Stack Developer",
    department: "Engineering",
    location: "Karachi, Pakistan",
    type: "Full-time",
    experience: "3-5 years",
    salary: "Competitive",
    description: "Lead development of scalable web applications and digital platforms for our partner businesses.",
    requirements: [
      "Expert in React, Next.js, Node.js, and TypeScript",
      "Experience with cloud platforms (AWS, GCP)",
      "Strong database design skills (PostgreSQL, MongoDB)",
      "Experience with e-commerce platforms and payment integrations"
    ],
    postedDate: "2024-01-15"
  },
  {
    id: 2,
    title: "Digital Marketing Specialist",
    department: "Marketing",
    location: "Karachi, Pakistan",
    type: "Full-time",
    experience: "2-4 years",
    salary: "Competitive",
    description: "Drive digital growth strategies for our partner businesses across Pakistan&apos;s emerging markets.",
    requirements: [
      "Proven track record in digital marketing campaigns",
      "Experience with Google Ads, Facebook Ads, and SEO",
      "Strong analytical skills and data-driven approach",
      "Understanding of Pakistani market dynamics"
    ],
    postedDate: "2024-01-10"
  },
  {
    id: 3,
    title: "Business Development Manager",
    department: "Business Development",
    location: "Karachi, Pakistan",
    type: "Full-time",
    experience: "4-6 years",
    salary: "Competitive + Commission",
    description: "Identify and develop strategic partnerships with local businesses seeking digital transformation.",
    requirements: [
      "Strong network in Pakistani business community",
      "Excellent communication and negotiation skills",
      "Experience in B2B sales and partnership development",
      "Understanding of digital transformation trends"
    ],
    postedDate: "2024-01-05"
  },
  {
    id: 4,
    title: "UI/UX Designer",
    department: "Design",
    location: "Karachi, Pakistan / Remote",
    type: "Full-time",
    experience: "2-4 years",
    salary: "Competitive",
    description: "Create intuitive and beautiful user experiences for our digital platforms and partner solutions.",
    requirements: [
      "Proficiency in Figma, Adobe Creative Suite",
      "Strong portfolio of web and mobile designs",
      "Experience with design systems and component libraries",
      "Understanding of user-centered design principles"
    ],
    postedDate: "2023-12-28"
  }
]

const benefits = [
  {
    icon: TrendingUp,
    title: "Growth Opportunities",
    description: "Rapid career advancement in Pakistan&apos;s fastest-growing digital economy sector"
  },
  {
    icon: DollarSign,
    title: "Competitive Compensation",
    description: "Above-market salaries with performance bonuses and equity participation"
  },
  {
    icon: Heart,
    title: "Health & Wellness",
    description: "Comprehensive health insurance and wellness programs for you and your family"
  },
  {
    icon: Clock,
    title: "Work-Life Balance",
    description: "Flexible working hours and hybrid work options to maintain personal well-being"
  },
  {
    icon: Users,
    title: "Learning & Development",
    description: "Continuous learning budget and access to international conferences and certifications"
  },
  {
    icon: Award,
    title: "Impact & Recognition",
    description: "Work on projects that transform Pakistan&apos;s digital landscape with proper recognition"
  }
]

const companyValues = [
  {
    title: "Innovation First",
    description: "We embrace cutting-edge technology and creative solutions to solve complex business challenges."
  },
  {
    title: "Collaborative Excellence",
    description: "We believe in the power of teamwork and collective intelligence to achieve extraordinary results."
  },
  {
    title: "National Impact",
    description: "Every project we undertake contributes to Pakistan&apos;s digital transformation and economic growth."
  },
  {
    title: "Integrity & Transparency",
    description: "We maintain the highest ethical standards in all our business relationships and operations."
  }
]

export default function CareersPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-primary-navy text-primary-white py-20 overflow-hidden">
        <AnimatedBackground className="opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary-navy/90 via-primary-navy/80 to-primary-navy/90 z-10"></div>
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-primary-gold mb-6 animate-fade-in">
              Join Our Mission
            </h1>
            <p className="text-lg md:text-xl text-primary-silver mb-8 max-w-3xl mx-auto animate-slide-up">
              Be part of Pakistan&apos;s digital transformation story. Build the future of business, 
              create meaningful impact, and advance your career with Hawlton.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
              <a
                href="#open-positions"
                className="bg-primary-gold hover:bg-primary-gold text-primary-navy px-6 py-3 font-semibold text-base transition-all duration-300 transform hover:scale-105"
              >
                View Open Positions
              </a>
              <a
                href="#company-culture"
                className="border-2 border-primary-gold text-primary-gold hover:bg-primary-gold hover:text-primary-navy px-6 py-3 font-semibold text-base transition-all duration-300 transform hover:scale-105"
              >
                Our Culture
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Why Work With Us */}
      <section id="company-culture" className="bg-primary-platinum py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-primary-navy mb-6">
              Why Choose Hawlton?
            </h2>
            <p className="text-lg text-primary-charcoal max-w-3xl mx-auto leading-relaxed">
              We&apos;re not just building businesses—we&apos;re shaping Pakistan&apos;s digital future. 
              Join a team of passionate professionals driving real economic impact.
            </p>
          </div>

          {/* Company Values */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {companyValues.map((value, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-xl font-semibold text-primary-navy mb-4">{value.title}</h3>
                <p className="text-primary-charcoal leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>

          {/* Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon
              return (
                <div key={index} className="text-center group hover:transform hover:scale-105 transition-all duration-300">
                  <div className="w-16 h-16 mx-auto mb-4 bg-primary-gold rounded-full flex items-center justify-center group-hover:bg-primary-gold transition-colors duration-300">
                    <IconComponent className="w-8 h-8 text-primary-navy" />
                  </div>
                  <h3 className="text-xl font-semibold text-primary-navy mb-2">{benefit.title}</h3>
                  <p className="text-primary-charcoal">{benefit.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section id="open-positions" className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-primary-navy mb-6">
              Open Positions
            </h2>
            <p className="text-lg text-primary-charcoal max-w-3xl mx-auto leading-relaxed">
              Discover opportunities to make a meaningful impact while advancing your career in Pakistan&apos;s 
              most dynamic digital transformation company.
            </p>
          </div>

          <div className="space-y-8">
            {jobOpenings.map((job) => (
              <div key={job.id} className="bg-primary-platinum rounded-xl p-8 hover:shadow-lg transition-shadow duration-300">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-primary-navy mb-2">{job.title}</h3>
                    <div className="flex flex-wrap gap-4 text-sm text-primary-charcoal mb-4">
                      <span className="flex items-center gap-2">
                        <Briefcase className="w-4 h-4" />
                        {job.department}
                      </span>
                      <span className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {job.type}
                      </span>
                      <span className="flex items-center gap-2">
                        <Award className="w-4 h-4" />
                        {job.experience}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link
                      href={`/careers/${job.id}`}
                      className="bg-primary-gold hover:bg-primary-gold text-primary-navy px-4 py-2 font-medium text-sm transition-colors duration-300"
                    >
                      View Details
                    </Link>
                    <Link
                      href={`/careers/apply?job=${job.id}`}
                      className="bg-primary-navy hover:bg-primary-navy/90 text-primary-white px-4 py-2 font-medium text-sm transition-colors duration-300"
                    >
                      Apply Now
                    </Link>
                  </div>
                </div>
                <p className="text-primary-charcoal leading-relaxed mb-4">{job.description}</p>
                <div>
                  <h4 className="font-semibold text-primary-navy mb-2">Key Requirements:</h4>
                  <ul className="list-disc list-inside space-y-1 text-primary-charcoal">
                    {job.requirements.slice(0, 2).map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="bg-primary-navy py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-primary-white mb-6">
              Our Hiring Process
            </h2>
            <p className="text-lg text-primary-silver max-w-3xl mx-auto leading-relaxed">
              We believe in a fair, transparent, and efficient hiring process that respects your time 
              while ensuring the right fit for both parties.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Application", desc: "Submit your application with resume and portfolio" },
              { step: "02", title: "Screening", desc: "Initial phone/video screening with our HR team" },
              { step: "03", title: "Technical", desc: "Technical assessment or case study relevant to the role" },
              { step: "04", title: "Final Interview", desc: "Meet with the team and leadership for cultural fit" }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="bg-primary-gold rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary-navy">{item.step}</span>
                </div>
                <h3 className="text-xl font-semibold text-primary-white mb-2">{item.title}</h3>
                <p className="text-primary-silver text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-platinum py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-primary-navy mb-6">
            Ready to Shape Pakistan&apos;s Digital Future?
          </h2>
          <p className="text-xl text-primary-charcoal mb-12 max-w-3xl mx-auto">
            Don&apos;t see the right position? We&apos;re always looking for exceptional talent. 
            Send us your resume and let&apos;s start a conversation.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              href="/careers/apply"
              className="group bg-primary-gold hover:bg-primary-gold text-primary-navy px-6 py-3 font-semibold text-base transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
            >
              Apply Now
              <Briefcase className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
            <Link
              href="/contact"
              className="group border-2 border-primary-navy text-primary-navy hover:bg-primary-navy hover:text-primary-white px-6 py-3 font-semibold text-base transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
            >
              Contact HR
              <Users className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
