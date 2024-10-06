import React from "react";
import DashboradTable from "../../components/global/DashboardTable";
import { getDictionary } from "../../../../get-dictionary";
import { Locale } from "../../../../i18n-config";

const page = async ({ params: { lang } }: { params: { lang: Locale } }) => {
  const dictionary = await getDictionary(lang);
  return (
    <div>
      <DashboradTable dictionary={dictionary} headers={["hello", "yes"]} />
    </div>
  );
};

export default page;
