import React from "react";
import { getDictionary } from "../../../../get-dictionary";
import { Locale } from "../../../../i18n-config";
import Employees from "../../components/employess/Employees";

const page = async ({ params: { lang } }: { params: { lang: Locale } }) => {
  const dictionary = await getDictionary(lang);

  return <Employees dictionary={dictionary} />;
};

export default page;
