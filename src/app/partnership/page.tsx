import { Metadata } from "next";
import { Suspense } from "react";
import HeroSectionWithProps from "@/components/HeroSectionWithProps";
import PageLoader from "@/components/ui/PageLoader";
import { Card } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Link from "next/link";
import QuickPartnerForm from "@/components/forms/QuickPartnerForm";

export const metadata: Metadata = {
  title: "Partnership - Unlock Your Potential and Forge Your Future with Hawlton",
  description: "Join Pakistan's digital transformation vision. Zero upfront investment partnership opportunities with transparent growth methodology and shared success commitment.",
  keywords: "Hawlton partnership, Pakistan business partnership, digital transformation partnership, zero investment business growth, strategic partnerships Pakistan, profit sharing model Pakistan, nationwide business expansion",
  openGraph: {
    title: "Partnership - Unlock Your Potential and Forge Your Future with Hawlton",
    description: "Hawlton is actively seeking ambitious business owners to join our digital transformation journey.",
    images: ["/images/backgrounds/partnership-hero.jpg"],
  },
};

export default function PartnershipPage() {
  return (
    <Suspense fallback={<PageLoader isLoading={true} />}>
      <div className="min-h-screen">
        {/* Hero Section */}
        <HeroSectionWithProps
          title="Unlock Your Potential. Forge Your Future."
          subtitle="Hawlton is actively seeking ambitious business owners to become our next digital growth story."
          primaryAction={{
            text: "Start Your Partnership Journey",
            href: "#application",
          }}
          backgroundImage="/images/backgrounds/11.jpg"
          titleClassName="heading-hero-gold text-shadow-lg"
        />

        {/* Why Partner with Hawlton Section */}
        <section className="py-20 bg-primary-white">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold heading-75million mb-8">
                  Four Undeniable Reasons to Choose Hawlton.
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Reason 1 */}
                <Card padding="lg" className="hover:shadow-lg transition-shadow">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-primary-gold rounded-full flex items-center justify-center mr-4">
                      <span className="text-xl font-bold text-primary-navy">1</span>
                    </div>
                    <h3 className="text-2xl font-bold text-primary-navy">National Reach, Zero Risk</h3>
                  </div>
                  <p className="text-primary-charcoal leading-relaxed">
                    We eliminate the need for you to invest in a new website, digital marketing team, 
                    or logistics. We provide the full infrastructure, and you share in the profit.
                  </p>
                </Card>

                {/* Reason 2 */}
                <Card padding="lg" className="hover:shadow-lg transition-shadow">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-primary-gold rounded-full flex items-center justify-center mr-4">
                      <span className="text-xl font-bold text-primary-navy">2</span>
                    </div>
                    <h3 className="text-2xl font-bold text-primary-navy">Dedicated Digital Expertise</h3>
                  </div>
                  <p className="text-primary-charcoal leading-relaxed">
                    Our team is committed to building Pakistan's digital future through innovative methodologies 
                    and strategic market research. We're passionate about applying cutting-edge approaches to your business.
                  </p>
                </Card>

                {/* Reason 3 */}
                <Card padding="lg" className="hover:shadow-lg transition-shadow">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-primary-gold rounded-full flex items-center justify-center mr-4">
                      <span className="text-xl font-bold text-primary-navy">3</span>
                    </div>
                    <h3 className="text-2xl font-bold text-primary-navy">A Model Built for Trust</h3>
                  </div>
                  <p className="text-primary-charcoal leading-relaxed">
                    Our transparent, profit-sharing model means we are mutually invested in your success. 
                    When you grow, we grow.
                  </p>
                </Card>

                {/* Reason 4 */}
                <Card padding="lg" className="hover:shadow-lg transition-shadow">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-primary-gold rounded-full flex items-center justify-center mr-4">
                      <span className="text-xl font-bold text-primary-navy">4</span>
                    </div>
                    <h3 className="text-2xl font-bold text-primary-navy">Focus on Your Craft</h3>
                  </div>
                  <p className="text-primary-charcoal leading-relaxed">
                    Free yourself from the complexities of digital operations and focus on what you do best: 
                    creating exceptional products.
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Partnership Process Section */}
        <section className="py-20 bg-primary-platinum">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold heading-75million mb-8">
                  Your Journey to Digital Success in Three Simple Steps.
                </h2>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {/* Step 1 */}
                <Card padding="lg" className="text-center hover:shadow-lg transition-shadow">
                  <div className="w-20 h-20 bg-primary-gold rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-2xl font-bold text-primary-navy">1</span>
                  </div>
                  <h3 className="text-xl font-bold text-primary-navy mb-4">Connect & Discover</h3>
                  <p className="text-primary-charcoal leading-relaxed">
                    Fill out our form. Our team will reach out to understand your business, 
                    your products, and your growth ambitions.
                  </p>
                </Card>

                {/* Step 2 */}
                <Card padding="lg" className="text-center hover:shadow-lg transition-shadow">
                  <div className="w-20 h-20 bg-primary-gold rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-2xl font-bold text-primary-navy">2</span>
                  </div>
                  <h3 className="text-xl font-bold text-primary-navy mb-4">Strategize & Plan</h3>
                  <p className="text-primary-charcoal leading-relaxed">
                    We'll collaboratively develop a customized digital launch and growth strategy 
                    tailored specifically to your business.
                  </p>
                </Card>

                {/* Step 3 */}
                <Card padding="lg" className="text-center hover:shadow-lg transition-shadow">
                  <div className="w-20 h-20 bg-primary-gold rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-2xl font-bold text-primary-navy">3</span>
                  </div>
                  <h3 className="text-xl font-bold text-primary-navy mb-4">Launch & Grow Together</h3>
                  <p className="text-primary-charcoal leading-relaxed">
                    We launch your products on our platform, manage all digital operations, 
                    and celebrate your success as a team.
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Our Vision & Commitment Section */}
        <section className="py-20 bg-primary-navy text-primary-white">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl font-bold heading-gold-shadow mb-8">
                Our Vision for Digital Transformation.
              </h2>
              <p className="text-xl text-primary-white/90 leading-relaxed mb-12">
                We are at the beginning of an ambitious journey to revolutionize Pakistan's digital landscape. 
                Our commitment is to build genuine partnerships based on transparency, shared growth, and 
                mutual success. Every business we partner with becomes part of our collective vision for 
                Pakistan's digital future.
              </p>

              {/* Our Commitments */}
              <div className="grid md:grid-cols-4 gap-8 mb-12">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary-gold mb-2">100%</div>
                  <div className="text-primary-white/80">Transparency Commitment</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary-gold mb-2">Zero</div>
                  <div className="text-primary-white/80">Upfront Investment Required</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary-gold mb-2">24/7</div>
                  <div className="text-primary-white/80">Digital Support Vision</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary-gold mb-2">Nation</div>
                  <div className="text-primary-white/80">wide Growth Ambition</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Partnership Application Form Section */}
        <section id="application" className="py-20 bg-primary-white">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold heading-75million mb-8">
                  Let's Build Your Digital Legacy.
                </h2>
                <p className="text-xl text-primary-charcoal">
                  Ready to transform your business? Share your details and let's start this exciting journey together.
                </p>
              </div>

              <QuickPartnerForm />
            </div>
          </div>
        </section>

      </div>
    </Suspense>
  );
}
