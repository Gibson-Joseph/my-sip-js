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
import {
  Invitation,
  Inviter,
  NameAddrHeader,
  Registerer,
  Session,
  SessionState,
  URI,
  UserAgent,
  UserAgentDelegate,
  UserAgentOptions,
  UserAgentState,
  Web,
} from "sip.js";
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
  main: (userName: string, password: string) => any;
  remoteIdentity: string;
  onCancelCall: () => void;
}

const SipContext = createContext<SipContextType | null>(null);

export const SipUserProvider = ({ children }: { children: ReactNode }) => {
  const { setIncommingCall, setOutgoingCall } = UseMoel();
  const [userAgent, setUserAgent] = useState<UserAgent>();
  // Invitation | Inviter
  const [invitation, setInvitation] = useState<any>();
  const [remoteIdentity, setRemoteIdentity] = useState<any>("");
  const navigate = useNavigate();
  const domain = "sipjs.onsip.com";
  // const domain = "copperdev.yavar.ai";
  // const target = "sip:echo@sipjs.onsip.com";
  const [target, setTarget] = useState<string>("");

  const nameBob = "Bob";
  const uriBob = "sip:bob" + domain;

  const [sipNum, setSipNum] = useState("0");
  const [sipUser, setSipUser] = useState<any>();

  // // Helper function to get an HTML audio element
  function getAudioElement(id: string): HTMLAudioElement {
    const el = document.getElementById(id);
    if (!(el instanceof HTMLAudioElement)) {
      throw new Error(`Element "${id}" not found or not an audio element.`);
    }
    return el;
  }

  // // Helper function to get an HTML video element
  function getVideoElement(id: string): HTMLVideoElement {
    const el = document.getElementById(id);
    if (!(el instanceof HTMLVideoElement)) {
      throw new Error(`Element "${id}" not found or not a video element.`);
    }
    return el;
  }

  // Main function
  // async function main(userName?: string, password?: string): Promise<void> {
  //   console.log("userName:", userName);
  //   console.log("password:", password);

  //   console.log("main is called");

  //   // const server = "wss://copperdev.yavar.ai:8089/ws";
  //   const server = "wss://edge.sip.onsip.com";
  //   const aor = `sip:${userName}@${domain}`;
  //   // const aor = `sip:${userName}@copperdev.yavar.ai`;
  //   if (userName === "2001") {
  //     // setTarget(`sip:2000@copperdev.yavar.ai`);
  //     setTarget(`sip:2000@${domain}`);
  //   } else if (userName === "2000") {
  //     // setTarget(`sip:$2001@copperdev.yavar.ai`);
  //     setTarget(`sip:2001@${domain}`);
  //   }
  //   // const authorizationUsername = nameBob;
  //   const authorizationUsername = userName;

  //   const authorizationPassword = `${password}`;

  //   const options: SimpleUserOptions = {
  //     aor,
  //     media: {
  //       constraints: {
  //         // This demo is making "video only" calls
  //         audio: true,
  //         video: true,
  //       },
  //       remote: {
  //         audio: getAudioElement("remoteAudio"),
  //         // video: getVideoElement("videoRemote"),
  //       },
  //       // local: {
  //       //   video: getVideoElement("videoLocal"),
  //       // },
  //     },
  //     userAgentOptions: {
  //       authorizationPassword,
  //       authorizationUsername,
  //     },
  //   };

  //   // Construct a SimpleUser instance
  //   const simpleUser = new SimpleUser(server, options);

  //   const simpleUserDelegate: SimpleUserDelegate = {
  //     onCallCreated: (): void => {
  //       console.log("Call has created");
  //     },
  //     onCallAnswered: (): void => {
  //       console.log("Call has Answered");
  //       navigate("/answer");
  //     },
  //     onCallHangup: (): void => {
  //       console.log("Call has Hangup");
  //       navigate("/");
  //     },
  //     onCallHold: (held: boolean): void => {
  //       console.log("Call hold", held);
  //     },
  //     onCallReceived: (): void => {
  //       console.log("Incoming Call!");
  //       setIncommingCall(true);
  //     },
  //     onServerConnect: (): void => {
  //       console.log("is server is conected", simpleUser.isConnected());
  //     },
  //     onRegistered: (): void => {
  //       console.log(`Sip user is connected`);
  //     },
  //   };

  //   simpleUser.delegate = simpleUserDelegate;
  //   setSipUser(simpleUser);

  //   // Connect to server
  //   await simpleUser.connect();

  //   // Register to receive inbound calls (optional)
  //   await simpleUser.register();
  // }

  // function onInvite(invitation:UserAgentDelegate) {
  //  invitation.onInvite(invitation)
  // }

  function setupRemoteMedia(session: Session) {
    const sessionDescriptionHandler = session.sessionDescriptionHandler;
    if (
      !sessionDescriptionHandler ||
      !(sessionDescriptionHandler instanceof Web.SessionDescriptionHandler)
    ) {
      throw new Error("Invalid session description handler.");
    }
    const remoteHTMLMediaElement = getAudioElement("remoteAudio");
    assignStream(
      sessionDescriptionHandler.remoteMediaStream,
      remoteHTMLMediaElement
    );
  }

  // Assign a MediaStream to an HTMLMediaElement and update if tracks change.
  function assignStream(stream: MediaStream, element: HTMLMediaElement): void {
    // Set element source.
    element.autoplay = true; // Safari does not allow calling .play() from a non user action
    element.srcObject = stream;

    // Load and start playback of media.
    element.play().catch((error: Error) => {
      console.error("Failed to play media");
      console.error(error);
    });

    // If a track is added, load and restart playback of media.
    stream.onaddtrack = (): void => {
      element.load(); // Safari does not work otheriwse
      element.play().catch((error: Error) => {
        console.error("Failed to play remote media on add track");
        console.error(error);
      });
    };

    // If a track is removed, load and restart playback of media.
    stream.onremovetrack = (): void => {
      element.load(); // Safari does not work otheriwse
      element.play().catch((error: Error) => {
        console.error("Failed to play remote media on remove track");
        console.error(error);
      });
    };
  }

  const UAdelegate: UserAgentDelegate = {
    onInvite(invitation) {
      setInvitation(invitation);
      setRemoteIdentity(invitation.remoteIdentity.displayName);
      // invitation.accept();
      setIncommingCall(true);
      invitation.stateChange.addListener((state: SessionState) => {
        console.log(`Session state changed to ${state}`);
        switch (state) {
          case SessionState.Initial:
            break;
          case SessionState.Establishing:
            break;
          case SessionState.Established:
            // setupRemoteMedia(inviter);
            setIncommingCall(false);
            setupRemoteMedia(invitation);
            break;
          case SessionState.Terminating:
          // fall through
          case SessionState.Terminated:
            // cleanupMedia();
            setIncommingCall(false);
            navigate("/");
            break;
          default:
            throw new Error("Unknown session state.");
        }
      });
    },
  };

  async function main(userName: string, password?: string) {
    if (userName === "2001") {
      setTarget(`sip:2000@${domain}`);
    } else if (userName === "2000") {
      setTarget(`sip:2001@${domain}`);
    }

    //Transport Options
    const transportOptions = {
      server: "wss://edge.sip.onsip.com",
      // server: "wss://copperdev.yavar.ai:8089/ws",
    };

    const uri = UserAgent.makeURI(`sip:${userName}@${domain}`);

    const userAgentOptions: UserAgentOptions = {
      authorizationPassword: "master1057",
      authorizationUsername: "gibbs",
      transportOptions,
      uri,
      displayName: `${userName}`,
    };
    userAgentOptions.delegate = UAdelegate;
    const userAgent: UserAgent = new UserAgent(userAgentOptions);

    setUserAgent(userAgent);
    const registerer = new Registerer(userAgent);

    userAgent.start().then(() => {
      registerer.register();
      console.log("registerer.state", registerer.state);
    });
  }

  useEffect(() => {
    // Run it
    const sipUserName = localStorage.getItem("SIP_USER");
    const sipPassword = localStorage.getItem("SIP_PASS");
    if (sipUserName && sipPassword) {
      main(sipUserName, sipPassword)
        .then((res) => console.log(`Success`, res))
        .catch((error: Error) => console.error(`Failure`, error));
    }
  }, []);

  // Sending an Invite
  const makeCallRequest = async () => {
    console.log("makeCallRequest user", target);
    userAgent
      ?.start()
      .then((res) => {
        if (userAgent.isConnected() === true) {
          console.log("You can make a call invite");
          const targetUser: URI | undefined = UserAgent.makeURI(target);
          if (targetUser) {
            const inviter: Inviter = new Inviter(userAgent, targetUser, {
              earlyMedia: true,
              sessionDescriptionHandlerOptions: {
                constraints: {
                  audio: true,
                  video: false,
                },
              },
            });
            inviter.stateChange.addListener((state: SessionState) => {
              console.log(`Session state changed to ${state}`);
              setInvitation(inviter);
              switch (state) {
                case SessionState.Initial:
                  break;
                case SessionState.Establishing:
                  setOutgoingCall(true);
                  break;
                case SessionState.Established:
                  // setupRemoteMedia(inviter);
                  setOutgoingCall(false);
                  setupRemoteMedia(inviter);
                  navigate("/answer");
                  break;
                case SessionState.Terminating:
                // fall through
                case SessionState.Terminated:
                  setOutgoingCall(false);
                  navigate("/");
                  // cleanupMedia();
                  break;
                default:
                  throw new Error("Unknown session state.");
              }
            });
            inviter.invite();
          }
        }
      })
      .catch((error: Error) => {
        if (userAgent.isConnected() === false) {
          console.log("You can't make the call invite", error);
        }
      });
  };

  const onCancelCall = async () => {
    await invitation?.cancel();
  };

  const onCallHangup = async () => {
    // await sipUser.hangup();
    await invitation?.bye();
  };

  // Answer an incoming call.
  const onCallAnswer = async () => {
    // await sipUser.answer();
    await invitation?.accept().then(() => {
      console.log("invitation has been accepted");
      navigate("/answer");
    });
    // setIncommingCall(false);
  };
  // Decline an incoming call.
  const onCallDecline = async () => {
    // await sipUser.decline();
    // setIncommingCall(false);
    await invitation?.reject();
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
        main,
        remoteIdentity,
        onCancelCall,
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
