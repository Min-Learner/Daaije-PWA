import {
  useContext,
  createContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import wakeLock from "./wakeLock";
import { basicInitState, basicReducer } from "./reducers";

const AppContext = createContext();
const useAppContext = () => useContext(AppContext);

const AppContextProvider = ({ children }) => {
  const { acquireLock, handleVisibilityChange } = wakeLock();
  const [basicState, basicDispatch] = useReducer(basicReducer, basicInitState);
  const [isBasic, setIsBasic] = useState(true);

  useEffect(() => {
    acquireLock();
    document.addEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (basicState.animation) basicDispatch({ type: "animation" });
    }, 600);
  }, [basicState.animation]);

  return (
    <AppContext.Provider
      value={{
        basicState,
        basicDispatch,
        isBasic,
        setIsBasic,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, useAppContext, AppContextProvider };
