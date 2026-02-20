import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';
import { Hand, Mic, AudioWaveform, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const courses = [
  { key: 'gesticulation', icon: Hand, color: 'bg-fun-coral/10 text-fun-coral' },
  { key: 'speech', icon: Mic, color: 'bg-fun-teal/10 text-fun-teal' },
  { key: 'diction', icon: AudioWaveform, color: 'bg-fun-lavender/10 text-fun-lavender' },
];

const EducationPage = () => {
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
      { user_id: user.id, course_key: `edu_${courseKey}`, progress_percent: 10, last_accessed: new Date().toISOString() },
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
          {t('edu.back')}
        </Link>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 font-display text-4xl font-extrabold text-foreground sm:text-5xl"
        >
          {t('edu.title')}
        </motion.h1>

        <div className="grid gap-8 lg:grid-cols-3">
          {courses.map(({ key, icon: Icon, color }, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.12 }}
              className="overflow-hidden rounded-3xl border border-border bg-card fun-shadow transition-all hover:fun-shadow-hover hover:-translate-y-1"
            >
              {/* Video placeholder */}
              <div className="relative aspect-video w-full bg-muted">
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-muted-foreground">
                  <Icon className="h-10 w-10" />
                  <span className="text-xs font-semibold">YouTube Video</span>
                </div>
              </div>
              <div className="p-5">
                <div className="mb-3 flex items-center gap-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-foreground">
                    {t(`edu.${key}`)}
                  </h3>
                </div>
                <p className="mb-4 text-sm text-muted-foreground">
                  {t(`edu.${key}.desc`)}
                </p>
                <Button size="sm" className="w-full rounded-full font-bold" onClick={() => handleStart(key)}>
                  {t('edu.go')}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default EducationPage;
