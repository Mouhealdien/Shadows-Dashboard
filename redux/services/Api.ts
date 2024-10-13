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

  tagTypes: ["Employees", "Categories", "Students"],
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
      query: (params) =>
        `Employee/GetAll?Query=${params.Query}&PageSize=${params.pageSize}&PageNumber=${params.pageNumber}`,
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

    getStudents: builder.query({
      query: (params) =>
        `Student/GetAll?Query=${params.Query}&${
          params.CategoryIds ? "CategoryIds=" + params.CategoryIds + "&" : ""
        }PageSize=${params.pageSize}&PageNumber=${params.pageNumber}`,
      providesTags: ["Students"],
    }),

    getStudentsDetails: builder.query({
      query: (id) => `Student/GetDetails?Id=${id}`,
      providesTags: ["Students"],
    }),

    createStudent: builder.mutation({
      query: (data) => ({
        url: "Student/Create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Students"],
    }),

    deleteStudent: builder.mutation({
      query: (id) => ({
        url: `Student/Delete`,
        method: "Delete",
        body: id,
      }),
      invalidatesTags: ["Students"],
    }),

    updateStudent: builder.mutation({
      query: (data) => ({
        url: `Student/Update`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Students"],
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
  useGetStudentsQuery,
  useGetStudentsDetailsQuery,
  useCreateStudentMutation,
  useDeleteStudentMutation,
  useUpdateStudentMutation,
} = Api;
