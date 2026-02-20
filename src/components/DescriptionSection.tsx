import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { TrendingUp, Users, Handshake } from 'lucide-react';

const cards = [
  { key: 'career', icon: TrendingUp, color: 'bg-fun-coral/10 text-fun-coral' },
  { key: 'social', icon: Users, color: 'bg-fun-teal/10 text-fun-teal' },
  { key: 'conflict', icon: Handshake, color: 'bg-fun-lavender/10 text-fun-lavender' },
];

const DescriptionSection = () => {
  const { t } = useLanguage();

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.blockquote
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mb-14 max-w-2xl rounded-3xl bg-card p-6 text-center text-base italic text-muted-foreground fun-shadow sm:text-lg"
        >
          "{t('desc.quote')}"
        </motion.blockquote>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 text-center font-display text-3xl font-extrabold text-foreground sm:text-4xl"
        >
          {t('desc.title')}
        </motion.h2>

        <div className="grid gap-5 sm:grid-cols-3">
          {cards.map(({ key, icon: Icon, color }, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-3xl border border-border bg-card p-6 fun-shadow transition-all hover:fun-shadow-hover hover:-translate-y-1"
            >
              <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl ${color}`}>
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 font-display text-lg font-bold text-foreground">
                {t(`desc.${key}`)}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {t(`desc.${key}.text`)}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mx-auto mt-10 max-w-xl text-center text-sm text-muted-foreground"
        >
          {t('desc.simulator')}
        </motion.p>
      </div>
    </section>
  );
};

export default DescriptionSection;
