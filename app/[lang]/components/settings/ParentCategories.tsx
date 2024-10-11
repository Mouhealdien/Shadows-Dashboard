import React from "react";
import DashboardTableWrapper from "../global/DashboardTableWrapper";
import ModalButton from "../global/ModalButton";
import { getDictionary } from "../../../../get-dictionary";
import { IoAdd } from "react-icons/io5";
import CategoriesForm from "./CategoriesForm";
import DashboradTable from "../global/DashboardTable";
import { useDeleteCategoryMutation } from "../../../../redux/services/Api";

type propsType = {
  dictionary: Awaited<ReturnType<typeof getDictionary>>;
  parentCategories: any;
  headers: string[];
};

const ParentCategories = ({
  dictionary,
  parentCategories,
  headers,
}: propsType) => {
  const [deleteCategory] = useDeleteCategoryMutation();
  return (
    <div className="w-full">
      <DashboardTableWrapper>
        <div className="flex flex-row justify-between border-b border-b-gray-400 pb-5 mb-5  ">
          <h1 className=" text-4xl">{dictionary["categories"]}</h1>
          <ModalButton
            modalContent={<CategoriesForm dictionary={dictionary} />}
            icon={<IoAdd />}
            ModalTitle={dictionary["AddCategory"]}
          />
        </div>

        <DashboradTable
          dictionary={dictionary}
          data={parentCategories}
          headers={headers}
          EditForm={CategoriesForm}
          deleteMethod={deleteCategory}
        />
      </DashboardTableWrapper>
    </div>
  );
};

export default ParentCategories;
