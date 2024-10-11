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

  tagTypes: ["Employees", "Categories"],
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

    getCategories: builder.query({
      query: () => `Category/GetAll`,
      providesTags: ["Categories"],
    }),

    getParentCategories: builder.query({
      query: () => `Category/GetParentCategoryIds`,
      providesTags: ["Categories"],
    }),

    getSubCategories: builder.query({
      query: (id) => ({
        url: `Category/GetSubCategories?ParentId=${id}`,
      }),
      providesTags: ["Categories"],
    }),

    createCategory: builder.mutation({
      query: (data) => ({
        url: "Category/Create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Categories"],
    }),

    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `Category/Delete`,
        method: "Delete",
        body: id,
      }),
      invalidatesTags: ["Categories"],
    }),

    updateCategory: builder.mutation({
      query: (data) => ({
        url: `Category/Update`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Categories"],
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
  useGetCategoriesQuery,
  useGetParentCategoriesQuery,
  useGetSubCategoriesQuery,
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
} = Api;
