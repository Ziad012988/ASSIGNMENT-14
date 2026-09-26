"use client";

import { FaRegFaceFrown, FaHouse, FaNewspaper } from "react-icons/fa6";

const helpfulLinks = [
  { label: "المدونة", href: "/blog" },
  { label: "من نحن", href: "/about" },
  { label: "الخصوصية", href: "/privacy" },
];

export default function NotFound() {
  return (
    <main
      dir="rtl"
      className="relative overflow-hidden bg-[#0a0a0a] px-6 py-20 text-center lg:px-12"
    >
      {/* شبكة الخلفية + التوهج البرتقالي */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_left,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_top,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-size-[64px_64px] mask-[radial-gradient(ellipse_60%_60%_at_50%_35%,black_40%,transparent_100%)]" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-112.5 w-212.5 -translate-x-1/2 rounded-full bg-orange-600/20 blur-[140px]" />

      <div className="relative mx-auto max-w-2xl">
        {/* رقم 404 */}
        <h1 className="bg-linear-to-b from-amber-400 to-orange-600 bg-clip-text text-8xl font-extrabold leading-none text-transparent sm:text-9xl">
          404
        </h1>

        {/* الأيقونة + النقاط العائمة الزخرفية */}
        <div className="relative mx-auto my-10 h-36 w-36">
          <span className="absolute -top-1 right-2 h-4 w-4 animate-bounce rounded-full bg-orange-500 [animation-delay:-0.2s]" />
          <span className="absolute bottom-2 left-0 h-3 w-3 animate-bounce rounded-full bg-amber-400 [animation-delay:-0.6s]" />
          <div className="flex h-36 w-36 items-center justify-center rounded-full bg-orange-500/10">
            <FaRegFaceFrown className="h-14 w-14 text-orange-500" />
          </div>
        </div>

        {/* العنوان والوصف */}
        <h2 className="text-2xl font-extrabold text-white sm:text-3xl">
          عفواً! الصفحة غير موجودة
        </h2>
        <p className="mx-auto mt-4 max-w-lg leading-relaxed text-neutral-400">
          الصفحة التي تبحث عنها غير موجودة أو تم نقلها. دعنا نعيدك إلى المسار
          الصحيح.
        </p>

        {/* الأزرار */}
        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <a
            href="/blog"
            className="flex items-center gap-2 rounded-full border border-white/15 px-7 py-3.5 text-sm font-bold text-white transition-colors duration-300 hover:border-white/30 hover:bg-white/5"
          >
            <span>تصفح المقالات</span>
            <FaNewspaper className="h-4 w-4" />
          </a>
          <a
            href="/"
            className="flex items-center gap-2 rounded-full bg-linear-to-r from-orange-500 to-orange-600 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-orange-600/25 transition-all duration-300 hover:from-orange-600 hover:to-orange-700 active:scale-[0.98]"
          >
            <span>الذهاب للرئيسية</span>
            <FaHouse className="h-4 w-4" />
          </a>
        </div>

        {/* رابط إضافي */}
        <div className="mx-auto mt-14 max-w-md border-t border-white/10 pt-8">
          <p className="mb-3 text-sm text-neutral-500">قد تجد هذه مفيدة:</p>
          <div className="flex items-center justify-center gap-3 text-sm">
            {helpfulLinks.map((link, i) => (
              <span key={link.href} className="flex items-center gap-3">
                <a
                  href={link.href}
                  className="font-medium text-orange-500 transition-all duration-300 hover:underline"
                >
                  {link.label}
                </a>
                {i < helpfulLinks.length - 1 && (
                  <span className="text-neutral-600">•</span>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
