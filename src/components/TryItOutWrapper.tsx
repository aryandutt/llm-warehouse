import React from "react";

type TryItOutWrapperProps = {
  children: React.ReactNode;
};

const TryItOutWrapper: React.FC<TryItOutWrapperProps> = ({ children }) => {
  return (
    <div className="flex-[2_2_0%] p-10 flex flex-col gap-20 ">{children}</div>
  );
};

export default TryItOutWrapper;
