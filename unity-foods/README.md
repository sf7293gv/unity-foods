# Unity Foods

Website for **Unity Foods** — a neighborhood grocery, deli, electronics, and phone repair shop located at 3759 Chicago Ave #2, Minneapolis, MN 55407 (George Floyd Square, Powderhorn neighborhood).

Live site: [unity-foods.vercel.app](https://unity-foods.vercel.app)

---

## Tech stack

| Layer | Technology |
|---|---|
| Frontend | React 19 + Vite 8 |
| Routing | React Router v7 |
| Backend / Database | Supabase (Postgres + RLS) |
| Auth | Supabase Auth (email + password) |
| File storage | Supabase Storage (`images` bucket) |
| Email notifications | Supabase Edge Functions + Resend |
| SEO | react-helmet-async |
| Deployment | Vercel |

---

## Features

### Customer-facing pages

| Route | Description |
|---|---|
| `/` | Home — hero, announcements, weekly specials, repair CTA band, store hours, about snippet |
| `/menu` | Deli & grocery menu with category filters |
| `/electronics` | Product grid with category/condition filters and product inquiry modal |
| `/repairs` | Repair services, media gallery, online booking form |
| `/services` | Overview of all store services |
| `/about` | Store story and community background |
| `/contact` | Contact form, address, phone, map link, hours |
| `*` | Custom 404 page |

### Admin panel (`/admin`)

All admin routes are protected by a Supabase session guard. Unauthenticated users are redirected to `/admin/login`.

| Route | Description |
|---|---|
| `/admin` | Dashboard — stat cards, recent bookings, quick actions |
| `/admin/items` | Menu items CRUD (name, price, category, image, active toggle) |
| `/admin/specials` | Weekly specials CRUD (sale price, original price, image) |
| `/admin/announcements` | Live site-wide announcements CRUD |
| `/admin/hours` | Store hours per day of week |
| `/admin/electronics` | Electronics / phone products CRUD |
| `/admin/inquiries` | Product inquiries — mark read, delete |
| `/admin/repairs` | Repair services CRUD |
| `/admin/repair-media` | Repair gallery image uploads |
| `/admin/bookings` | Repair bookings — status updates (pending/confirmed/cancelled) |
| `/admin/settings` | Owner phone, notification email, social media links |

### Global UI components

- Navbar with mobile hamburger menu
- Footer with address, hours, nav links, and social media icons (fetched live from settings)
- Floating WhatsApp button (phone number fetched from settings)
- Back-to-top button (appears after 300 px scroll, sits above WhatsApp button)
- Custom branded 404 page

---

## Project structure

```
unity-foods/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── components/
│   │   ├── BackToTopButton.jsx / .css
│   │   ├── Footer.jsx / .css
│   │   ├── Layout.jsx
│   │   ├── Navbar.jsx / .css
│   │   ├── ProtectedRoute.jsx
│   │   └── WhatsAppButton.jsx / .css
│   ├── hooks/
│   │   └── useScrollAnimation.js
│   ├── lib/
│   │   └── supabase.js           ← Supabase client (reads VITE_ env vars)
│   ├── pages/
│   │   ├── admin/
│   │   │   ├── AdminLayout.jsx
│   │   │   ├── AdminLogin.jsx
│   │   │   ├── AdminModal.jsx
│   │   │   ├── AdminSettings.jsx
│   │   │   ├── AnnouncementsManager.jsx
│   │   │   ├── BookingsManager.jsx
│   │   │   ├── ConfirmDialog.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── ElectronicsManager.jsx
│   │   │   ├── HoursManager.jsx
│   │   │   ├── InquiriesManager.jsx
│   │   │   ├── ItemsManager.jsx
│   │   │   ├── RepairMediaManager.jsx
│   │   │   ├── RepairsManager.jsx
│   │   │   ├── SpecialsManager.jsx
│   │   │   └── Toast.jsx
│   │   ├── About.jsx / .css
│   │   ├── Contact.jsx / .css
│   │   ├── Electronics.jsx / .css
│   │   ├── Home.jsx / .css
│   │   ├── Menu.jsx / .css
│   │   ├── NotFound.jsx / .css
│   │   ├── Repairs.jsx / .css
│   │   └── Services.jsx / .css
│   ├── styles/
│   │   ├── admin.css             ← admin design-system styles
│   │   └── global.css            ← CSS custom properties, resets, utilities
│   ├── App.jsx
│   └── main.jsx
├── supabase/
│   └── functions/
│       ├── notify-booking/       ← Edge Function: email on new repair booking
│       │   └── index.ts
│       └── notify-inquiry/       ← Edge Function: email on new product inquiry
│           └── index.ts
├── index.html
├── package.json
├── vercel.json
└── vite.config.js
```

---

## Local development

### 1. Clone and install

```bash
git clone <your-repo-url>
cd unity-foods
npm install
```

### 2. Environment variables

Create a `.env` file in the project root (this file is gitignored — never commit it):

```env
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key
```

Both values are in your Supabase project under **Settings → API**.

### 3. Start the dev server

```bash
npm run dev
```

The site runs at `http://localhost:5173` by default.

---

## Supabase setup

### Tables

Run the following SQL in the Supabase SQL editor.

```sql
-- Menu items
create table items (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  description text,
  price       numeric(10,2),
  category    text,
  image_url   text,
  active      boolean default true,
  created_at  timestamptz default now()
);

-- Weekly specials
create table specials (
  id             uuid primary key default gen_random_uuid(),
  title          text not null,
  description    text,
  sale_price     numeric(10,2),
  original_price numeric(10,2),
  image_url      text,
  active         boolean default true,
  created_at     timestamptz default now()
);

-- Announcements
create table announcements (
  id         uuid primary key default gen_random_uuid(),
  message    text not null,
  active     boolean default true,
  created_at timestamptz default now()
);

-- Store hours (one row per day)
create table hours (
  id         uuid primary key default gen_random_uuid(),
  day        text not null unique,
  open_time  time,
  close_time time,
  is_closed  boolean default false
);

-- Electronics / phone products
create table products (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  description text,
  price       numeric(10,2),
  category    text,
  condition   text default 'new',
  image_url   text,
  in_stock    boolean default true,
  active      boolean default true,
  created_at  timestamptz default now()
);

-- Product inquiries (submitted from /electronics)
create table inquiries (
  id             uuid primary key default gen_random_uuid(),
  product_id     uuid references products(id) on delete set null,
  product_name   text not null,
  customer_name  text not null,
  customer_phone text not null,
  message        text,
  status         text not null default 'new' check (status in ('new', 'read')),
  created_at     timestamptz default now()
);

-- Repair services
create table repair_services (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  description text,
  price       numeric(10,2),
  duration    text,
  active      boolean default true,
  created_at  timestamptz default now()
);

-- Repair media gallery
create table repair_media (
  id         uuid primary key default gen_random_uuid(),
  url        text not null,
  caption    text,
  created_at timestamptz default now()
);

-- Repair bookings (submitted from /repairs)
create table bookings (
  id             uuid primary key default gen_random_uuid(),
  customer_name  text not null,
  customer_phone text not null,
  service_name   text not null,
  service_id     uuid references repair_services(id) on delete set null,
  booking_date   date not null,
  booking_time   time not null,
  notes          text,
  status         text not null default 'pending'
                 check (status in ('pending', 'confirmed', 'cancelled')),
  created_at     timestamptz default now()
);

-- Key-value settings (phone, email, social links)
create table settings (
  key   text primary key,
  value text
);
```

### Row Level Security

Enable RLS on every table, then add policies:

```sql
-- Public-read tables (customers can browse without logging in)
alter table items           enable row level security;
alter table specials        enable row level security;
alter table announcements   enable row level security;
alter table hours           enable row level security;
alter table products        enable row level security;
alter table repair_services enable row level security;
alter table repair_media    enable row level security;

create policy "Public read"  on items           for select to anon using (true);
create policy "Admin all"    on items           for all    to authenticated using (true);

create policy "Public read"  on specials        for select to anon using (true);
create policy "Admin all"    on specials        for all    to authenticated using (true);

create policy "Public read"  on announcements   for select to anon using (true);
create policy "Admin all"    on announcements   for all    to authenticated using (true);

create policy "Public read"  on hours           for select to anon using (true);
create policy "Admin all"    on hours           for all    to authenticated using (true);

create policy "Public read"  on products        for select to anon using (true);
create policy "Admin all"    on products        for all    to authenticated using (true);

create policy "Public read"  on repair_services for select to anon using (true);
create policy "Admin all"    on repair_services for all    to authenticated using (true);

create policy "Public read"  on repair_media    for select to anon using (true);
create policy "Admin all"    on repair_media    for all    to authenticated using (true);

-- Bookings: customers insert, admin manages
alter table bookings enable row level security;
create policy "Public insert" on bookings for insert to anon          with check (true);
create policy "Admin all"     on bookings for all    to authenticated using (true);

-- Inquiries: customers insert, admin manages
alter table inquiries enable row level security;
create policy "Public insert" on inquiries for insert to anon          with check (true);
create policy "Admin all"     on inquiries for all    to authenticated using (true);

-- Settings: public read (WhatsApp number, social links shown to all), admin write
alter table settings enable row level security;
create policy "Public read" on settings for select to anon          using (true);
create policy "Admin all"   on settings for all    to authenticated using (true);
```

### Settings seed data

```sql
insert into settings (key, value) values
  ('owner_phone',   '16128216444'),
  ('owner_email',   'owner@example.com'),
  ('facebook_url',  'https://facebook.com/unityfoodsmpls'),
  ('instagram_url', 'https://instagram.com/unityfoodsmpls'),
  ('tiktok_url',    'https://tiktok.com/@unityfoodsmpls')
on conflict (key) do nothing;
```

Update real values from the admin panel at `/admin/settings`.

### Storage bucket

Create a **public** bucket named `images` for product, special, and repair media uploads:

> Supabase Dashboard → Storage → New bucket → Name: `images` → Public: ✓

---

## Email notifications

Two Supabase Edge Functions (Deno runtime) send email via [Resend](https://resend.com):

| Function | Trigger |
|---|---|
| `notify-booking` | Customer submits a repair booking on `/repairs` |
| `notify-inquiry` | Customer submits a product inquiry on `/electronics` |

### Deploy functions

```bash
npx supabase functions deploy notify-booking --project-ref <your-ref>
npx supabase functions deploy notify-inquiry --project-ref <your-ref>
```

### Set the API key secret

```bash
npx supabase secrets set RESEND_API_KEY=re_xxxxxxxxxxxx --project-ref <your-ref>
```

### Sender domain note

Both functions currently use `from: 'Unity Foods <onboarding@resend.dev>'`, which only delivers to the email address registered with your Resend account. To send to any address:

1. Verify your domain in the Resend dashboard
2. Update the `from` field in `notify-booking/index.ts` and `notify-inquiry/index.ts`
3. Redeploy both functions

---

## Deployment (Vercel)

### 1. Import the project

Go to [vercel.com](https://vercel.com) → **Add New Project** → import your GitHub repo.
Set **Root Directory** to `unity-foods` (the folder containing `package.json`).

### 2. Build settings

| Setting | Value |
|---|---|
| Framework Preset | Vite |
| Build Command | `npm run build` |
| Output Directory | `dist` |

### 3. Environment variables

Add these in **Settings → Environment Variables** (Production + Preview + Development):

| Variable | Where to find it |
|---|---|
| `VITE_SUPABASE_URL` | Supabase → Settings → API → Project URL |
| `VITE_SUPABASE_ANON_KEY` | Supabase → Settings → API → anon / public key |

`RESEND_API_KEY` is a Supabase secret only — do not add it to Vercel.

### 4. Client-side routing

`vercel.json` (already in the repo) handles this:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

Without this, refreshing any route other than `/` would return a 404 from Vercel's CDN.

---

## Admin access

1. Go to **Supabase → Authentication → Users → Add user**
2. Create an account with your email and a strong password
3. Log in at `https://your-site.vercel.app/admin/login`

There is no public sign-up. The admin panel is invitation-only through Supabase Auth.

---

## Color scheme

| CSS variable | Value | Usage |
|---|---|---|
| `--primary` | `#8B0000` | Buttons, active states, primary accents |
| `--accent` | `#CC0000` | Hover states, sale badges, highlights |
| `--nav-bg` | `#111111` | Navbar, footer, dark section backgrounds |
| `--bg` | `#fafaf8` | Page background |
| `--white` | `#ffffff` | Cards, panels, surfaces |
