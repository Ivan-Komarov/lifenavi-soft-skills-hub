import React, { createContext, useContext, useState, ReactNode } from 'react';

type Lang = 'en' | 'ua';

interface LanguageContextType {
  lang: Lang;
  toggle: () => void;
  t: (key: string) => string;
}

const translations: Record<string, Record<Lang, string>> = {
  'hero.title': {
    en: 'Speachie',
    ua: 'Speachie',
  },
  'hero.tagline': {
    en: 'Level up your people skills! ✦',
    ua: 'Прокачай свої навички спілкування! ✦',
  },
  'hero.subtitle': {
    en: 'Your AI-powered soft skills training simulator',
    ua: 'Твій AI-тренажер для розвитку soft skills',
  },
  'desc.quote': {
    en: 'Academic knowledge gets you a job, but Soft Skills build your career. Speachie is your safe proving ground for confidence training.',
    ua: 'Академічні знання дають роботу, а Soft Skills будують кар\'єру. Speachie — це твій безпечний полігон для тренування впевненості.',
  },
  'desc.title': {
    en: 'Why does this matter?',
    ua: 'Навіщо це потрібно?',
  },
  'desc.career': { en: 'Career Growth', ua: 'Кар\'єрне зростання' },
  'desc.career.text': {
    en: 'Leadership, teamwork and communication help you shine at school and beyond!',
    ua: 'Лідерство, командна робота та комунікація допоможуть тобі сяяти в школі та далі!',
  },
  'desc.social': { en: 'Social Intelligence', ua: 'Соціальний інтелект' },
  'desc.social.text': {
    en: 'Read body language, make friends easily, and feel confident in any group.',
    ua: 'Читай мову тіла, легко знаходь друзів та почувайся впевнено у будь-якій компанії.',
  },
  'desc.conflict': { en: 'Conflict Resolution', ua: 'Вирішення конфліктів' },
  'desc.conflict.text': {
    en: 'Turn arguments into teamwork and understanding — like a pro!',
    ua: 'Перетворюй суперечки на командну роботу та розуміння — як профі!',
  },
  'desc.simulator': {
    en: 'Speachie is a fun simulator where you practice real-life skills in a safe space — powered by AI!',
    ua: 'Speachie — це крутий тренажер, де ти практикуєш реальні навички у безпечному просторі — з допомогою AI!',
  },
  'nav.home': { en: 'Home', ua: 'Головна' },
  'nav.education': { en: 'Education', ua: 'Навчання' },
  'nav.training': { en: 'Training', ua: 'Тренінг' },
  'home.explore': { en: 'Explore', ua: 'Досліджуй' },
  'home.edu.title': { en: 'Education', ua: 'Навчання' },
  'home.edu.desc': {
    en: 'Watch, learn, and master body language, speech & diction through expert video courses!',
    ua: 'Дивись, вчись та освоюй мову тіла, мовлення й дикцію через експертні відеокурси!',
  },
  'home.train.title': { en: 'Training', ua: 'Тренінг' },
  'home.train.desc': {
    en: 'Practice with AI — analyze your voice, gestures, and even do mock interviews!',
    ua: 'Тренуйся з AI — аналізуй свій голос, жести та навіть проходь пробні співбесіди!',
  },
  'home.letsgo': { en: "Let's Go!", ua: 'Погнали!' },
  'edu.title': { en: 'Education', ua: 'Навчання' },
  'edu.back': { en: '← Back home', ua: '← На головну' },
  'edu.gesticulation': { en: 'Gesticulation', ua: 'Жестикуляція' },
  'edu.gesticulation.desc': {
    en: 'Visual body language training through YouTube experts.',
    ua: 'Візуальне навчання мови тіла через YouTube-експертів.',
  },
  'edu.speech': { en: 'Speech', ua: 'Мовлення' },
  'edu.speech.desc': {
    en: 'The art of persuasion and public speaking.',
    ua: 'Мистецтво переконання та публічних виступів.',
  },
  'edu.diction': { en: 'Diction', ua: 'Дикція' },
  'edu.diction.desc': {
    en: 'Clarity, pace, and vocal tone mastery.',
    ua: 'Чіткість, темп та майстерність тону голосу.',
  },
  'edu.go': { en: 'Watch Now →', ua: 'Дивитись →' },
  'train.title': { en: 'Training', ua: 'Тренінг' },
  'train.back': { en: '← Back home', ua: '← На головну' },
  'train.diction': { en: 'Diction Lab', ua: 'Лабораторія дикції' },
  'train.diction.desc': {
    en: 'AI microphone analysis of your pronunciation and speed.',
    ua: 'AI-аналіз мікрофону твоєї вимови та швидкості.',
  },
  'train.speech': { en: 'Speech Trainer', ua: 'Тренер мовлення' },
  'train.speech.desc': {
    en: 'Upload video for AI gesture and sentiment analysis.',
    ua: 'Завантаж відео для AI-аналізу жестів та настроїв.',
  },
  'train.interview': { en: 'AI Interview', ua: 'AI Інтерв\'ю' },
  'train.interview.desc': {
    en: 'Real-time roleplay with digital HR avatars.',
    ua: 'Рольова гра в реальному часі з цифровими HR-аватарами.',
  },
  'train.start': { en: 'Start!', ua: 'Старт!' },
  'train.open': { en: 'Open', ua: 'Відкрити' },
  'train.module.video_placeholder': { en: 'Video will appear here', ua: 'Відео з\'явиться тут' },
  'train.module.description': { en: 'About this module', ua: 'Про цей модуль' },
  'train.module.input_label': { en: 'Your response', ua: 'Твоя відповідь' },
  'train.module.input_placeholder': { en: 'Type your answer here...', ua: 'Введи свою відповідь тут...' },
  'train.module.submit': { en: 'Submit', ua: 'Надіслати' },
  'train.back_to_training': { en: '← Back to Training', ua: '← До тренінгу' },
  'footer.rights': { en: 'All rights reserved.', ua: 'Усі права захищені.' },
  'nav.profile': { en: 'My Profile', ua: 'Мій кабінет' },
  'nav.login': { en: 'Sign In', ua: 'Увійти' },
  'auth.login': { en: 'Sign In', ua: 'Увійти' },
  'auth.register': { en: 'Sign Up', ua: 'Зареєструватися' },
  'auth.name': { en: 'Name', ua: "Ім'я" },
  'auth.name_placeholder': { en: 'Your name', ua: "Твоє ім'я" },
  'auth.password': { en: 'Password', ua: 'Пароль' },
  'auth.no_account': { en: "Don't have an account?", ua: 'Немає акаунту?' },
  'auth.has_account': { en: 'Already have an account?', ua: 'Вже є акаунт?' },
  'auth.check_email': { en: 'Check your email!', ua: 'Перевір пошту!' },
  'auth.check_email_desc': { en: 'We sent you a confirmation link.', ua: 'Ми надіслали тобі посилання для підтвердження.' },
  'auth.error': { en: 'Error', ua: 'Помилка' },
  'profile.title': { en: 'My Profile', ua: 'Мій кабінет' },
  'profile.progress': { en: 'My Progress', ua: 'Мій прогрес' },
  'profile.logout': { en: 'Log Out', ua: 'Вийти' },
  'profile.save': { en: 'Save', ua: 'Зберегти' },
  'profile.cancel': { en: 'Cancel', ua: 'Скасувати' },
  'profile.no_name': { en: 'No name set', ua: "Ім'я не вказано" },
  'profile.started': { en: 'Started!', ua: 'Розпочато!' },
  'profile.started_desc': { en: 'Your progress has been saved.', ua: 'Твій прогрес збережено.' },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Lang>('en');
  const toggle = () => setLang(prev => (prev === 'en' ? 'ua' : 'en'));
  const t = (key: string): string => translations[key]?.[lang] ?? key;

  return (
    <LanguageContext.Provider value={{ lang, toggle, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
};
