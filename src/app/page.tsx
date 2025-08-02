import { Metadata } from "next";
import { Suspense } from "react";
import { ChevronRight, Award, Users, Target, TrendingUp, Building2, Shield, Zap, Globe, ArrowRight, Star, CheckCircle, Handshake, Building, Sparkles, Rocket, Map, Lightbulb, BarChart3, ShoppingCart, Truck, Play, CheckCircle2, MapPin, Phone } from 'lucide-react'
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import AnimatedStats from "@/components/AnimatedStats";
import PageLoader from "@/components/ui/PageLoader";
import HeroSection from "@/components/HeroSection";
import HeroSectionWithProps from "@/components/HeroSectionWithProps";
import MediaMentions from "@/components/MediaMentions";
import ComparisonMatrix from "@/components/ComparisonMatrix";
import VideoTestimonials from "@/components/VideoTestimonials";

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
          secondaryAction={{
            text: "Calculate Your Revenue Potential",
            href: "/partnership",
          }}
          backgroundImage="/images/backgrounds/hero-home.png"
        />

        {/* 2. PROBLEM NARRATIVE - Immediate engagement after hero */}
        {/* The Crisis That Changed Everything */}
        <section className="py-20 bg-primary-navy text-primary-white">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl font-bold text-primary-white mb-8">
                The Crisis That Changed Everything.
              </h2>
              <p className="text-xl text-primary-white/90 leading-relaxed mb-8">
                <strong>"We watched talented Pakistani entrepreneurs slowly suffocate in their local markets."</strong>
              </p>
              <div className="grid md:grid-cols-2 gap-8 mb-8 text-left">
                <div className="bg-red-900/30 border-l-4 border-red-400 p-6 rounded-r-lg backdrop-blur-sm">
                  <h3 className="text-lg font-bold text-red-300 mb-3">The Pain We Witnessed</h3>
                  <ul className="space-y-2 text-primary-white/80">
                    <li className="flex items-start"><span className="text-red-400 mr-2">•</span>Brilliant artisans with 5-10 customers per month</li>
                    <li className="flex items-start"><span className="text-red-400 mr-2">•</span>Quality manufacturers competing on price alone</li>
                    <li className="flex items-start"><span className="text-red-400 mr-2">•</span>Traditional businesses watching younger competitors fail online</li>
                    <li className="flex items-start"><span className="text-red-400 mr-2">•</span>Customers paying premium for imports while local quality goes unseen</li>
                  </ul>
                </div>
                <div className="bg-green-900/30 border-l-4 border-green-400 p-6 rounded-r-lg backdrop-blur-sm">
                  <h3 className="text-lg font-bold text-green-300 mb-3">The Solution We Built</h3>
                  <ul className="space-y-2 text-primary-white/80">
                    <li className="flex items-start"><span className="text-green-400 mr-2">•</span>Professional digital infrastructure with zero upfront cost</li>
                    <li className="flex items-start"><span className="text-green-400 mr-2">•</span>Nationwide customer reach for local businesses</li>
                    <li className="flex items-start"><span className="text-green-400 mr-2">•</span>Profit-sharing model that aligns our success with yours</li>
                    <li className="flex items-start"><span className="text-green-400 mr-2">•</span>Complete digital management so you focus on what you do best</li>
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
        <section className="py-20 bg-primary-platinum">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="text-4xl font-bold text-primary-navy mb-8">
                How Our Business Model Works.
              </h2>
              <p className="text-xl text-primary-charcoal leading-relaxed mb-12">
                We're building a partnership model that eliminates upfront investment risks. Our vision is to create
                comprehensive e-commerce solutions where we handle digital infrastructure while you focus on your
                products. Together, we share in the growth and success of your expanded market reach.
              </p>
            </div>
            
            {/* Three Steps Visual */}
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <Card className="text-center hover:shadow-lg transition-shadow" padding="lg">
                <div className="w-16 h-16 bg-primary-gold rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-primary-navy">1</span>
                </div>
                <h3 className="text-xl font-bold text-primary-navy mb-4">Your Expertise</h3>
                <p className="text-primary-charcoal">Your proven business model and exceptional products</p>
              </Card>
              
              <Card className="text-center hover:shadow-lg transition-shadow" padding="lg">
                <div className="w-16 h-16 bg-primary-gold rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-primary-navy">+</span>
                </div>
                <h3 className="text-xl font-bold text-primary-navy mb-4">Our Platform</h3>
                <p className="text-primary-charcoal">Complete digital infrastructure and nationwide reach</p>
              </Card>
              
              <Card className="text-center hover:shadow-lg transition-shadow" padding="lg">
                <div className="w-16 h-16 bg-primary-gold rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-primary-navy">=</span>
                </div>
                <h3 className="text-xl font-bold text-primary-navy mb-4">Shared Success</h3>
                <p className="text-primary-charcoal">Exponential growth for both partners</p>
              </Card>
            </div>
          </div>
        </section>

        {/* The Hawlton Advantage Section */}
        <section className="py-20 bg-primary-navy text-primary-white">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl font-bold text-primary-white mb-8">
                A Partnership with Zero Digital Headaches.
              </h2>
              <p className="text-xl text-primary-white/90 leading-relaxed mb-12">
                We provide a complete digital ecosystem for your business, from a professional 
                e-commerce platform and targeted marketing to nationwide logistics. The best part? 
                There is no upfront investment required from your side. We absorb the costs and 
                handle the complexities of digital management, allowing you to focus on your core 
                business and products.
              </p>
              
              {/* Key Benefits Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                <div className="text-center">
                  <div className="w-20 h-20 bg-primary-gold rounded-lg flex items-center justify-center mx-auto mb-4">
                    <ShoppingCart className="w-10 h-10 text-primary-navy" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">Professional Platform</h3>
                  <p className="text-sm text-primary-white/80">Enterprise-grade e-commerce solution</p>
                </div>
                
                <div className="text-center">
                  <div className="w-20 h-20 bg-primary-gold rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Target className="w-10 h-10 text-primary-navy" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">Targeted Marketing</h3>
                  <p className="text-sm text-primary-white/80">Data-driven customer acquisition</p>
                </div>
                
                <div className="text-center">
                  <div className="w-20 h-20 bg-primary-gold rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Truck className="w-10 h-10 text-primary-navy" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">Nationwide Logistics</h3>
                  <p className="text-sm text-primary-white/80">Seamless delivery across Pakistan</p>
                </div>
                
                <div className="text-center">
                  <div className="w-20 h-20 bg-primary-gold rounded-lg flex items-center justify-center mx-auto mb-4">
                    <BarChart3 className="w-10 h-10 text-primary-navy" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">Zero Investment</h3>
                  <p className="text-sm text-primary-white/80">We handle all upfront costs</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. MARKET OPPORTUNITY DATA SECTION */}
        <section id="market-data" className="py-20 bg-primary-white">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto text-center mb-16">
              <h2 className="text-4xl font-bold text-primary-navy mb-8">
                Pakistan's Massive Digital Commerce Opportunity
              </h2>
              <p className="text-xl text-primary-charcoal max-w-3xl mx-auto mb-8">
                While global e-commerce thrives, Pakistan's digital market remains vastly underpenetrated. 
                The data reveals an unprecedented opportunity for first-movers.
              </p>
              <div className="text-sm text-primary-silver mb-8">
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
            <div className="grid md:grid-cols-3 gap-8 mt-16 max-w-6xl mx-auto">
              <Card className="text-center hover:shadow-lg transition-shadow" padding="md">
                <div className="w-16 h-16 bg-primary-gold/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-primary-navy" />
                </div>
                <h3 className="text-xl font-bold text-primary-navy mb-3">Digital Payment Surge</h3>
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
<section id="market-data" className="py-20 bg-primary-white">
  <div className="container mx-auto px-6">
    <div className="max-w-6xl mx-auto text-center mb-16">
      <h2 className="text-4xl font-bold text-primary-navy mb-8">
        Pakistan's Massive Digital Commerce Opportunity
      </h2>
      <p className="text-xl text-primary-charcoal max-w-3xl mx-auto mb-8">
        While global e-commerce thrives, Pakistan's digital market remains vastly underpenetrated. 
        The data reveals an unprecedented opportunity for first-movers.
      </p>
      <div className="text-sm text-primary-silver mb-8">
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
    <div className="grid md:grid-cols-3 gap-8 mt-16 max-w-6xl mx-auto">
      <Card className="text-center hover:shadow-lg transition-shadow" padding="md">
        <div className="w-16 h-16 bg-primary-gold/20 rounded-lg flex items-center justify-center mx-auto mb-4">
          <TrendingUp className="w-8 h-8 text-primary-navy" />
        </div>
        <h3 className="text-xl font-bold text-primary-navy mb-3">Digital Payment Surge</h3>
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
<section className="py-20 bg-primary-platinum">
  <div className="container mx-auto px-6">
    <div className="max-w-6xl mx-auto text-center mb-16">
      <h2 className="text-4xl font-bold text-primary-navy mb-8">
        Building Pakistan's Digital Future with Integrity
      </h2>
      <p className="text-xl text-primary-charcoal max-w-3xl mx-auto">
        Our approach is founded on transparency, deep market research, 
        and an unwavering commitment to your success. We're building something new together.
      </p>
    </div>
    
    {/* Enhanced Credibility Grid */}
    <div className="grid md:grid-cols-3 gap-10 mb-16">
      <Card className="text-center hover:shadow-xl transition-all duration-300 border-2 border-primary-gold/20 hover:border-primary-gold rounded-xl" padding="lg">
        <div className="w-20 h-20 bg-primary-navy/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <Shield className="w-10 h-10 text-primary-navy" />
        </div>
        <h3 className="text-xl font-bold text-primary-navy mb-4">Registered & Compliant</h3>
        <p className="text-primary-charcoal text-base leading-relaxed mb-4">
          Fully registered Pakistani business entity operating under local regulations and international digital commerce standards.
        </p>
        <div className="text-sm text-primary-gold font-medium">SECP Registered • PKI Compliant</div>
      </Card>
      
      <Card className="text-center hover:shadow-xl transition-all duration-300 border-2 border-primary-gold/20 hover:border-primary-gold rounded-xl" padding="lg">
        <div className="w-20 h-20 bg-primary-navy/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <TrendingUp className="w-10 h-10 text-primary-navy" />
        </div>
        <h3 className="text-xl font-bold text-primary-navy mb-4">Market Research Driven</h3>
        <p className="text-primary-charcoal text-base leading-relaxed mb-4">
          Our strategies are built on comprehensive analysis of Pakistan's digital economy using data from State Bank, PBS, and international sources.
        </p>
        <div className="text-sm text-primary-gold font-medium">Research-Based Approach</div>
      </Card>
      
      <Card className="text-center hover:shadow-xl transition-all duration-300 border-2 border-primary-gold/20 hover:border-primary-gold rounded-xl" padding="lg">
        <div className="w-20 h-20 bg-primary-navy/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <Users className="w-10 h-10 text-primary-navy" />
        </div>
        <h3 className="text-xl font-bold text-primary-navy mb-4">Founder Expertise</h3>
        <p className="text-primary-charcoal text-base leading-relaxed mb-4">
          Led by experienced entrepreneurs with proven track records in identifying market opportunities and building scalable digital businesses.
        </p>
        <div className="text-sm text-primary-gold font-medium">Jahangir Hussain • Muhammad Ismail</div>
      </Card>
    </div>
    
    {/* Enhanced Partnership Transparency */}
    <div className="bg-primary-white border-2 border-primary-gold/20 rounded-xl p-10 max-w-4xl mx-auto shadow-lg">
      <h3 className="text-2xl font-bold text-primary-navy mb-8 text-center">
        Complete Partnership Transparency
      </h3>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h4 className="text-lg font-semibold text-primary-navy mb-4">Clear Terms</h4>
          <ul className="space-y-3 text-primary-charcoal text-base">
            <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mt-1 mr-3 flex-shrink-0" />Revenue sharing model clearly defined</li>
            <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mt-1 mr-3 flex-shrink-0" />No hidden fees or surprise costs</li>
            <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mt-1 mr-3 flex-shrink-0" />Transparent reporting and analytics</li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold text-primary-navy mb-4">Protected Investment</h4>
          <ul className="space-y-3 text-primary-charcoal text-base">
            <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mt-1 mr-3 flex-shrink-0" />We invest in your success upfront</li>
            <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mt-1 mr-3 flex-shrink-0" />Comprehensive legal agreements</li>
            <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mt-1 mr-3 flex-shrink-0" />Mutual success accountability</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</section>

{/* Media Mentions - Simplified */}
<MediaMentions variant="compact" />


{/* Video Testimonials Section - Disabled until real testimonials are available */}
{/* <VideoTestimonials /> */}

{/* Comparison Matrix Section */}
<ComparisonMatrix />

{/* Final Call to Action Section */}
<section className="py-20 bg-primary-navy text-white">
  <div className="container mx-auto px-6">
    <div className="max-w-4xl mx-auto text-center">
      <h2 className="text-4xl font-bold mb-8">
        Ready to Partner with Hawlton?
      </h2>
      <p className="text-xl mb-12 max-w-3xl mx-auto">
        If you have quality products and want to sell nationwide without upfront costs, 
        let's talk. We personally vet every partner to ensure mutual success.
      </p>
      <div className="space-y-4">
        <Link href="/partnership">
          <Button 
            size="lg" 
            className="bg-primary-gold text-primary-navy hover:bg-primary-gold/90 px-12 py-4 text-lg font-bold"
          >
            Claim Your Market Position Now
          </Button>
        </Link>
        <p className="text-sm text-primary-white/70">Limited partnerships available • Personal vetting required • Zero upfront costs</p>
      </div>
    </div>
  </div>
</section>
      </div>
    </Suspense>
  );
}
