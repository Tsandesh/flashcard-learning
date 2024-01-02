import { useContext, useState } from "react";
import { LoginModal } from "./Login";
import { Button } from "./ui/button";
import { UserContext } from "@/context/UserContext";

const HeroSection = () => {
  const [isOpen, setIsOpen] = useState(false);

  const context = useContext(UserContext);
  if (!context) {
    return null;
  }

  const { user } = context;
  return (
    <section className="mx-auto flex max-w-[980px] flex-col items-center gap-2 py-8 md:py-12 md:pb-8 lg:py-24 lg:pb-20">
      <h1 className="text-center text-3xl font-bold leading-tight tracking-tighter md:text-6xl lg:leading-[1.1]">
        Welcome to Flash Card App
      </h1>
      <span className="max-w-[750px] text-center text-lg text-muted-foreground sm:text-xl">
        Create, Edit and Manage your flashcards all in one place
      </span>

      <div className="flex w-full items-center justify-center space-x-4 py-4 md:pb-10">
        <Button>Get Started</Button>
        {user.accessToken === "" && (
          <Button onClick={() => setIsOpen(!isOpen)}> Login</Button>
        )}
      </div>
      <LoginModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </section>
  );
};

export default HeroSection;
