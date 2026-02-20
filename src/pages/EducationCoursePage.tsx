import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';
import { ArrowLeft, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';

const courseLessons: Record<string, { titleKey: string; lessons: { titleKey: string; descKey: string }[] }> = {
  gesticulation: {
    titleKey: 'edu.gesticulation',
    lessons: [
      { titleKey: 'edu.gesticulation.l1', descKey: 'edu.gesticulation.l1.desc' },
      { titleKey: 'edu.gesticulation.l2', descKey: 'edu.gesticulation.l2.desc' },
      { titleKey: 'edu.gesticulation.l3', descKey: 'edu.gesticulation.l3.desc' },
    ],
  },
  speech: {
    titleKey: 'edu.speech',
    lessons: [
      { titleKey: 'edu.speech.l1', descKey: 'edu.speech.l1.desc' },
      { titleKey: 'edu.speech.l2', descKey: 'edu.speech.l2.desc' },
      { titleKey: 'edu.speech.l3', descKey: 'edu.speech.l3.desc' },
    ],
  },
  diction: {
    titleKey: 'edu.diction',
    lessons: [
      { titleKey: 'edu.diction.l1', descKey: 'edu.diction.l1.desc' },
      { titleKey: 'edu.diction.l2', descKey: 'edu.diction.l2.desc' },
      { titleKey: 'edu.diction.l3', descKey: 'edu.diction.l3.desc' },
    ],
  },
};

const EducationCoursePage = () => {
  const { courseKey } = useParams<{ courseKey: string }>();
  const { t } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();

  const course = courseLessons[courseKey || ''];
  if (!course) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Course not found</p>
      </div>
    );
  }

  const handleOpenLesson = async () => {
    if (!user) {
      navigate('/auth');
      return;
    }
    await supabase.from('course_progress').upsert(
      { user_id: user.id, course_key: `edu_${courseKey}`, progress_percent: 30, last_accessed: new Date().toISOString() },
      { onConflict: 'user_id,course_key' }
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-16">
        <Link to="/education" className="mb-6 inline-flex items-center gap-1 text-sm font-semibold text-muted-foreground hover:text-primary transition-colors">
          <ArrowLeft className="h-4 w-4" />
          {t('edu.back')}
        </Link>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 font-display text-3xl font-extrabold text-foreground sm:text-5xl"
        >
          {t(course.titleKey)}
        </motion.h1>

        <div className="flex flex-col gap-6">
          {course.lessons.map(({ titleKey, descKey }, i) => (
            <motion.div
              key={titleKey}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col gap-4 rounded-3xl border border-border bg-card p-4 fun-shadow sm:flex-row sm:items-center"
            >
              {/* Video placeholder */}
              <div className="relative aspect-video w-full shrink-0 overflow-hidden rounded-2xl bg-muted sm:w-64 md:w-80 flex items-center justify-center">
                <Play className="h-10 w-10 text-muted-foreground" />
              </div>

              {/* Text & button */}
              <div className="flex flex-1 flex-col gap-3 p-2">
                <h3 className="font-display text-lg font-bold text-foreground">{t(titleKey)}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{t(descKey)}</p>
                <Button size="sm" className="self-start rounded-full font-bold" onClick={handleOpenLesson}>
                  {t('edu.open_course')}
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

export default EducationCoursePage;
