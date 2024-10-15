import React from "react";
import { Loader2 } from "lucide-react";
const loading = () => {
  return (
    <div className="h-screen grid place-items-center">
      <Loader2 className="h-36 w-36 animate-spin" />
    </div>
  );
};

export default loading;
