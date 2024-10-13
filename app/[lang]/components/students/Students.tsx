"use client";
import React, { useState } from "react";
import { getDictionary } from "../../../../get-dictionary";
import {
  useDeleteStudentMutation,
  useGetCategoriesQuery,
  useGetStudentsQuery,
} from "../../../../redux/services/Api";
import Loader from "../global/Loader";
import DashboardTableWrapper from "../global/DashboardTableWrapper";
import ModalButton from "../global/ModalButton";
import { IoAdd } from "react-icons/io5";
import DashboradTable from "../global/DashboardTable";
import StudentForm from "./StudentForm";
import { convertToSelectType } from "../../../../utils/utils";
import PaginationAndRowsSelect from "../global/PaginationAndRowsSelect";
import StudentsFilter from "./StudentsFilter";

type propsType = {
  dictionary: Awaited<ReturnType<typeof getDictionary>>;
};
const Students = ({ dictionary }: propsType) => {
  const [currentPage, setCurrentPage] = useState(0);

  const [rowsPerPage, setRowsPerPage] = useState(1);

  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("");

  const { data: students, isLoading: loadStudents } = useGetStudentsQuery({
    CategoryIds: category,
    Query: search,
    pageNumber: currentPage,
    pageSize: rowsPerPage,
  });

  const [deleteStudent] = useDeleteStudentMutation();

  const { data: categories, isLoading: loadCategories } =
    useGetCategoriesQuery("");

  const parentCategories = convertToSelectType(categories);

  const headers = [
    "studentNumber",
    "firstName",
    "lastName",
    "age",
    "phoneNumber",
    "birthDate",
  ];

  if (loadStudents) return <Loader />;

  return (
    <>
      <DashboardTableWrapper>
        <div className=" flex flex-col  border-b border-b-gray-400 pb-5 mb-5">
          <div className="flex flex-row justify-between ">
            <h1 className=" text-4xl">{dictionary["students"]}</h1>
            <ModalButton
              modalContent={
                <StudentForm
                  categories={parentCategories}
                  dictionary={dictionary}
                />
              }
              icon={<IoAdd />}
              ModalTitle={dictionary["AddStudent"]}
            />
          </div>
          <StudentsFilter
            categories={parentCategories}
            dictionary={dictionary}
            onChange={(filters) => {
              setCategory(filters.category);
              setSearch(filters.search);
            }}
          />
        </div>
        <DashboradTable
          dictionary={dictionary}
          data={students?.data}
          headers={headers}
          EditForm={StudentForm}
          editFormProps={{ categories: parentCategories }}
          student={true}
          deleteMethod={deleteStudent}
        />
        <PaginationAndRowsSelect
          dictionary={dictionary}
          pageCount={students?.totalPages}
          setCurrentPage={setCurrentPage}
          setRowsPerPage={setRowsPerPage}
        />
      </DashboardTableWrapper>
    </>
  );
};

export default Students;
