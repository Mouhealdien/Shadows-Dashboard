import { i18n, type Locale } from "../../i18n-config";
import LocaleSwitcher from "./components/locale-switcher";

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default function Root({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  return (
    <html lang={params.lang} dir={params.lang == "ar" ? "rtl" : "ltr"}>
      <body>
        {/* <LocaleSwitcher /> */}
        {children}
      </body>
    </html>
  );
}

export const metadata = {
  title: "Shadwos Dashboard",
  description: "Welcome To Shadows Center Dashboard",
};
