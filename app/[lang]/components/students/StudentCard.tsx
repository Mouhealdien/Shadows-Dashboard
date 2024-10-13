import React from "react";
import { Student } from "../../../../types/Students";
import bg from "../../../../public/pattern.svg";
import { getDictionary } from "../../../../get-dictionary";
type propsType = {
  dictionary: Awaited<ReturnType<typeof getDictionary>>;
  student: Student;
};
const StudentCard = ({ dictionary, student }: propsType) => {
  return (
    <div className="max-w-sm relative bg-white border border-gray-200 rounded-lg shadow-xl  overflow-hidden ">
      <div className=" w-[600px] h-[100px] bg-primary absolute" />
      <div
        style={{
          backgroundImage: `url(${bg.src} )`,
        }}
        className="w-[600px] h-[100px] absolute bg-cover"
      />

      <div className="p-5 mt-24">
        <div className="flex flex-col justify-center items-center">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
            {student?.firstName + " "}
            {student?.lastName + " "}
          </h5>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
            {student?.studentNumber}
          </h5>
        </div>

        <ul className="flex flex-col gap-2">
          <li>
            {dictionary["phoneNumber"]}: {student?.phoneNumber}
          </li>
          <li>
            {dictionary["age"]}: {student?.age}
          </li>
          <li>
            {dictionary["birthDate"]}: {student?.birthDate}
          </li>
          <li>
            {dictionary["createdAt"]}: {student?.createdAt}
          </li>
          <li>
            {dictionary["totalBalance"]}: {student?.totalBalance}
          </li>
          <li>
            {dictionary["categories"]}:{" "}
            {student?.categories.map((e) => e.name + " ")}
          </li>
        </ul>
      </div>
      <div className=" w-[600px] h-[20px] bg-primary relative">
        <div
          style={{
            backgroundImage: `url(${bg.src} )`,
          }}
          className="w-[600px] h-[20px] absolute bg-cover"
        />
      </div>
    </div>
  );
};

export default StudentCard;
