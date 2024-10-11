"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Input from "../global/Input";
import { getDictionary } from "../../../../get-dictionary";
import Select, { OptionsOrGroups, GroupBase } from "react-select";
import { selectStyle, selectTheme } from "../../../../styles/selectStyles";
import {
  useCreateCategoryMutation,
  useCreateEmployeeMutation,
  useGetRolesQuery,
  useUpdateCategoryMutation,
  useUpdateEmployeeMutation,
} from "../../../../redux/services/Api";
import { toast } from "react-toastify";
import { EmployeeWithPassword } from "../../../../types/Employess";
import Loader from "../global/Loader";
import { Category } from "../../../../types/Categories";

type FormInput = {
  name: string;
};

type propsType = {
  dictionary: Awaited<ReturnType<typeof getDictionary>>;
  data?: Category;
};
const CategoriesForm = ({ dictionary, data }: propsType) => {
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
      await toast.promise(createCategory(formData).unwrap(), {
        pending: dictionary["pending"],
        success: dictionary["success"],
        error: dictionary["faild"],
      });
    }
  };

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

export default CategoriesForm;
