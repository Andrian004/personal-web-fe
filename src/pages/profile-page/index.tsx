import { useState } from "react";
import { UserRound } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import AngrySvg from "@/assets/angry.svg";
import CoolSvg from "@/assets/cool.svg";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { SignupDialog } from "@/components/dialog/signup-dialog";
import { LoginDialog } from "@/components/dialog/login-dialog";

export default function ProfilePage() {
  const { user, removeToken } = useAuth();
  const [signupState, setSignupState] = useState(false);
  const [loginState, setLoginState] = useState(false);

  const closeSignupModal = () => setSignupState(false);
  const closeLoginModal = () => setLoginState(false);

  return (
    <div className="w-full bg-white/70 dark:bg-white/25 backdrop-blur-lg rounded-2xl p-4 space-y-5">
      <section className="w-full flex justify-between gap-x-4 border-b-2 border-sky-400 pb-3">
        <Header title="My Account" />
      </section>
      <section className="flex flex-wrap justify-between bg-gray-400/30 dark:bg-gray-800/70 shadow shadow-gray-400 dark:shadow-black rounded-lg p-3">
        <div className="flex gap-x-4">
          <div className="w-max h-max bg-gradient-to-b from-neutral-300 dark:from-neutral-600 to-sky-300 dark:to-sky-900 shadow-inner shadow-gray-400 dark:shadow-black rounded-full p-2">
            <UserRound className="w-16 h-16" />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold">
              {user ? user.username : "Guest"}
            </h1>
            <h2 className="text-neutral-700 dark:text-neutral-400">
              {user ? user.role : "guest user"}
            </h2>
          </div>
        </div>
        <Button variant="destructive" size="sm" disabled={user ? false : true}>
          Delete account
        </Button>
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
