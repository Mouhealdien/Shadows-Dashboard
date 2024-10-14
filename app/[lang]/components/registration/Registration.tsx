"use client";
import React, { useState } from "react";
import DashboardTableWrapper from "../global/DashboardTableWrapper";
import DashboradTable from "../global/DashboardTable";
import { getDictionary } from "../../../../get-dictionary";
import {
  useGetWorkTimeQuery,
  useSetStartStopEmployeeWorkMutation,
} from "../../../../redux/services/Api";
import Loader from "../../components/global/Loader";

type propsType = {
  dictionary: Awaited<ReturnType<typeof getDictionary>>;
};

const Employees = ({ dictionary }: propsType) => {
  const { data, isLoading: loadEmployees } = useGetWorkTimeQuery({
    EmployeeId: "",
    From: "",
    To: "",
  });

  const employees = data?.map((e: any) => {
    return {
      id: e.employeeId,
      name: e.name,
      isOnWork: e.isOnWrok,
    };
  });

  const [setStartStopEmployeeWork] = useSetStartStopEmployeeWorkMutation();

  const headers = ["name"];

  if (loadEmployees) return <Loader />;

  return (
    <DashboardTableWrapper>
      <div className=" flex flex-col  border-b border-b-gray-400 pb-5 mb-5">
        <div className="flex flex-row justify-between">
          <h1 className=" text-4xl">{dictionary["registration"]}</h1>
        </div>
      </div>
      <DashboradTable
        dictionary={dictionary}
        data={employees}
        headers={headers}
        registerMethod={setStartStopEmployeeWork}
      />
    </DashboardTableWrapper>
  );
};

export default Employees;
