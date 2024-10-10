import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_API_URL } from "../../constants/settings";

export const Api = createApi({
  reducerPath: "Api",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_API_URL,

    prepareHeaders: (headers, { getState }) => {
      let token: any;
      const user = sessionStorage.getItem("user");
      if (user) {
        token = JSON.parse(user ? user : "").token;
      }
      //const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  tagTypes: ["Employees"],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: "Employee/Login",
        method: "POST",
        body: data,
      }),
    }),

    getRoles: builder.query({
      query: () => `Role/GetAll`,
    }),
    getEmployees: builder.query({
      query: () => `Employee/GetAll`,
      providesTags: ["Employees"],
    }),

    createEmployee: builder.mutation({
      query: (data) => ({
        url: "Employee/Create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Employees"],
    }),

    updateEmployee: builder.mutation({
      query: (data) => ({
        url: `Employee/Update`,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      }),
      invalidatesTags: ["Employees"],
    }),

    deleteEmployee: builder.mutation({
      query: (id) => ({
        url: `Employee/Delete`,
        method: "Delete",
        body: id,
      }),
      invalidatesTags: ["Employees"],
    }),
  }),
});

export const {
  useLoginMutation,
  useGetRolesQuery,
  useCreateEmployeeMutation,
  useGetEmployeesQuery,
  useUpdateEmployeeMutation,
  useDeleteEmployeeMutation,
} = Api;
