"use client";
import React, { useState } from "react";
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
import Input from "../global/Input";
import PaginationAndRowsSelect from "../global/PaginationAndRowsSelect";

type propsType = {
  dictionary: Awaited<ReturnType<typeof getDictionary>>;
};

const Employees = ({ dictionary }: propsType) => {
  const [search, setSearch] = useState<string>("");

  const [currentPage, setCurrentPage] = useState(0);

  const [rowsPerPage, setRowsPerPage] = useState(1);

  const { data: employees, isLoading: loadEmployees } = useGetEmployeesQuery({
    Query: search,
    pageNumber: currentPage,
    pageSize: rowsPerPage,
  });

  const [deleteEmployee] = useDeleteEmployeeMutation();

  const headers = [
    "username",
    "firstName",
    "lastName",
    "phoneNumber",
    "birthDate",
    "role",
  ];

  if (loadEmployees) return <Loader />;

  return (
    <DashboardTableWrapper>
      <div className=" flex flex-col  border-b border-b-gray-400 pb-5 mb-5">
        <div className="flex flex-row justify-between">
          <h1 className=" text-4xl">{dictionary["employees"]}</h1>
          <ModalButton
            modalContent={<EmployessForm dictionary={dictionary} />}
            icon={<IoAdd />}
            ModalTitle={dictionary["AddAccount"]}
          />
        </div>
        <div className="w-[50%]">
          <Input
            inputProps={{
              type: "text",
              placeholder: dictionary["search"],
              onChange: (e: any) => setSearch(e.target.value),
            }}
            label={dictionary["search"]}
            labelStyle="text-black"
          />
        </div>
      </div>
      <DashboradTable
        dictionary={dictionary}
        data={employees?.data}
        headers={headers}
        EditForm={EmployessForm}
        deleteMethod={deleteEmployee}
      />
      <PaginationAndRowsSelect
        dictionary={dictionary}
        pageCount={employees?.totalPages}
        setCurrentPage={setCurrentPage}
        setRowsPerPage={setRowsPerPage}
      />
    </DashboardTableWrapper>
  );
};

export default Employees;
