"use client";
import React, { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import Input from "../global/Input";
import { type getDictionary } from "../../../../get-dictionary";
import { useLoginMutation } from "../../../../redux/services/Api";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Loader from "../global/Loader";
import { usePathname } from "next/navigation";
import { useParams } from "next/navigation";
type FormInput = {
  username: string;
  password: string;
};

type propsType = {
  dictionary: Awaited<ReturnType<typeof getDictionary>>;
};
const LoginForm = ({ dictionary }: propsType) => {
  const [loading, setLoading] = useState(false);
  const pathName = usePathname();
  const { lang } = useParams();
  console.log(pathName);
  const { control, handleSubmit, reset } = useForm<FormInput>({
    defaultValues: {},
  });
  const [login, { isLoading }] = useLoginMutation();

  const router = useRouter();

  const onSubmit = async (data: FormInput) => {
    const userData = await toast.promise(login(data).unwrap(), {
      pending: "pending",
      success: "resolved ",
      error: "rejected ",
    });
    sessionStorage.setItem("user", JSON.stringify(userData));
    setLoading(true);
    router.push("/employees");
  };

  if (loading && pathName != `/${lang}/employees`) return <Loader />;

  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen bg-white lg:py-0">
      LOGO
      <div className="w-full  rounded-lg shadow dark:border md:mt-0 sm:max-w-lg xl:p-0 bg-primary  ">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-secondary md:text-2xl ">
            {dictionary["loginTitle"]}
          </h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 md:space-y-6"
            action="#"
          >
            <Controller
              name="username"
              control={control}
              render={({ field }) => (
                <Input
                  inputProps={{
                    ...field,
                    name: "username",
                    type: "username",
                    placeholder: "name@company.com",
                  }}
                  label={dictionary["username"]}
                />
              )}
            />

            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Input
                  inputProps={{
                    ...field,
                    name: "password",
                    type: "password",
                    placeholder: "••••••••",
                  }}
                  label={dictionary["password"]}
                />
              )}
            />

            <div className="flex justify-center items-center">
              <button
                type="submit"
                className=" w-[60%] sm:w-[40%]  text-primary bg-primary-600 hover:bg-primary-700  font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-secondary  "
              >
                {dictionary["signIn"]}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
