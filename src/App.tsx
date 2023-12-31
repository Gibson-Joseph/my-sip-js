import "./App.css";
import { Route, Routes } from "react-router-dom";
import SipPhone from "./component/SipPhone/SipPhone";
import AnsweredComponent from "./component/AnsweredComponent/AnsweredComponent";
import DialPad from "./component/DialPad/DialPad";
import Login from "./component/Login/Login";

function App() {
  return (
    <div className="h-full w-full flex justify-center items-center">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<SipPhone />}>
          <Route index element={<DialPad />} />
          <Route path="/answer" element={<AnsweredComponent />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
