import { i18n, type Locale } from "../../../i18n-config";
import "../global.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Providers from "../components/global/Providers";
import AuthLayout from "../components/Login/AuthLayout";
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
  return <>{children}</>;
}

export const metadata = {
  title: "Shadows Dashboard",
  description: "Welcome To Shadows Center Dashboard",
};
