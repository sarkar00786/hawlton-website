'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, MessageCircle, Plus, Minus } from 'lucide-react';

export default function ContactPage() {
  const [showContactForm, setShowContactForm] = useState(false);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(prevOpen => prevOpen === index ? null : index);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-primary-navy py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-primary-white mb-6">
            Get In Touch
          </h1>
          <p className="text-xl text-primary-silver max-w-4xl mx-auto leading-relaxed">
            Ready to transform your business or explore investment opportunities? 
            Our team is here to answer your questions and guide you towards digital success.
          </p>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="bg-primary-platinum py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-primary-navy mb-8">
            Looking for Something Specific?
          </h2>
          <p className="text-xl text-primary-charcoal mb-12 max-w-3xl mx-auto">
            Jump directly to the information you need or explore our specialized inquiry forms.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <a
              href="/partner"
              className="group bg-white rounded-xl p-8 hover:transform hover:scale-105 transition-all duration-300 shadow-sm hover:shadow-md"
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-primary-gold rounded-full flex items-center justify-center group-hover:bg-primary-gold transition-colors duration-300">
                <MessageCircle className="w-8 h-8 text-primary-navy" />
              </div>
              <h3 className="text-xl font-semibold text-primary-navy mb-2">Partnership Inquiries</h3>
              <p className="text-primary-charcoal text-sm">
                Ready to grow your business? Let&apos;s discuss partnership opportunities.
              </p>
            </a>
            
            <a
              href="/invest"
              className="group bg-white rounded-xl p-8 hover:transform hover:scale-105 transition-all duration-300 shadow-sm hover:shadow-md"
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-primary-gold rounded-full flex items-center justify-center group-hover:bg-primary-gold transition-colors duration-300">
                <Phone className="w-8 h-8 text-primary-navy" />
              </div>
              <h3 className="text-xl font-semibold text-primary-navy mb-2">Investment Opportunities</h3>
              <p className="text-primary-charcoal text-sm">
                Explore secure, high-impact investment opportunities in Pakistan&apos;s digital economy.
              </p>
            </a>
            
            <div className="group bg-white rounded-xl p-8 hover:transform hover:scale-105 transition-all duration-300 shadow-sm hover:shadow-md">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary-gold rounded-full flex items-center justify-center group-hover:bg-primary-gold transition-colors duration-300">
                <Mail className="w-8 h-8 text-primary-navy" />
              </div>
              <h3 className="text-xl font-semibold text-primary-navy mb-2">General Support</h3>
              <p className="text-primary-charcoal text-sm">
                Questions about our services? We&apos;re here to help with any inquiries.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-primary-navy py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-primary-silver leading-relaxed">
              Find quick answers to common questions about our services, processes, and partnerships.
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                question: "How quickly can we expect a response to our inquiry?",
                answer: "We typically respond to all inquiries within 24-48 hours during business days. For urgent matters, please call us directly at the phone number listed above."
              },
              {
                question: "What information should I include in my partnership inquiry?",
                answer: "Please include your business details, current digital presence, target market, expected partnership outcomes, and any specific challenges you&apos;re facing. This helps us provide more targeted recommendations."
              },
              {
                question: "What are the minimum investment requirements?",
                answer: "Investment opportunities vary based on the specific project and partnership type. We work with various investment levels and can discuss options that align with your budget and risk tolerance during our consultation."
              },
              {
                question: "Do you work with businesses outside of Karachi?",
                answer: "Yes, we serve businesses throughout Pakistan and can work remotely with clients nationwide. We also have experience with international partnerships and digital transformation projects."
              },
              {
                question: "What makes Hawlton different from other digital agencies?",
                answer: "We focus specifically on Pakistan&apos;s emerging digital economy, offering both business development services and investment opportunities. Our approach combines deep local market knowledge with international best practices."
              },
              {
                question: "Can I schedule a video consultation instead of an in-person meeting?",
                answer: "Absolutely! We offer flexible consultation options including video calls, phone meetings, and in-person sessions based on your preference and location."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white bg-opacity-10 backdrop-blur-sm border border-primary-white border-opacity-20 rounded-xl p-6 shadow-lg hover:shadow-xl hover:bg-white hover:bg-opacity-15 transition-all duration-300">
                <button onClick={() => toggleFAQ(index)} className="flex justify-between items-center w-full text-left focus:outline-none group">
                  <span className="text-lg font-semibold text-primary-white pr-4 group-hover:text-primary-gold transition-colors duration-200">{faq.question}</span>
                  <div className="flex-shrink-0 w-8 h-8 bg-primary-gold rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                    {openFAQ === index ? (
                      <Minus className="w-4 h-4 text-primary-navy" />
                    ) : (
                      <Plus className="w-4 h-4 text-primary-navy" />
                    )}
                  </div>
                </button>
                {openFAQ === index && (
                  <div className="mt-4 pt-4 border-t border-primary-white border-opacity-10">
                    <p className="text-primary-silver leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-primary-white mb-6">
              Still have questions? We&apos;re here to help.
            </p>
            <button
              onClick={() => setShowContactForm(true)}
              className="inline-flex items-center bg-primary-gold hover:bg-primary-gold text-primary-navy px-6 py-3 font-semibold transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-0"
            >
              Ask Your Question
            </button>
          </div>
        </div>
      </section>

      {/* Contact Form Section - Shows when user clicks Ask Your Question */}
      {showContactForm && (
        <section id="contact-form" className="bg-primary-platinum py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              
              {/* Contact Information */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold text-primary-navy mb-6">
                    Let&apos;s Start a Conversation
                  </h2>
                  <p className="text-lg text-primary-charcoal leading-relaxed mb-8">
                    Whether you&apos;re a business owner looking to expand digitally or an investor 
                    seeking impactful opportunities in Pakistan&apos;s growing digital economy, 
                    we&apos;re here to help you succeed.
                  </p>
                </div>

                {/* Contact Details */}
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary-gold rounded-full flex items-center justify-center">
                      <Mail className="w-6 h-6 text-primary-navy" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary-navy">Email</h3>
                      <p className="text-primary-charcoal">info@hawlton.com</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary-gold rounded-full flex items-center justify-center">
                      <Phone className="w-6 h-6 text-primary-navy" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary-navy">Phone</h3>
                      <p className="text-primary-charcoal">+92-XXX-XXXXXXX</p>
                      <p className="text-sm text-primary-silver">Available 9 AM - 6 PM PKT</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary-gold rounded-full flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-primary-navy" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary-navy">Location</h3>
                      <p className="text-primary-charcoal">Karachi, Pakistan</p>
                      <p className="text-sm text-primary-silver">Serving businesses nationwide</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary-gold rounded-full flex items-center justify-center">
                      <Clock className="w-6 h-6 text-primary-navy" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary-navy">Response Time</h3>
                      <p className="text-primary-charcoal">Within 24-48 hours</p>
                      <p className="text-sm text-primary-silver">We prioritize every inquiry</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary-gold rounded-full flex items-center justify-center">
                      <MessageCircle className="w-6 h-6 text-primary-navy" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary-navy">Live Chat</h3>
                      <p className="text-primary-charcoal">Available on this website</p>
                      <p className="text-sm text-primary-silver">Instant support for quick questions</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-white rounded-xl p-8 shadow-lg">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-primary-navy">Send Us a Message</h3>
                  <button
                    onClick={() => setShowContactForm(false)}
                    className="text-primary-silver hover:text-primary-navy transition-colors duration-200 focus:outline-none focus:ring-0"
                  >
                    ✕
                  </button>
                </div>
                
                <form name="contact" method="POST" data-netlify="true" className="space-y-6">
                  <input type="hidden" name="form-name" value="contact" />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-primary-navy mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="w-full p-3 border-2 border-primary-silver focus:outline-none focus:border-primary-dusty-teal transition-colors duration-200"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-primary-navy mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="w-full p-3 border-2 border-primary-silver focus:outline-none focus:border-primary-dusty-teal transition-colors duration-200"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-primary-navy mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        className="w-full p-3 border-2 border-primary-silver focus:outline-none focus:border-primary-dusty-teal transition-colors duration-200"
                      />
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-primary-navy mb-2">
                        Subject *
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        className="w-full p-3 border-2 border-primary-silver focus:outline-none focus:border-primary-dusty-teal transition-colors duration-200"
                        required
                      >
                        <option value="">Select a subject</option>
                        <option value="Partnership Inquiry">Partnership Inquiry</option>
                        <option value="Investment Opportunity">Investment Opportunity</option>
                        <option value="General Question">General Question</option>
                        <option value="Technical Support">Technical Support</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-primary-navy mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      className="w-full p-3 border-2 border-primary-silver focus:outline-none focus:border-primary-dusty-teal transition-colors duration-200 resize-none"
                      placeholder="Tell us about your project, goals, or questions..."
                      required
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-primary-gold hover:bg-primary-gold text-primary-navy py-4 font-bold text-lg transition-all duration-300 transform hover:scale-105"
                  >
                    Send Message
                  </button>

                  <p className="text-sm text-primary-silver text-center">
                    We respect your privacy. Your information will never be shared.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
