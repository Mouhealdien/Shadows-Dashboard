import React from "react";

import StudentDetials from "../../../components/students/StudentDetials";
import { Locale } from "../../../../../i18n-config";
import { getDictionary } from "../../../../../get-dictionary";

const page = async ({ params: { lang } }: { params: { lang: Locale } }) => {
  const dictionary = await getDictionary(lang);
  return <StudentDetials dictionary={dictionary} />;
};

export default page;
