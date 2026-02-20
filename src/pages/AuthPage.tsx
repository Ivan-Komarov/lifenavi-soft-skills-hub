import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import logo from '@/assets/logo.png';
import { useToast } from '@/hooks/use-toast';
import { Navigate } from 'react-router-dom';

const AuthPage = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [loading, setLoading] = useState(false);

  if (user) return <Navigate to="/profile" replace />;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate('/profile');
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { display_name: displayName },
            emailRedirectTo: window.location.origin,
          },
        });
        if (error) throw error;
        toast({
          title: t('auth.check_email'),
          description: t('auth.check_email_desc'),
        });
      }
    } catch (err: any) {
      toast({
        title: t('auth.error'),
        description: err.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md rounded-3xl border border-border bg-card p-8 fun-shadow">
        <div className="mb-6 flex flex-col items-center gap-2">
          <img src={logo} alt="Speachie" className="h-10 w-10" />
          <h1 className="font-display text-2xl font-extrabold text-foreground">
            {isLogin ? t('auth.login') : t('auth.register')}
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <Label htmlFor="name">{t('auth.name')}</Label>
              <Input
                id="name"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder={t('auth.name_placeholder')}
                required
                className="rounded-xl"
              />
            </div>
          )}
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="hello@example.com"
              required
              className="rounded-xl"
            />
          </div>
          <div>
            <Label htmlFor="password">{t('auth.password')}</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              minLength={6}
              className="rounded-xl"
            />
          </div>
          <Button type="submit" className="w-full rounded-full font-bold" disabled={loading}>
            {loading ? '...' : isLogin ? t('auth.login') : t('auth.register')}
          </Button>
        </form>

        <p className="mt-4 text-center text-sm text-muted-foreground">
          {isLogin ? t('auth.no_account') : t('auth.has_account')}{' '}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="font-bold text-primary hover:underline"
          >
            {isLogin ? t('auth.register') : t('auth.login')}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
