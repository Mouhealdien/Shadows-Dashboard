import React, { ReactNode } from "react";
type propsType = {
  children: ReactNode;
};
const DashboardTableWrapper = ({ children }: propsType) => {
  return (
    <div className="relative max-w-[1000px] m-auto p-5 overflow-x-auto shadow-md sm:rounded-lg">
      {children}
    </div>
  );
};

export default DashboardTableWrapper;
