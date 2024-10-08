"use client";
import React, { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "../../../../redux/store";
type propsType = {
  children: ReactNode;
};
const Providers = ({ children }: propsType) => {
  return <Provider store={store}>{children}</Provider>;
};

export default Providers;
