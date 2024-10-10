"use client";
import React, { ReactNode, useEffect } from "react";
import { toast } from "react-toastify";
import { getDictionary } from "../../../../get-dictionary";
import ModalButton from "./ModalButton";
import AccountsForm from "../accounts/AccountsForm";
import { MdOutlineModeEdit } from "react-icons/md";
import IconButton from "./IconButton";
import { MdDelete } from "react-icons/md";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { useGetEmployeesQuery } from "../../../../redux/services/Api";
import { BASE_API_URL } from "../../../../constants/settings";
type propsType = {
  headers?: string[];
  dictionary: Awaited<ReturnType<typeof getDictionary>>;
  EditForm?: React.ComponentType<{ dictionary: any; data: any }>;
  data?: any;
  editLink?: string;
  isAdmin?: boolean;

  deleteMethod?: any;
};

const DashboradTable = ({
  headers,
  dictionary,
  data,
  EditForm,
  isAdmin,
  deleteMethod,
}: propsType) => {
  const handelClick = async (id: any) => {
    await toast.promise(deleteMethod({ id: id }), {
      pending: dictionary["pending"],
      success: dictionary["success"],
      error: dictionary["faild"],
    });
  };

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
            <th scope="col" className="px-6 py-3 ">
              {dictionary["actions"]}
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.map((ob: any, i: number) => {
            return (
              <tr
                key={i}
                className="odd:bg-white  text-center odd:text-black even:text-black even:bg-[#c6222933] border-b "
              >
                {Object.keys(ob).map((prop, propIndex) => {
                  if (
                    prop != "id" &&
                    prop != "img" &&
                    prop != "photo" &&
                    prop != "content" &&
                    prop != "__v"
                  )
                    return (
                      <td key={propIndex} className="px-6 py-4">
                        {` ${ob[prop]}`}
                      </td>
                    );
                })}

                <td className="px-6  py-4 flex flex-row justify-center gap-2">
                  {EditForm && (
                    <ModalButton
                      modalContent={
                        <EditForm data={ob} dictionary={dictionary} />
                      }
                      icon={<MdOutlineModeEdit size={15} />}
                      customeStyle="bg-fourth text-white hover:border-fourth hover:bg-transparent hover:text-fourth"
                      ModalTitle={dictionary["editAccount"]}
                    />
                  )}
                  {deleteMethod && (
                    <IconButton
                      onClick={() => {
                        handelClick(ob?.id);
                      }}
                      icon={<MdDelete size={15} />}
                    />
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default DashboradTable;
