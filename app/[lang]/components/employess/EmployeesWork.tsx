import React, { useState } from "react";
import DashboardTableWrapper from "../global/DashboardTableWrapper";
import {
  useGetEmployeesQuery,
  useGetWorkTimeQuery,
} from "../../../../redux/services/Api";
import { getDictionary } from "../../../../get-dictionary";
import Loader from "../global/Loader";
import EmployeeWorkFilter from "./EmployeeWorkFilter";
import { convertToSelectType } from "../../../../utils/utils";
import Select from "react-select";
import EmployeesWorkTabel from "./EmployeesWorkTabel";

type propsType = {
  dictionary: Awaited<ReturnType<typeof getDictionary>>;
};

const EmployeesWork = ({ dictionary }: propsType) => {
  const [startDate, setStartDate] = useState("");

  const [endtDate, setEndDate] = useState("");

  const [employee, setEmployee] = useState("empty");

  const { data: employeeWork, isLoading: loadWork } = useGetWorkTimeQuery({
    EmployeeId: employee,
    From: startDate,
    To: endtDate,
  });

  const headers = ["day", "workTime"];

  return (
    <DashboardTableWrapper>
      <div className=" flex flex-col  border-b border-b-gray-400 pb-5 mb-5">
        <div className="flex flex-row justify-between">
          <h1 className=" text-4xl">{dictionary["employeeRegistration"]}</h1>
        </div>

        <EmployeeWorkFilter
          dictionary={dictionary}
          onChange={(filters) => {
            setEmployee(filters.employee);
            setStartDate(filters.startDate);
            setEndDate(filters.endDate);
          }}
        />
      </div>
      {!loadWork && (
        <EmployeesWorkTabel
          dictionary={dictionary}
          employeeWork={employeeWork}
          headers={headers}
        />
      )}
    </DashboardTableWrapper>
  );
};

export default EmployeesWork;
