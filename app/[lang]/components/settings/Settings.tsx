"use client";
import React from "react";

import { getDictionary } from "../../../../get-dictionary";
import { useGetCategoriesQuery } from "../../../../redux/services/Api";

import Loader from "../../components/global/Loader";

import { SubCategory } from "../../../../types/Categories";

import ParentCategories from "./ParentCategories";
import SubCategories from "./SubCategories";

type propsType = {
  dictionary: Awaited<ReturnType<typeof getDictionary>>;
};

const Settings = ({ dictionary }: propsType) => {
  const { data: categories, isLoading: loadCategories } =
    useGetCategoriesQuery("");

  const parentCategories = categories?.map((parentCategory: SubCategory) => {
    return {
      id: parentCategory.id,
      name: parentCategory.name,
    };
  });

  const headers = Object.keys(
    parentCategories ? parentCategories[0] : {}
  ).filter((key) => key !== "id");

  if (loadCategories) return <Loader />;

  return (
    <>
      <ParentCategories
        headers={headers}
        parentCategories={parentCategories}
        dictionary={dictionary}
      />

      <div className="mt-20" />

      <SubCategories
        dictionary={dictionary}
        parentCategories={parentCategories}
        headers={headers}
      />
    </>
  );
};

export default Settings;
