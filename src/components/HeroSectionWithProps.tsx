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
      className="relative h-[70vh] flex items-center justify-center bg-cover bg-top"
      style={{ backgroundImage: `url('${backgroundImage}')` }}
    >
      {/* Professional overlay for better text readability */}
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative z-10 text-center space-y-8 px-6">
        <h1 className={`heading-ultra-thick ${titleClassName || ''}`}>
          {renderTitle(title)}
        </h1>
        <p className="subtitle-thick text-primary-white/90 max-w-4xl mx-auto">{subtitle}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href={primaryAction.href}>
            <Button className="bg-primary-navy text-white">{primaryAction.text}</Button>
          </Link>
          {secondaryAction && (
            <Link href={secondaryAction.href}>
              <Button className="bg-white text-primary-navy">{secondaryAction.text}</Button>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroSectionWithProps;

