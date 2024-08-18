import React, { ReactNode } from "react";
import { Button } from "@/components/ui/button";

type Props = {
  setMonths: (value: React.SetStateAction<number>) => void;
  months: number;
  children: ReactNode;
  value: number;
};

const AverageButton = ({ setMonths, months, children, value }: Props) => {
  return <Button onClick={() => setMonths(value)}>{children}</Button>;
};

export default AverageButton;
