import { Link } from "react-router-dom";
import { Avatar } from "./BlogCard";
import { useRecoilValue } from "recoil";
import { userAtom } from "../store/atoms/count";
import { useState } from "react";

export const Appbar = () => {
  const user = useRecoilValue(userAtom);
  const [drop, setDrop] = useState(false);

  return (
    <div className="border-b flex min-w-screen sticky justify-between px-10 py-4">
      <Link
        to={"/blogs"}
        className="flex flex-col justify-center cursor-pointer"
      >
        Medium
      </Link>
      <div className="flex ">
        <Link to={"/publish"}>
          <button
            type="button"
            className="text-white mr-8 bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            New
          </button>
        </Link>
        <div
          onClick={() => {
            setDrop(!drop);
          }}
          className="cursor-pointer relative"
        >
          <Avatar name={user?.name || "Guest"} size="big" />
          {drop === true ? (
            <div className=" absolute z-50 right-5 my-4 text-base list-none bg-slate-700 divide-y divide-gray-100 rounded-lg shadow ">
              <div className="px-4 py-3">
                <span className="block text-sm text-white ">{user?.name}</span>
                <span className="block text-sm  text-gray-400 truncate ">
                  {user?.email}
                </span>
              </div>
              <ul className="py-2" aria-labelledby="user-menu-button">
                <li>
                  <Link
                    to={"/blogs"}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Home
                  </Link>
                </li>
                {/* <li>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Settings
                  </a>
                </li> */}
                {/* <li>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Earnings
                  </a>
                </li> */}
                <li>
                  <Link
                    to={"/signin"}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    onClick={() => {
                      localStorage.removeItem("token");
                    }}
                  >
                    Sign out
                  </Link>
                </li>
              </ul>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};
