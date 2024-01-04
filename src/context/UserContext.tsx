import { ReactNode, createContext, useEffect, useState } from "react";
import { auth } from "@/firebase/firebase";
import { FirebaseError } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { useToast } from "@/components/ui/use-toast";

type UserProps = {
  email: string;
  password: string;
};

interface User {
  accessToken: string;
  email: string;
}

interface UserContextType {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  handleLogin: ({ email, password }: UserProps) => void;
  handleLogout: () => void;
  toggle2: boolean;
  setToggle2: React.Dispatch<React.SetStateAction<boolean>>;
  signupUserWithEmailAndPassword: ({ email, password }: UserProps) => void;
}

const UserContext = createContext<UserContextType | null>(null);

const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>({
    accessToken: "",
    email: "",
  });
  const [toggle2, setToggle2] = useState(false);
  const { toast } = useToast();

  const handleLogin = async ({ email, password }: UserProps) => {
    setToggle2(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        setUser({
          // @ts-ignore
          accessToken: user?.accessToken,
          // @ts-ignore
          email: user?.email,
        });
        toast({
          title: `${user?.email} `,
          description: "Logged In Succesfully",
        });
      })
      .catch((error: FirebaseError) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast({
          title: errorCode,
          description: errorMessage,
        });
      });
    setToggle2(false);
  };

  const handleLogout = () => {
    setToggle2(true);
    signOut(auth)
      .then(() => {
        toast({
          title: "Logged Out",
          description: "Logged Out Succesfully !",
        });
      })
      .catch((error) => {
        toast({
          variant: "destructive",
          title: `Error ${error}`,
          description: "Error Logging Out",
        });
      });
    setUser({
      accessToken: "",
      email: "",
    });
    setToggle2(false);
  };

  const signupUserWithEmailAndPassword = ({ email, password }: UserProps) => {
    return createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        toast({
          title: `Success`,
          description: "User Created Prcoeed to Login",
        });
      })
      .catch((error) => {
        console.error("Error signing up:", error);

        toast({
          variant: "destructive",
          title: `Error ${error.code}`,
          description: error.message,
        });
      });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user)
        setUser({
          // @ts-ignore
          accessToken: user?.accessToken,
          // @ts-ignore
          email: user?.email,
        });
      else setUser({ accessToken: "", email: "" });
    });
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        handleLogin,
        handleLogout,
        signupUserWithEmailAndPassword,
        toggle2,
        setToggle2,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserContextProvider };
