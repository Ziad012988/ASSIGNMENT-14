import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import { Link, useParams } from "react-router-dom";
import {
  FaHouse,
  FaChevronLeft,
  FaClock,
  FaRegCalendar,
  FaCamera,
  FaListUl,
  FaTag,
  FaShareNodes,
  FaLink,
  FaWhatsapp,
  FaLinkedin,
  FaXTwitter,
  FaEnvelope,
  FaImage,
} from "react-icons/fa6";
import postsData from "../Home/posts.json";

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

const { posts } = postsData as { posts: Post[] };

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("ar-EG-u-nu-latn", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// يقسم نص المقال (Markdown بسيط) إلى: مقدمة + أقسام لكل عنوان ##
function parseContent(content: string) {
  const parts = content.split(/\n##\s+/);
  const intro = parts[0].trim();
  const sections = parts.slice(1).map((part) => {
    const [heading, ...rest] = part.split("\n");
    return {
      heading: heading.trim(),
      body: rest.join("\n").trim(),
      id: heading.trim().replace(/\s+/g, "-"),
    };
  });
  return { intro, sections };
}

// ---------- شريط التنقل التوجيهي (Breadcrumb) ----------
function Breadcrumb({ post }: { post: Post }) {
  return (
    <div dir="rtl" className="flex items-center gap-2 text-sm">
      <span className="rounded-full bg-orange-500 px-3 py-1 text-xs font-bold text-white">
        {post.category}
      </span>
      <FaChevronLeft className="h-2.5 w-2.5 text-neutral-500" />
      <Link
        to="/blog"
        className="text-neutral-300 transition-colors hover:text-white"
      >
        المدونة
      </Link>
      <FaChevronLeft className="h-2.5 w-2.5 text-neutral-500" />
      <Link
        to="/"
        className="text-neutral-300 transition-colors hover:text-white"
      >
        <FaHouse className="h-3.5 w-3.5" />
      </Link>
    </div>
  );
}

// ---------- الهيرو ----------
function PostHero({ post }: { post: Post }) {
  return (
    <section dir="rtl" className="relative h-130 overflow-hidden">
      <img
        src={post.image}
        alt={post.title}
        className="h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-black/30" />

      <div className="absolute inset-x-0 top-24 px-6 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <Breadcrumb post={post} />
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 px-6 pb-10 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-4 flex items-center justify-end gap-3 text-sm text-neutral-300">
            <span className="rounded-full bg-orange-500 px-3.5 py-1.5 text-xs font-bold text-white">
              {post.category}
            </span>
            <span className="flex items-center gap-1.5">
              <FaRegCalendar className="h-3.5 w-3.5" />
              {formatDate(post.date)}
            </span>
            <span className="flex items-center gap-1.5">
              <FaClock className="h-3.5 w-3.5" />
              {post.readTime}
            </span>
          </div>

          <h1 className="text-right text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl">
            {post.title}
          </h1>

          <div className="mt-6 flex items-center justify-end gap-3">
            <div className="text-right">
              <div className="text-sm font-bold text-white">
                {post.author.name}
              </div>
              <div className="text-xs text-neutral-400">{post.author.role}</div>
            </div>
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="h-12 w-12 rounded-full border-2 border-white/20 object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- عنوان قسم داخل المقال ----------
function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <div className="mb-4 mt-10 flex items-center justify-start gap-3">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-orange-500/15 text-orange-500">
        <FaCamera className="h-4 w-4" />
      </span>
      <h2 className="text-2xl font-extrabold text-white">{children}</h2>
    </div>
  );
}

// ---------- الشريط الجانبي: محتويات المقال ----------
function TableOfContents({
  sections,
  activeId,
  onSelect,
}: {
  sections: { heading: string; id: string }[];
  activeId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/2 p-6">
      <div className="mb-5 flex items-center gap-3">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500/15 text-orange-500">
          <FaListUl className="h-3.5 w-3.5" />
        </span>
        <h3 className="text-base font-bold text-white">محتويات المقال</h3>
      </div>

      <ul className="space-y-1">
        {sections.map((s, i) => (
          <li key={s.id}>
            <button
              type="button"
              onClick={() => onSelect(s.id)}
              className={
                activeId === s.id
                  ? "flex w-full items-center justify-between rounded-lg bg-orange-500/10 px-3 py-2.5 text-sm font-bold text-orange-500"
                  : "flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm text-neutral-400 transition-colors duration-300 hover:bg-white/5 hover:text-white"
              }
            >
              <span>{s.heading}</span>
              <span className="text-xs text-neutral-500">{i + 1}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ---------- الشريط الجانبي: تاريخ + وقت القراءة ----------
function MetaMiniCards({ post }: { post: Post }) {
  return (
    <div className="mt-6 grid grid-cols-2 gap-3">
      <div className="rounded-2xl border border-white/10 bg-white/2 p-4 text-right">
        <FaRegCalendar className="mx-auto mb-2 h-5 w-5 text-orange-500" />
        <div className="text-sm font-bold text-center text-white">
          {formatDate(post.date)}
        </div>
        <div className="mt-1 text-xs text-center text-neutral-500">
          تاريخ النشر
        </div>
      </div>
      <div className="rounded-2xl border border-white/10 bg-white/2 p-4 text-right">
        <FaClock className="mx-auto mb-2 h-5 w-5 text-orange-500" />
        <div className="text-sm text-center font-bold text-white">
          {post.readTime}
        </div>
        <div className="mt-1 text-xs text-center text-neutral-500">
          وقت القراءة
        </div>
      </div>
    </div>
  );
}

// ---------- الشريط الجانبي: بطاقة اشتراك مصغّرة ----------
function SidebarNewsletter() {
  return (
    <div className="mt-6 rounded-2xl border border-orange-500/20 bg-linear-to-b from-orange-500/10 to-transparent p-6 text-right">
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-orange-500 to-orange-600 text-white">
        <FaEnvelope className="h-5 w-5" />
      </div>
      <h4 className="text-base text-center font-bold text-white">لا تفوّت جديدنا</h4>
      <p className="mt-2 text-center text-sm text-neutral-400">
        اشترك للحصول على أحدث المقالات
      </p>
      <Link
        to="/blog"
        className="mt-4 block text-center rounded-full bg-linear-to-r from-orange-500 to-orange-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-orange-600/25 transition-all duration-300 hover:from-orange-600 hover:to-orange-700"
      >
        تصفح المزيد
      </Link>
    </div>
  );
}

// ---------- الوسوم ----------
function TagsSection({ tags }: { tags: string[] }) {
  return (
    <div className="mt-10 rounded-2xl border border-white/10 bg-white/2 p-6">
      <div className="mb-4 flex items-center justify-start gap-3">
        <h3 className="text-base font-bold text-white">الوسوم</h3>
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500/15 text-orange-500">
          <FaTag className="h-3.5 w-3.5" />
        </span>
      </div>
      <div className="flex flex-wrap justify-start gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-neutral-300"
          >
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
}

// ---------- مشاركة المقال ----------
function ShareSection() {
  const shareIcons = [FaLink, FaWhatsapp, FaLinkedin, FaXTwitter];
  return (
    <div className="mt-6 rounded-2xl border border-white/10 bg-white/2 p-6">
      <div className="mb-4 flex items-center justify-start gap-3">
        <h3 className="text-base font-bold text-white">شارك المقال</h3>
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500/15 text-orange-500">
          <FaShareNodes className="h-3.5 w-3.5" />
        </span>
      </div>
      <div className="flex justify-start gap-3">
        {shareIcons.map((Icon, i) => (
          <button
            key={i}
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 text-neutral-300 transition-colors duration-300 hover:bg-orange-500 hover:text-white"
          >
            <Icon className="h-4 w-4" />
          </button>
        ))}
      </div>
    </div>
  );
}

// ---------- كاتب المقال ----------
function AuthorCard({ author }: { author: Author }) {
  return (
    <div className="mt-6 rounded-2xl border border-white/10 bg-white/2 p-6">
      <div className="flex items-start justify-start gap-4 text-right">
          <img
          src={author.avatar}
          alt={author.name}
          className="h-16 w-16 shrink-0 rounded-full object-cover"
        />
        <div>
          <div className="mb-1 text-xs font-bold text-orange-500">
            كاتب المقال
          </div>
          <div className="text-lg font-extrabold text-white">{author.name}</div>
          <div className="text-sm text-neutral-500">{author.role}</div>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-neutral-400">
            {author.role} شغوف بمشاركة المعرفة والخبرات في عالم التصوير
            الفوتوغرافي.
          </p>
        </div>
      
      </div>
    </div>
  );
}

// ---------- مقالات ذات صلة ----------
function RelatedArticles({ current }: { current: Post }) {
  const related = posts
    .filter((p) => p.category === current.category && p.id !== current.id)
    .slice(0, 3);
  if (related.length === 0) return null;

  return (
    <section dir="rtl" className="bg-[#0a0a0a] px-6 py-20 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="mb-3 flex items-center justify-start gap-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-500/15 text-orange-500">
                <FaImage className="h-4 w-4" />
              </span>
              <h2 className="text-3xl font-extrabold text-white">
                مقالات قد تعجبك
              </h2>
            
            </div>
            <p className="text-neutral-400">استكشف المزيد من المحتوى المميز</p>
          </div>
          <a
            href="/blog"
            className="flex items-center gap-2 text-sm font-bold text-orange-500 transition-colors duration-300 hover:text-orange-400"
          >
            <span>عرض الكل</span>
            <FaChevronLeft className="h-3.5 w-3.5" />
          </a>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((post) => (
            <a
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group overflow-hidden rounded-2xl border border-white/10 bg-white/2 transition-colors duration-300 hover:border-orange-500/30"
            >
              <div className="relative h-52 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute right-3 top-3 rounded-full bg-orange-500 px-3 py-1 text-xs font-bold text-white">
                  {post.category}
                </span>
              </div>
              <div className="p-5">
                <h3 className="mb-3 text-base font-extrabold leading-snug text-white transition-colors duration-300 group-hover:text-orange-500">
                  {post.title}
                </h3>
                <div className="flex items-center justify-between text-xs text-neutral-500">
                  <div className="flex items-center gap-2">
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="h-6 w-6 rounded-full object-cover"
                    />
                    <span>{post.author.name}</span>
                  </div>
                  <span>{post.readTime}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- صفحة المقال ----------
export default function BlogPostPage({ post }: { post: Post }) {
  const { intro, sections } = useMemo(() => parseContent(post.content), [post]);
  const [activeId, setActiveId] = useState(sections[0]?.id ?? "");

  function handleSelect(id: string) {
    setActiveId(id);
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <main dir="rtl" className="bg-[#0a0a0a] text-right">
      <PostHero post={post} />

      <section dir="rtl" className="px-6 py-14 lg:px-12">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 lg:grid-cols-3">
          {/* المحتوى الرئيسي */}
          <article className="lg:col-span-2">
            <blockquote className="rounded-2xl border border-orange-500/20 bg-orange-500/5 p-6 text-lg italic leading-relaxed text-neutral-200">
              «{post.excerpt}»
            </blockquote>

            <p className="mt-8 text-lg leading-relaxed text-neutral-300">
              {intro}
            </p>

            {sections.map((s) => (
              <div key={s.id} id={s.id}>
                <SectionHeading>{s.heading}</SectionHeading>
                <p className="text-lg leading-relaxed text-neutral-300">
                  {s.body}
                </p>
              </div>
            ))}

            <TagsSection tags={post.tags} />
            <ShareSection />
            <AuthorCard author={post.author} />
          </article>

          {/* الشريط الجانبي */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24">
              <TableOfContents
                sections={sections}
                activeId={activeId}
                onSelect={handleSelect}
              />
              <MetaMiniCards post={post} />
              <SidebarNewsletter />
            </div>
          </aside>
        </div>
      </section>

      <RelatedArticles current={post} />
    </main>
  );
}

export function BlogPostRoute() {
  const { slug } = useParams<{ slug: string }>();
  const post = posts.find((p) => p.slug === slug) ?? posts[0];
  return <BlogPostPage post={post} />;
}
