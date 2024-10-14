import React, { memo, useEffect, useState } from "react";
import Select from "react-select";
import { getDictionary } from "../../../../get-dictionary";
import { selectStyle, selectTheme } from "../../../../styles/selectStyles";
import Input from "../global/Input";
import { useGetEmployeesQuery } from "../../../../redux/services/Api";
import { convertToSelectType } from "../../../../utils/utils";
type propsType = {
  dictionary: Awaited<ReturnType<typeof getDictionary>>;
  onChange: (e: any) => void;
};
const EmployeeWorkFilter = ({ dictionary, onChange }: propsType) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [employee, setEmployee] = useState("");

  const { data: employees, isLoading: loadEmployees } =
    useGetEmployeesQuery("");

  useEffect(() => {
    onChange({ employee, startDate, endDate });
  }, [employee, startDate, endDate]);

  return (
    <div className="flex flex-row justify-between gap-5 items-baseline w-full">
      <div className="w-full">
        <label className={`block mb-2 text-sm font-medium text-black my-4 `}>
          {dictionary["chooseEmployee"]}
        </label>
        <Select
          className=" border-gray-200 shadow w-full "
          components={{
            IndicatorSeparator: () => null,
          }}
          styles={selectStyle}
          theme={selectTheme}
          placeholder={dictionary["employee"]}
          onChange={(e: any) => setEmployee(e.value)}
          options={convertToSelectType(employees?.data)}
        />
      </div>

      <Input
        inputProps={{
          type: "date",
          placeholder: dictionary["from"],
          onChange: (e: any) => setStartDate(e.target.value),
        }}
        label={dictionary["from"]}
        labelStyle="text-black"
      />

      <Input
        inputProps={{
          type: "date",
          placeholder: dictionary["to"],
          onChange: (e: any) => setEndDate(e.target.value),
        }}
        label={dictionary["to"]}
        labelStyle="text-black"
      />
    </div>
  );
};

export default memo(EmployeeWorkFilter);
