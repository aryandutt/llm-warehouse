import React from "react";
import { BrainCircuit } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

const NavBar = () => {
  return (
    <div className="bg-white shadow-sm flex justify-between items-center px-6 py-2 sticky top-0 z-50">
      <div className="flex items-center cursor-pointer">
        <BrainCircuit size={45} />
        <div className="mx-3 text-2xl font-mono font-semibold">
          LLM Warehouse
        </div>
      </div>
      <div className="flex">
        <div className="p-1">
          <Button variant={"outline"}>
            <Link href="/">Login</Link>
          </Button>
        </div>
        <div className="p-1">
          <Button color="red">
            <Link href="/">Signup</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
