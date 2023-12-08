import React, {
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import {
  SimpleUser,
  SimpleUserDelegate,
  SimpleUserOptions,
} from "sip.js/lib/platform/web";
import { UseMoel } from "../ModelProvider/ModelProvider";

interface SipContextType {
  sipUser: any;
  makeCallRequest: () => void;
  onCallHangup: () => void;
  sipNum: string;
  setSipNum: React.Dispatch<SetStateAction<string>>;
  onCallAnswer: () => void;
  onCallDecline: () => void;
  onMuteCall: () => void;
}

const SipContext = createContext<SipContextType | null>(null);

export const SipUserProvider = ({ children }: { children: ReactNode }) => {
  const { setIncommingCall } = UseMoel();
  const navigate = useNavigate();
  const domain = "sipjs.onsip.com";
  const target = "sip:echo@sipjs.onsip.com";
  //   const target = "sip:prakash@sipjs.onsip.com";

  const uriAlice = "sip:alice.kjsdks@" + domain;
  const nameBob = "Bob";
  const uriBob = "sip:bob.sjd@" + domain;

  const [sipNum, setSipNum] = useState("0");
  const [sipUser, setSipUser] = useState<any>();

  // Helper function to get an HTML audio element
  function getAudioElement(id: string): HTMLAudioElement {
    const el = document.getElementById(id);
    if (!(el instanceof HTMLAudioElement)) {
      throw new Error(`Element "${id}" not found or not an audio element.`);
    }
    return el;
  }

  // Helper function to wait
  // async function wait(ms: number): Promise<void> {
  //   return new Promise((resolve) => {
  //     setTimeout(resolve, ms);
  //   });
  // }

  // Main function
  async function main(): Promise<void> {
    const server = "wss://edge.sip.onsip.com";
    const destination = uriAlice;

    const aor = uriBob;

    const authorizationUsername = nameBob;
    const authorizationPassword = "1234";

    const simpleUserDelegate: SimpleUserDelegate = {
      onCallCreated: (): void => {
        console.log("Call has created");
      },
      onCallAnswered: (): void => {
        console.log("Call has Answered");
        navigate("/answer");
      },
      onCallHangup: (): void => {
        console.log("Call has Hangup");
        navigate("/");
      },
      onCallHold: (held: boolean): void => {
        console.log("Call hold", held);
      },
      onCallReceived: (): void => {
        console.log("Incoming Call!");
        setIncommingCall(true);
      },
    };

    const options: SimpleUserOptions = {
      aor,
      delegate: simpleUserDelegate,
      media: {
        remote: {
          audio: getAudioElement("remoteAudio"),
        },
      },
      userAgentOptions: {
        // authorizationPassword,
        authorizationUsername,
      },
    };

    // Construct a SimpleUser instance
    const simpleUser = new SimpleUser(server, options);
    setSipUser(simpleUser);

    // Connect to server
    await simpleUser.connect();

    // Register to receive inbound calls (optional)
    await simpleUser.register();
  }

  useEffect(() => {
    // Run it
    main()
      .then((res) => console.log(`Success`, res))
      .catch((error: Error) => console.error(`Failure`, error));
  }, []);

  const makeCallRequest = async () => {
    console.log("makeCallRequest number", sipNum);
    await sipUser.call(target, {
      inviteWithoutSdp: false,
    });
  };

  const onCallHangup = async () => {
    await sipUser.hangup();
  };

  // Answer an incoming call.
  const onCallAnswer = async () => {
    await sipUser.answer();
    setIncommingCall(false);
  };
  // Decline an incoming call.
  const onCallDecline = async () => {
    await sipUser.decline();
    setIncommingCall(false);
  };

  // Mute call
  const onMuteCall = async () => {
    const state = await sipUser.isMuted();
    if (state) {
      await sipUser.unmute();
    } else {
      await sipUser.mute();
    }
    console.log("sipUser isMuted", state);
  };
  return (
    <SipContext.Provider
      value={{
        sipUser,
        makeCallRequest,
        onCallHangup,
        sipNum,
        setSipNum,
        onCallAnswer,
        onCallDecline,
        onMuteCall,
      }}
    >
      {children}
    </SipContext.Provider>
  );
};

export function UseSipUser() {
  const context = useContext(SipContext);
  if (!context) {
    throw new Error("SipClient must be used within a SipProvider");
  }
  return context;
}
