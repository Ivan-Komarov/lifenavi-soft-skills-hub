import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';
import { AudioWaveform, Video, Bot, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const trainings = [
  { key: 'diction', icon: AudioWaveform, color: 'bg-fun-teal/10 text-fun-teal' },
  { key: 'speech', icon: Video, color: 'bg-fun-coral/10 text-fun-coral' },
  { key: 'interview', icon: Bot, color: 'bg-fun-lavender/10 text-fun-lavender' },
];

const TrainingPage = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleStart = async (courseKey: string) => {
    if (!user) {
      navigate('/auth');
      return;
    }
    await supabase.from('course_progress').upsert(
      { user_id: user.id, course_key: `train_${courseKey}`, progress_percent: 10, last_accessed: new Date().toISOString() },
      { onConflict: 'user_id,course_key' }
    );
    toast({ title: t('profile.started'), description: t('profile.started_desc') });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-16">
        <Link to="/" className="mb-6 inline-flex items-center gap-1 text-sm font-semibold text-muted-foreground hover:text-primary transition-colors">
          <ArrowLeft className="h-4 w-4" />
          {t('train.back')}
        </Link>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 font-display text-4xl font-extrabold text-foreground sm:text-5xl"
        >
          {t('train.title')}
        </motion.h1>

        <div className="grid gap-8 lg:grid-cols-3">
          {trainings.map(({ key, icon: Icon, color }, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.12 }}
              className="rounded-3xl border border-border bg-card p-7 fun-shadow transition-all hover:fun-shadow-hover hover:-translate-y-1"
            >
              <div className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl ${color}`}>
                <Icon className="h-7 w-7" />
              </div>
              <h3 className="mb-2 font-display text-xl font-bold text-foreground">
                {t(`train.${key}`)}
              </h3>
              <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                {t(`train.${key}.desc`)}
              </p>
              <div className="flex gap-2">
                <Button className="rounded-full font-bold" onClick={() => handleStart(key)}>
                  {t('train.start')}
                </Button>
                <Link to={`/training/${key}`}>
                  <Button variant="outline" className="rounded-full font-bold">
                    {t('train.open')}
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TrainingPage;
