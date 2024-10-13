import React, { useEffect, useState } from "react";
import Input from "../global/Input";
import Select from "react-select";
import { getDictionary } from "../../../../get-dictionary";
import { selectStyle, selectTheme } from "../../../../styles/selectStyles";
import { useDebounce } from "../../../../hooks/useDebounce";

type propsType = {
  dictionary: Awaited<ReturnType<typeof getDictionary>>;
  categories: { label: string; value: string }[];
  onChange: (e: any) => void;
};
const StudentsFilter = ({ dictionary, categories, onChange }: propsType) => {
  const [search, setSearch] = useState<string>("");
  const debouncedSearch = useDebounce(search);

  const [category, setCategory] = useState<string>("");

  useEffect(() => {
    onChange({ category, search: debouncedSearch });
  }, [category, debouncedSearch]);
  return (
    <div className="flex flex-row justify-between gap-5 items-baseline">
      <Input
        inputProps={{
          type: "text",
          placeholder: dictionary["search"],
          onChange: (e: any) => setSearch(e.target.value),
        }}
        label={dictionary["search"]}
        labelStyle="text-black"
      />
      <div className="w-full">
        <label className={`block mb-2 text-sm font-medium text-black my-4 `}>
          {dictionary["chooseCategory"]}
        </label>
        <Select
          className=" border-gray-200 shadow w-full "
          components={{
            IndicatorSeparator: () => null,
          }}
          styles={selectStyle}
          theme={selectTheme}
          placeholder={dictionary["category"]}
          onChange={(e: any) => setCategory(e.value)}
          options={categories}
        />
      </div>
    </div>
  );
};

export default StudentsFilter;
