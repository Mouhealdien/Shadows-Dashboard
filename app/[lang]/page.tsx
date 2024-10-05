import Link from "next/link";
import { getDictionary } from "../../get-dictionary";
import { Locale } from "../../i18n-config";
import Counter from "./components/counter";

export default async function IndexPage({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const dictionary = await getDictionary(lang);

  return (
    <div>
      <div>
        <p>Current locale: {lang}</p>
        <p>This text is rendered on the server: {dictionary["welcome"]}</p>
        <Counter dictionary={dictionary} />
        <Link style={{ padding: 20 }} href={`/${lang}/about-us`} locale={lang}>
          Move to About US
        </Link>
        <Link href={`/${lang}/testpage`} locale={lang}>
          Move to test
        </Link>
      </div>
    </div>
  );
}
