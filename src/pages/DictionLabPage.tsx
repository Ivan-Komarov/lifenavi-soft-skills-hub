import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';
import { Mic, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { supabase } from '@/integrations/supabase/client';

const sampleTexts = {
  en: 'The quick brown fox jumps over the lazy dog near the riverbank.',
  ua: 'Швидка руда лисиця перестрибує через лінивого собаку біля берега річки.',
};

const DictionLabPage = () => {
  const { t, lang } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [recording, setRecording] = useState(false);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [score] = useState(() => Math.floor(Math.random() * 30) + 70);

  const handleMicClick = async () => {
    if (!user) {
      navigate('/auth');
      return;
    }

    if (recording) {
      setRecording(false);
      // Save progress
      await supabase.from('course_progress').upsert(
        { user_id: user.id, course_key: 'train_diction', progress_percent: Math.min(score, 100), last_accessed: new Date().toISOString() },
        { onConflict: 'user_id,course_key' }
      );
      setShowAnalysis(true);
    } else {
      setRecording(true);
    }
  };

  if (showAnalysis) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 pt-24 pb-16 flex flex-col items-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 font-display text-3xl font-extrabold text-foreground sm:text-4xl"
          >
            {t('diction.analysis')}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="mb-8 rounded-3xl border border-border bg-card p-8 fun-shadow text-center w-full max-w-sm"
          >
            <h2 className="mb-3 font-display text-lg font-bold text-foreground">{t('diction.score')}</h2>
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10">
              <span className="font-display text-3xl font-extrabold text-primary">{score}</span>
            </div>
          </motion.div>

          <div className="flex flex-col gap-3 w-full max-w-sm sm:flex-row">
            <Button className="flex-1 rounded-full font-bold" onClick={() => { setShowAnalysis(false); setRecording(false); }}>
              {t('diction.retry')}
            </Button>
            <Link to="/training" className="flex-1">
              <Button variant="outline" className="w-full rounded-full font-bold">
                {t('diction.back_trainings')}
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-16 flex flex-col items-center">
        <Link to="/training" className="self-start mb-6 inline-flex items-center gap-1 text-sm font-semibold text-muted-foreground hover:text-primary transition-colors">
          <ArrowLeft className="h-4 w-4" />
          {t('train.back_to_training')}
        </Link>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 font-display text-3xl font-extrabold text-foreground sm:text-4xl text-center"
        >
          {t('train.diction')}
        </motion.h1>

        {/* Scrolling text */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12 w-full max-w-xl overflow-hidden rounded-2xl border border-border bg-card p-6 fun-shadow"
        >
          <div className="overflow-hidden">
            <motion.p
              animate={{ x: recording ? [0, -200, 0] : 0 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              className="whitespace-nowrap text-lg font-semibold text-foreground"
            >
              {sampleTexts[lang]}
            </motion.p>
          </div>
        </motion.div>

        {/* Mic button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          onClick={handleMicClick}
          className={`flex h-28 w-28 items-center justify-center rounded-full transition-all sm:h-32 sm:w-32 ${
            recording
              ? 'bg-destructive text-destructive-foreground animate-pulse shadow-lg shadow-destructive/30'
              : 'bg-primary text-primary-foreground hover:scale-105 fun-shadow hover:fun-shadow-hover'
          }`}
        >
          <Mic className="h-12 w-12 sm:h-14 sm:w-14" />
        </motion.button>
        <p className="mt-4 text-sm font-semibold text-muted-foreground">
          {recording ? t('diction.recording') : t('diction.tap_mic')}
        </p>
      </main>
      <Footer />
    </div>
  );
};

export default DictionLabPage;
