import type { ElementType, ReactNode } from "react";
import {
  FaArrowLeft,
  FaCircleInfo,
  FaClock,
  FaStar,
  FaSliders,
  FaMountain,
  FaUser,
  FaGear,
  FaChevronLeft,
  FaEnvelope,
  FaPenNib,
  FaFolder,
  FaUsers,
  FaNewspaper,
} from "react-icons/fa6";

import { Link } from "react-router-dom";
import postsData from "./posts.json";

// ---------- الأنواع ----------
interface Author {
  name: string;
  avatar: string;
  role: string;
}

interface Post {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: Author;
  image: string;
  date: string;
  readTime: string;
  featured: boolean;
  tags: string[];
}

interface Category {
  name: string;
  count: number;
  color: string;
}

const { posts, categories, siteInfo } = postsData as {
  posts: Post[];
  categories: Category[];
  siteInfo: {
    name: string;
    tagline: string;
    description: string;
    email: string;
    social: Record<string, string>;
  };
};

const featuredPosts = posts.filter((p) => p.featured);
const latestPosts = posts.filter((p) => !p.featured).slice(0, 3);

const categoryIcons: Record<string, ElementType> = {
  تقنيات: FaSliders,
  "مناظر طبيعية": FaMountain,
  بورتريه: FaUser,
  إضاءة: FaGear,
  معدات: FaGear,
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("ar-EG-u-nu-latn", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// ---------- عناصر مشتركة ----------

// نقطة "لايف" النابضة
function LiveDot() {
  return (
    <span className="relative flex h-2 w-2">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75" />
      <span className="relative inline-flex h-2 w-2 rounded-full bg-orange-500" />
    </span>
  );
}

function SectionBadge({ children }: { children: ReactNode }) {
  return (
    <div className="mb-5  inline-flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/10 px-4 py-1.5 text-sm font-semibold text-orange-500">
      <span>{children}</span>
      <LiveDot />
    </div>
  );
}

// ---------- الهيرو + الإحصائيات ----------
function Hero() {
  const stats: { label: string; value: string; icon: ElementType }[] = [
    { label: "مقالة", value: "50+", icon: FaNewspaper },
    { label: "قارئ", value: "10ألف+", icon: FaUsers },
    { label: "تصنيفات", value: "4", icon: FaFolder },
    { label: "كاتب", value: "6", icon: FaPenNib },
  ];

  return (
    <section className="relative mt-10 overflow-hidden bg-[#0a0a0a] px-6 pb-20 pt-16 text-center lg:px-12">
      {/* شبكة الخلفية (grid) */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_left,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_top,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-size-[64px_64px] mask-[radial-gradient(ellipse_60%_60%_at_50%_35%,black_40%,transparent_100%)]" />
      {/* توهج برتقالي فوق الشبكة */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-125 w-225 -translate-x-1/2 rounded-full bg-orange-600/20 blur-[140px]" />

      <div className="relative mx-auto max-w-4xl">
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/10 px-5 py-2 text-sm font-semibold text-orange-400">
          <span>مرحباً بك في {siteInfo.name}</span>
          <LiveDot />
        </div>

        <h1 className="text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">
          اكتشف <span className="text-orange-500">فن</span>
          <br />
          التصوير الفوتوغرافي
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-neutral-400">
          {siteInfo.description}
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/blog"
            className="flex items-center gap-2 rounded-full bg-linear-to-r from-orange-500 to-orange-600 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-orange-600/25 transition-all duration-300 hover:from-orange-600 hover:to-orange-700 active:scale-[0.98]"
          >
            <FaArrowLeft className="h-3.5 w-3.5" />
            <span>استكشف المقالات</span>
          </Link>
          <Link
            to="/about"
            className="flex items-center gap-2 rounded-full border border-white/15 px-7 py-3.5 text-sm font-bold text-white transition-colors duration-300 hover:border-white/30 hover:bg-white/5"
          >
            <FaCircleInfo className="h-3.5 w-3.5" />
            <span>اعرف المزيد</span>
          </Link>
        </div>

        {/* الإحصائيات */}
        <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="rounded-2xl border border-white/5 bg-white/3 px-4 py-6 transition-colors duration-300 hover:bg-white/6"
              >
                <Icon className="mb-2 mx-auto text-orange-500" />
                <div className="text-2xl font-extrabold text-amber-500">
                  {stat.value}
                </div>
                <div className="mt-1 text-sm text-neutral-400">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ---------- بطاقة مقال مميز (كبيرة) ----------
function FeaturedCard({ post, reverse }: { post: Post; reverse: boolean }) {
  return (
    <div className="group grid overflow-hidden rounded-2xl border border-white/10 bg-white/2 transition-colors duration-300 hover:border-orange-500/30 md:grid-cols-2">
         {/* الصورة */}
      <Link
        to={`/blog/${post.slug}`}
        aria-label={`اقرأ مقال: ${post.title}`}
        className={`relative block min-h-70 overflow-hidden ${
          reverse ? "md:order-1" : "md:order-2"
        }`}
      >
        <img
          src={post.image}
          alt={post.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full bg-linear-to-r from-orange-500 to-amber-500 px-3 py-1.5 text-xs font-bold text-white shadow-lg">
          <span>مميز</span>
          <FaStar className="h-3 w-3" />
        </span>
      </Link>
      {/* المحتوى */}
      <div
        className={`flex flex-col justify-center gap-4 p-8 lg:p-10 ${
          reverse ? "md:order-2" : "md:order-1"
        }`}
      >
        <div className="flex items-center gap-3">
          <span className="rounded-full bg-orange-500/15 px-3.5 py-1.5 text-xs font-bold text-orange-500">
            {post.category}
          </span>
          <span className="flex items-center gap-1.5 text-xs text-neutral-500">
            <FaClock className="h-3 w-3" />
            {post.readTime}
          </span>
        </div>

        <h3 className="text-2xl font-extrabold leading-snug text-white transition-colors duration-300 group-hover:text-orange-500 lg:text-3xl">
          {post.title}
        </h3>

        <p className="leading-relaxed text-neutral-400">{post.excerpt}</p>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative h-10 w-10 overflow-hidden rounded-full">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="h-full w-full object-cover"
              />
              <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-[#0a0a0a] bg-orange-500" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">
                {post.author.name}
              </div>
              <div className="text-xs text-neutral-500">
                {formatDate(post.date)}
              </div>
            </div>
          </div>

          <Link
            to={`/blog/${post.slug}`}
            className="flex items-center gap-2 text-sm font-bold text-orange-500 transition-colors duration-300 hover:text-orange-400"
          >
            <span>اقرأ المقال</span>
            <FaArrowLeft className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

   
    </div>
  );
}

function FeaturedArticles() {
  return (
    <section className="bg-[#0a0a0a] px-6 py-20 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-wrap items-start justify-between gap-6">
          <div>
          <div className="text-right">  <SectionBadge>مميز</SectionBadge></div>
            <h2 className="text-3xl text-right font-extrabold text-white sm:text-4xl">
              مقالات مختارة
            </h2>
            <p className="mt-3 text-neutral-400">محتوى منتقى لبدء رحلة تعلمك</p>
          </div>
          <Link
            to="/blog"
            className="flex items-center gap-2 rounded-full bg-linear-to-r from-orange-500 to-orange-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-orange-600/25 transition-all duration-300 hover:from-orange-600 hover:to-orange-700"
          >
            <span>عرض الكل</span>
            <FaChevronLeft className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="flex flex-col gap-6">
          {featuredPosts.map((post, i) => (
            <FeaturedCard key={post.id} post={post} reverse={i % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- التصنيفات ----------
function CategoriesSection() {
  return (
    <section className="bg-[#0a0a0a] px-6 py-20 text-center lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-12 max-w-2xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/10 px-4 py-1.5 text-sm font-semibold text-orange-500">
            <span>التصنيفات</span>
            <LiveDot />
          </div>
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            استكشف حسب الموضوع
          </h2>
          <p className="mt-3 text-neutral-400">
            اعثر على محتوى مصمم حسب اهتماماتك
          </p>
        </div>

        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
          {categories.map((cat) => {
            const Icon = categoryIcons[cat.name] ?? FaGear;
            return (
              <Link
                key={cat.name}
                to={`/blog?category=${encodeURIComponent(cat.name)}`}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/2 p-6 text-right transition-all duration-300 hover:border-orange-500/40 hover:bg-linear-to-br hover:from-orange-500 hover:to-amber-600"
              >
                <FaChevronLeft className="absolute right-4 top-1/2 h-4 w-4 -translate-x-2 -translate-y-1/2 text-white opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />

                <div className="mb-8 flex justify-start">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/15 text-orange-500 transition-colors duration-300 group-hover:bg-white group-hover:text-orange-500">
                    <Icon className="h-6 w-6" />
                  </div>
                </div>

                <div className="text-lg font-extrabold text-white">
                  {cat.name}
                </div>
                <div className="mt-1 text-sm text-neutral-400 transition-colors duration-300 group-hover:text-white/80">
                  {cat.count} مقالة
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ---------- بطاقة أحدث المقالات (صغيرة) ----------
function LatestCard({ post }: { post: Post }) {
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group overflow-hidden rounded-2xl border border-white/10 bg-white/2 transition-colors duration-300 hover:border-orange-500/30"
    >
      <div className="relative h-52 overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute right-3 top-3 rounded-full bg-black/60 px-3 py-1 text-xs font-bold text-white backdrop-blur-sm">
          {post.category}
        </span>
      </div>

      <div className="p-6">
        <div className="mb-3 flex items-center gap-2 text-xs text-neutral-500">
          <FaClock className="h-3 w-3" />
          <span>{post.readTime}</span>
          <span>•</span>
          <span>{formatDate(post.date)}</span>
        </div>

        <h3 className="mb-2 text-lg font-extrabold leading-snug text-white transition-colors duration-300 group-hover:text-orange-500">
          {post.title}
        </h3>

        <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-neutral-400">
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between border-t border-white/5 pt-4">
          <div className="flex min-w-0 items-center gap-3">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="h-9 w-9 shrink-0 rounded-full object-cover"
            />
            <div className="min-w-0">
              <div className="truncate text-sm font-bold text-white">
                {post.author.name}
              </div>
              <div className="truncate text-xs text-neutral-500">
                {post.author.role}
              </div>
            </div>
          </div>

          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-500/15 text-orange-500">
            <FaChevronLeft className="h-3 w-3" />
          </span>
        </div>
      </div>
    </Link>
  );
}

function LatestArticles() {
  return (
    <section className="bg-[#0a0a0a] px-6 py-20 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-wrap items-start justify-between gap-6">
          <div>
          <div className="text-right">  <SectionBadge>الأحدث</SectionBadge></div>
            <h2 className="text-3xl text-right font-extrabold text-white sm:text-4xl">
              أحدث المقالات
            </h2>
            <p className="mt-3 text-neutral-400">محتوى جديد طازج من المطبعة</p>
          </div>
          <Link
            to="/blog"
            className="flex items-center gap-2 text-sm font-bold text-orange-500 transition-colors duration-300 hover:text-orange-400"
          >
            <span>عرض جميع المقالات</span>
            <FaArrowLeft className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {latestPosts.map((post) => (
            <LatestCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- النشرة البريدية ----------
function NewsletterCTA() {
  return (
    <section className="bg-[#0a0a0a] px-6 py-20 lg:px-12">
      <div className="mx-auto max-w-4xl rounded-3xl border border-white/10 bg-white/2 px-8 py-16 text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-600/30">
          <FaEnvelope className="h-6 w-6" />
        </div>

        <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
          اشترك في <span className="text-orange-500">نشرتنا الإخبارية</span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-neutral-400">
          احصل على نصائح التصوير الحصرية ودروس جديدة مباشرة في بريدك الإلكتروني
        </p>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="mx-auto mt-8 flex max-w-xl flex-col gap-3 "
        >
          <input
            type="email"
            required
            placeholder="أدخل بريدك الإلكتروني"
            className="flex-1 rounded-full border border-white/15 bg-transparent px-5 py-3.5 text-sm text-neutral-200 placeholder-neutral-500 outline-none transition-colors duration-300 focus:border-orange-500"
          />
          <button
            type="submit"
            className="rounded-full bg-linear-to-r from-orange-500 to-orange-600 px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-orange-600/25 transition-all duration-300 hover:from-orange-600 hover:to-orange-700 active:scale-[0.98]"
          >
            اشترك الآن
          </button>
        </form>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-xs text-neutral-500">
          <span className="flex items-center gap-2">
            <span>انضم لـ 10,000+ مصور</span>
            <span className="flex -space-x-2 space-x-reverse">
              {posts.slice(0, 3).map((p) => (
                <img
                  key={p.id}
                  src={p.author.avatar}
                  alt={p.author.name}
                  className="h-6 w-6 rounded-full border-2 border-[#0a0a0a] object-cover"
                />
              ))}
            </span>
          </span>
          <span>•</span>
          <span>بدون إزعاج</span>
          <span>•</span>
          <span>إلغاء الاشتراك في أي وقت</span>
        </div>
      </div>
    </section>
  );
}

// ---------- الصفحة الرئيسية ----------
export default function HomePage() {
  return (
    <main dir="rtl" className="bg-[#0a0a0a]">
      <Hero />
      <FeaturedArticles />
      <CategoriesSection />
      <LatestArticles />
      <NewsletterCTA />
    </main>
  );
}
