import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { LogOut, User, ArrowLeft, Pencil } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';

interface Profile {
  display_name: string | null;
  avatar_url: string | null;
}

interface CourseProgress {
  course_key: string;
  progress_percent: number;
  completed: boolean;
}

const allCourses = [
  { key: 'edu_gesticulation', section: 'edu', labelKey: 'edu.gesticulation' },
  { key: 'edu_speech', section: 'edu', labelKey: 'edu.speech' },
  { key: 'edu_diction', section: 'edu', labelKey: 'edu.diction' },
  { key: 'train_diction', section: 'train', labelKey: 'train.diction' },
  { key: 'train_speech', section: 'train', labelKey: 'train.speech' },
  { key: 'train_interview', section: 'train', labelKey: 'train.interview' },
];

const ProfilePage = () => {
  const { user, signOut } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [profile, setProfile] = useState<Profile>({ display_name: null, avatar_url: null });
  const [progress, setProgress] = useState<CourseProgress[]>([]);
  const [editing, setEditing] = useState(false);
  const [newName, setNewName] = useState('');

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      const [profileRes, progressRes] = await Promise.all([
        supabase.from('profiles').select('display_name, avatar_url').eq('id', user.id).single(),
        supabase.from('course_progress').select('course_key, progress_percent, completed').eq('user_id', user.id),
      ]);

      if (profileRes.data) {
        setProfile(profileRes.data);
        setNewName(profileRes.data.display_name || '');
      }
      if (progressRes.data) setProgress(progressRes.data);
    };

    fetchData();
  }, [user]);

  const handleSaveName = async () => {
    if (!user) return;
    const { error } = await supabase.from('profiles').update({ display_name: newName }).eq('id', user.id);
    if (error) {
      toast({ title: t('auth.error'), description: error.message, variant: 'destructive' });
    } else {
      setProfile(prev => ({ ...prev, display_name: newName }));
      setEditing(false);
    }
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!user || !e.target.files?.[0]) return;
    const file = e.target.files[0];
    const path = `${user.id}/avatar.${file.name.split('.').pop()}`;

    const { error: uploadError } = await supabase.storage.from('avatars').upload(path, file, { upsert: true });
    if (uploadError) {
      toast({ title: t('auth.error'), description: uploadError.message, variant: 'destructive' });
      return;
    }

    const { data: { publicUrl } } = supabase.storage.from('avatars').getPublicUrl(path);
    await supabase.from('profiles').update({ avatar_url: publicUrl }).eq('id', user.id);
    setProfile(prev => ({ ...prev, avatar_url: publicUrl }));
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  const getProgressFor = (key: string) => progress.find(p => p.course_key === key);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-16">
        <Link to="/" className="mb-6 inline-flex items-center gap-1 text-sm font-semibold text-muted-foreground hover:text-primary transition-colors">
          <ArrowLeft className="h-4 w-4" />
          {t('edu.back')}
        </Link>

        <h1 className="mb-8 font-display text-3xl font-extrabold text-foreground sm:text-4xl">
          {t('profile.title')}
        </h1>

        {/* Profile card */}
        <div className="mb-10 flex flex-col items-center gap-4 rounded-3xl border border-border bg-card p-8 fun-shadow sm:flex-row sm:items-start sm:gap-8">
          <label className="group relative cursor-pointer">
            <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-muted">
              {profile.avatar_url ? (
                <img src={profile.avatar_url} alt="Avatar" className="h-full w-full object-cover" />
              ) : (
                <User className="h-10 w-10 text-muted-foreground" />
              )}
            </div>
            <div className="absolute inset-0 flex items-center justify-center rounded-full bg-foreground/30 opacity-0 transition-opacity group-hover:opacity-100">
              <Pencil className="h-5 w-5 text-primary-foreground" />
            </div>
            <input type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload} />
          </label>

          <div className="flex-1 text-center sm:text-left">
            {editing ? (
              <div className="flex items-center gap-2">
                <Input value={newName} onChange={(e) => setNewName(e.target.value)} className="max-w-xs rounded-xl" />
                <Button size="sm" onClick={handleSaveName} className="rounded-full">{t('profile.save')}</Button>
                <Button size="sm" variant="outline" onClick={() => setEditing(false)} className="rounded-full">{t('profile.cancel')}</Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <h2 className="font-display text-xl font-bold text-foreground">
                  {profile.display_name || t('profile.no_name')}
                </h2>
                <button onClick={() => setEditing(true)} className="text-muted-foreground hover:text-primary">
                  <Pencil className="h-4 w-4" />
                </button>
              </div>
            )}
            <p className="text-sm text-muted-foreground">{user?.email}</p>
          </div>

          <Button variant="outline" onClick={handleLogout} className="gap-2 rounded-full font-bold">
            <LogOut className="h-4 w-4" />
            {t('profile.logout')}
          </Button>
        </div>

        {/* Progress */}
        <h2 className="mb-6 font-display text-2xl font-bold text-foreground">{t('profile.progress')}</h2>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {allCourses.map(({ key, section, labelKey }) => {
            const cp = getProgressFor(key);
            const pct = cp?.progress_percent ?? 0;
            const colorClass = section === 'edu' ? 'bg-fun-coral/10' : 'bg-fun-teal/10';

            return (
              <div key={key} className={`rounded-2xl border border-border p-5 ${colorClass}`}>
                <h3 className="mb-2 font-display text-sm font-bold text-foreground">{t(labelKey)}</h3>
                <Progress value={pct} className="mb-2 h-3" />
                <p className="text-xs font-semibold text-muted-foreground">
                  {pct}% {cp?.completed ? '✅' : ''}
                </p>
              </div>
            );
          })}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProfilePage;
