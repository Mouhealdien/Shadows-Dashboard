import { getDictionary } from "../../../get-dictionary";
import { Locale } from "../../../i18n-config";
import Loader from "../components/global/Loader";

import LoginForm from "../components/Login/LoginForm";

export default async function page({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const dictionary = await getDictionary(lang);

  return (
    <div>
      <LoginForm dictionary={dictionary} />
    </div>
  );
}
