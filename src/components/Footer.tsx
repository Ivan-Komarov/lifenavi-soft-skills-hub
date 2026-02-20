import { useLanguage } from '@/contexts/LanguageContext';
import logo from '@/assets/logo.png';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-border bg-card py-6">
      <div className="container mx-auto flex flex-col items-center gap-2 px-4 text-center">
        <div className="flex items-center gap-2">
          <img src={logo} alt="Speachie" className="h-4 w-4" />
          <span className="font-display text-sm font-extrabold text-primary">Speachie</span>
        </div>
        <p className="text-xs text-muted-foreground">
          © 2026 Speachie. {t('footer.rights')}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
