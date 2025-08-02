import { Accordion, AccordionItem, AccordionHeader, AccordionContent } from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';

const FAQSection = () => {
  return (
    <div className="bg-primary-platinum py-12 sm:py-16 lg:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary-navy mb-4 sm:mb-6 lg:mb-8 leading-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-base sm:text-lg text-primary-charcoal max-w-2xl mx-auto leading-relaxed px-2">
            We are here to help. If you have any questions, you might find the answers here!
          </p>
        </div>
        <Accordion className="space-y-3 sm:space-y-4" type="single">
          <AccordionItem value="item-1" className="border-b border-gray-200 pb-3 sm:pb-4">
            <AccordionHeader>
              <button 
                className="flex justify-between items-start w-full text-left p-3 sm:p-4 rounded-lg hover:bg-primary-white/50 transition-colors duration-200 group"
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
                <span className="font-semibold text-base sm:text-lg text-primary-navy pr-4 leading-snug">What is Hawlton's mission?</span>
                <ChevronDown className="w-5 h-5 text-primary-navy mt-0.5 flex-shrink-0 group-hover:text-primary-gold transition-colors duration-200" />
              </button>
            </AccordionHeader>
            <AccordionContent className="mt-2 px-3 sm:px-4 pb-2 sm:pb-3 text-sm sm:text-base text-primary-charcoal leading-relaxed">
              Our mission is to transform Pakistan's digital economy by empowering businesses through strategic partnerships and innovative solutions.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2" className="border-b border-gray-200 pb-3 sm:pb-4">
            <AccordionHeader>
              <button 
                className="flex justify-between items-start w-full text-left p-3 sm:p-4 rounded-lg hover:bg-primary-white/50 transition-colors duration-200 group"
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
                <span className="font-semibold text-base sm:text-lg text-primary-navy pr-4 leading-snug">How can I start a partnership with Hawlton?</span>
                <ChevronDown className="w-5 h-5 text-primary-navy mt-0.5 flex-shrink-0 group-hover:text-primary-gold transition-colors duration-200" />
              </button>
            </AccordionHeader>
            <AccordionContent className="mt-2 px-3 sm:px-4 pb-2 sm:pb-3 text-sm sm:text-base text-primary-charcoal leading-relaxed">
              Visit our partnership page and fill in the inquiry form. Our team will get back to you shortly to explore the possibilities.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3" className="border-b border-gray-200 pb-3 sm:pb-4">
            <AccordionHeader>
              <button 
                className="flex justify-between items-start w-full text-left p-3 sm:p-4 rounded-lg hover:bg-primary-white/50 transition-colors duration-200 group"
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
                <span className="font-semibold text-base sm:text-lg text-primary-navy pr-4 leading-snug">What services do you offer?</span>
                <ChevronDown className="w-5 h-5 text-primary-navy mt-0.5 flex-shrink-0 group-hover:text-primary-gold transition-colors duration-200" />
              </button>
            </AccordionHeader>
            <AccordionContent className="mt-2 px-3 sm:px-4 pb-2 sm:pb-3 text-sm sm:text-base text-primary-charcoal leading-relaxed">
              We offer a range of services, including digital transformation, strategic business partnerships, and e-commerce development.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default FAQSection;

