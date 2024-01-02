import React, { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserContext } from "@/context/UserContext";

type DilogType = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export function LoginModal({ isOpen, setIsOpen }: DilogType) {
  const context = useContext(UserContext);
  if (!context) {
    return null;
  }

  const { handleLogin } = context;
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  useEffect(() => {
    if (isOpen === false) {
      setEmail("");
      setPass("");
    }
  }, [isOpen]);
  return (
    <Dialog open={isOpen} onOpenChange={() => setIsOpen}>
      <DialogContent className="sm:max-w-[425px] md:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Login</DialogTitle>
          <DialogDescription>Fill the information below.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="password" className="text-right">
              Password
            </Label>
            <Input
              id="answer"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              className="col-span-3"
            />
          </div>{" "}
        </div>
        <DialogFooter>
          <Button variant={"outline"} onClick={() => setIsOpen(false)}>
            Cancel
          </Button>

          <Button
            onClick={() => {
              handleLogin({ email, password: pass });
              setIsOpen(!open);
            }}
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
