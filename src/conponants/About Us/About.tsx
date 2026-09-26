/**
 * عدسة — صفحة "من نحن" (About)
 * -----------------------------------------------------------------------
 * نفس افتراض صفحة الهوم: الـ Header/Nav (ثابت position: fixed) والـ Footer
 * معمولين عندك بشكل منفصل، فالمكوّن ده بيبدأ بمسافة `pt-28` تعويضاً
 * لارتفاع الـ Nav — عدّل الرقم لو مختلف عندك.
 *
 * التنصيب:
 *   npm i react-icons
 * وخط Cairo (لو لسه مش مضاف عندك):
 *   <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
 */

import React from "react";
import {
  FiBook,
  FiEdit3,
  FiUsers,
  FiRefreshCw,
  FiZap,
  FiTarget,
  FiLinkedin,
  FiGithub,
  FiCheck,
  FiMail,
} from "react-icons/fi";
import { FaHandshake, FaXTwitter } from "react-icons/fa6";
import { BsNewspaper } from "react-icons/bs";

/* -------------------------------------------------------------------------- */
/*  Types                                                                     */
/* -------------------------------------------------------------------------- */

interface Author {
  name: string;
  avatar: string;
  role: string;
}

interface StatItem {
  icon: React.ElementType;
  value: string;
  label: string;
}

interface ValueItem {
  icon: React.ElementType;
  title: string;
  description: string;
}

/* -------------------------------------------------------------------------- */
/*  Data                                                                      */
/* -------------------------------------------------------------------------- */

const STATS: StatItem[] = [
  { icon: FiBook, value: "+15", label: "تصنيف" },
  { icon: FiEdit3, value: "+50", label: "كاتب خبير" },
  { icon: BsNewspaper, value: "+500", label: "مقالة منشورة" },
  { icon: FiUsers, value: "+2 مليون", label: "قارئ شهرياً" },
];

const VALUES: ValueItem[] = [
  {
    icon: FiRefreshCw,
    title: "دائماً محدث",
    description: "أحدث الاتجاهات وأفضل الممارسات",
  },
  {
    icon: FaHandshake,
    title: "المجتمع",
    description: "تعلم مع آلاف المصورين",
  },
  {
    icon: FiZap,
    title: "تركيز عملي",
    description: "أمثلة واقعية يمكنك تطبيقها اليوم",
  },
  {
    icon: FiTarget,
    title: "الجودة أولاً",
    description: "محتوى مدروس ومكتوب بخبرة",
  },
];

/** فريق الكتّاب — نفس مؤلفي المقالات، بترتيب ظهورهم الأول */
const TEAM: Author[] = [
  {
    name: "سالم أحمد",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    role: "مصور محترف",
  },
  {
    name: "محمد علي",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
    role: "مصور بورتريه",
  },
  {
    name: "إبراهيم حسن",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    role: "مصور طبيعة",
  },
  {
    name: "داود خالد",
    avatar:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face",
    role: "مدرب تصوير",
  },
  {
    name: "ليث محمود",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face",
    role: "فنان بصري",
  },
  {
    name: "جمال عبدالله",
    avatar:
      "https://images.unsplash.com/photo-1463453091185-61582044d556?w=100&h=100&fit=crop&crop=face",
    role: "مصور ومراجع تقني",
  },
  {
    name: "خالد الفيصل",
    avatar:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop&crop=face",
    role: "مصور فلكي",
  },
  {
    name: "نادر سعيد",
    avatar:
      "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=100&h=100&fit=crop&crop=face",
    role: "مصور شوارع",
  },
  {
    name: "هاني الشمري",
    avatar:
      "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=100&h=100&fit=crop&crop=face",
    role: "مصور طعام",
  },
  {
    name: "عمر الراشد",
    avatar:
      "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=100&h=100&fit=crop&crop=face",
    role: "مصور حياة برية",
  },
  {
    name: "فارس العلي",
    avatar:
      "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&h=100&fit=crop&crop=face",
    role: "فنان فوتوغرافي",
  },
  {
    name: "سامي الحربي",
    avatar:
      "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=100&h=100&fit=crop&crop=face",
    role: "خبير تعديل صور",
  },
  {
    name: "رامي الخطيب",
    avatar:
      "https://images.unsplash.com/photo-1548372290-8d01b6c8e78c?w=100&h=100&fit=crop&crop=face",
    role: "مصور ماكرو",
  },
  {
    name: "باسم المصري",
    avatar:
      "https://images.unsplash.com/photo-1583195764036-6dc248ac07d9?w=100&h=100&fit=crop&crop=face",
    role: "مصور فني",
  },
  {
    name: "منصور الزهراني",
    avatar:
      "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?w=100&h=100&fit=crop&crop=face",
    role: "مصور زفاف",
  },
  {
    name: "فيصل الدوسري",
    avatar:
      "https://images.unsplash.com/photo-1618077360395-f3068be8e001?w=100&h=100&fit=crop&crop=face",
    role: "مصور جوي",
  },
  {
    name: "لؤي الصالح",
    avatar:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&h=100&fit=crop&crop=face",
    role: "مصور تجاري",
  },
  {
    name: "طارق النعيمي",
    avatar:
      "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=100&h=100&fit=crop&crop=face",
    role: "مصور معماري",
  },
  {
    name: "أحمد الشهري",
    avatar:
      "https://images.unsplash.com/photo-1580518324671-c2f0833a3af3?w=100&h=100&fit=crop&crop=face",
    role: "مصور رياضي",
  },
  {
    name: "ماجد القحطاني",
    avatar:
      "https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=100&h=100&fit=crop&crop=face",
    role: "مصور استوديو",
  },
  {
    name: "ياسر العتيبي",
    avatar:
      "https://images.unsplash.com/photo-1590086782957-93c06ef21604?w=100&h=100&fit=crop&crop=face",
    role: "مصور رحالة",
  },
  {
    name: "دحام الحسيني",
    avatar:
      "https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=100&h=100&fit=crop&crop=face",
    role: "فنان بصري",
  },
  {
    name: "نايف المطيري",
    avatar:
      "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=100&h=100&fit=crop&crop=face",
    role: "مصور مواليد",
  },
  {
    name: "عبدالله الغامدي",
    avatar:
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&h=100&fit=crop&crop=face",
    role: "مصور عقارات",
  },
  {
    name: "كريم الفهد",
    avatar:
      "https://images.unsplash.com/photo-1534030347209-467a5b0ad3e6?w=100&h=100&fit=crop&crop=face",
    role: "خبير تقني",
  },
  {
    name: "سلطان الراجحي",
    avatar:
      "https://images.unsplash.com/photo-1557862921-37829c790f19?w=100&h=100&fit=crop&crop=face",
    role: "فنان تصوير",
  },
  {
    name: "فهد السبيعي",
    avatar:
      "https://images.unsplash.com/photo-1531891437562-4301cf35b7e4?w=100&h=100&fit=crop&crop=face",
    role: "مراجع معدات",
  },
  {
    name: "راشد الجاسر",
    avatar:
      "https://images.unsplash.com/photo-1545167622-3a6ac756afa4?w=100&h=100&fit=crop&crop=face",
    role: "فنان بصري",
  },
];
/* -------------------------------------------------------------------------- */
/*  Small shared pieces                                                       */
/* -------------------------------------------------------------------------- */

/** الشارة الصغيرة الغامقة بنص برتقالي، زي "من نحن" و"فريقنا" في الفيديو */
const Eyebrow: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="inline-flex items-center gap-2 rounded-full border border-[#3a2417] bg-[#1c130c] px-5 py-2 text-sm font-bold text-[#f1763a]">
    {children}
    <span className="flex items-center gap-1">
      <span className="h-1.5 w-1.5 rounded-full bg-[#f1763a]" />
      <span className="h-1.5 w-1.5 rounded-full bg-[#f1763a]/40" />
    </span>
  </div>
);

/** عنوان القسم بشرطتين متدرجتين (زي "| قيمنا |" في الفيديو بالظبط) */
const BarHeading: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 className="flex items-center justify-center gap-4 text-3xl font-extrabold text-white sm:text-4xl">
    <span className="h-7 w-1.5 rounded-full bg-linear-to-b from-[#ed4c13] to-[#ffb648]" />
    {children}
    <span className="h-7 w-1.5 rounded-full bg-linear-to-b from-[#ed4c13] to-[#ffb648]" />
  </h2>
);

const PillButton: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "solid" | "outline" | "dark";
  }
> = ({ variant = "solid", className = "", children, ...props }) => {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-[15px] font-semibold transition-colors duration-200";
  const styles =
    variant === "solid"
      ? "bg-[#f1763a] text-white hover:bg-[#ed6a29]"
      : variant === "dark"
        ? "bg-black text-white hover:bg-neutral-900"
        : "border border-white/60 bg-transparent text-white hover:bg-white/10";
  return (
    <button className={`${base} ${styles} ${className}`} {...props}>
      {children}
    </button>
  );
};

/* -------------------------------------------------------------------------- */
/*  Hero                                                                      */
/* -------------------------------------------------------------------------- */

const AboutHero: React.FC = () => (
  <section className=" overflow-hidden bg-[#0a0a0a]">
    <div
      className="pointer-events-none absolute inset-0 opacity-[0.07]"
      style={{
        backgroundImage:
          "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
        backgroundSize: "56px 56px",
      }}
    />
    <div className="pointer-events-none absolute -top-40 left-1/2 h-105 w-180 -translate-x-1/2 rounded-full bg-[#f1763a]/20 blur-[120px]" />

    <div className="relative mx-auto max-w-5xl px-4 pb-20 pt-16 text-center sm:px-6 sm:pt-20 lg:px-8">
      <div className="flex justify-center">
        <Eyebrow>من نحن</Eyebrow>
      </div>

      <h1 className="mt-8 text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">
        <span className="text-[#f1763a]">مهمتنا هي </span>
        <span>الإعلام والإلهام</span>
      </h1>

      <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-neutral-400">
        مدونة متخصصة في فن التصوير الفوتوغرافي، نشارك معكم أسرار المحترفين
        ونصائح عملية لتطوير مهاراتكم. نحن شغوفون بمشاركة المعرفة ومساعدة
        المصورين على تنمية مهاراتهم من خلال محتوى عالي الجودة.
      </p>

      <div className="mt-14 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {STATS.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="rounded-2xl border border-white/5 bg-[#141414] px-6 py-8 transition-colors hover:border-[#f1763a]/30"
            >
              <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-[#f1763a]/10 text-[#f1763a]">
                <Icon className="h-5 w-5" />
              </div>
              <div className="mt-4 text-2xl font-extrabold text-white">
                {stat.value}
              </div>
              <div className="mt-1 text-sm text-neutral-500">{stat.label}</div>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);

/* -------------------------------------------------------------------------- */
/*  Values ("قيمنا")                                                          */
/* -------------------------------------------------------------------------- */

const ValueCard: React.FC<{ value: ValueItem }> = ({ value }) => {
  const Icon = value.icon;
  return (
    <div className="rounded-2xl border border-white/5 bg-[#141414] p-6 text-center transition-colors hover:border-[#f1763a]/30">
      <div className="mx-auto flex h-12 w-12 items-center justify-center text-[#f1763a]">
        <Icon className="h-8 w-8" />
      </div>
      <div className="mt-4 text-lg font-bold text-white">{value.title}</div>
      <div className="mt-1 text-sm text-neutral-500">{value.description}</div>
    </div>
  );
};

const Values: React.FC = () => (
  <section className="bg-[#0a0a0a] py-20 sm:py-28">
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <BarHeading>قيمنا</BarHeading>
        <p className="mx-auto mt-4 max-w-xl text-[15px] text-neutral-400">
          المبادئ التي توجه كل ما نقوم بإنشائه
        </p>
      </div>

      <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {VALUES.map((value) => (
          <ValueCard key={value.title} value={value} />
        ))}
      </div>
    </div>
  </section>
);

/* -------------------------------------------------------------------------- */
/*  Team ("تعرف على كتابنا")                                                  */
/* -------------------------------------------------------------------------- */

const SOCIAL_BUTTONS: {
  icon: React.ElementType;
  label: string;
  hoverClass: string;
}[] = [
  {
    icon: FiLinkedin,
    label: "LinkedIn",
    hoverClass: "hover:bg-[#0a66c2] hover:text-white",
  },
  {
    icon: FiGithub,
    label: "GitHub",
    hoverClass: "hover:bg-white hover:text-black",
  },
  {
    icon: FaXTwitter,
    label: "X",
    hoverClass: "hover:bg-black hover:text-white",
  },
];

const TeamCard: React.FC<{ member: Author }> = ({ member }) => (
  <div className="group rounded-2xl border border-white/5 bg-[#141414] p-6 text-center transition-colors duration-300 hover:border-[#f1763a]/60">
    <div className="relative mx-auto h-20 w-20">
      <img
        src={member.avatar}
        alt={member.name}
        className="h-20 w-20 rounded-full object-cover ring-2 ring-white/10 transition-all duration-300 group-hover:ring-[#f1763a]/60"
      />
      <span className="absolute bottom-0 left-0 flex h-6 w-6 items-center justify-center rounded-full bg-[#f1763a] ring-2 ring-[#141414]">
        <FiCheck className="h-3.5 w-3.5 text-white" />
      </span>
    </div>

    <div className="mt-4 text-lg font-bold text-white">{member.name}</div>
    <div className="mt-1 text-sm font-medium text-[#f1763a]">{member.role}</div>

    <div className="mt-5 flex items-center justify-center gap-2">
      {SOCIAL_BUTTONS.map(({ icon: Icon, label, hoverClass }) => (
        <a
          key={label}
          href="#"
          aria-label={`${member.name} على ${label}`}
          className={`flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-neutral-400 transition-colors duration-200 ${hoverClass}`}
        >
          <Icon className="h-4 w-4" />
        </a>
      ))}
    </div>
  </div>
);

const Team: React.FC = () => (
  <section className="bg-[#0a0a0a] py-20 sm:py-28">
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <div className="flex justify-center">
          <Eyebrow>فريقنا</Eyebrow>
        </div>
        <h2 className="mt-6 text-4xl font-extrabold text-white sm:text-5xl">
          تعرف على كتابنا
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-[15px] text-neutral-400">
          فريقنا من المصورين والكتاب ذوي الخبرة شغوفون بمشاركة معرفتهم مع
          المجتمع.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {TEAM.map((member) => (
          <TeamCard key={member.name} member={member} />
        ))}
      </div>
    </div>
  </section>
);

/* -------------------------------------------------------------------------- */
/*  CTA ("لديك أسئلة؟ دعنا نتحدث!")                                           */
/* -------------------------------------------------------------------------- */

const CTA: React.FC = () => (
  <section className="bg-linear-to-br from-[#ed4c13] to-[#ffb648] py-20 sm:py-24">
    <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
      <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
        لديك أسئلة؟ دعنا نتحدث!
      </h2>
      <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-white/90">
        نحب أن نسمع منك. سواء كان لديك سؤال حول محتوانا، أو تريد المساهمة، أو
        تريد فقط إلقاء التحية، لا تتردد في التواصل.
      </p>

      <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
        <a href="/blog">
          <PillButton variant="outline">تصفح المقالات</PillButton>
        </a>
        <a href="mailto:hello@adasah.com">
          <PillButton variant="dark">
            <FiMail className="h-4 w-4" />
            تواصل معنا
          </PillButton>
        </a>
      </div>
    </div>
  </section>
);

/* -------------------------------------------------------------------------- */
/*  Page (بدون Header/Footer — دول عندك بره المكوّن ده)                       */
/* -------------------------------------------------------------------------- */

const AboutPage: React.FC = () => {
  return (
    // pt-28 بتعوّض ارتفاع الـ Nav الثابت (fixed) عندك — عدّلها لو لازم
    <div className="min-h-screen bg-[#0a0a0a] pt-28 font-[Cairo,sans-serif] antialiased">
      <main>
        <AboutHero />
        <Values />
        <Team />
        <CTA />
      </main>
    </div>
  );
};

export default AboutPage;
