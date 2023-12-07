import { IoIosSettings } from "react-icons/io";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { UseMoel } from "../../Provider/ModelProvider/ModelProvider";
import IncommingModel from "../IncommingModel/IncommingModel";

const SipPhone = () => {
  const location = useLocation();
  const navigation = useNavigate();
  const { inCommingCall } = UseMoel();

  return (
    <div className="border max-w-sm w-full relative">
      {inCommingCall && <IncommingModel />}
      {/* Header */}
      <div className="bg-indigo-300 py-3 px-3 flex justify-between items-center">
        {location.pathname === "/answer" && (
          <button
            type="button"
            title="back"
            className="bg-slate-500/20 hover:bg-slate-500/50 p-1 flex justify-center items-center hover:text-slate-700 transition-all duration-200 rounded-full"
            onClick={() => navigation("/")}
          >
            <MdKeyboardArrowLeft className="w-7 h-7 cursor-pointer" />
          </button>
        )}
        <h1 className="font-[PublicSans]">
          <strong>SIP</strong> phone
        </h1>
        <div>
          <IoIosSettings
            className="w-7 h-7 text-white cursor-pointer hover:text-red-500 transition-all duration-200"
            title="Settings"
          />
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default SipPhone;
