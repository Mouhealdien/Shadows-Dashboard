import Link from "next/link";
import { getDictionary } from "../../../../get-dictionary";
import { Locale } from "../../../../i18n-config";

export default async function IndexPage({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const dictionary = await getDictionary(lang);

  return <div>مرحبا من الصفحة الرئيسية</div>;
}
