import React from "react";
import DashboradTable from "../../components/global/DashboardTable";
import { getDictionary } from "../../../../get-dictionary";
import { Locale } from "../../../../i18n-config";

import DashboardTableWrapper from "../../components/global/DashboardTableWrapper";
import Input from "../../components/global/Input";
import ModalButton from "../../components/global/ModalButton";
import { IoAdd } from "react-icons/io5";
import AccountsForm from "../../components/accounts/AccountsForm";

const page = async ({ params: { lang } }: { params: { lang: Locale } }) => {
  const dictionary = await getDictionary(lang);

  return (
    <DashboardTableWrapper>
      <div className="flex flex-row justify-between pb-5 mb-5 border-b border-b-gray-400">
        <h1 className=" text-4xl">{dictionary["teachers"]}</h1>
        <ModalButton
          modalContent={<AccountsForm dictionary={dictionary} />}
          icon={<IoAdd />}
        />
      </div>

      <DashboradTable dictionary={dictionary} headers={["hello", "yes"]} />
    </DashboardTableWrapper>
  );
};

export default page;
