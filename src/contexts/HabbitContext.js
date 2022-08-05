import { createContext, useState } from "react";

const HabbitContext = createContext();

const HabbitStorage = ({ children }) => {
  const [hideHabbit, setHideHabbit] = useState(true);
  const [newHabbit, setNewHabbit] = useState({ name: "", days: [] });
  return (
    <HabbitContext.Provider
      value={{ hideHabbit, setHideHabbit, newHabbit, setNewHabbit }}
    >
      {children}
    </HabbitContext.Provider>
  );
};

export { HabbitContext, HabbitStorage };
