import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';
import { Mic, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { supabase } from '@/integrations/supabase/client';

const SpeechCoachPage = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [recording, setRecording] = useState(false);
  const [showAnalysis, setShowAnalysis] = useState(false);

  const metrics = [
    { key: 'speech.metric_clarity', value: 78 },
    { key: 'speech.metric_pace', value: 85 },
    { key: 'speech.metric_confidence', value: 62 },
  ];

  const handleMicClick = async () => {
    if (!user) {
      navigate('/auth');
      return;
    }

    if (recording) {
      setRecording(false);
      const avg = Math.round(metrics.reduce((s, m) => s + m.value, 0) / metrics.length);
      await supabase.from('course_progress').upsert(
        { user_id: user.id, course_key: 'train_speech', progress_percent: avg, last_accessed: new Date().toISOString() },
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
        <main className="container mx-auto px-4 pt-24 pb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 font-display text-3xl font-extrabold text-foreground sm:text-4xl text-center"
          >
            {t('diction.analysis')}
          </motion.h1>

          {/* 3 metric blocks */}
          <div className="mb-8 grid gap-4 sm:grid-cols-3 max-w-2xl mx-auto">
            {metrics.map(({ key, value }, i) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl border border-border bg-card p-5 fun-shadow text-center"
              >
                <h3 className="mb-3 font-display text-sm font-bold text-foreground">{t(key)}</h3>
                <Progress value={value} className="mb-2 h-3" />
                <p className="text-lg font-extrabold text-primary">{value}%</p>
              </motion.div>
            ))}
          </div>

          {/* Feedback text */}
          <div className="mb-8 max-w-2xl mx-auto space-y-3 rounded-3xl border border-border bg-card p-6 fun-shadow">
            <p className="text-sm text-foreground">
              <span className="font-bold">{t('speech.filler_words')}:</span>{' '}
              <span className="text-muted-foreground">{t('speech.filler_words_val')}</span>
            </p>
            <p className="text-sm text-foreground">
              <span className="font-bold">{t('speech.feedback')}:</span>{' '}
              <span className="text-muted-foreground">{t('speech.feedback_val')}</span>
            </p>
            <p className="text-sm text-foreground">
              <span className="font-bold">{t('speech.tips')}:</span>{' '}
              <span className="text-muted-foreground">{t('speech.tips_val')}</span>
            </p>
          </div>

          <div className="flex flex-col gap-3 max-w-sm mx-auto sm:flex-row">
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
          className="mb-10 font-display text-3xl font-extrabold text-foreground sm:text-4xl text-center"
        >
          {t('train.speech')}
        </motion.h1>

        <p className="mb-10 max-w-md text-center text-sm text-muted-foreground">
          {t('train.speech.desc')}
        </p>

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

export default SpeechCoachPage;
