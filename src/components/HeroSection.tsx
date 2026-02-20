import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import logo from '@/assets/logo.png';

const HeroSection = () => {
  const { lang, t } = useLanguage();

  const videoSrc = lang === 'ua' ? '/video_ukr.mp4' : '/video_eng.mp4';

  return (
    <section className="relative min-h-[85vh] overflow-hidden pt-14">
      {/* Fun gradient blobs */}
      <div className="absolute inset-0">
        <div className="absolute -left-20 top-20 h-72 w-72 rounded-full bg-primary/10 blur-[80px] animate-float" />
        <div className="absolute right-10 top-40 h-60 w-60 rounded-full bg-secondary/10 blur-[80px] animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-20 left-1/3 h-52 w-52 rounded-full bg-accent/15 blur-[80px] animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 container mx-auto flex min-h-[calc(85vh-3.5rem)] items-center justify-center px-4">
        <div className="grid w-full max-w-5xl grid-cols-1 items-center gap-10 md:grid-cols-2">
          {/* Left: Title */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-card px-4 py-1.5 text-sm font-semibold text-primary fun-shadow">
              <Sparkles className="h-4 w-4" />
              Soft Skills Simulator
            </div>
            <div className="mb-4 flex items-center gap-3">
              <img src={logo} alt="Speachie" className="h-14 w-14 sm:h-20 sm:w-20" />
              <h1 className="text-5xl font-extrabold leading-tight gradient-text sm:text-6xl md:text-8xl">
                {t('hero.title')}
              </h1>
            </div>
            <p className="mb-4 text-xl font-bold text-foreground sm:text-2xl md:text-3xl">
              {t('hero.tagline')}
            </p>
            <p className="max-w-xl text-base text-muted-foreground sm:text-lg">
              {t('hero.subtitle')}
            </p>
          </motion.div>

          {/* Right: Video */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
            className="flex items-center justify-center"
          >
            <video
              key={videoSrc}
              src={videoSrc}
              autoPlay
              loop
              playsInline
              controls
              className="w-full max-w-md rounded-3xl"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
