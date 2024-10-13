"use client";
import React from "react";

import { useGetStudentsDetailsQuery } from "../../../../redux/services/Api";
import { useParams } from "next/navigation";
import { getDictionary } from "../../../../get-dictionary";
import Loader from "../global/Loader";
import StudentCard from "./StudentCard";

type propsType = {
  dictionary: Awaited<ReturnType<typeof getDictionary>>;
};
const StudentDetials = ({ dictionary }: propsType) => {
  const { studentID } = useParams();
  const { data: student, isLoading } = useGetStudentsDetailsQuery(studentID);
  console.log(student);

  if (isLoading) return <Loader />;
  return (
    <div>
      <div className="flex flex-row gap-2">
        <StudentCard dictionary={dictionary} student={student} />
      </div>
    </div>
  );
};

export default StudentDetials;
