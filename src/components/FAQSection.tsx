import { Accordion, AccordionItem, AccordionHeader, AccordionContent } from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';

const FAQSection = () => {
  return (
    <div className="bg-primary-platinum py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-navy mb-8">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-primary-charcoal max-w-4xl mx-auto leading-relaxed">
            We are here to help. If you have any questions, you might find the answers here!
          </p>
        </div>
        <Accordion className="space-y-4" type="single">
          <AccordionItem value="item-1" className="border-b border-gray-200 pb-4">
            <AccordionHeader>
              <button 
                className="flex justify-between w-full text-left faq-button"
                onBlur={(e) => {
                  // Remove focus after interaction
                  setTimeout(() => {
                    if (e.target instanceof HTMLElement) {
                      e.target.blur();
                      e.target.style.outline = 'none';
                      e.target.style.boxShadow = 'none';
                    }
                  }, 100);
                }}
                onMouseDown={(e) => {
                  // Remove focus after click
                  setTimeout(() => {
                    if (e.target instanceof HTMLElement) {
                      e.target.blur();
                    }
                  }, 100);
                }}
              >
                <span className="font-semibold text-lg">What is Hawlton's mission?</span>
                <ChevronDown className="w-5 h-5 text-primary-navy" />
              </button>
            </AccordionHeader>
            <AccordionContent className="mt-2 pl-4 text-primary-charcoal">
              Our mission is to transform Pakistan's digital economy by empowering businesses through strategic partnerships and innovative solutions.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2" className="border-b border-gray-200 pb-4">
            <AccordionHeader>
              <button 
                className="flex justify-between w-full text-left faq-button"
                onBlur={(e) => {
                  setTimeout(() => {
                    if (e.target instanceof HTMLElement) {
                      e.target.blur();
                      e.target.style.outline = 'none';
                      e.target.style.boxShadow = 'none';
                    }
                  }, 100);
                }}
                onMouseDown={(e) => {
                  setTimeout(() => {
                    if (e.target instanceof HTMLElement) {
                      e.target.blur();
                    }
                  }, 100);
                }}
              >
                <span className="font-semibold text-lg">How can I start a partnership with Hawlton?</span>
                <ChevronDown className="w-5 h-5 text-primary-navy" />
              </button>
            </AccordionHeader>
            <AccordionContent className="mt-2 pl-4 text-primary-charcoal">
              Visit our partnership page and fill in the inquiry form. Our team will get back to you shortly to explore the possibilities.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3" className="border-b border-gray-200 pb-4">
            <AccordionHeader>
              <button 
                className="flex justify-between w-full text-left faq-button"
                onBlur={(e) => {
                  setTimeout(() => {
                    if (e.target instanceof HTMLElement) {
                      e.target.blur();
                      e.target.style.outline = 'none';
                      e.target.style.boxShadow = 'none';
                    }
                  }, 100);
                }}
                onMouseDown={(e) => {
                  setTimeout(() => {
                    if (e.target instanceof HTMLElement) {
                      e.target.blur();
                    }
                  }, 100);
                }}
              >
                <span className="font-semibold text-lg">What services do you offer?</span>
                <ChevronDown className="w-5 h-5 text-primary-navy" />
              </button>
            </AccordionHeader>
            <AccordionContent className="mt-2 pl-4 text-primary-charcoal">
              We offer a range of services, including digital transformation, strategic business partnerships, and e-commerce development.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default FAQSection;

