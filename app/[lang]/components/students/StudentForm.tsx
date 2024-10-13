"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Input from "../global/Input";
import { getDictionary } from "../../../../get-dictionary";
import Select from "react-select";
import { selectStyle, selectTheme } from "../../../../styles/selectStyles";
import {
  useCreateStudentMutation,
  useGetStudentsDetailsQuery,
  useUpdateStudentMutation,
} from "../../../../redux/services/Api";
import { toast } from "react-toastify";
import TextArea from "../global/TextArea";
import { StudentShortType } from "../../../../types/Students";
import { convertToSelectType } from "../../../../utils/utils";
import Loader from "../global/Loader";

type FormInput = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  birthDate: string;
  age: number;
  note: string;
  categoryIds: { label: string; value: string }[];
};
interface OptionType {
  value: string;
  label: string;
}

type propsType = {
  dictionary: Awaited<ReturnType<typeof getDictionary>>;
  data?: StudentShortType;
  categories?: OptionType[];
};
const StudentForm = ({ dictionary, data, categories }: propsType) => {
  const { data: studentDetails, isLoading: loadStudentDetails } =
    useGetStudentsDetailsQuery(data ? data.id : "");

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormInput>({});

  //set default values
  useEffect(() => {
    if (data) {
      const birthDate = new Date(data.birthDate + "Z")
        .toISOString()
        .split("T")[0];
      const categories = convertToSelectType(studentDetails?.categories);
      reset({
        firstName: data.firstName,
        lastName: data.lastName,
        phoneNumber: data.phoneNumber,
        birthDate,
        age: data.age,
        categoryIds: categories,
        note: studentDetails?.note,
      });
    }
  }, [reset, studentDetails]);

  const [createStudent] = useCreateStudentMutation();

  const [updateStudent] = useUpdateStudentMutation();

  const onSubmit = async (formData: FormInput) => {
    if (data) {
      const updatedData = {
        ...formData,
        id: data.id,
        categoryIds: formData.categoryIds.map((category) => category.value),
      };

      await toast.promise(updateStudent(updatedData).unwrap(), {
        pending: dictionary["pending"],
        success: dictionary["success"],
        error: dictionary["faild"],
      });
    } else {
      const updatedData = {
        ...formData,
        categoryIds: formData.categoryIds.map((category) => category.value),
      };
      await toast.promise(createStudent(updatedData).unwrap(), {
        pending: dictionary["pending"],
        success: dictionary["success"],
        error: dictionary["faild"],
      });
    }
  };

  if (data && loadStudentDetails)
    return (
      <div className="relative py-[200px]">
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
            name="firstName"
            rules={{ required: true }}
            control={control}
            render={({ field }) => (
              <Input
                inputProps={{
                  ...field,
                  name: "firstName",
                  type: "firstName",
                  placeholder: dictionary["firstName"],
                }}
                label={dictionary["firstName"]}
                labelStyle="text-black"
              />
            )}
          />
          {errors.firstName && errors.firstName.type === "required" && (
            <p className="text-red-500">{dictionary["thisIsRequired"]}</p>
          )}
        </div>

        <div className="w-full">
          <Controller
            name="lastName"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Input
                inputProps={{
                  ...field,
                  name: "lastName",
                  type: "lastName",
                  placeholder: dictionary["lastName"],
                }}
                label={dictionary["lastName"]}
                labelStyle="text-black"
              />
            )}
          />
          {errors.lastName && errors.lastName.type === "required" && (
            <p className="text-red-500">{dictionary["thisIsRequired"]}</p>
          )}
        </div>
      </div>

      <div className="flex flex-row gap-5  justify-between  items-baseline">
        <div className="w-full">
          <Controller
            name="birthDate"
            rules={{ required: true }}
            control={control}
            render={({ field }) => (
              <Input
                inputProps={{
                  ...field,
                  name: "birthDate",
                  type: "date",
                  placeholder: dictionary["birthDate"],
                }}
                label={dictionary["birthDate"]}
                labelStyle="text-black"
              />
            )}
          />
          {errors.birthDate && errors.birthDate.type === "required" && (
            <p className="text-red-500">{dictionary["thisIsRequired"]}</p>
          )}
        </div>

        <div className="w-full">
          <Controller
            name="phoneNumber"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Input
                inputProps={{
                  ...field,
                  name: "phoneNumber",
                  type: "phoneNumber",
                  placeholder: dictionary["phoneNumber"],
                }}
                label={dictionary["phoneNumber"]}
                labelStyle="text-black"
              />
            )}
          />
          {errors.phoneNumber && errors.phoneNumber.type === "required" && (
            <p className="text-red-500">{dictionary["thisIsRequired"]}</p>
          )}
        </div>
      </div>

      <div className="flex flex-row gap-5  justify-between  items-baseline">
        <div className="w-full">
          <Controller
            name="age"
            rules={{ required: true }}
            control={control}
            render={({ field }) => (
              <Input
                inputProps={{
                  ...field,
                  name: "age",
                  type: "number",
                  placeholder: dictionary["age"],
                }}
                label={dictionary["age"]}
                labelStyle="text-black"
              />
            )}
          />
          {errors.age && errors.age.type === "required" && (
            <p className="text-red-500">{dictionary["thisIsRequired"]}</p>
          )}
        </div>

        <div className="w-full">
          <label className={`block mb-2 text-sm font-medium text-black `}>
            {dictionary["categories"]}
          </label>
          <Controller
            name="categoryIds"
            rules={{ required: true }}
            control={control}
            render={({ field }) => {
              return (
                <Select
                  isMulti
                  className=" border-gray-200 shadow w-full "
                  components={{
                    IndicatorSeparator: () => null,
                  }}
                  styles={selectStyle}
                  theme={selectTheme}
                  placeholder={dictionary["categories"]}
                  {...field}
                  options={categories}
                />
              );
            }}
          />
          {errors.categoryIds && errors.categoryIds.type === "required" && (
            <p className="text-red-500">{dictionary["thisIsRequired"]}</p>
          )}
        </div>
      </div>
      <div className="w-full">
        <Controller
          name="note"
          control={control}
          rules={{ required: false }}
          render={({ field }) => (
            <TextArea
              textAreaProps={{
                ...field,
                name: "note",
                placeholder: dictionary["note"],
                rows: 4,
              }}
              label={dictionary["note"]}
              labelStyle="text-black"
            />
          )}
        />
        {/* {errors.note && errors.note.type === "required" && (
          <p className="text-red-500">{dictionary["thisIsRequired"]}</p>
        )} */}
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

export default StudentForm;
