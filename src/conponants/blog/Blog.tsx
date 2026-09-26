"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  FaMagnifyingGlass,
  FaArrowLeft,
  FaClock,
  FaRegCalendar,
  FaNewspaper,
  FaBars,
  FaTableCells,
  FaChevronLeft,
  FaChevronRight,
  FaXmark,
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

interface Category {
  name: string;
  count: number;
  color: string;
}

const { posts, categories } = postsData as {
  posts: Post[];
  categories: Category[];
  siteInfo: Record<string, unknown>;
};

const ALL = "جميع المقالات";
const PER_PAGE = 6;

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("ar-EG-u-nu-latn", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// ---------- عناصر مشتركة ----------
function LiveDot() {
  return (
    <span className="relative flex h-2 w-2">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75" />
      <span className="relative inline-flex h-2 w-2 rounded-full bg-orange-500" />
    </span>
  );
}

// ---------- هيدر المدونة ----------
function BlogHero() {
  return (
    <section
      dir="rtl"
      className="relative overflow-hidden bg-[#0a0a0a] px-6 pb-16 pt-14 text-center lg:px-12"
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_left,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_top,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-size-[64px_64px] mask-[radial-gradient(ellipse_60%_60%_at_50%_35%,black_40%,transparent_100%)]" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-105 w-200 -translate-x-1/2 rounded-full bg-orange-600/20 blur-[140px]" />

      <div className="relative mx-auto max-w-3xl">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/10 px-4 py-1.5 text-sm font-semibold text-orange-500">
          <span>مدونتنا</span>
          <FaNewspaper className="h-3.5 w-3.5" />
          <LiveDot />
        </div>

        <h1 className="text-4xl font-extrabold leading-tight text-white sm:text-5xl">
          استكشف <span className="text-orange-500">مقالاتنا</span>
        </h1>

        <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-neutral-400">
          اكتشف الدروس والرؤى وأفضل الممارسات للتطوير الحديث
        </p>
      </div>
    </section>
  );
}

// ---------- شريط الفلاتر والبحث ----------
function FiltersBar({
  activeCategory,
  onCategoryChange,
  search,
  onSearchChange,
}: {
  activeCategory: string;
  onCategoryChange: (c: string) => void;
  search: string;
  onSearchChange: (v: string) => void;
}) {
  const filters = [ALL, ...categories.map((c) => c.name)];

  return (
    <div
      dir="rtl"
      className="border-t border-white/5 bg-[#0a0a0a] px-6 py-6 lg:px-12"
    >
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          {filters.map((name) => {
            const active = name === activeCategory;
            return (
              <button
                key={name}
                type="button"
                onClick={() => onCategoryChange(name)}
                className={
                  active
                    ? "rounded-full bg-linear-to-r from-orange-500 to-orange-600 px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-orange-600/30"
                    : "rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium text-neutral-300 transition-colors duration-300 hover:bg-white/10 hover:text-white"
                }
              >
                {name}
              </button>
            );
          })}
        </div>

        <div className="relative w-full max-w-xs sm:w-72">
          <FaMagnifyingGlass
            className={`pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 transition-colors duration-300 ${
              search ? "text-orange-500" : "text-neutral-500"
            }`}
          />
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="ابحث في المقالات..."
            className="w-full rounded-full border border-white/10 bg-white/5 py-2.5 pe-11 ps-10 text-sm text-neutral-200 placeholder-neutral-500 outline-none transition-colors duration-300 focus:border-orange-500 focus:bg-white/7"
          />
          {search && (
            <button
              type="button"
              aria-label="مسح البحث"
              onClick={() => onSearchChange("")}
              className="absolute left-4 top-1/2 flex h-5 w-5 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-neutral-300 transition-colors duration-300 hover:bg-orange-500 hover:text-white"
            >
              <FaXmark className="h-2.5 w-2.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ---------- شريط النتائج + تبديل العرض ----------
function ToolBar({
  count,
  view,
  onViewChange,
  activeCategory,
  hasActiveFilters,
  onClearFilters,
}: {
  count: number;
  view: "grid" | "list";
  onViewChange: (v: "grid" | "list") => void;
  activeCategory: string;
  hasActiveFilters: boolean;
  onClearFilters: () => void;
}) {
  return (
    <div
      dir="rtl"
      className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-12 "
    >
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 p-1">
          <button
            type="button"
            aria-label="عرض قائمة"
            onClick={() => onViewChange("list")}
            className={
              view === "list"
                ? "flex h-9 w-9 items-center justify-center rounded-full bg-linear-to-r from-orange-500 to-orange-600 text-white"
                : "flex h-9 w-9 items-center justify-center rounded-full text-neutral-400 transition-colors duration-300 hover:text-white"
            }
          >
            <FaBars className="h-4 w-4" />
          </button>
          <button
            type="button"
            aria-label="عرض شبكي"
            onClick={() => onViewChange("grid")}
            className={
              view === "grid"
                ? "flex h-9 w-9 items-center justify-center rounded-full bg-linear-to-r from-orange-500 to-orange-600 text-white"
                : "flex h-9 w-9 items-center justify-center rounded-full text-neutral-400 transition-colors duration-300 hover:text-white"
            }
          >
            <FaTableCells className="h-4 w-4" />
          </button>
        </div>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={onClearFilters}
            className="flex items-center gap-1.5 text-sm font-medium text-neutral-400 transition-colors duration-300 hover:text-orange-500"
          >
            <span>مسح الفلاتر</span>
            <FaXmark className="h-3 w-3" />
          </button>
        )}
      </div>

      <p className="text-sm text-neutral-400">
        عرض <span className="font-bold text-white">{count}</span> مقالات
        {activeCategory !== ALL && (
          <>
            {" "}
            في{" "}
            <span className="font-bold text-orange-500">{activeCategory}</span>
          </>
        )}
      </p>
    </div>
  );
}

// ---------- بطاقة الشبكة (Grid) ----------
function GridCard({ post }: { post: Post }) {
  return (
    <a
      href={`/blog/${post.slug}`}
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

        <div className="flex items-center  gap-3 border-t border-white/5 pt-4">
      
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
              <button
            type="button"
            aria-hidden
            className="mr-auto flex  h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-500/15 text-orange-500"
          >
            <FaChevronLeft className="h-3 w-3" />
          </button>
        </div>
      </div>
    </a>
  );
}

// ---------- بطاقة القائمة (List) ----------
function ListCard({ post }: { post: Post }) {
  return (
    <div className="group grid overflow-hidden rounded-2xl border border-white/10 bg-white/2 transition-colors duration-300 hover:border-orange-500/30 md:grid-cols-2 md:[direction:ltr]">
      <div dir="rtl" className="flex flex-col justify-center gap-3 p-8">
        <div className="flex items-center gap-3">
          <span className="rounded-full bg-orange-500/15 px-3.5 py-1.5 text-xs font-bold text-orange-500">
            {post.category}
          </span>
          <span className="flex items-center gap-1.5 text-xs text-neutral-500">
            <FaRegCalendar className="h-3 w-3" />
            {formatDate(post.date)}
          </span>
          <span className="flex items-center gap-1.5 text-xs text-neutral-500">
            <FaClock className="h-3 w-3" />
            {post.readTime}
          </span>
        </div>

        <h3 className="text-xl font-extrabold leading-snug text-white transition-colors duration-300 group-hover:text-orange-500 lg:text-2xl">
          {post.title}
        </h3>

        <p className="leading-relaxed text-neutral-400">{post.excerpt}</p>

        <div className="mt-3 flex items-center justify-between">
          <a
            href={`/blog/${post.slug}`}
            className="flex items-center gap-2 text-sm font-bold text-orange-500 transition-colors duration-300 hover:text-orange-400"
          >
            <FaArrowLeft className="h-3.5 w-3.5" />
            <span>اقرأ المقال</span>
          </a>

          <div className="flex items-center gap-3">
            <div>
              <div className="text-right text-sm font-bold text-white">
                {post.author.name}
              </div>
              <div className="text-right text-xs text-neutral-500">
                {post.author.role}
              </div>
            </div>
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="h-10 w-10 rounded-full object-cover"
            />
          </div>
        </div>
      </div>

      <div className="relative min-h-55 overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
    </div>
  );
}

// ---------- الترقيم (Pagination) - سلايدر بحد أقصى 5 أرقام ظاهرة ----------
const MAX_VISIBLE_PAGES = 5;

function getVisiblePages(current: number, total: number): (number | "...")[] {
  if (total <= MAX_VISIBLE_PAGES) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const half = Math.floor(MAX_VISIBLE_PAGES / 2);
  let start = Math.max(1, current - half);
  let end = start + MAX_VISIBLE_PAGES - 1;

  if (end > total) {
    end = total;
    start = end - MAX_VISIBLE_PAGES + 1;
  }

  const pages: (number | "...")[] = [];
  if (start > 1) {
    pages.push(1);
    if (start > 2) pages.push("...");
  }
  for (let p = start; p <= end; p++) pages.push(p);
  if (end < total) {
    if (end < total - 1) pages.push("...");
    pages.push(total);
  }
  return pages;
}

function Pagination({
  page,
  totalPages,
  onPageChange,
}: {
  page: number;
  totalPages: number;
  onPageChange: (p: number) => void;
}) {
  if (totalPages <= 1) return null;

  const pages = getVisiblePages(page, totalPages);

  return (
    <div dir="rtl" className="mt-4 flex flex-col items-center gap-3">
      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-label="السابق"
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-white/5 text-white transition-colors duration-300 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <FaChevronRight className="h-3.5 w-3.5" />
        </button>

        {pages.map((p, i) =>
          p === "..." ? (
            <span
              key={`dots-${i}`}
              className="flex h-11 w-11 items-center justify-center text-sm text-neutral-500"
            >
              …
            </span>
          ) : (
            <button
              key={p}
              type="button"
              onClick={() => onPageChange(p)}
              className={
                p === page
                  ? "flex h-11 w-11 items-center justify-center rounded-full bg-linear-to-r from-orange-500 to-orange-600 text-sm font-bold text-white shadow-md shadow-orange-600/30"
                  : "flex h-11 w-11 items-center justify-center rounded-full bg-white/5 text-sm font-medium text-neutral-300 transition-colors duration-300 hover:bg-white/10 hover:text-white"
              }
            >
              {p}
            </button>
          ),
        )}

        <button
          type="button"
          aria-label="التالي"
          disabled={page === totalPages}
          onClick={() => onPageChange(page + 1)}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-white/5 text-white transition-colors duration-300 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <FaChevronLeft className="h-3.5 w-3.5" />
        </button>
      </div>

      <p className="text-sm text-neutral-500">
        صفحة {page} من {totalPages}
      </p>
    </div>
  );
}

// ---------- صفحة المدونة ----------
export default function BlogPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const requestedCategory = searchParams.get("category");
  const activeCategory = categories.some(
    (category) => category.name === requestedCategory,
  )
    ? requestedCategory!
    : ALL;
  const [search, setSearch] = useState("");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = search.trim();
    return posts.filter((p) => {
      const matchesCategory =
        activeCategory === ALL || p.category === activeCategory;
      const matchesSearch =
        q === "" || p.title.includes(q) || p.excerpt.includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const paginated = filtered.slice(
    (currentPage - 1) * PER_PAGE,
    currentPage * PER_PAGE,
  );

  function handleCategoryChange(cat: string) {
    const nextParams = new URLSearchParams(searchParams);
    if (cat === ALL) nextParams.delete("category");
    else nextParams.set("category", cat);
    setSearchParams(nextParams);
    setPage(1);
  }

  function handleSearchChange(value: string) {
    setSearch(value);
    setPage(1);
  }

  function handlePageChange(p: number) {
    setPage(Math.min(Math.max(1, p), totalPages));
  }

  function handleClearFilters() {
    setSearchParams({});
    setSearch("");
    setPage(1);
  }

  const hasActiveFilters = activeCategory !== ALL || search.trim() !== "";

  return (
    <main className="bg-[#0a0a0a] mt-20">
      <BlogHero />
      <FiltersBar
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
        search={search}
        onSearchChange={handleSearchChange}
      />
      <ToolBar
        count={filtered.length}
        view={view}
        onViewChange={setView}
        activeCategory={activeCategory}
        hasActiveFilters={hasActiveFilters}
        onClearFilters={handleClearFilters}
      />

      <section dir="rtl" className="px-6 pb-20 lg:px-12">
        <div className="mx-auto max-w-7xl">
          {paginated.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-white/2 py-24 text-center text-neutral-400">
              لا توجد مقالات مطابقة لبحثك
            </div>
          ) : view === "grid" ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {paginated.map((post) => (
                <GridCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {paginated.map((post) => (
                <ListCard key={post.id} post={post} />
              ))}
            </div>
          )}

          <div className="mt-14">
            <Pagination
              page={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
