import Link from "next/link";
import { getDictionary } from "../../../get-dictionary";
import { Locale } from "../../../i18n-config";

import LoginForm from "../components/Login/LoginForm";

export default async function IndexPage({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const dictionary = await getDictionary(lang);

  return <div>مرحبا من الصفحة الرئيسية</div>;
}
