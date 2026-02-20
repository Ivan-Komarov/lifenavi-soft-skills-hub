import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Globe, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';
import logo from '@/assets/logo.png';

const Navbar = () => {
  const { lang, toggle, t } = useLanguage();
  const { user } = useAuth();
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-card/90 backdrop-blur-lg">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Speachie" className="h-7 w-7" />
          <span className="font-display text-lg font-extrabold tracking-wide text-primary">
            Speachie
          </span>
        </Link>

        <div className="hidden items-center gap-5 md:flex">
          {[
            { key: 'home', path: '/' },
            { key: 'education', path: '/education' },
            { key: 'training', path: '/training' },
          ].map(({ key, path }) => (
            <Link
              key={key}
              to={path}
              className={`font-body text-sm font-semibold transition-colors hover:text-primary ${
                location.pathname === path ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              {t(`nav.${key}`)}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Link to={user ? '/profile' : '/auth'}>
            <Button variant="outline" size="sm" className="gap-2 rounded-full text-xs font-bold">
              <User className="h-3.5 w-3.5" />
              {user ? t('nav.profile') : t('nav.login')}
            </Button>
          </Link>
          <Button
            variant="outline"
            size="sm"
            onClick={toggle}
            className="gap-2 rounded-full text-xs font-bold"
          >
            <Globe className="h-3.5 w-3.5" />
            {lang === 'en' ? 'UA' : 'EN'}
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
