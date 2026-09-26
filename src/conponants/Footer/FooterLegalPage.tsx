import { Link, useParams } from "react-router-dom";

const legalPages = {
  privacy: {
    title: "سياسة الخصوصية",
    paragraphs: [
      "لا يحفظ الموقع عنوان بريدك على خادم خاص به. عند استخدام نموذج الاشتراك، يفتح تطبيق البريد لديك لإرسال رسالة إلى عنوان التواصل الظاهر في الموقع.",
      "للاستفسار عن بياناتك أو طلب عدم استخدامها، تواصل معنا عبر hello@adasah.com.",
    ],
  },
  terms: {
    title: "شروط الخدمة",
    paragraphs: [
      "المحتوى المنشور في عدسة لأغراض تعليمية ومعلوماتية، وقد يتغير دون إشعار مسبق.",
      "يرجى احترام حقوق أصحاب المقالات والصور وعدم إعادة نشر المواد دون إذن أصحابها.",
    ],
  },
} as const;

export default function FooterLegalPage() {
  const { page } = useParams<{ page: string }>();

  if (page !== "privacy" && page !== "terms") {
    return (
      <main
        dir="rtl"
        className="min-h-[50vh] bg-[#0a0a0a] px-6 py-20 text-center text-white"
      >
        <h1 className="text-3xl font-bold">الصفحة غير موجودة</h1>
        <Link
          to="/"
          className="mt-6 inline-block text-orange-500 hover:text-orange-400"
        >
          العودة للرئيسية
        </Link>
      </main>
    );
  }

  const content = legalPages[page];

  return (
    <main
      dir="rtl"
      className="min-h-[50vh] bg-[#0a0a0a] px-6 py-20 text-white lg:px-12"
    >
      <article className="mx-auto max-w-3xl">
        <h1 className="mb-8 text-3xl font-extrabold">{content.title}</h1>
        <div className="space-y-5 text-lg leading-8 text-neutral-300">
          {content.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <Link
          to="/"
          className="mt-10 inline-block font-bold text-orange-500 transition-colors hover:text-orange-400"
        >
          العودة للرئيسية
        </Link>
      </article>
    </main>
  );
}
