import React from "react";
import Registration from "../../components/registration/Registration";
import { getDictionary } from "../../../../get-dictionary";
import { Locale } from "../../../../i18n-config";

const page = async ({ params: { lang } }: { params: { lang: Locale } }) => {
  const dictionary = await getDictionary(lang);
  return <Registration dictionary={dictionary} />;
};

export default page;
