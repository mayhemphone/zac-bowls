import React, { ReactNode } from "react";
//import styles from './AverageButton.module.scss'

type Props = {
  setMonths: (value: React.SetStateAction<number>) => void;
  months: number;
  children: ReactNode;
  value: number;
};

const AverageButton = ({ setMonths, months, children, value }: Props) => {
  return (
    <button
      onClick={() => setMonths(value)}
      style={{
        backgroundColor: months === value ? "red" : "transparent",
        border: "none",
        cursor: "pointer",
        padding: ".25rem",
      }}
    >
      {children}
    </button>
  );
};

export default AverageButton;
