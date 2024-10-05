"use client";
import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import Input from "../global/Input";
import { type getDictionary } from "../../../../get-dictionary";
type FormInput = {
  email: string;
  password: string;
};

type propsType = {
  dictionary: Awaited<ReturnType<typeof getDictionary>>;
};
const LoginForm = ({ dictionary }: propsType) => {
  const { control, handleSubmit, reset } = useForm<FormInput>({
    defaultValues: {},
  });
  //const [login, { isLoading }] = useLoginMutation();
  //   const dispatch = useDispatch();
  //   const router = useRouter();

  const onSubmit = async (data: FormInput) => {
    // try {
    //   const userData = await login(data).unwrap();
    //   dispatch(setToken(userData.token));
    //   sessionStorage.setItem("token", userData.token);
    //   router.push("/"); // Redirect to the dashboard
    // } catch (err) {
    //   console.error("Failed to login: ", err);
    // }
    console.log(data);
  };

  return (
    <section className="">
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
                name="email"
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
    </section>
  );
};

export default LoginForm;
