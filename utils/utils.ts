export const convertToSelectType = (data: any) => {
  const newData = data?.map((e: any) => ({
    value: e.id,
    label: e.name ? e.name : e.firstName + " " + e.lastName,
  }));
  return newData;
};
