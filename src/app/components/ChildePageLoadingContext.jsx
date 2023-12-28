import React, { createContext, useState } from "react";

const ChildePageLoadingContext = createContext(null);

function ChildePageLoadingContext({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  return <div>{children}</div>;
}

export default ChildePageLoadingContext;
