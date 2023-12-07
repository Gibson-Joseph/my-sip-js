import {
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

interface ModelContextType {
  inCommingCall: boolean;
  setIncommingCall: React.Dispatch<SetStateAction<boolean>>;
}

const ModelContext = createContext<ModelContextType | null>(null);

export const ModelProvider = ({ children }: { children: ReactNode }) => {
  const [inCommingCall, setIncommingCall] = useState(false);
  return (
    <ModelContext.Provider
      value={{
        inCommingCall,
        setIncommingCall,
      }}
    >
      {children}
    </ModelContext.Provider>
  );
};

export function UseMoel() {
  const context = useContext(ModelContext);
  if (!context) {
    throw new Error("ModelContext must be used within a ModelProvider");
  }
  return context;
}
