import { useState } from "react";
import { DialogDemo } from "./CreateCard";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";

import logo from "@/assets/logoo.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <div className="header border-1">
        <div className="flex align-center gap-2">
          <Link to={"/"}>
            <img src={logo} alt="Logo" width={50} height={50} />
          </Link>

          <Link to={"/study"} className="self-center mx-4 text-lg font-bold">
            Study
          </Link>
        </div>

        <div className="flex align-center gap-2">
          <Button onClick={() => setIsOpen(!isOpen)}>Create Card</Button>
          <ModeToggle />
        </div>
      </div>

      <DialogDemo isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export default Navbar;
