import Link from "next/link";
import { getDictionary } from "../../../../get-dictionary";
import { Locale } from "../../../../i18n-config";
import Students from "../../components/students/Students";

export default async function IndexPage({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const dictionary = await getDictionary(lang);

  return <Students dictionary={dictionary} />;
}
