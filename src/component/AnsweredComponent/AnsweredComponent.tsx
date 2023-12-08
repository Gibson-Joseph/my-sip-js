import React from "react";
import { useNavigate } from "react-router-dom";
import { GoUnmute } from "react-icons/go";
import { FaMicrophone } from "react-icons/fa";
import { IoMdKeypad } from "react-icons/io";
import { IoIosPause } from "react-icons/io";
import { IoMdAdd } from "react-icons/io";
import { RiArrowGoForwardFill } from "react-icons/ri";
import { MdCallEnd } from "react-icons/md";
import { UseSipUser } from "../../Provider/SipUserProvider/SipUserProvider";

const AnsweredComponent = () => {
  const { onCallHangup, onMuteCall } = UseSipUser();
  // const navigate = useNavigate();
  return (
    <div className="p-4 bg-[#dddd]">
      <div className="border-t-4 border-t-red-500 shadow-lg bg-white rounded">
        <div className=" py-3 px-2 w-full flex flex-col justify-center">
          <div className=" py-3 px-2 w-full flex flex-col justify-center items-center">
            <div className="w-20 h-20 rounded-full bg-indigo-400 flex justify-center items-center border cursor-pointer">
              <span className="text-3xl">G</span>
            </div>
            <h1 className="text-xl text-center pt-4 font-sans">Gibson</h1>
          </div>
          <div className="w-full space-y-8 px-4 sm:px-7 py-4 transition-all duration-200">
            <div className="w-full flex justify-between items-center">
              {/* Mute */}
              <div className="flex flex-col justify-center items-center gap-y-1">
                <button
                  type="button"
                  title="Mute"
                  className="bg-blue-900/10 hover:bg-slate-900/30 transition-all duration-200 rounded-full p-3 cursor-pointer font-[PublicSans] w-fit"
                  onClick={() => {
                    onMuteCall();
                  }}
                >
                  <FaMicrophone className="w-6 h-6" />
                </button>
                <span className="text-xs w-fit">Mute</span>
              </div>

              {/* Speaker */}
              <div className="flex flex-col justify-center items-center gap-y-1">
                <button
                  type="button"
                  title="Speaker"
                  className="bg-blue-900/10 hover:bg-slate-900/30 transition-all duration-200 rounded-full p-3 cursor-pointer font-[PublicSans] w-fit"
                >
                  <GoUnmute className="w-6 h-6" />
                </button>
                <span className="text-xs w-fit">Speaker</span>
              </div>
              {/* KeyPad */}
              <div className="flex flex-col justify-center items-center gap-y-1">
                <button
                  type="button"
                  title="KeyPad"
                  className="bg-blue-900/10 hover:bg-slate-900/30 transition-all duration-200 rounded-full p-3 cursor-pointer font-[PublicSans] w-fit"
                >
                  <IoMdKeypad className="w-6 h-6" />
                </button>
                <span className="text-xs w-fit">KeyPad</span>
              </div>
            </div>
            <div className="w-full flex justify-between">
              {/* Hold */}
              <div className="flex flex-col justify-center items-center gap-y-1">
                <button
                  type="button"
                  title="Hold"
                  className="bg-blue-900/10 hover:bg-slate-900/30 transition-all duration-200 rounded-full p-3 cursor-pointer font-[PublicSans] w-fit"
                >
                  <IoIosPause className="w-6 h-6" />
                </button>
                <span className="text-xs w-fit">Hold</span>
              </div>
              {/* Add call */}
              <div className="flex flex-col justify-center items-center gap-y-1">
                <button
                  type="button"
                  title="Add Call"
                  className="bg-blue-900/10 hover:bg-slate-900/30 transition-all duration-200 rounded-full p-3 cursor-pointer font-[PublicSans] w-fit"
                >
                  <IoMdAdd className="w-6 h-6" />
                </button>
                <span className="text-xs w-fit">Add call</span>
              </div>

              {/* Transfer the call */}
              <div className="flex flex-col justify-center items-center gap-y-1">
                <button
                  type="button"
                  title="Call Transfer"
                  className="bg-blue-900/10 hover:bg-slate-900/30 transition-all duration-200 rounded-full p-3 cursor-pointer font-[PublicSans] w-fit"
                >
                  <RiArrowGoForwardFill className="w-6 h-6" />
                </button>
                <span className="text-xs w-fit">Transfer</span>
              </div>
            </div>
            <div className="w-full flex justify-center mt-5">
              <button
                type="button"
                title="hangUp"
                className="bg-red-500 hover:bg-red-600 text-white rounded-full p-3 cursor-pointer transition-all duration-200"
                onClick={() => {
                  onCallHangup();
                }}
              >
                <MdCallEnd className="w-7 h-7" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnsweredComponent;
