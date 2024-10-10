"use client";
import React from "react";
import DashboardTableWrapper from "../global/DashboardTableWrapper";
import ModalButton from "../global/ModalButton";
import EmployessForm from "./EmployessForm";
import { IoAdd } from "react-icons/io5";
import DashboradTable from "../global/DashboardTable";
import { getDictionary } from "../../../../get-dictionary";
import {
  useDeleteEmployeeMutation,
  useGetEmployeesQuery,
} from "../../../../redux/services/Api";

import Loader from "../../components/global/Loader";

type propsType = {
  dictionary: Awaited<ReturnType<typeof getDictionary>>;
};

const Employees = ({ dictionary }: propsType) => {
  const { data: employees, isLoading: loadEmployees } =
    useGetEmployeesQuery("");

  const [deleteEmployee] = useDeleteEmployeeMutation();

  const headers = Object.keys(employees ? employees.data[0] : {}).filter(
    (key) => key !== "id"
  );

  if (loadEmployees) return <Loader />;

  return (
    <DashboardTableWrapper>
      <div className="flex flex-row justify-between pb-5 mb-5 border-b border-b-gray-400">
        <h1 className=" text-4xl">{dictionary["employees"]}</h1>
        <ModalButton
          modalContent={<EmployessForm dictionary={dictionary} />}
          icon={<IoAdd />}
          ModalTitle={dictionary["AddAccount"]}
        />
      </div>
      <DashboradTable
        dictionary={dictionary}
        data={employees?.data}
        headers={headers}
        EditForm={EmployessForm}
        deleteMethod={deleteEmployee}
      />
    </DashboardTableWrapper>
  );
};

export default Employees;
