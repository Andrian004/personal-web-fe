import { useState } from "react";
import { PencilLine, UserRound } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import AngrySvg from "@/assets/angry.svg";
import CoolSvg from "@/assets/cool.svg";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { SignupDialog } from "@/components/dialog/signup-dialog";
import { LoginDialog } from "@/components/dialog/login-dialog";
import { CustomAvatar } from "@/components/custom-avatar";
import { AvatarDialog } from "@/components/dialog/avatar-dialog";

export default function ProfilePage() {
  const { user, removeToken } = useAuth();
  const [signupState, setSignupState] = useState(false);
  const [loginState, setLoginState] = useState(false);

  const closeSignupModal = () => setSignupState(false);
  const closeLoginModal = () => setLoginState(false);

  return (
    <div className="w-full bg-white/70 dark:bg-white/25 backdrop-blur-lg rounded-2xl p-4 space-y-5">
      <section className="w-full flex justify-between gap-x-4 border-b-2 border-sky-400 pb-3">
        <Header title="Account" />
      </section>
      <section className="flex justify-between bg-white/80 dark:bg-gray-800/70 shadow shadow-gray-400 dark:shadow-black rounded-lg p-3 gap-x-2">
        <div className="w-full flex gap-x-2 md:gap-x-4">
          <div className="w-max h-max relative bg-gradient-to-b from-neutral-300 dark:from-neutral-600 to-sky-300 dark:to-sky-900 rounded-full p-2">
            {user ? (
              <CustomAvatar
                src=""
                fallback={user.username.charAt(0)}
                className="size-16"
                fallbackStyle="bg-transparent text-4xl"
              />
            ) : (
              <UserRound className="size-16" />
            )}
            <AvatarDialog>
              <Button
                size="roundXs"
                variant="outline"
                className="absolute bottom-0 right-0"
                disabled={!user}
              >
                <PencilLine className="size-4" />
              </Button>
            </AvatarDialog>
          </div>
          <div className="w-full sm:space-y-2">
            <h1 className="text-2xl font-bold">
              {user ? user.username : "Guest"}
            </h1>
            <h2 className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-400">
              This is just public username. You can{" "}
              <span className="text-sky-600 underline cursor-pointer">
                change it
              </span>{" "}
              anytime.
            </h2>
          </div>
        </div>
        <div className="space-y-2">
          <Button
            variant="gray"
            size="sm"
            disabled={user ? false : true}
            className="w-full"
          >
            <p>
              Edit <span className="hidden sm:inline">name</span>
            </p>
          </Button>
          <Button
            variant="gray"
            size="sm"
            disabled={user ? false : true}
            className="w-full"
          >
            <p>
              <span className="hidden sm:inline">Change</span> Pass
            </p>
          </Button>
        </div>
      </section>
      <section className="w-full flex flex-col justify-center items-center space-y-4 pt-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold">
            {user ? "You got full access now." : "Don't have account?"}
          </h1>
          <p className="text-neutral-700 dark:text-neutral-300">
            {user
              ? "Cool, you have been created an account."
              : "Please ( login / sign up ) to get full access!"}
          </p>
        </div>
        <img
          src={user ? CoolSvg : AngrySvg}
          alt="angry"
          className="w-52 h-52"
        />
        <div className="flex items-center gap-x-3">
          {user ? (
            <Button variant="destructive" onClick={() => removeToken()}>
              LOG OUT
            </Button>
          ) : (
            <>
              <Button onClick={() => setLoginState(true)}>LOGIN</Button>
              <p>OR</p>
              <Button
                className="bg-sky-700 dark:bg-gray-900 dark:text-white"
                onClick={() => setSignupState(true)}
              >
                SIGN UP
              </Button>
            </>
          )}
        </div>
      </section>
      {/* modal start */}
      <SignupDialog open={signupState} onClose={closeSignupModal} />
      <LoginDialog open={loginState} onClose={closeLoginModal} />
      {/* modal end */}
      <Footer />
    </div>
  );
}
