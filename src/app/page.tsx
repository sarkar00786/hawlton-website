import { Metadata } from "next";
import { Suspense } from "react";
import { ChevronRight, Award, Users, Target, TrendingUp, Building2, Shield, Zap, Globe, ArrowRight, Star, CheckCircle, Handshake, Building, Sparkles, Rocket, Map, Lightbulb, BarChart3, ShoppingCart, Truck, Play, CheckCircle2, MapPin, Phone, FileCheck, Search, FileText, AlertTriangle, TrendingDown } from 'lucide-react'
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import AnimatedStats from "@/components/AnimatedStats";
import PageLoader from "@/components/ui/PageLoader";
import HeroSectionWithProps from "@/components/HeroSectionWithProps";
import ComparisonMatrix from "@/components/ComparisonMatrix";
import VideoTestimonials from "@/components/VideoTestimonials";
import SuccessGuarantee from "@/components/SuccessGuarantee";

export const metadata: Metadata = {
  title: "Hawlton | The Future of Business is Digital. The Future of Digital is Partnership.",
  description: "We are Hawlton. We are building Pakistan's digital future, one partner at a time. Transform your business through strategic partnerships that eliminate risk and maximize growth potential.",
  keywords: "Pakistan digital transformation, strategic business partnerships, zero investment business growth, e-commerce development Pakistan, nationwide business expansion, digital economy Pakistan, profit sharing partnerships",
  openGraph: {
    title: "Hawlton | The Future of Business is Digital. The Future of Digital is Partnership.",
    description: "We are Hawlton. We are building Pakistan's digital future, one partner at a time.",
    type: 'website',
    locale: 'en_US',
    images: ["/images/backgrounds/hero-home.png"],
  },
  alternates: {
    canonical: 'https://hawlton.com'
  }
};

export default function HomePage() {
  return (
    <Suspense fallback={<PageLoader isLoading={true} />}>
      <div className="min-h-screen">
        {/* 1. HERO SECTION - Strong opener */}
        <HeroSectionWithProps
          title="75 Million Pakistanis Want What You're Selling. They Just Can't Find You."
          subtitle="Every day, these consumers search online for products they can't find from local businesses. Meanwhile, your competitors gain zero digital advantage. We change that equation—together."
          primaryAction={{
            text: "See The Untapped Opportunity",
            href: "#market-data",
          }}
          backgroundImage="/images/backgrounds/hero-home.png"
        />

        {/* 2. PROBLEM NARRATIVE - Immediate engagement after hero */}
        {/* The Crisis That Changed Everything */}
        <section className="py-12 sm:py-16 lg:py-20 bg-primary-navy text-primary-white">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold heading-gold-shadow mb-6 sm:mb-8">
                The Crisis That Changed Everything.
              </h2>
              <p className="text-lg sm:text-xl text-primary-white/90 leading-relaxed mb-6 sm:mb-8">
                <strong>"We watched talented Pakistani entrepreneurs slowly suffocate in their local markets."</strong>
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8 text-left">
                <div className="bg-primary-white/5 border border-primary-white/10 p-6 rounded-lg backdrop-blur-sm">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-primary-gold rounded-full flex items-center justify-center mr-3">
                      <AlertTriangle className="w-5 h-5 text-primary-navy" />
                    </div>
                    <h3 className="text-lg font-bold text-primary-gold mb-0">The Pain We Witnessed</h3>
                  </div>
                  <ul className="space-y-3 text-primary-white/90">
                    <li className="flex items-start"><CheckCircle2 className="w-4 h-4 text-primary-gold mr-3 mt-0.5 flex-shrink-0" />Brilliant artisans with 5-10 customers per month</li>
                    <li className="flex items-start"><CheckCircle2 className="w-4 h-4 text-primary-gold mr-3 mt-0.5 flex-shrink-0" />Quality manufacturers competing on price alone</li>
                    <li className="flex items-start"><CheckCircle2 className="w-4 h-4 text-primary-gold mr-3 mt-0.5 flex-shrink-0" />Traditional businesses watching younger competitors fail online</li>
                    <li className="flex items-start"><CheckCircle2 className="w-4 h-4 text-primary-gold mr-3 mt-0.5 flex-shrink-0" />Customers paying premium for imports while local quality goes unseen</li>
                  </ul>
                </div>
                <div className="bg-primary-white/5 border border-primary-white/10 p-6 rounded-lg backdrop-blur-sm">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-primary-gold rounded-full flex items-center justify-center mr-3">
                      <Lightbulb className="w-5 h-5 text-primary-navy" />
                    </div>
                    <h3 className="text-lg font-bold text-primary-gold mb-0">The Solution We Built</h3>
                  </div>
                  <ul className="space-y-3 text-primary-white/90">
                    <li className="flex items-start"><CheckCircle className="w-4 h-4 text-primary-gold mr-3 mt-0.5 flex-shrink-0" />Professional digital infrastructure with zero upfront cost</li>
                    <li className="flex items-start"><CheckCircle className="w-4 h-4 text-primary-gold mr-3 mt-0.5 flex-shrink-0" />Nationwide customer reach for local businesses</li>
                    <li className="flex items-start"><CheckCircle className="w-4 h-4 text-primary-gold mr-3 mt-0.5 flex-shrink-0" />Profit-sharing model that aligns our success with yours</li>
                    <li className="flex items-start"><CheckCircle className="w-4 h-4 text-primary-gold mr-3 mt-0.5 flex-shrink-0" />Complete digital management so you focus on what you do best</li>
                  </ul>
                </div>
              </div>
              <p className="text-lg text-primary-white/90 leading-relaxed italic">
                The problem wasn't the businesses or the customers—it was the missing bridge. 
                <strong className="text-primary-gold">We became that bridge.</strong>
              </p>
            </div>
          </div>
        </section>

        {/* 3. SOLUTION & VALUE PROPOSITION */}
        {/* How Our Business Model Works */}
        <section className="py-12 sm:py-16 lg:py-20 bg-primary-platinum">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-4xl mx-auto text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary-navy mb-6 sm:mb-8">
                How Our Business Model Works.
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-primary-charcoal leading-relaxed mb-8 sm:mb-12">
                We're building a partnership model that eliminates upfront investment risks. Our vision is to create
                comprehensive e-commerce solutions where we handle digital infrastructure while you focus on your
                products. Together, we share in the growth and success of your expanded market reach.
              </p>
            </div>
            
            {/* Three Steps Visual */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto">
              <Card className="text-center hover:shadow-lg transition-shadow" padding="md">
                <div className="w-12 h-12 bg-primary-gold rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-6 h-6 text-primary-navy" />
                </div>
                <h3 className="text-lg font-bold text-primary-navy mb-3">Your Expertise</h3>
                <p className="text-sm text-primary-charcoal">Your proven business model and exceptional products</p>
              </Card>
              
              <Card className="text-center hover:shadow-lg transition-shadow" padding="md">
                <div className="w-12 h-12 bg-primary-gold rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building2 className="w-6 h-6 text-primary-navy" />
                </div>
                <h3 className="text-lg font-bold text-primary-navy mb-3">Our Platform</h3>
                <p className="text-sm text-primary-charcoal">Complete digital infrastructure and nationwide reach</p>
              </Card>
              
              <Card className="text-center hover:shadow-lg transition-shadow" padding="md">
                <div className="w-12 h-12 bg-primary-gold rounded-full flex items-center justify-center mx-auto mb-4">
                  <Handshake className="w-6 h-6 text-primary-navy" />
                </div>
                <h3 className="text-lg font-bold text-primary-navy mb-3">Shared Success</h3>
                <p className="text-sm text-primary-charcoal">Exponential growth for both partners</p>
              </Card>
            </div>
          </div>
        </section>

        {/* The Hawlton Advantage Section */}
        <section className="py-12 sm:py-16 lg:py-20 bg-primary-platinum">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary-navy mb-6 sm:mb-8">
                A Partnership with Zero Digital Headaches.
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-primary-charcoal leading-relaxed mb-8 sm:mb-12">
                We provide a complete digital ecosystem for your business, from a professional 
                e-commerce platform and targeted marketing to nationwide logistics. The best part? 
                There is no upfront investment required from your side. We absorb the costs and 
                handle the complexities of digital management, allowing you to focus on your core 
                business and products.
              </p>
              
              {/* Key Benefits Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-8 sm:mb-12 max-w-6xl mx-auto">
                <Card className="text-center hover:shadow-lg transition-shadow" padding="md">
                  <div className="w-14 h-14 bg-primary-gold rounded-lg flex items-center justify-center mx-auto mb-4">
                    <ShoppingCart className="w-7 h-7 text-primary-navy" />
                  </div>
                  <h3 className="text-lg font-bold mb-3 text-primary-navy">Professional Platform</h3>
                  <p className="text-sm text-primary-charcoal leading-relaxed">Enterprise-grade e-commerce solution</p>
                </Card>
                
                <Card className="text-center hover:shadow-lg transition-shadow" padding="md">
                  <div className="w-14 h-14 bg-primary-gold rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Target className="w-7 h-7 text-primary-navy" />
                  </div>
                  <h3 className="text-lg font-bold mb-3 text-primary-navy">Targeted Marketing</h3>
                  <p className="text-sm text-primary-charcoal leading-relaxed">Data-driven customer acquisition</p>
                </Card>
                
                <Card className="text-center hover:shadow-lg transition-shadow" padding="md">
                  <div className="w-14 h-14 bg-primary-gold rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Truck className="w-7 h-7 text-primary-navy" />
                  </div>
                  <h3 className="text-lg font-bold mb-3 text-primary-navy">Nationwide Logistics</h3>
                  <p className="text-sm text-primary-charcoal leading-relaxed">Seamless delivery across Pakistan</p>
                </Card>
                
                <Card className="text-center hover:shadow-lg transition-shadow" padding="md">
                  <div className="w-14 h-14 bg-primary-gold rounded-lg flex items-center justify-center mx-auto mb-4">
                    <BarChart3 className="w-7 h-7 text-primary-navy" />
                  </div>
                  <h3 className="text-lg font-bold mb-3 text-primary-navy">Zero Investment</h3>
                  <p className="text-sm text-primary-charcoal leading-relaxed">We handle all upfront costs</p>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* 4. MARKET OPPORTUNITY DATA SECTION */}
        <section id="market-data" className="py-12 sm:py-16 lg:py-20 bg-primary-white">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-6xl mx-auto text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary-navy mb-6 sm:mb-8">
                Pakistan's Massive Digital Commerce Opportunity
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-primary-navy max-w-3xl mx-auto mb-6 sm:mb-8">
                While global e-commerce thrives, Pakistan's digital market remains vastly underpenetrated. 
                The data reveals an unprecedented opportunity for first-movers.
              </p>
              <div className="text-xs sm:text-sm text-primary-silver mb-6 sm:mb-8">
                <span className="font-medium">Sources: State Bank of Pakistan, Pakistan Bureau of Statistics, McKinsey Global Institute</span>
              </div>
            </div>
            
            {/* Primary Market Statistics */}
            <AnimatedStats 
              stats={[
                { value: "$10B", label: "Untapped E-commerce Market by 2027", suffix: "" },
                { value: "95%", label: "of SMEs Lack Digital Presence", suffix: "%" },
                { value: "40%", label: "Annual E-commerce Growth Rate", suffix: "%" },
                { value: "75M", label: "Internet Users Ready to Shop Online", suffix: "" },
              ]}
            />
            
            {/* Market Insights Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mt-12 sm:mt-16 max-w-6xl mx-auto">
              <Card className="text-center hover:shadow-lg transition-shadow" padding="md">
                <div className="w-12 sm:w-16 h-12 sm:h-16 bg-primary-gold/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-6 sm:w-8 h-6 sm:h-8 text-primary-navy" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-primary-navy mb-3">Digital Payment Surge</h3>
                <p className="text-primary-charcoal text-sm leading-relaxed mb-3">
                  Mobile banking transactions grew 67% in 2023, creating infrastructure for online commerce.
                </p>
                <div className="text-2xl font-bold text-primary-gold">PKR 14T</div>
                <div className="text-xs text-primary-silver">Digital transaction volume 2023</div>
              </Card>
              
              <Card className="text-center hover:shadow-lg transition-shadow" padding="md">
                <div className="w-16 h-16 bg-primary-gold/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-primary-navy" />
                </div>
                <h3 className="text-xl font-bold text-primary-navy mb-3">Youth Demographics</h3>
                <p className="text-primary-charcoal text-sm leading-relaxed mb-3">
                  64% of Pakistan's population is under 30, representing the most digitally-native consumer base in the region.
                </p>
                <div className="text-2xl font-bold text-primary-gold">140M</div>
                <div className="text-xs text-primary-silver">Digital-first consumers under 30</div>
              </Card>
              
              <Card className="text-center hover:shadow-lg transition-shadow" padding="md">
                <div className="w-16 h-16 bg-primary-gold/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-8 h-8 text-primary-navy" />
                </div>
                <h3 className="text-xl font-bold text-primary-navy mb-3">Regional Advantage</h3>
                <p className="text-primary-charcoal text-sm leading-relaxed mb-3">
                  Pakistan's e-commerce penetration (2.4%) lags far behind regional averages (8.1%), indicating massive catch-up potential.
                </p>
                <div className="text-2xl font-bold text-primary-gold">235%</div>
                <div className="text-xs text-primary-silver">Growth potential vs regional average</div>
              </Card>
            </div>
            
            {/* Call to Action */}
            <div className="text-center mt-12">
              <div className="bg-primary-gold/10 rounded-xl p-6 max-w-4xl mx-auto">
                <h3 className="text-2xl font-bold text-primary-navy mb-4">
                  The Window is Open. But Not Forever.
                </h3>
                <p className="text-primary-charcoal mb-6">
                  First-mover advantage in Pakistan's digital economy won't last. International players and tech giants 
                  are already eyeing this market. The businesses that act now will own their categories.
                </p>
                <Link href="/partnership">
                  <Button className="bg-primary-navy text-primary-white hover:bg-primary-navy/90 px-8 py-3">
                    Secure Your Market Position
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Trust & Authority Section */}

{/* Trust & Authority Section */}
<section className="py-12 sm:py-16 lg:py-20 bg-primary-navy text-primary-white">
  <div className="container mx-auto px-4 sm:px-6">
    <div className="max-w-6xl mx-auto text-center mb-12 sm:mb-16">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary-white heading-gold-shadow mb-6 sm:mb-8">
        Building Pakistan's Digital Future with Integrity
      </h2>
      <p className="text-base sm:text-lg lg:text-xl text-primary-white/90 max-w-3xl mx-auto">
        Our approach is founded on transparency, deep market research, 
        and an unwavering commitment to your success. We're building something new together.
      </p>
    </div>
    
    {/* Enhanced Credibility Grid */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
      <Card className="text-center hover:shadow-lg transition-shadow bg-primary-white/5 border-primary-gold/20" padding="md">
        <div className="w-12 h-12 bg-primary-gold rounded-full flex items-center justify-center mx-auto mb-4">
          <FileCheck className="w-6 h-6 text-primary-navy" />
        </div>
        <h3 className="text-lg font-bold text-primary-white mb-3">Registered & Compliant</h3>
        <p className="text-sm text-primary-white/80 leading-relaxed mb-3">
          Fully registered Pakistani business entity operating under local regulations and international digital commerce standards.
        </p>
        <div className="text-xs text-primary-gold font-medium">SECP Registered • PKI Compliant</div>
      </Card>
      
      <Card className="text-center hover:shadow-lg transition-shadow bg-primary-white/5 border-primary-gold/20" padding="md">
        <div className="w-12 h-12 bg-primary-gold rounded-full flex items-center justify-center mx-auto mb-4">
          <Search className="w-6 h-6 text-primary-navy" />
        </div>
        <h3 className="text-lg font-bold text-primary-white mb-3">Market Research Driven</h3>
        <p className="text-sm text-primary-white/80 leading-relaxed mb-3">
          Our strategies are built on comprehensive analysis of Pakistan's digital economy using data from State Bank, PBS, and international sources.
        </p>
        <div className="text-xs text-primary-gold font-medium">Research-Based Approach</div>
      </Card>
      
      <Card className="text-center hover:shadow-lg transition-shadow bg-primary-white/5 border-primary-gold/20" padding="md">
        <div className="w-12 h-12 bg-primary-gold rounded-full flex items-center justify-center mx-auto mb-4">
          <Award className="w-6 h-6 text-primary-navy" />
        </div>
        <h3 className="text-lg font-bold text-primary-white mb-3">Founder Expertise</h3>
        <p className="text-sm text-primary-white/80 leading-relaxed mb-3">
          Led by experienced entrepreneurs with proven track records in identifying market opportunities and building scalable digital businesses.
        </p>
        <div className="text-xs text-primary-gold font-medium">Jahangir Hussain • Muhammad Ismail</div>
      </Card>
    </div>
    
    {/* Enhanced Partnership Transparency */}
    <Card className="max-w-4xl mx-auto hover:shadow-lg transition-shadow bg-primary-white/5 border-primary-gold/20" padding="xl" variant="elevated">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-primary-gold rounded-lg flex items-center justify-center mx-auto mb-6">
          <Shield className="w-8 h-8 text-primary-navy" />
        </div>
        <h3 className="text-2xl font-bold text-primary-white mb-4">
          Complete Partnership Transparency
        </h3>
        <p className="text-primary-white/90 max-w-2xl mx-auto leading-relaxed">
          We believe in complete transparency and mutual success. Here's exactly what you can expect from our partnership model.
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8 mt-8">
        <div className="space-y-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-primary-gold rounded-full flex items-center justify-center">
              <FileText className="w-4 h-4 text-primary-navy" />
            </div>
            <h4 className="text-xl font-semibold text-primary-white">Clear Terms</h4>
          </div>
          <ul className="space-y-4 text-primary-white/80">
            <li className="flex items-start">
              <CheckCircle className="w-5 h-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
              <span className="text-base leading-relaxed">Revenue sharing model clearly defined with transparent calculations</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="w-5 h-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
              <span className="text-base leading-relaxed">No hidden fees or surprise costs throughout our partnership</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="w-5 h-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
              <span className="text-base leading-relaxed">Transparent reporting and real-time analytics dashboard</span>
            </li>
          </ul>
        </div>
        
        <div className="space-y-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-primary-gold rounded-full flex items-center justify-center">
              <Shield className="w-4 h-4 text-primary-navy" />
            </div>
            <h4 className="text-xl font-semibold text-primary-white">Protected Investment</h4>
          </div>
          <ul className="space-y-4 text-primary-white/80">
            <li className="flex items-start">
              <CheckCircle className="w-5 h-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
              <span className="text-base leading-relaxed">We invest in your success upfront with zero cost to you</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="w-5 h-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
              <span className="text-base leading-relaxed">Comprehensive legal agreements protecting both parties</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="w-5 h-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
              <span className="text-base leading-relaxed">Mutual success accountability with clear performance metrics</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="mt-8 pt-6 border-t border-primary-silver/20 text-center">
        <p className="text-sm text-primary-white/70 font-medium">
          🔒 All partnership terms are documented, legally binding, and designed for mutual success
        </p>
      </div>
    </Card>
  </div>
</section>

{/* Media Mentions - Removed for cleanup */}


{/* Video Testimonials Section - Disabled until real testimonials are available */}
{/* <VideoTestimonials /> */}

{/* Comparison Matrix Section */}
<ComparisonMatrix />

{/* Success Guarantee Section */}
<SuccessGuarantee className="my-20" />

{/* Final Call to Action Section */}
<section className="py-12 sm:py-16 lg:py-20 bg-primary-navy text-white">
  <div className="container mx-auto px-4 sm:px-6">
    <div className="max-w-4xl mx-auto text-center">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8">
        Ready to Partner with Hawlton?
      </h2>
      <p className="text-base sm:text-lg lg:text-xl mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed">
        If you have quality products and want to sell nationwide without upfront costs, 
        let's talk. We personally vet every partner to ensure mutual success.
      </p>
      <div className="space-y-4 sm:space-y-6">
        <Link href="/partnership" className="inline-block w-full sm:w-auto">
          <Button 
            size="lg" 
            className="bg-primary-gold text-primary-navy w-full sm:w-auto px-8 sm:px-12 py-4 sm:py-4 text-base sm:text-lg font-bold min-h-[52px] rounded-none"
          >
            Claim Your Market Position Now
          </Button>
        </Link>
        <p className="text-xs sm:text-sm text-primary-white/70 max-w-2xl mx-auto leading-relaxed">
          Limited partnerships available • Personal vetting required • Zero upfront costs
        </p>
      </div>
    </div>
  </div>
</section>
      </div>
    </Suspense>
  );
}
