"use client";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import Input from "../global/Input";
import { getDictionary } from "../../../../get-dictionary";
import Select, { OptionsOrGroups, GroupBase } from "react-select";
import { selectStyle, selectTheme } from "../../../../styles/selectStyles";
type FormInput = {
  email: string;
  password: string;
  role: { label: string; value: string };
};
interface OptionType {
  value: string;
  label: string;
}

type propsType = {
  dictionary: Awaited<ReturnType<typeof getDictionary>>;
  data?: {
    email: string;
    password: string;
    role: string;
  };
};
const AccountsForm = ({ dictionary, data }: propsType) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormInput>({
    defaultValues: data
      ? {
          email: data.email,
          password: data.password,
          role: {
            label: dictionary[data.role],
            value: data.role,
          },
        }
      : undefined,
  });

  const roles: OptionsOrGroups<OptionType, GroupBase<OptionType>> = [
    { value: "admin", label: dictionary["admin"] },
    {
      value: "employee",
      label: dictionary["employee"],
    },
  ];

  //const [login, { isLoading }] = useLoginMutation();
  //   const dispatch = useDispatch();
  //   const router = useRouter();

  const onSubmit = async (data: FormInput) => {
    const formData = { ...data, role: data.role.value };
    // try {
    //   const userData = await login(data).unwrap();
    //   dispatch(setToken(userData.token));
    //   sessionStorage.setItem("token", userData.token);
    //   router.push("/"); // Redirect to the dashboard
    // } catch (err) {
    //   console.error("Failed to login: ", err);
    // }
    console.log(formData);
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
            name="email"
            rules={{ required: true }}
            control={control}
            render={({ field }) => (
              <Input
                inputProps={{
                  ...field,
                  name: "email",
                  type: "email",
                  placeholder: "name@company.com",
                }}
                label={dictionary["email"]}
                labelStyle="text-black"
              />
            )}
          />
          {errors.email && errors.email.type === "required" && (
            <p className="text-red-500">{dictionary["thisIsRequired"]}</p>
          )}
        </div>

        <div className="w-full">
          <Controller
            name="password"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Input
                inputProps={{
                  ...field,
                  name: "password",
                  type: "password",
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
      <div>
        <label className={`block mb-2 text-sm font-medium text-black `}>
          {dictionary["role"]}
        </label>
        <Controller
          name="role"
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
                options={roles}
              />
            );
          }}
        />
        {errors.role && errors.role.type === "required" && (
          <p className="text-red-500">{dictionary["thisIsRequired"]}</p>
        )}
      </div>

      <div className="flex justify-center items-center">
        <button
          type="submit"
          className=" w-[40%] sm:w-[20%]  bg-primary text-secondary bg-primary-600 hover:bg-primary-700  font-medium rounded-lg text-sm px-5 py-2.5 text-center   "
        >
          {dictionary["add"]}
        </button>
      </div>
    </form>
  );
};

export default AccountsForm;
