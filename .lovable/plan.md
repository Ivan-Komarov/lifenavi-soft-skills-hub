

# Кабінет користувача + База даних для LifeNavi

## Що буде зроблено

1. **Підключення Supabase** (база даних та авторизація)
2. **Сторінка реєстрації / входу** (`/auth`)
3. **Сторінка кабінету** (`/profile`) з прогресом по курсах
4. **Збереження прогресу** при перегляді курсів

---

## Структура бази даних

### Таблиці:

- **profiles** — ім'я, аватар (URL), дата створення. Зв'язок з `auth.users(id)`.
- **course_progress** — прогрес користувача по кожному курсу/модулю (completed, percentage, last accessed).

### Безпека:
- RLS-політики: кожен користувач бачить/редагує лише свої дані.
- Тригер для автоматичного створення профілю при реєстрації.
- Storage bucket `avatars` для аватарок.

---

## Нові сторінки та компоненти

### `/auth` — Вхід / Реєстрація
- Форма з email + пароль
- Перемикач між "Увійти" та "Зареєструватися"
- Поле для імені при реєстрації
- Стиль: молодіжний, м'які кольори, rounded-3xl

### `/profile` — Кабінет користувача
- Аватар та ім'я (можна редагувати)
- Картки прогресу по 6 модулях (3 навчання + 3 тренінг)
- Прогрес-бар для кожного модуля
- Кнопка виходу

### Навбар
- Додати іконку/посилання на кабінет (або кнопку "Увійти" якщо не залогінений)

---

## Технічні деталі

### Supabase міграція:
```sql
-- profiles table
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  avatar_url text,
  created_at timestamptz default now()
);
alter table public.profiles enable row level security;

-- course_progress table
create table public.course_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  course_key text not null,
  completed boolean default false,
  progress_percent integer default 0,
  last_accessed timestamptz default now(),
  unique(user_id, course_key)
);
alter table public.course_progress enable row level security;

-- RLS policies
create policy "Users read own profile" on public.profiles for select using (auth.uid() = id);
create policy "Users update own profile" on public.profiles for update using (auth.uid() = id);
create policy "Users insert own profile" on public.profiles for insert with check (auth.uid() = id);

create policy "Users read own progress" on public.course_progress for select using (auth.uid() = user_id);
create policy "Users insert own progress" on public.course_progress for insert with check (auth.uid() = user_id);
create policy "Users update own progress" on public.course_progress for update using (auth.uid() = user_id);

-- Auto-create profile trigger
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, new.raw_user_meta_data->>'display_name');
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Avatars bucket
insert into storage.buckets (id, name, public) values ('avatars', 'avatars', true);
```

### Нові файли:
- `src/integrations/supabase/client.ts` — Supabase клієнт
- `src/contexts/AuthContext.tsx` — контекст авторизації
- `src/pages/AuthPage.tsx` — сторінка входу/реєстрації
- `src/pages/ProfilePage.tsx` — кабінет з прогресом
- `src/components/ProtectedRoute.tsx` — обгортка для захищених маршрутів

### Зміни в існуючих файлах:
- `App.tsx` — додати AuthProvider, нові маршрути `/auth` і `/profile`
- `Navbar.tsx` — кнопка "Кабінет" / "Увійти"
- `LanguageContext.tsx` — нові переклади для auth та profile
- `EducationPage.tsx`, `TrainingPage.tsx` — кнопки "Почати" записують прогрес

### Переклади (UA/EN):
- auth.login / Увійти
- auth.register / Зареєструватися
- profile.title / Мій кабінет
- profile.progress / Мій прогрес
- profile.logout / Вийти

