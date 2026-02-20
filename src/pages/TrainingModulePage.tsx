import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowLeft, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';

const modules = {
  diction: { labelKey: 'train.diction', descKey: 'train.diction.desc' },
  speech: { labelKey: 'train.speech', descKey: 'train.speech.desc' },
  interview: { labelKey: 'train.interview', descKey: 'train.interview.desc' },
} as const;

type ModuleKey = keyof typeof modules;

const TrainingModulePage = () => {
  const { moduleKey } = useParams<{ moduleKey: string }>();
  const { t } = useLanguage();
  const [input, setInput] = useState('');

  const mod = modules[moduleKey as ModuleKey];

  if (!mod) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Module not found</p>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    // TODO: process input
    setInput('');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-16">
        <Link
          to="/training"
          className="mb-6 inline-flex items-center gap-1 text-sm font-semibold text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          {t('train.back')}
        </Link>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 font-display text-3xl font-extrabold text-foreground sm:text-4xl"
        >
          {t(mod.labelKey)}
        </motion.h1>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Video area */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="overflow-hidden rounded-3xl border border-border bg-card fun-shadow"
          >
            <div className="relative aspect-video w-full bg-muted flex items-center justify-center">
              <span className="text-sm font-semibold text-muted-foreground">
                {t('train.module.video_placeholder')}
              </span>
            </div>
          </motion.div>

          {/* Text & input area */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col gap-6"
          >
            <div className="rounded-3xl border border-border bg-card p-6 fun-shadow">
              <h2 className="mb-3 font-display text-lg font-bold text-foreground">
                {t('train.module.description')}
              </h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {t(mod.descKey)}
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-3 rounded-3xl border border-border bg-card p-6 fun-shadow"
            >
              <label className="font-display text-sm font-bold text-foreground">
                {t('train.module.input_label')}
              </label>
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t('train.module.input_placeholder')}
                className="min-h-[120px] rounded-xl resize-none"
              />
              <Button type="submit" className="self-end gap-2 rounded-full font-bold">
                <Send className="h-4 w-4" />
                {t('train.module.submit')}
              </Button>
            </form>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TrainingModulePage;
