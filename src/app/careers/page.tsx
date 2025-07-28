import { Briefcase, Users, TrendingUp, Award, MapPin, Clock, DollarSign, Heart } from 'lucide-react'
import Link from 'next/link'

const futureOpportunities = [
  {
    id: 1,
    title: "Full-Stack Developers",
    department: "Engineering",
    description: "We'll be seeking talented developers to build scalable digital platforms for our growing portfolio of partner businesses.",
    skills: ["React/Next.js", "Node.js", "TypeScript", "Cloud Platforms"]
  },
  {
    id: 2,
    title: "Digital Marketing Specialists",
    department: "Marketing",
    description: "Marketing professionals who understand Pakistan's digital landscape and can drive growth for our partners.",
    skills: ["Digital Marketing", "Analytics", "SEO/SEM", "Pakistani Market Knowledge"]
  },
  {
    id: 3,
    title: "Business Development Professionals",
    department: "Business Development",
    description: "Relationship builders who can identify and develop strategic partnerships with ambitious Pakistani businesses.",
    skills: ["B2B Sales", "Partnership Development", "Communication", "Business Networks"]
  },
  {
    id: 4,
    title: "UI/UX Designers",
    department: "Design",
    description: "Creative professionals who can design user-centric digital experiences for diverse business sectors.",
    skills: ["UI/UX Design", "Figma", "User Research", "Design Systems"]
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
      <section className="relative bg-primary-navy text-primary-white py-20">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                View Future Opportunities
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

      {/* Future Opportunities */}
      <section id="open-positions" className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-primary-navy mb-6">
              Future Opportunities
            </h2>
            <p className="text-lg text-primary-charcoal max-w-3xl mx-auto leading-relaxed">
              As we grow our partnership network and expand our digital transformation initiatives, 
              we'll be seeking talented professionals to join our mission of empowering Pakistan's digital economy.
            </p>
            <div className="mt-6 text-center">
              <div className="inline-flex items-center bg-primary-gold/10 text-primary-gold px-4 py-2 rounded-full text-sm font-semibold">
                <Users className="w-4 h-4 mr-2" />
                Currently Building Our Team
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {futureOpportunities.map((opportunity) => (
              <div key={opportunity.id} className="bg-primary-platinum rounded-xl p-8 hover:shadow-lg transition-shadow duration-300">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-primary-navy mb-2">{opportunity.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-primary-charcoal mb-4">
                    <Briefcase className="w-4 h-4" />
                    <span>{opportunity.department}</span>
                  </div>
                </div>
                <p className="text-primary-charcoal leading-relaxed mb-6">{opportunity.description}</p>
                <div>
                  <h4 className="font-semibold text-primary-navy mb-3">Key Skills We'll Look For:</h4>
                  <div className="flex flex-wrap gap-2">
                    {opportunity.skills.map((skill, index) => (
                      <span key={index} className="bg-primary-gold/20 text-primary-navy px-3 py-1 rounded-full text-sm font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-primary-gold/20">
                  <p className="text-sm text-primary-silver">
                    Interested in this role? Send us your resume and we'll keep you informed as opportunities develop.
                  </p>
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
