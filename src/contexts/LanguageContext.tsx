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
  'train.open': { en: 'Open', ua: 'Відкрити' },
  'train.module.input_label': { en: 'Your response', ua: 'Твоя відповідь' },
  'train.module.input_placeholder': { en: 'Type your answer here...', ua: 'Введи свою відповідь тут...' },
  'train.module.submit': { en: 'Submit', ua: 'Надіслати' },
  'train.back_to_training': { en: '← Back to Training', ua: '← До тренінгу' },
  // Diction Lab
  'diction.analysis': { en: 'Analysis', ua: 'Аналіз' },
  'diction.score': { en: 'Score', ua: 'Оцінка' },
  'diction.retry': { en: 'Try Again', ua: 'Спробувати знову' },
  'diction.back_trainings': { en: 'Back to Trainings', ua: 'Повернутися до тренінгів' },
  'diction.tap_mic': { en: 'Tap the microphone to start', ua: 'Натисни мікрофон щоб почати' },
  'diction.recording': { en: 'Recording... Tap to stop', ua: 'Запис... Натисни щоб зупинити' },
  // Speech Coach
  'speech.metric_clarity': { en: 'Clarity', ua: 'Чіткість' },
  'speech.metric_pace': { en: 'Pace', ua: 'Темп' },
  'speech.metric_confidence': { en: 'Confidence', ua: 'Впевненість' },
  'speech.filler_words': { en: 'Filler words', ua: 'Слова-паразити' },
  'speech.filler_words_val': { en: '"um", "like", "you know"', ua: '"ну", "типу", "як би"' },
  'speech.feedback': { en: 'General feedback', ua: 'Загальний відгук' },
  'speech.feedback_val': { en: 'Good pace, work on confidence.', ua: 'Гарний темп, попрацюй над впевненістю.' },
  'speech.tips': { en: 'Tips', ua: 'Поради' },
  'speech.tips_val': { en: 'Pause before key points, use eye contact.', ua: 'Робіть паузу перед ключовими думками, використовуйте зоровий контакт.' },
  // Education course pages
  'edu.open_course': { en: 'Open Course', ua: 'Відкрити курс' },
  'edu.gesticulation.l1': { en: 'Body Language Basics', ua: 'Основи мови тіла' },
  'edu.gesticulation.l1.desc': { en: 'Learn the fundamentals of non-verbal communication.', ua: 'Вивчи основи невербальної комунікації.' },
  'edu.gesticulation.l2': { en: 'Power Poses', ua: 'Пози впевненості' },
  'edu.gesticulation.l2.desc': { en: 'How posture affects perception and confidence.', ua: 'Як постава впливає на сприйняття та впевненість.' },
  'edu.gesticulation.l3': { en: 'Hands & Gestures', ua: 'Руки та жести' },
  'edu.gesticulation.l3.desc': { en: 'Master hand gestures for impactful presentations.', ua: 'Опануй жести рук для ефективних презентацій.' },
  'edu.speech.l1': { en: 'Public Speaking 101', ua: 'Публічний виступ 101' },
  'edu.speech.l1.desc': { en: 'Overcome fear and speak with clarity.', ua: 'Подолай страх та говори чітко.' },
  'edu.speech.l2': { en: 'Persuasion Techniques', ua: 'Техніки переконання' },
  'edu.speech.l2.desc': { en: 'Learn rhetorical devices to win arguments.', ua: 'Вивчи риторичні прийоми для переконання.' },
  'edu.speech.l3': { en: 'Storytelling', ua: 'Сторітелінг' },
  'edu.speech.l3.desc': { en: 'Craft compelling narratives that engage your audience.', ua: 'Створюй захопливі історії для аудиторії.' },
  'edu.diction.l1': { en: 'Pronunciation Drills', ua: 'Вправи вимови' },
  'edu.diction.l1.desc': { en: 'Practice tricky sounds and tongue twisters.', ua: 'Практикуй складні звуки та скоромовки.' },
  'edu.diction.l2': { en: 'Voice Modulation', ua: 'Модуляція голосу' },
  'edu.diction.l2.desc': { en: 'Control pitch, tone and volume for impact.', ua: 'Контролюй висоту, тон та гучність для ефекту.' },
  'edu.diction.l3': { en: 'Breathing Techniques', ua: 'Техніки дихання' },
  'edu.diction.l3.desc': { en: 'Proper breathing for sustained, powerful speech.', ua: 'Правильне дихання для тривалого потужного мовлення.' },
  // Profile
  'profile.progress_edu': { en: 'Education Progress', ua: 'Прогрес навчання' },
  'profile.progress_train': { en: 'Training Progress', ua: 'Прогрес тренінгів' },
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
