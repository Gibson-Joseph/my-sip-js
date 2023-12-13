import { IoIosSettings } from "react-icons/io";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { UseMoel } from "../../Provider/ModelProvider/ModelProvider";
import IncommingModel from "../IncommingModel/IncommingModel";
import OutgoingModel from "../OutgoingModel/OutgoingModel";

const SipPhone = () => {
  const location = useLocation();
  const navigation = useNavigate();
  const { inCommingCall, outgoingCall } = UseMoel();
  const sipUserName = localStorage.getItem("SIP_USER");
  return (
    <div className="border max-w-sm w-full relative">
      {inCommingCall && <IncommingModel />}
      {outgoingCall && <OutgoingModel />}
      {/* <div className="video">
        <video id="videoRemote" width="100%" muted={false}>
          <p>Your browser doesn't support HTML5 video.</p>
        </video>
        <div className="video-local">
          <video id="videoLocal" width="100%" muted={false}>
            <p>Your browser doesn't support HTML5 video.</p>
          </video>
        </div>
      </div> */}
      {/* Header */}
      <div className="bg-slate-300 py-3 px-3 flex justify-between items-center">
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
          {sipUserName ? (
            <div className="flex flex-col">
              <h5>{sipUserName}</h5>
              <div className="flex justify-center items-center gap-x-1">
                <div className="bg-green-500 h-2 w-2 rounded-full"></div>
                <h6 className="text-xs">Registered</h6>
              </div>
            </div>
          ) : (
            <>
              <strong>SIP</strong> phone
            </>
          )}
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
