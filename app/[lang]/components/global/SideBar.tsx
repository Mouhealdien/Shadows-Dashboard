"use client";

import Link from "next/link";
import React, { useState } from "react";
import { PiStudentFill } from "react-icons/pi";
import { GiTeacher } from "react-icons/gi";
import { BsPersonVcard } from "react-icons/bs";
import { IoNewspaperOutline } from "react-icons/io5";
import { MdOutlineManageAccounts } from "react-icons/md";
import { GrLogin } from "react-icons/gr";
import { GoGear } from "react-icons/go";
import { IoClose } from "react-icons/io5";
import { getDictionary } from "../../../../get-dictionary";
import { usePathname } from "next/navigation";
type propsType = {
  dictionary: Awaited<ReturnType<typeof getDictionary>>;
};

const SideBar = ({ dictionary }: propsType) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const router = usePathname();
  const [pageName, setPageName] = useState(router.split("/")[2]);

  const pages = [
    {
      title: "students",
      icon: <PiStudentFill />,
      href: "/students",
    },
    {
      title: "teachers",
      icon: <GiTeacher />,
      href: "/teachers",
    },
    {
      title: "employees",
      icon: <BsPersonVcard />,
      href: "/employees",
    },
    {
      title: "courses",
      icon: <IoNewspaperOutline />,
      href: "/courses",
    },
    // {
    //   title: "accounts",
    //   icon: <MdOutlineManageAccounts />,
    //   href: "/accounts",
    // },
    {
      title: "registration",
      icon: <GrLogin />,
      href: "/registration",
    },
    {
      title: "settings",
      icon: <GoGear />,
      href: "/settings",
    },
  ];

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  return (
    <>
      <button
        onClick={toggleSidebar}
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 transition-all duration-500 text-sm text-primary rounded-lg md:hidden hover:bg-primary hover:text-white   "
      >
        <span className="sr-only">Toggle sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <aside
        id="default-sidebar"
        className={`fixed shadow-lg  top-0 right-0 z-40  h-screen transition-transform transform ${
          isSidebarOpen ? "" : "translate-x-full"
        } md:translate-x-0`}
        aria-label="Sidebar"
      >
        <button
          onClick={toggleSidebar}
          className={`absolute text-fourth top-2 left-2 text-xl hover:text-primary transition duration-300  md:hidden`}
        >
          <IoClose />
        </button>

        <div className="h-full px-3 py-2 overflow-y-auto   bg-white">
          <h1 className=" text-2xl font-sans mb-4 mx-5 pb-8 pt-3 text-primary  font-extrabold">
            Shadows
          </h1>

          <ul className="space-y-2 font-medium">
            {pages.map((e, i) => {
              return (
                <li
                  onClick={() => {
                    setPageName(e.title);
                  }}
                  key={i}
                >
                  <Link
                    href={e.href}
                    className={`flex  ${
                      pageName == e.title
                        ? "text-white bg-primary"
                        : "hover:text-primary hover:bg-white"
                    } group text-fourth hover:-translate-y-1  flex-row gap-3 text-xl items-center p-2  transition duration-500  rounded-lg  group `}
                  >
                    <div
                      className={`px-3 py-3 group-hover:shadow-2xl  transition duration-500  text-primary rounded-lg w-fit ${
                        pageName == e.title
                          ? "text-white bg-primary"
                          : "group-hover:bg-primary group-hover:text-white"
                      }   `}
                    >
                      {e.icon}
                    </div>

                    {dictionary[e.title]}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </aside>
    </>
  );
};

export default SideBar;
