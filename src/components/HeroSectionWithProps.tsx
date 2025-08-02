import Link from 'next/link';
import { motion } from 'framer-motion';
import Button from './ui/Button';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  primaryAction: { text: string; href: string };
  secondaryAction?: { text: string; href: string };
  backgroundImage: string;
}

const HeroSectionWithProps = ({
  title,
  subtitle,
  primaryAction,
  secondaryAction,
  backgroundImage,
}: HeroSectionProps) => {
  // Function to render title with one emphasized word in gold
  const renderTitle = (title: string) => {
    // Define the word to emphasize (you can change this based on the specific title)
    const wordsToEmphasize = ['Billions', 'Trapped', 'Digital', 'Revenue'];
    const words = title.split(' ');
    
    return words.map((word, index) => {
      const cleanWord = word.replace(/[.,!?]/g, ''); // Remove punctuation for comparison
      const isEmphasized = wordsToEmphasize.includes(cleanWord);
      
      return (
        <span
          key={index}
          className={isEmphasized ? 'text-primary-gold' : 'text-primary-navy'}
        >
          {word}{index < words.length - 1 ? ' ' : ''}
        </span>
      );
    });
  };

  return (
    <section
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url('${backgroundImage}')` }}
    >
      <div className="text-center space-y-8">
        <h1 className="text-6xl font-bold">
          {renderTitle(title)}
        </h1>
        <p className="text-xl text-primary-navy/80">{subtitle}</p>
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

