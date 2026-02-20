import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';
import { Bot, Send, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { supabase } from '@/integrations/supabase/client';

const InterviewPage = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [input, setInput] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    if (!user) {
      navigate('/auth');
      return;
    }
    await supabase.from('course_progress').upsert(
      { user_id: user.id, course_key: 'train_interview', progress_percent: 30, last_accessed: new Date().toISOString() },
      { onConflict: 'user_id,course_key' }
    );
    setInput('');
  };

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
          {t('train.interview')}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-fun-lavender/10"
        >
          <Bot className="h-12 w-12 text-fun-lavender" />
        </motion.div>

        <p className="mb-8 max-w-md text-center text-sm text-muted-foreground">
          {t('train.interview.desc')}
        </p>

        <form onSubmit={handleSubmit} className="w-full max-w-lg flex flex-col gap-3 rounded-3xl border border-border bg-card p-6 fun-shadow">
          <label className="font-display text-sm font-bold text-foreground">{t('train.module.input_label')}</label>
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
      </main>
      <Footer />
    </div>
  );
};

export default InterviewPage;
