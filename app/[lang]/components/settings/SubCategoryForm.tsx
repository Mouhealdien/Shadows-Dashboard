"use client";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import Input from "../global/Input";
import { getDictionary } from "../../../../get-dictionary";
import Select from "react-select";
import { selectStyle, selectTheme } from "../../../../styles/selectStyles";
import {
  useCreateCategoryMutation,
  useGetParentCategoriesQuery,
  useUpdateCategoryMutation,
} from "../../../../redux/services/Api";
import { toast } from "react-toastify";
import Loader from "../global/Loader";
import { convertToSelectType } from "../../../../utils/utils";
import { SubCategory } from "../../../../types/Categories";

type FormInput = {
  name: string;
  parentCategoryId: { label: string; value: string };
};

type propsType = {
  dictionary: Awaited<ReturnType<typeof getDictionary>>;
  data?: SubCategory;
};
const SubCategoryForm = ({ dictionary, data }: propsType) => {
  const { data: parentsCategories, isLoading: loadParentsCategories } =
    useGetParentCategoriesQuery("");

  const selectParentsCategories = convertToSelectType(parentsCategories);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormInput>({
    defaultValues: data ? { name: data.name } : undefined,
  });

  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const onSubmit = async (formData: FormInput) => {
    if (data) {
      const updatedData = { ...formData, id: data.id };
      await toast.promise(updateCategory(updatedData).unwrap(), {
        pending: dictionary["pending"],
        success: dictionary["success"],
        error: dictionary["faild"],
      });
    } else {
      const updatedData = {
        ...formData,
        parentCategoryId: formData.parentCategoryId.value,
      };
      await toast.promise(createCategory(updatedData).unwrap(), {
        pending: dictionary["pending"],
        success: dictionary["success"],
        error: dictionary["faild"],
      });
    }
  };

  if (loadParentsCategories)
    return (
      <div className="relative py-[100px]">
        <Loader />
      </div>
    );

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 md:space-y-6 text-right"
      action="#"
    >
      <div className="flex flex-row gap-5  justify-between  items-baseline">
        <div className="w-full">
          <Controller
            name="name"
            rules={{ required: true }}
            control={control}
            render={({ field }) => (
              <Input
                inputProps={{
                  ...field,
                  name: "name",
                  type: "name",
                  placeholder: dictionary["name"],
                }}
                label={dictionary["name"]}
                labelStyle="text-black"
              />
            )}
          />
          {errors.name && errors.name.type === "required" && (
            <p className="text-red-500">{dictionary["thisIsRequired"]}</p>
          )}
        </div>
        {!data && (
          <div className="w-full">
            <label className={`block mb-2 text-sm font-medium text-black `}>
              {dictionary["category"]}
            </label>
            <Controller
              name="parentCategoryId"
              rules={{ required: true }}
              control={control}
              render={({ field }) => {
                return (
                  <Select
                    className=" border-gray-200 shadow w-full"
                    components={{
                      IndicatorSeparator: () => null,
                    }}
                    styles={selectStyle}
                    theme={selectTheme}
                    placeholder={dictionary["category"]}
                    {...field}
                    options={selectParentsCategories}
                  />
                );
              }}
            />
            {errors.parentCategoryId &&
              errors.parentCategoryId.type === "required" && (
                <p className="text-red-500">{dictionary["thisIsRequired"]}</p>
              )}
          </div>
        )}
      </div>

      <div className="flex justify-center items-center">
        <button
          type="submit"
          className=" w-[40%] sm:w-[20%]  bg-primary text-secondary bg-primary-600 hover:bg-primary-700  font-medium rounded-lg text-sm px-5 py-2.5 text-center   "
        >
          {data ? dictionary["edit"] : dictionary["add"]}
        </button>
      </div>
    </form>
  );
};

export default SubCategoryForm;
