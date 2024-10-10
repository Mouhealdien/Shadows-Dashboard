"use client";
import { ReactNode, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "../../../../redux/store";
import Loader from "../global/Loader";
type propsType = {
  children: ReactNode;
};

const AuthLayout = ({ children }: propsType) => {
  let token: any;
  const user = sessionStorage.getItem("user");
  if (user) {
    token = JSON.parse(user ? user : "").token;
  }

  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push("/");
    }
  }, [router, token]);

  if (!token) return <Loader />;

  return <>{children}</>;
};

export default AuthLayout;
