export default function PrivacyPage() {
  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <section className="bg-primary-navy py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-primary-white mb-8">
              Privacy Policy
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
                <h2 className="text-2xl font-bold text-primary-navy mb-4">Introduction</h2>
                <p className="text-primary-charcoal leading-relaxed">
                  At Hawlton, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, use our services, or engage with us as a partner or investor.
                </p>
              </div>

              {/* Information We Collect */}
              <div>
                <h2 className="text-2xl font-bold text-primary-navy mb-4">Information We Collect</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold text-primary-navy mb-2">Personal Information</h3>
                    <p className="text-primary-charcoal leading-relaxed mb-2">
                      We may collect personal information that you voluntarily provide to us, including:
                    </p>
                    <ul className="list-disc pl-6 text-primary-charcoal space-y-1">
                      <li>Name, email address, and contact information</li>
                      <li>Business information and professional details</li>
                      <li>Investment preferences and financial information (for investors)</li>
                      <li>Partnership inquiry details and business requirements</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-primary-navy mb-2">Automatically Collected Information</h3>
                    <p className="text-primary-charcoal leading-relaxed mb-2">
                      When you visit our website, we may automatically collect:
                    </p>
                    <ul className="list-disc pl-6 text-primary-charcoal space-y-1">
                      <li>IP address and browser information</li>
                      <li>Usage data and website analytics</li>
                      <li>Cookies and similar tracking technologies</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* How We Use Information */}
              <div>
                <h2 className="text-2xl font-bold text-primary-navy mb-4">How We Use Your Information</h2>
                <p className="text-primary-charcoal leading-relaxed mb-4">
                  We use the collected information for the following purposes:
                </p>
                <ul className="list-disc pl-6 text-primary-charcoal space-y-2">
                  <li>To provide and improve our services and partnership opportunities</li>
                  <li>To communicate with you about investment and partnership opportunities</li>
                  <li>To process inquiries and respond to your requests</li>
                  <li>To conduct due diligence for potential partnerships and investments</li>
                  <li>To comply with legal obligations and regulatory requirements</li>
                  <li>To analyze and improve our website and user experience</li>
                </ul>
              </div>

              {/* Information Sharing */}
              <div>
                <h2 className="text-2xl font-bold text-primary-navy mb-4">Information Sharing and Disclosure</h2>
                <p className="text-primary-charcoal leading-relaxed mb-4">
                  We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except in the following circumstances:
                </p>
                <ul className="list-disc pl-6 text-primary-charcoal space-y-2">
                  <li>With trusted service providers who assist in our operations</li>
                  <li>When required by law or to protect our legal rights</li>
                  <li>In connection with a business transfer or merger</li>
                  <li>With your explicit consent for specific purposes</li>
                </ul>
              </div>

              {/* Data Security */}
              <div>
                <h2 className="text-2xl font-bold text-primary-navy mb-4">Data Security</h2>
                <p className="text-primary-charcoal leading-relaxed">
                  We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of internet transmission or electronic storage is 100% secure.
                </p>
              </div>

              {/* Your Rights */}
              <div>
                <h2 className="text-2xl font-bold text-primary-navy mb-4">Your Rights and Choices</h2>
                <p className="text-primary-charcoal leading-relaxed mb-4">
                  You have the right to:
                </p>
                <ul className="list-disc pl-6 text-primary-charcoal space-y-2">
                  <li>Access and update your personal information</li>
                  <li>Request deletion of your personal data</li>
                  <li>Opt-out of marketing communications</li>
                  <li>Request information about how your data is processed</li>
                </ul>
              </div>

              {/* Contact Information */}
              <div>
                <h2 className="text-2xl font-bold text-primary-navy mb-4">Contact Us</h2>
                <p className="text-primary-charcoal leading-relaxed">
                  If you have any questions about this Privacy Policy or our data practices, please contact us at:
                </p>
                <div className="mt-4 p-4 bg-primary-silver/10 rounded-lg">
                  <p className="text-primary-charcoal">
                    <strong>Email:</strong> privacy@hawlton.com<br/>
                    <strong>Address:</strong> Karachi, Pakistan
                  </p>
                </div>
              </div>

              {/* Updates */}
              <div>
                <h2 className="text-2xl font-bold text-primary-navy mb-4">Updates to This Policy</h2>
                <p className="text-primary-charcoal leading-relaxed">
                  We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &quot;Last updated&quot; date.
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
