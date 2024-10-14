import React from "react";
import { getDictionary } from "../../../../get-dictionary";

type propsType = {
  dictionary: Awaited<ReturnType<typeof getDictionary>>;
  headers: string[];
  employeeWork: any;
};

function getTimeOnly(isoString: any) {
  const date = new Date(isoString);

  const formatter = new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  const timeOnly = formatter.format(date);

  return timeOnly;
}

const EmployeesWorkTabel = ({
  dictionary,
  headers,
  employeeWork,
}: propsType) => {
  return (
    <div className="overflow-x-auto ">
      <table className="w-full text-sm text-left rtl:text-right   ">
        <thead className="text-xs text-white  bg-primary ">
          <tr className=" text-center">
            {headers?.map((e, i) => {
              return (
                <th key={i} scope="col" className="px-6 py-3">
                  {dictionary[e]}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {employeeWork &&
            employeeWork.length == 1 &&
            employeeWork[0]?.days.map((d: any) => {
              return (
                <tr className="odd:bg-white  text-center odd:text-black even:text-black even:bg-[#c6222933] border-b ">
                  <td> {d.day}</td>
                  <td className="flex flex-row gap-5 items-center justify-center">
                    {d.workTimes.map((w: any) => {
                      return (
                        <div className="flex flex-col gap-3">
                          <div>{getTimeOnly(w.start)}</div>
                          <div>{getTimeOnly(w.end)}</div>
                        </div>
                      );
                    })}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeesWorkTabel;
