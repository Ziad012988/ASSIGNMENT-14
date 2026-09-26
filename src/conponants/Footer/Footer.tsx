import {
  FaYoutube,
  FaLinkedin,
  FaGithub,
  FaXTwitter,
  FaHeart,
  FaChevronLeft,
} from "react-icons/fa6";
import { Link } from "react-router-dom";
import postsData from "../Home/posts.json";

const { siteInfo } = postsData as {
  siteInfo: {
    email: string;
    social: {
      youtube: string;
      linkedin: string;
      github: string;
      twitter: string;
    };
  };
};

export default function Footer() {
  return (
    <footer
      dir="rtl"
      className="relative overflow-hidden border-t border-white/10 bg-[#0a0a0a]"
    >
      {/* توهج خلفية برتقالي خفيف */}
      {/* <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-90 rounded-full bg-orange-600/10 blur-[100px]" /> */}
      <div className="pointer-events-none absolute  right-1/3 h-96 w-96 rounded-full bg-orange-600/10 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl px-6 py-16 lg:px-12">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* الشعار + الوصف + السوشيال ميديا */}
          <div className="lg:order-1">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-orange-500 to-orange-600 text-xl font-bold text-white shadow-lg shadow-orange-600/30">
                ع
              </div>
              <span className="text-xl font-bold text-white">عدسة</span>
            </div>

            <p className="mt-4 max-w-xs text-sm leading-relaxed text-neutral-400">
              مدونة متخصصة في فن التصوير الفوتوغرافي. نشارك معكم أسرار المحترفين
              ونصائح عملية لتطوير مهاراتكم.
            </p>

            <div className="mt-6 flex items-center gap-3">
              <a
                href={siteInfo.social.youtube}
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 text-neutral-400 transition-all duration-300 hover:bg-orange-500 hover:text-white hover:shadow-lg hover:shadow-orange-600/30"
              >
                <FaYoutube className="h-4 w-4" />
              </a>
              <a
                href={siteInfo.social.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 text-neutral-400 transition-all duration-300 hover:bg-orange-500 hover:text-white hover:shadow-lg hover:shadow-orange-600/30"
              >
                <FaLinkedin className="h-4 w-4" />
              </a>
              <a
                href={siteInfo.social.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 text-neutral-400 transition-all duration-300 hover:bg-orange-500 hover:text-white hover:shadow-lg hover:shadow-orange-600/30"
              >
                <FaGithub className="h-4 w-4" />
              </a>
              <a
                href={siteInfo.social.twitter}
                target="_blank"
                rel="noreferrer"
                aria-label="X"
                className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 text-neutral-400 transition-all duration-300 hover:bg-orange-500 hover:text-white hover:shadow-lg hover:shadow-orange-600/30"
              >
                <FaXTwitter className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* استكشف */}
          <div className="lg:order-2">
            <div className="mb-7 flex items-center gap-3">
              <h3 className="text-[17px] font-bold text-white">استكشف</h3>
              <span className="h-px w-8 shrink-0 bg-linear-to-l from-orange-500 to-transparent" />
            </div>
            <ul className="space-y-5">
              <li>
                <Link
                  to="/"
                  className="group inline-flex items-center gap-1.5 text-sm text-neutral-400 transition-colors duration-300 hover:text-orange-500"
                >
                  <FaChevronLeft className="h-3 w-3 -translate-x-1 text-orange-500 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                  <span>الرئيسية</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="group inline-flex items-center gap-1.5 text-sm text-neutral-400 transition-colors duration-300 hover:text-orange-500"
                >
                  <FaChevronLeft className="h-3 w-3 -translate-x-1 text-orange-500 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                  <span>المدونة</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="group inline-flex items-center gap-1.5 text-sm text-neutral-400 transition-colors duration-300 hover:text-orange-500"
                >
                  <FaChevronLeft className="h-3 w-3 -translate-x-1 text-orange-500 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                  <span>من نحن</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* التصنيفات */}
          <div className="lg:order-3">
            <div className="mb-7 flex items-center gap-3">
              <h3 className="text-[17px] font-bold text-white">التصنيفات</h3>
              <span className="h-px w-8 shrink-0 bg-linear-to-l from-orange-500 to-transparent" />
            </div>
            <ul className="space-y-5">
              {["إضاءة", "بورتريه", "مناظر طبيعية", "تقنيات", "معدات"].map(
                (category) => (
                  <li key={category}>
                    <Link
                      to={`/blog?category=${encodeURIComponent(category)}`}
                      className="group inline-flex items-center gap-1.5 text-sm text-neutral-400 transition-colors duration-300 hover:text-orange-500"
                    >
                      <FaChevronLeft className="h-3 w-3 -translate-x-1 text-orange-500 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                      <span>{category}</span>
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </div>

          {/* النشرة البريدية */}
          <div className="lg:order-4">
            <div className="mb-7 flex items-center gap-3">
              <h3 className="text-[17px] font-bold text-white">
                ابقَ على اطلاع
              </h3>
              <span className="h-px w-8 shrink-0 bg-linear-to-l from-orange-500 to-transparent" />
            </div>
            <p className="mb-5 text-sm leading-relaxed text-neutral-400">
              اشترك للحصول على أحدث المقالات والتحديثات.
            </p>

            <form
              action={`mailto:${siteInfo.email}?subject=${encodeURIComponent("الاشتراك في النشرة البريدية")}`}
              method="post"
              encType="text/plain"
              className="space-y-3"
            >
              <input
                type="email"
                name="email"
                required
                placeholder="أدخل بريدك الإلكتروني"
                className="w-full rounded-full border border-neutral-800 bg-neutral-900/60 px-5 py-3 text-sm text-neutral-200 placeholder-neutral-500 outline-none transition-colors duration-300 focus:border-orange-500"
              />
              <button
                type="submit"
                className="w-full rounded-full bg-linear-to-r from-orange-500 to-orange-600 py-3 text-sm font-bold text-white shadow-lg shadow-orange-600/20 transition-all duration-300 hover:from-orange-600 hover:to-orange-700 hover:shadow-orange-600/40 active:scale-[0.98]"
              >
                اشترك
              </button>
            </form>
          </div>
        </div>

        {/* الشريط السفلي */}
        <div className="mt-16 flex flex-col-reverse items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-neutral-500 sm:flex-row">
          <p className="flex items-center gap-1.5">
            <span>© 2026 عدسة. جميع الحقوق محفوظة.</span>
            <FaHeart className="h-3.5 w-3.5 text-orange-500" />
            <span>صنع بكل</span>
          </p>

          <div className="flex items-center gap-6">
            <Link
              to="/legal/privacy"
              className="transition-colors duration-300 hover:text-orange-500"
            >
              سياسة الخصوصية
            </Link>
            <Link
              to="/legal/terms"
              className="transition-colors duration-300 hover:text-orange-500"
            >
              شروط الخدمة
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
