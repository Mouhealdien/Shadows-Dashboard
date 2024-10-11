import React from "react";
import { getDictionary } from "../../../../get-dictionary";
import { Locale } from "../../../../i18n-config";
import Settings from "../../components/settings/Settings";

const page = async ({ params: { lang } }: { params: { lang: Locale } }) => {
  const dictionary = await getDictionary(lang);

  return <Settings dictionary={dictionary} />;
};

export default page;
