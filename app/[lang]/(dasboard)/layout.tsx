import { i18n, type Locale } from "../../../i18n-config";
import SideBar from "../components/global/SideBar";
import "../global.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getDictionary } from "../../../get-dictionary";
export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default async function Root({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  const dictionary = await getDictionary(params.lang);
  return (
    <html lang={params.lang} dir={params.lang == "ar" ? "rtl" : "ltr"}>
      <body>
        {/* <LocaleSwitcher /> */}
        <SideBar dictionary={dictionary} />
        <ToastContainer />
        <div className="p-4 text-fourth  sm:mr-64">{children}</div>
      </body>
    </html>
  );
}

export const metadata = {
  title: "Shadows Dashboard",
  description: "Welcome To Shadows Center Dashboard",
};
