export default function TermsPage() {
  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <section className="bg-primary-navy py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-primary-white mb-8">
              Terms & Conditions
            </h1>
            <p className="text-lg text-primary-silver">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="bg-primary-platinum py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <div className="bg-white rounded-2xl p-8 shadow-lg space-y-8">
              
              {/* Introduction */}
              <div>
                <h2 className="text-2xl font-bold text-primary-navy mb-4">Agreement to Terms</h2>
                <p className="text-primary-charcoal leading-relaxed">
                  By accessing and using the Hawlton website and services, you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our website or services. These terms apply to all visitors, users, partners, and investors who access or use our service.
                </p>
              </div>

              {/* Services */}
              <div>
                <h2 className="text-2xl font-bold text-primary-navy mb-4">Our Services</h2>
                <p className="text-primary-charcoal leading-relaxed mb-4">
                  Hawlton provides the following services:
                </p>
                <ul className="list-disc pl-6 text-primary-charcoal space-y-2">
                  <li>Digital transformation and strategic partnership services</li>
                  <li>Investment opportunities and financial services</li>
                  <li>Business consultancy and advisory services</li>
                  <li>Technology solutions and digital innovation support</li>
                </ul>
              </div>

              {/* User Responsibilities */}
              <div>
                <h2 className="text-2xl font-bold text-primary-navy mb-4">User Responsibilities</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold text-primary-navy mb-2">Account Information</h3>
                    <p className="text-primary-charcoal leading-relaxed">
                      You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account. You agree to provide accurate, current, and complete information during registration and to update such information to keep it accurate, current, and complete.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-primary-navy mb-2">Prohibited Uses</h3>
                    <p className="text-primary-charcoal leading-relaxed mb-2">
                      You may not use our services for:
                    </p>
                    <ul className="list-disc pl-6 text-primary-charcoal space-y-1">
                      <li>Any unlawful purpose or to solicit others to perform unlawful acts</li>
                      <li>Violating any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
                      <li>Infringing upon or violating our intellectual property rights or the intellectual property rights of others</li>
                      <li>Harassing, abusing, insulting, harming, defaming, slandering, disparaging, intimidating, or discriminating</li>
                      <li>Submitting false or misleading information</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Investment Terms */}
              <div>
                <h2 className="text-2xl font-bold text-primary-navy mb-4">Investment Terms</h2>
                <div className="space-y-4">
                  <p className="text-primary-charcoal leading-relaxed">
                    Investment opportunities presented by Hawlton are subject to additional terms and conditions. All investments carry risk, and past performance does not guarantee future results.
                  </p>
                  <div className="bg-primary-gold/10 border-l-4 border-primary-gold p-4 rounded">
                    <p className="text-primary-charcoal font-semibold">
                      <strong>Important:</strong> Investment advice and opportunities are provided for informational purposes only. You should consult with qualified financial advisors before making any investment decisions.
                    </p>
                  </div>
                </div>
              </div>

              {/* Partnership Terms */}
              <div>
                <h2 className="text-2xl font-bold text-primary-navy mb-4">Partnership Terms</h2>
                <p className="text-primary-charcoal leading-relaxed">
                  Partnership agreements with Hawlton are subject to separate contractual terms and conditions. Initial consultations and discussions do not constitute a binding agreement until formal partnership documents are executed.
                </p>
              </div>

              {/* Intellectual Property */}
              <div>
                <h2 className="text-2xl font-bold text-primary-navy mb-4">Intellectual Property Rights</h2>
                <p className="text-primary-charcoal leading-relaxed">
                  The content, features, and functionality of our website are owned by Hawlton and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws. You may not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, store, or transmit any of the material on our website without our prior written consent.
                </p>
              </div>

              {/* Disclaimers */}
              <div>
                <h2 className="text-2xl font-bold text-primary-navy mb-4">Disclaimers</h2>
                <div className="space-y-4">
                  <p className="text-primary-charcoal leading-relaxed">
                    The information on this website is provided on an &quot;as is&quot; basis. To the fullest extent permitted by law, Hawlton excludes all representations, warranties, conditions, and duties, and all liability for damages arising out of or in connection with your use of this website.
                  </p>
                  <div className="bg-primary-silver/10 p-4 rounded-lg">
                    <p className="text-primary-charcoal text-sm">
                      <strong>No Warranty:</strong> We do not warrant that the website will be uninterrupted, timely, secure, or error-free.
                    </p>
                  </div>
                </div>
              </div>

              {/* Limitation of Liability */}
              <div>
                <h2 className="text-2xl font-bold text-primary-navy mb-4">Limitation of Liability</h2>
                <p className="text-primary-charcoal leading-relaxed">
                  In no event shall Hawlton, its directors, employees, partners, agents, suppliers, or affiliates be liable for any indirect, incidental, punitive, consequential, or special damages arising out of or in connection with your use of our website or services.
                </p>
              </div>

              {/* Governing Law */}
              <div>
                <h2 className="text-2xl font-bold text-primary-navy mb-4">Governing Law</h2>
                <p className="text-primary-charcoal leading-relaxed">
                  These Terms and Conditions are governed by and construed in accordance with the laws of Pakistan. You agree to submit to the exclusive jurisdiction of the courts located in Karachi, Pakistan for the resolution of any disputes.
                </p>
              </div>

              {/* Changes to Terms */}
              <div>
                <h2 className="text-2xl font-bold text-primary-navy mb-4">Changes to Terms</h2>
                <p className="text-primary-charcoal leading-relaxed">
                  We reserve the right to modify these Terms and Conditions at any time. We will notify users of any changes by posting the new Terms and Conditions on this page and updating the &quot;Last updated&quot; date. Your continued use of our services after such modifications constitutes acceptance of the updated terms.
                </p>
              </div>

              {/* Contact Information */}
              <div>
                <h2 className="text-2xl font-bold text-primary-navy mb-4">Contact Information</h2>
                <p className="text-primary-charcoal leading-relaxed">
                  If you have any questions about these Terms and Conditions, please contact us at:
                </p>
                <div className="mt-4 p-4 bg-primary-silver/10 rounded-lg">
                  <p className="text-primary-charcoal">
                    <strong>Email:</strong> legal@hawlton.com<br/>
                    <strong>General Inquiries:</strong> info@hawlton.com<br/>
                    <strong>Address:</strong> Karachi, Pakistan
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
