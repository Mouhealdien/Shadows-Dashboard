import React, { useState } from "react";
import DashboardTableWrapper from "../global/DashboardTableWrapper";
import { getDictionary } from "../../../../get-dictionary";
import ModalButton from "../global/ModalButton";
import { IoAdd } from "react-icons/io5";
import SubCategoryForm from "./SubCategoryForm";
import Select from "react-select";
import { selectStyle, selectTheme } from "../../../../styles/selectStyles";
import DashboradTable from "../global/DashboardTable";
import { convertToSelectType } from "../../../../utils/utils";
import {
  useGetSubCategoriesQuery,
  useDeleteCategoryMutation,
} from "../../../../redux/services/Api";

import Loader from "../global/Loader";
type propsType = {
  dictionary: Awaited<ReturnType<typeof getDictionary>>;
  parentCategories: any;
  headers: string[];
};

const SubCategories = ({
  dictionary,
  headers,
  parentCategories,
}: propsType) => {
  const [parentCategory, setParentCategory] = useState("");

  const { data: subCategoriess, isLoading: loadsubCategories } =
    useGetSubCategoriesQuery(parentCategory);

  const [deleteCategory] = useDeleteCategoryMutation();

  console.log(subCategoriess);
  return (
    <div className="w-full">
      <DashboardTableWrapper>
        <div className=" flex flex-col  border-b border-b-gray-400 pb-5 mb-5">
          <div className="flex flex-row justify-between ">
            <h1 className=" text-4xl">{dictionary["subCategories"]}</h1>
            <ModalButton
              modalContent={<SubCategoryForm dictionary={dictionary} />}
              icon={<IoAdd />}
              ModalTitle={dictionary["AddSubCategory"]}
            />
          </div>
          <label className={`block mb-2 text-sm font-medium text-black my-4 `}>
            {dictionary["chooseCategory"]}
          </label>
          <Select
            options={convertToSelectType(parentCategories)}
            className=""
            components={{
              IndicatorSeparator: () => null,
            }}
            styles={selectStyle}
            theme={selectTheme}
            placeholder={dictionary["category"]}
            onChange={(e: any) => {
              setParentCategory(e.value);
            }}
          />
        </div>
        {loadsubCategories ? (
          <div className="relative py-[80px]">
            <Loader />
          </div>
        ) : (
          <DashboradTable
            dictionary={dictionary}
            data={subCategoriess}
            headers={headers}
            EditForm={SubCategoryForm}
            deleteMethod={deleteCategory}
          />
        )}
      </DashboardTableWrapper>
    </div>
  );
};

export default SubCategories;
