export const selectStyle = {
  placeholder: (provided: any) => ({
    ...provided,
    color: "#9ca3af",
    fontSize: "14px",
  }),
  option: (provided: any, { isSelected, isHoverd }: any) => ({
    ...provided,
    fontSize: "14px",
    color: isSelected ? "white" : "black",
  }),
  control: (baseStyles: any, state: any) => ({
    ...baseStyles,
    fontSize: "14px",
    paddingTop: "4px",
    borderRadius: "6px",
    // border: "none",
    paddingBottom: "4px",
  }),
};

export const selectTheme = (theme: any) => ({
  ...theme,
  borderRadius: 0,
  boxShadow: "none",
  colors: {
    ...theme.colors,
    primary: "#c62229",
    primary25: "rgba(198, 34, 41, 0.2)",
  },
});
