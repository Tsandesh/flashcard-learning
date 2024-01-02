import { useContext, useState } from "react";
import { DialogDemo } from "./CreateCard";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";

import logo from "@/assets/logoo.png";
import { Link } from "react-router-dom";
import { UserContext } from "@/context/UserContext";
import { LoginModal } from "./Login";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpen2, setIsOpen2] = useState<boolean>(false);
  const context = useContext(UserContext);
  if (!context) {
    return null;
  }

  const { user, handleLogout } = context;

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
          {user.accessToken === "" ? (
            <Button onClick={() => setIsOpen2(!isOpen)}> Login</Button>
          ) : (
            <>
              <Button onClick={() => setIsOpen(!isOpen)}>Create Card</Button>
              <Button onClick={() => handleLogout()}>Log Out</Button>
            </>
          )}

          <ModeToggle />
        </div>
      </div>

      <DialogDemo isOpen={isOpen} setIsOpen={setIsOpen} />
      <LoginModal isOpen={isOpen2} setIsOpen={setIsOpen2} />
    </>
  );
};

export default Navbar;
