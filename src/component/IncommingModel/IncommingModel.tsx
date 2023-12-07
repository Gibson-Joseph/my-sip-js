import React from "react";
import { HiPhoneMissedCall } from "react-icons/hi";
import { IoCallSharp } from "react-icons/io5";
import { UseMoel } from "../../Provider/ModelProvider/ModelProvider";

const IncommingModel = () => {
  const { setIncommingCall } = UseMoel();
  return (
    <div
      id="default-modal"
      tabIndex={-1}
      aria-hidden="true"
      className="absolute z-50 w-full p-4 overflow-x-hidden overflow-y-auto h-full max-h-full flex justify-center items-center bg-gray-950/50 "
    >
      <div className="w-full max-w-2xl max-h-full">
        <div className="relative bg-white rounded-lg shadow-md h-full px-3 py-5 space-y-5 border-t-4 border-t-red-600">
          <div className="flex flex-col justify-center items-center w-full gap-y-3">
            <div className="bg-indigo-400 h-20 w-20 rounded-full flex justify-center items-center cursor-pointer">
              <span className="text-3xl font-medium">G</span>
            </div>
            <div className="w-full flex flex-col justify-center items-center font-[PublicSans]">
              <h1>Gibbs Jose</h1>
              <span>2001</span>
            </div>
          </div>

          <div className="flex justify-between w-full gap-x-3">
            <button
              type="button"
              title="Decline"
              className="w-full flex justify-center items-center gap-x-2 px-2 py-2 rounded-md bg-red-500 hover:bg-red-600 transition-all duration-200 font-[PublicSans]"
              onClick={() => {
                setIncommingCall(false);
              }}
            >
              <HiPhoneMissedCall className="w-6 h-6" />
              <span>Decline</span>
            </button>

            <button
              type="button"
              title="Answer"
              className="w-full flex justify-center items-center gap-x-2 px-2 py-2 rounded-md bg-green-500 hover:bg-green-600 transition-all duration-200 font-[PublicSans]"
              onClick={() => {
                setIncommingCall(false);
              }}
            >
              <IoCallSharp className="w-6 h-6" />
              <span>Answer</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncommingModel;
