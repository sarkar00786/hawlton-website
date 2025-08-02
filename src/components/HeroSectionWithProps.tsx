import Link from 'next/link';
import { motion } from 'framer-motion';
import Button from './ui/Button';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  primaryAction: { text: string; href: string };
  secondaryAction?: { text: string; href: string };
  backgroundImage: string;
  titleClassName?: string;
}

const HeroSectionWithProps = ({
  title,
  subtitle,
  primaryAction,
  secondaryAction,
  backgroundImage,
  titleClassName,
}: HeroSectionProps) => {
  // Function to render title with one emphasized word in gold
  const renderTitle = (title: string) => {
    // Define the word to emphasize (you can change this based on the specific title)
    const wordsToEmphasize = ['75', 'Million', 'Pakistanis'];
    const words = title.split(' ');
    
    return words.map((word, index) => {
      const cleanWord = word.replace(/[.,!?]/g, ''); // Remove punctuation for comparison
      const isEmphasized = wordsToEmphasize.includes(cleanWord);
      
      return (
        <span
          key={index}
          className={isEmphasized ? 'text-primary-gold' : 'text-primary-white'}
        >
          {word}{index < words.length - 1 ? ' ' : ''}
        </span>
      );
    });
  };

  return (
    <section
      className="relative h-[70vh] sm:h-[80vh] flex items-center justify-center bg-cover bg-center sm:bg-top pt-14"
      style={{ backgroundImage: `url('${backgroundImage}')` }}
    >
      {/* Professional overlay for better text readability */}
      <div className="absolute inset-0 bg-black/30 sm:bg-black/20"></div>
      <div className="relative z-10 text-center space-y-4 sm:space-y-8 px-4 sm:px-6">
        <h1 className={`heading-ultra-thick ${titleClassName || ''}`}>
          {renderTitle(title)}
        </h1>
        <p className="subtitle-thick text-primary-white/90 max-w-4xl mx-auto">{subtitle}</p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
          <Link href={primaryAction.href} className="w-full sm:w-auto">
            <Button className="bg-primary-navy text-white w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base">{primaryAction.text}</Button>
          </Link>
          {secondaryAction && (
            <Link href={secondaryAction.href} className="w-full sm:w-auto">
              <Button className="bg-white text-primary-navy w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base">{secondaryAction.text}</Button>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroSectionWithProps;

