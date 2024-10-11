"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Input from "../global/Input";
import { getDictionary } from "../../../../get-dictionary";
import Select, { OptionsOrGroups, GroupBase } from "react-select";
import { selectStyle, selectTheme } from "../../../../styles/selectStyles";
import {
  useCreateEmployeeMutation,
  useGetRolesQuery,
  useUpdateEmployeeMutation,
} from "../../../../redux/services/Api";
import { toast } from "react-toastify";
import { EmployeeWithPassword } from "../../../../types/Employess";
import Loader from "../global/Loader";
import { convertToSelectType } from "../../../../utils/utils";

type FormInput = {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  birthDate: string;
  roleId: { label: string; value: string };
};
interface OptionType {
  value: string;
  label: string;
}

type propsType = {
  dictionary: Awaited<ReturnType<typeof getDictionary>>;
  data?: EmployeeWithPassword;
};
const EmployessForm = ({ dictionary, data }: propsType) => {
  const { data: roles, isLoading: loadRoles } = useGetRolesQuery("");
  const [selectRoles, setSelectRoles] = useState([]);

  useEffect(() => {
    const Roles = convertToSelectType(roles);
    setSelectRoles(Roles || []);
  }, [roles]);

  const findSelectedRole = (
    options: OptionType[],
    selectedLabel: string
  ): OptionType | undefined => {
    return options.find((option) => option.label === selectedLabel);
  };
  const defaultValues = useMemo(() => {
    if (!data) return undefined;
    const birthDate = new Date(data.birthDate + "Z")
      .toISOString()
      .split("T")[0];
    return {
      username: data.username,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
      phoneNumber: data.phoneNumber,
      birthDate,
    };
  }, [data, selectRoles]);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormInput>({
    defaultValues: data && selectRoles ? defaultValues : undefined,
  });

  useEffect(() => {
    if (data) {
      const selectedRole = findSelectedRole(selectRoles, data.role);
      reset({
        ...defaultValues,
        roleId: { value: selectedRole?.value, label: selectedRole?.label },
      });
    }
  }, [data, selectRoles, reset]);

  const [createEmployee] = useCreateEmployeeMutation();
  const [updateEmployee] = useUpdateEmployeeMutation();
  const onSubmit = async (formData: FormInput) => {
    if (data) {
      const updatedData = {
        ...formData,
        id: data.id,
        roleId: formData.roleId.value,
        password: formData.password ? formData.password : "",
      };

      await toast.promise(updateEmployee(updatedData).unwrap(), {
        pending: dictionary["pending"],
        success: dictionary["success"],
        error: dictionary["faild"],
      });
    } else {
      const updatedData = { ...formData, roleId: formData.roleId.value };
      await toast.promise(createEmployee(updatedData).unwrap(), {
        pending: dictionary["pending"],
        success: dictionary["success"],
        error: dictionary["faild"],
      });
    }
  };

  if (loadRoles)
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
            name="username"
            rules={{ required: true }}
            control={control}
            render={({ field }) => (
              <Input
                inputProps={{
                  ...field,
                  name: "username",
                  type: "username",
                  placeholder: dictionary["username"],
                }}
                label={dictionary["username"]}
                labelStyle="text-black"
              />
            )}
          />
          {errors.username && errors.username.type === "required" && (
            <p className="text-red-500">{dictionary["thisIsRequired"]}</p>
          )}
        </div>

        <div className="w-full">
          <Controller
            name="password"
            control={control}
            rules={{ required: data ? false : true }}
            render={({ field }) => (
              <Input
                inputProps={{
                  ...field,
                  name: "password",
                  placeholder: "••••••••",
                }}
                label={dictionary["password"]}
                labelStyle="text-black"
              />
            )}
          />
          {errors.password && errors.password.type === "required" && (
            <p className="text-red-500">{dictionary["thisIsRequired"]}</p>
          )}
        </div>
      </div>
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
      <div>
        <label className={`block mb-2 text-sm font-medium text-black `}>
          {dictionary["role"]}
        </label>
        <Controller
          name="roleId"
          rules={{ required: true }}
          control={control}
          render={({ field }) => {
            return (
              <Select
                className="my-4 border-gray-200 shadow w-full "
                components={{
                  IndicatorSeparator: () => null,
                }}
                styles={selectStyle}
                theme={selectTheme}
                placeholder={dictionary["role"]}
                {...field}
                options={selectRoles}
              />
            );
          }}
        />
        {errors.roleId && errors.roleId.type === "required" && (
          <p className="text-red-500">{dictionary["thisIsRequired"]}</p>
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

export default EmployessForm;
