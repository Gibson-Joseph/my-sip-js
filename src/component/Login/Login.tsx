import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { UseSipUser } from "../../Provider/SipUserProvider/SipUserProvider";

const Login = () => {
  const defaultValues = {
    name: "",
    password: "",
  };
  const method = useForm({
    defaultValues,
  });

  const { main } = UseSipUser();
  const navigate = useNavigate();

  const submitHandler = (data: any) => {
    console.log("Data", data);
    //   // Run it
    main(data.name, data.password)
      .then((res: any) => {
        localStorage.setItem("SIP_USER", data.name);
        localStorage.setItem("SIP_PASS", data.password);
        console.log(`Success`, res);
        navigate("/");
      })
      .catch((error: Error) => {
        console.error(`Failure`, error);
      });
  };

  return (
    <div className="border px-6 py-3 shadow-md border-blue-200">
      <div className="w-full py-3">
        <h1 className="text-center font-medium">SIP Login</h1>
        <h6 className="text-center font-medium text-sm">
          Please login your SIP account
        </h6>
      </div>
      <form action="" onSubmit={method.handleSubmit(submitHandler)}>
        <div className="flex flex-col gap-y-5 mt-4">
          <div className="flex shadow">
            <div className="border flex justify-center items-center p-1 bg-gray-400/20">
              <FaUser className="w-7 h-7 p-1" />
            </div>
            <input
              type="text"
              {...method.register("name")}
              className="border outline-none focus:border-blue-600 py-2 px-2"
            />
          </div>
          <div className="flex shadow">
            <div className="border flex justify-center items-center p-1 bg-gray-400/20">
              <RiLockPasswordFill className="w-7 h-7 p-1" />
            </div>
            <input
              type="text"
              {...method.register("password")}
              className="border outline-none focus:border-blue-600 py-2 px-2"
            />
          </div>
        </div>
        <div className="w-full py-5">
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 transition-all duration-300 py-2 rounded font-medium border focus:border-blue-900 outline-none"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
