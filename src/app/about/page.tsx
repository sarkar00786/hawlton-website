'use client'

import { Shield, Globe, TrendingUp, Users, Heart, Lightbulb } from 'lucide-react'
import Image from 'next/image'

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hawlton's Story Section */}
      <section id="hero-section" className="bg-primary-platinum py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h1 className="text-3xl md:text-4xl font-bold text-primary-navy mb-8">
              The Genesis of a Vision: Empowering Pakistan&apos;s Digital & Economic Future.
            </h1>
            <div className="text-lg text-primary-charcoal leading-relaxed space-y-6">
              <p>
                Hawlton was born from a profound recognition of the immense untapped digital and economic potential 
                within Pakistan&apos;s local businesses. Our founders witnessed countless ambitious entrepreneurs with 
                exceptional products and services, yet constrained by limited digital reach and traditional 
                operational boundaries.
              </p>
              <p>
                This revelation sparked our commitment to bridging that critical gap through strategic partnerships, 
                cutting-edge digital innovation, and secure partnership avenues. We are dedicated to fostering a
                vibrant digital ecosystem that not only transforms individual businesses but contributes significantly 
                to Pakistan&apos;s long-term economic uplift and national prosperity.
              </p>
              <p>
                Today, Hawlton stands as a catalyst for change, empowering local enterprises to achieve national 
                prominence while creating unprecedented opportunities for strategic partners to participate in
                Pakistan&apos;s digital transformation journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section id="vision-mission-section" className="bg-primary-navy py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-primary-white mb-8">
              Our Guiding Principles: Vision for a Digital Pakistan.
            </h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Vision */}
            <div className="bg-primary-platinum p-8 rounded-xl">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-primary-gold flex items-center justify-center mr-4">
                  <TrendingUp className="w-6 h-6 text-primary-navy" />
                </div>
                <h3 className="text-2xl font-bold text-primary-navy">Our Vision</h3>
              </div>
              <p className="text-primary-charcoal leading-relaxed">
                To be the leading catalyst for digital growth and a trusted conduit for impactful partnerships,
                empowering every local enterprise in Pakistan to achieve national prominence and beyond, thereby 
                contributing significantly to the nation&apos;s economic prosperity.
              </p>
            </div>

            {/* Mission */}
            <div className="bg-primary-platinum p-8 rounded-xl">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-primary-gold flex items-center justify-center mr-4">
                  <Heart className="w-6 h-6 text-primary-navy" />
                </div>
                <h3 className="text-2xl font-bold text-primary-navy">Our Mission</h3>
              </div>
              <p className="text-primary-charcoal leading-relaxed">
                To forge strategic partnerships with ambitious businesses, providing unparalleled digital transformation 
                expertise, innovative solutions, and unwavering support for shared, sustainable success. Simultaneously, 
                to offer secure, transparent, and high-potential partnership opportunities that fuel real economic growth 
                and deliver exceptional returns.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Team Section */}
      <section id="team-section" className="bg-primary-platinum py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-primary-navy mb-8">
              The Architects of Digital Growth & Partnership Impact.
            </h2>
            <p className="text-lg text-primary-charcoal max-w-4xl mx-auto leading-relaxed">
              Our leadership team brings a wealth of collective experience in conceptualizing, building, and scaling 
              high-growth digital ventures across diverse sectors. Our expertise is rooted in strategic foresight, 
              operational excellence, and a deep understanding of market dynamics and secure partnership principles.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Jahangir Hussain */}
            <div className="bg-white p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl">
              <div className="flex flex-col md:flex-row items-center md:items-start mb-6">
                <div className="relative w-32 h-32 mb-4 md:mb-0 md:mr-6 flex-shrink-0">
                  <Image
                    src="/images/team/Jahangir-Hussain.jpg"
                    alt="Jahangir Hussain - Founder & Visionary Lead of Hawlton, strategic digital transformation expert with proven track record in scaling online ventures across Pakistan's emerging digital economy"
                    width={128}
                    height={128}
                    className="w-32 h-32 object-cover border-4 border-primary-gold rounded-full"
                    priority
                  />
                  {/* Fallback icon */}
                  <div className="w-32 h-32 bg-primary-silver flex items-center justify-center border-4 border-primary-gold rounded-full" style={{display: 'none'}}>
                    <Users className="w-16 h-16 text-primary-navy" />
                  </div>
                </div>
                <div className="text-center md:text-left">
                  <h3 className="text-2xl font-bold text-primary-navy mb-2">
                    Jahangir Hussain
                  </h3>
                  <p className="text-primary-silver text-sm mb-2">
                    (Also known as Sarkar Hussain)
                  </p>
                  <p className="text-xl font-semibold text-primary-gold">
                    Founder & Visionary Lead
                  </p>
                </div>
              </div>
              <p className="text-primary-charcoal leading-relaxed">
                Jahangir is the strategic mind and driving force behind Hawlton, fueled by an unwavering vision to 
                revolutionize Pakistan's digital economy and create robust partnership pathways. His entrepreneurial
                journey is marked by a proven ability to identify market gaps, conceptualize groundbreaking digital 
                solutions, and lead teams to achieve exponential growth across various online ventures. His expertise 
                spans strategic planning, market entry, building resilient digital ecosystems, and identifying 
                high-potential partnership opportunities.
              </p>
            </div>

            {/* Muhammad Ismail */}
            <div className="bg-white p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl">
              <div className="flex flex-col md:flex-row items-center md:items-start mb-6">
                <div className="relative w-32 h-32 mb-4 md:mb-0 md:mr-6 flex-shrink-0">
                  <Image
                    src="/images/team/muhammad-ismail.jpg"
                    alt="Muhammad Ismail - Co-Founder & Operational Lead of Hawlton, ACCA aspirant with expertise in operational excellence and digital project management for Pakistani businesses"
                    width={128}
                    height={128}
                    className="w-32 h-32 object-cover border-4 border-primary-gold rounded-full"
                  />
                  {/* Fallback icon */}
                  <div className="w-32 h-32 bg-primary-silver flex items-center justify-center border-4 border-primary-gold rounded-full" style={{display: 'none'}}>
                    <Lightbulb className="w-16 h-16 text-primary-navy" />
                  </div>
                </div>
                <div className="text-center md:text-left">
                  <h3 className="text-2xl font-bold text-primary-navy mb-2">
                    Muhammad Ismail
                  </h3>
                  <p className="text-primary-silver text-sm mb-2">
                    Aspirant ACCA
                  </p>
                  <p className="text-xl font-semibold text-primary-gold">
                    Co-Founder & Operational Lead
                  </p>
                </div>
              </div>
              <p className="text-primary-charcoal leading-relaxed">
                Muhammad brings exceptional operational acumen and a meticulous approach to project execution. With 
                extensive experience in managing complex digital initiatives, he ensures seamless implementation, 
                efficient resource allocation, and timely delivery of results. His focus on precision, team coordination, 
                and problem-solving is instrumental in translating Hawlton&apos;s strategic visions into tangible, successful 
                digital realities, ensuring operational excellence for both our partners and our collaborators.
              </p>
            </div>
          </div>

          {/* Our Commitment */}
          <div className="bg-white p-8 shadow-lg rounded-xl mb-12">
            <h3 className="text-2xl font-bold text-primary-navy mb-8 text-center">Our Commitment to Excellence</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {
                [
                  {
                    type: "Legal Compliance",
                    authority: "Pakistani Business Standards",
                    status: "Fully Registered & Compliant",
                    year: "2024",
                    icon: Shield
                  },
                  {
                    type: "Digital Innovation",
                    authority: "Modern Technology Standards",
                    status: "Cutting-Edge Solutions",
                    year: "2024",
                    icon: Lightbulb
                  },
                  {
                    type: "Financial Transparency",
                    authority: "International Best Practices",
                    status: "Transparent Operations",
                    year: "2024",
                    icon: TrendingUp
                  }
                ].map((credential, index) => (
                  <div key={index} className="text-center p-6 border border-primary-gold/20 rounded-xl hover:shadow-md transition-shadow">
                    <div className="w-16 h-16 mx-auto mb-4 bg-primary-gold flex items-center justify-center rounded-full">
                      <credential.icon className="w-8 h-8 text-primary-navy" />
                    </div>
                    <h4 className="font-semibold text-primary-navy mb-2">{credential.type}</h4>
                    <p className="text-sm text-primary-charcoal mb-1">{credential.authority}</p>
                    <p className="text-xs text-primary-gold font-medium">{credential.status} ({credential.year})</p>
                  </div>
                ))
              }
            </div>
          </div>

          {/* Collective Expertise */}
          <div className="bg-primary-navy p-8 text-center rounded-xl">
            <h3 className="text-2xl font-bold text-primary-white mb-6">Collective Expertise</h3>
            <p className="text-primary-silver leading-relaxed max-w-4xl mx-auto">
              Our &apos;remote collective&apos; model allows us to tap into a diverse pool of top-tier talent, ensuring agile, 
              innovative, and geographically diverse problem-solving capabilities. We pride ourselves on our strategic 
              thinking, proven methodologies, and a relentless pursuit of excellence that transcends specific industry 
              boundaries, delivering tangible value for both our partners and our collaborators.
            </p>
          </div>
        </div>
      </section>

      {/* Our Philosophy Section */}
      <section id="philosophy-section" className="bg-primary-navy py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-primary-white mb-8">
              Our Commitment: Partnership, Innovation & Impact.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Users,
                title: 'Long-Term Partnerships',
                description: 'Building enduring relationships based on trust, mutual respect, and shared growth.'
              },
              {
                icon: Lightbulb,
                title: 'Innovation',
                description: 'Continuously exploring cutting-edge digital strategies, technologies, and partnership models.'
              },
              {
                icon: TrendingUp,
                title: 'Mutual Success',
                description: 'Our growth is intrinsically linked to our partners\' and collaborators\' success.'
              },
              {
                icon: Globe,
                title: 'Commitment to Pakistan',
                description: 'Dedicated to fostering digital economic growth, creating opportunities nationwide, and attracting impactful partnerships.'
              }
            ].map((item, index) => (
              <div key={index} className="bg-primary-platinum p-6 text-center hover:transform hover:scale-105 transition-all duration-300 rounded-xl">
                <div className="w-16 h-16 mx-auto mb-4 bg-primary-gold flex items-center justify-center">
                  <item.icon className="w-8 h-8 text-primary-navy" />
                </div>
                <h3 className="text-xl font-semibold text-primary-navy mb-3">{item.title}</h3>
                <p className="text-primary-charcoal text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
