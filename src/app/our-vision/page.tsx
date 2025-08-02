import { Metadata } from "next";
import { Suspense } from "react";
import HeroSectionWithProps from "@/components/HeroSectionWithProps";
import PageLoader from "@/components/ui/PageLoader";
import { Card } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Our Vision - The Vision Beyond a Single Venture | Hawlton",
  description: "Hawlton is more than a company; it is a movement to build Pakistan's digital-first economy. Meet the architects driving digital transformation through strategic partnerships.",
  keywords: "Hawlton vision, Pakistan digital economy, Jahangir Hussain, Muhammad Ismail, digital transformation leaders, Pakistani entrepreneurs, strategic partnerships Pakistan, digital-first economy",
  openGraph: {
    title: "Our Vision - The Vision Beyond a Single Venture | Hawlton",
    description: "Hawlton is more than a company; it is a movement to build Pakistan's digital-first economy.",
    images: ["/images/backgrounds/vision-hero.jpg"],
  },
};

export default function OurVisionPage() {
  return (
    <Suspense fallback={<PageLoader isLoading={true} />}>
      <div className="min-h-screen">
        {/* Hero Section */}
        <HeroSectionWithProps
          title="The Vision Beyond a Single Venture."
          subtitle="Hawlton is more than a company; it is a movement to build Pakistan's digital-first economy."
          primaryAction={{
            text: "Explore Our Partnership Models",
            href: "/partnership",
          }}
          backgroundImage="/images/backgrounds/vision-hero.jpg"
        />

        {/* The Hawlton Story Section */}
        <section className="py-20 bg-primary-white">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl font-bold text-primary-navy mb-8">
                The Story That Started It All.
              </h2>
              <p className="text-xl text-primary-charcoal leading-relaxed mb-8">
                <strong>"Every great business starts with a moment of frustration."</strong>
              </p>
              <p className="text-lg text-primary-charcoal leading-relaxed">
                Walking through Karachi's markets, Jahangir and Muhammad Ismail kept meeting the same people: 
                incredibly talented artisans and business owners whose beautiful products never reached beyond 
                their immediate area. A jewelry maker with exquisite designs selling only to neighbors. 
                A craftsman with generations of expertise limited to word-of-mouth referrals. 
                Meanwhile, Pakistani consumers were stuck with either overpriced, poor-quality products from 
                unorganized online sellers, or expensive imported goods that didn't reflect their cultural values.
              </p>
            </div>
          </div>
        </section>

        {/* The Turning Point Section */}
        <section className="py-20 bg-primary-platinum">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl font-bold text-primary-navy mb-8">
                The Moment Everything Changed.
              </h2>
              <p className="text-xl text-primary-charcoal leading-relaxed mb-8">
                <strong>"We met Fatima, a jewelry designer in Karachi's old city."</strong>
              </p>
              <p className="text-lg text-primary-charcoal leading-relaxed">
                Her pieces were stunning—intricate artificial jewelry that rivals anything you'd find in high-end stores. 
                But she was selling them for a fraction of their worth, only to customers who happened to walk by her tiny shop. 
                When we asked why she didn't sell online, she said: "Who would trust me? And even if they did, 
                how would I handle returns, photography, marketing? I just want to make beautiful jewelry." 
                That conversation became the blueprint for Hawlton. What if we could handle everything else, 
                so talented people like Fatima could focus on what they do best?
              </p>
            </div>
          </div>
        </section>

        {/* Meet The Architects Section */}
        <section className="py-20 bg-primary-white">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-primary-navy mb-8">
                  Meet the People Behind Hawlton.
                </h2>
                <p className="text-xl text-primary-charcoal max-w-3xl mx-auto">
                  Two friends who turned their frustration with Pakistan's e-commerce scene 
                  into a mission to empower local businesses nationwide.
                </p>
              </div>

              {/* Team Member Cards */}
              <div className="grid md:grid-cols-2 gap-12">
                {/* Jahangir Hussain */}
                <Card className="p-8 text-center hover:shadow-lg transition-shadow">
                  <div className="w-32 h-32 bg-primary-gold rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-4xl font-bold text-primary-navy">JH</span>
                  </div>
                  <h3 className="text-2xl font-bold text-primary-navy mb-2">Jahangir Hussain</h3>
                  <p className="text-primary-gold font-semibold mb-4">Founder & Visionary Lead</p>
                  <p className="text-primary-charcoal leading-relaxed">
                    Strategic visionary with exceptional ability to identify market opportunities and 
                    create sustainable business models. Jahangir is the strategic mind behind Hawlton's 
                    multi-brand vision, with proven expertise in digital transformation and partnership 
                    opportunities. His role as the visionary force drives Hawlton's mission to transform 
                    Pakistan's digital economy through strategic partnerships.
                  </p>
                </Card>

                {/* Muhammad Ismail */}
                <Card className="p-8 text-center hover:shadow-lg transition-shadow">
                  <div className="w-32 h-32 bg-primary-gold rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-4xl font-bold text-primary-navy">MI</span>
                  </div>
                  <h3 className="text-2xl font-bold text-primary-navy mb-2">Muhammad Ismail</h3>
                  <p className="text-primary-gold font-semibold mb-4">Project Manager & Operational Lead</p>
                  <p className="text-primary-charcoal leading-relaxed">
                    Operational excellence expert with exceptional acumen in project management and 
                    strategic execution. Muhammad has a talent for turning ambitious strategies into 
                    flawless execution, ensuring operational excellence for every partner. His role 
                    ensures that every partnership receives the highest standards of service delivery 
                    and sustainable business growth.
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Our Mission & Values Section */}
        <section className="py-20 bg-primary-navy text-primary-white">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-primary-white mb-8">
                  Building Pakistan's Digital Future
                </h2>
                <p className="text-xl text-primary-white/90 max-w-3xl mx-auto">
                  Our mission extends beyond individual business success. We're committed to 
                  catalyzing Pakistan's digital transformation through strategic partnerships.
                </p>
              </div>

              {/* Values Grid */}
              <div className="grid md:grid-cols-3 gap-8">
                <Card className="bg-primary-white/10 backdrop-blur-sm p-6 text-center border border-primary-gold/20">
                  <div className="w-16 h-16 bg-primary-gold rounded-lg flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-primary-navy" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-primary-white mb-3">Partnership First</h3>
                  <p className="text-primary-white/80">
                    We believe in genuine partnerships where success is shared and growth is mutual.
                  </p>
                </Card>

                <Card className="bg-primary-white/10 backdrop-blur-sm p-6 text-center border border-primary-gold/20">
                  <div className="w-16 h-16 bg-primary-gold rounded-lg flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-primary-navy" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-primary-white mb-3">Innovation Focus</h3>
                  <p className="text-primary-white/80">
                    Continuous innovation in digital solutions and partnership models drives our approach.
                  </p>
                </Card>

                <Card className="bg-primary-white/10 backdrop-blur-sm p-6 text-center border border-primary-gold/20">
                  <div className="w-16 h-16 bg-primary-gold rounded-lg flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-primary-navy" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-primary-white mb-3">National Impact</h3>
                  <p className="text-primary-white/80">
                    Contributing to Pakistan's economic growth through digital transformation leadership.
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary-gold">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl font-bold text-primary-navy mb-8">
                Ready to Be Part of Our Vision?
              </h2>
              <p className="text-xl text-primary-navy/80 mb-12">
                Join us in building Pakistan's digital future through strategic partnerships 
                that create lasting value and sustainable growth.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link href="/partnership">
                  <Button 
                    size="lg" 
                    className="bg-primary-navy text-primary-white hover:bg-primary-navy/90 px-8 py-4 text-lg"
                  >
                    Explore Partnership Models
                  </Button>
                </Link>
                
                <Link href="/solutions">
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="border-primary-navy text-primary-navy hover:bg-primary-navy hover:text-primary-white px-8 py-4 text-lg"
                  >
                    View Our Solutions
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Suspense>
  );
}
