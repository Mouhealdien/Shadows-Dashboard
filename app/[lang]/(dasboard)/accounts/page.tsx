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
  const account2 = [
    { email: "hello@a.com", password: "asdasd", role: "admin" },
    { email: "xxxxx@a.com", password: "hello", role: "employee" },
  ];
  return (
    <DashboardTableWrapper>
      <div className="flex flex-row justify-between pb-5 mb-5 border-b border-b-gray-400">
        <h1 className=" text-4xl">{dictionary["accounts"]}</h1>
        <ModalButton
          modalContent={<AccountsForm dictionary={dictionary} />}
          icon={<IoAdd />}
          ModalTitle={dictionary["AddAccount"]}
        />
      </div>
      <DashboradTable
        dictionary={dictionary}
        data={account2}
        headers={["email", "password", "role"]}
        EditForm={AccountsForm}
      />
    </DashboardTableWrapper>
  );
};

export default page;
