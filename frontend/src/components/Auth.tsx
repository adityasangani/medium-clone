import { SignupInput } from "@adityasangani/medium-common";
import axios from "axios";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { BACKEND_URL } from "../config";
import { useSetRecoilState } from "recoil";
import { UserType, userAtom } from "../store/atoms/count";
import { BACKEND_URL } from "../config";

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const setUser = useSetRecoilState<UserType | null>(userAtom);
  const navigate = useNavigate();
  const [postInputs, setPostInputs] = useState<SignupInput>({
    email: "",
    name: "",
    password: "",
  });

  async function sendRequest() {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`,
        // `http://localhost:8787/api/v1/user/${
        //   type === "signup" ? "signup" : "signin"
        // }`,
        postInputs
      );
      const jwt = response.data;
      localStorage.setItem("token", jwt);
      if (type === "signin") {
        const userResponse = await axios.get(
          `${BACKEND_URL}/api/v1/user/profile`,
          // `http://localhost:8787/api/v1/user/profile`,
          {
            params: {
              email: postInputs.email,
            },
          }
        );
        const userData: UserType = {
          name: userResponse.data.name ?? "Guest",
          email: userResponse.data.email,
        };
        setUser(userData);
      } else {
        const userData: UserType = {
          name: postInputs.name ?? "Guest",
          email: postInputs.email,
        };
        setUser(userData);
      }
      navigate("/blogs");
    } catch (e) {
      alert("Error while signing up");
    }
  }

  return (
    <div className="h-screen flex justify-center flex-col">
      <div className="flex justify-center">
        <div>
          <div className="px-10">
            <div className="text-3xl font-extrabold ">
              {type === "signup"
                ? "Create an account"
                : "Sign in to your account"}
            </div>
            <div className="text-slate-500">
              {type === "signin"
                ? "Don't have an account? "
                : "Already have an account? "}
              <Link
                className=" underline"
                to={type === "signin" ? "/signup" : "/signin"}
              >
                {type === "signin" ? "Sign up" : "Sign in"}
              </Link>
            </div>
          </div>
          <div className="pt-4">
            <LabelledInput
              label="Email"
              placeholder="Email"
              onChange={(e) => {
                setPostInputs({
                  ...postInputs,
                  email: e.target.value,
                });
              }}
            />
            {type === "signup" ? (
              <LabelledInput
                label="Name"
                placeholder="Full Name"
                onChange={(e) => {
                  setPostInputs({
                    ...postInputs,
                    name: e.target.value,
                  });
                }}
              />
            ) : null}
            <LabelledInput
              label="Password"
              type="password"
              placeholder="Password"
              onChange={(e) => {
                setPostInputs({
                  ...postInputs,
                  password: e.target.value,
                });
              }}
            />
            <button
              onClick={sendRequest}
              type="button"
              className="mt-8 text-white w-full bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            >
              {type === "signup" ? "Sign up" : "Sign in"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface LabelledInputType {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

function LabelledInput({
  label,
  placeholder,
  onChange,
  type,
}: LabelledInputType) {
  return (
    <div>
      <label className="block mb-2 text-sm pt-4 font-semibold text-black">
        {label}
      </label>
      <input
        onChange={onChange}
        type={type || "text"}
        id="first_name"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder={placeholder}
        required
      />
    </div>
  );
}
