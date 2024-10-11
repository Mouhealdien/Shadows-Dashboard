export const convertToSelectType = (data: any) => {
  const newData = data?.map((e: { id: string; name: string }) => ({
    value: e.id,
    label: e.name,
  }));
  return newData;
};
