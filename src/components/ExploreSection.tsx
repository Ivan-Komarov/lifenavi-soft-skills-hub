import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { BookOpen, Dumbbell, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ExploreSection = () => {
  const { t } = useLanguage();

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 text-center font-display text-3xl font-extrabold text-foreground sm:text-4xl"
        >
          {t('home.explore')}
        </motion.h2>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Education Block */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Link
              to="/education"
              className="group flex flex-col items-center gap-5 rounded-3xl p-10 text-center gradient-coral-yellow text-primary-foreground fun-shadow transition-all hover:fun-shadow-hover hover:-translate-y-1 hover:scale-[1.02]"
            >
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary-foreground/20 transition-transform group-hover:animate-wiggle">
                <BookOpen className="h-10 w-10" />
              </div>
              <h3 className="font-display text-2xl font-extrabold sm:text-3xl">
                {t('home.edu.title')}
              </h3>
              <p className="max-w-sm text-sm font-medium opacity-90">
                {t('home.edu.desc')}
              </p>
              <div className="mt-2 flex items-center gap-2 rounded-full bg-primary-foreground/20 px-5 py-2 text-sm font-bold transition-all group-hover:bg-primary-foreground/30">
                {t('home.letsgo')}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          </motion.div>

          {/* Training Block */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Link
              to="/training"
              className="group flex flex-col items-center gap-5 rounded-3xl p-10 text-center gradient-teal-lavender text-primary-foreground fun-shadow-teal transition-all hover:fun-shadow-hover hover:-translate-y-1 hover:scale-[1.02]"
            >
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-secondary-foreground/20 transition-transform group-hover:animate-wiggle">
                <Dumbbell className="h-10 w-10 text-primary-foreground" />
              </div>
              <h3 className="font-display text-2xl font-extrabold sm:text-3xl">
                {t('home.train.title')}
              </h3>
              <p className="max-w-sm text-sm font-medium opacity-90">
                {t('home.train.desc')}
              </p>
              <div className="mt-2 flex items-center gap-2 rounded-full bg-secondary-foreground/20 px-5 py-2 text-sm font-bold transition-all group-hover:bg-secondary-foreground/30">
                {t('home.letsgo')}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ExploreSection;
