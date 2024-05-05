import { useState } from "react";
import { UserRound } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import AngrySvg from "@/assets/angry.svg";
import { Button } from "@/components/ui/button";
import { SignupDialog } from "@/components/dialog/signup-dialog";
import { LoginDialog } from "@/components/dialog/login-dialog";

export default function ProfilePage() {
  const [signupState, setSignupState] = useState(false);
  const [loginState, setLoginState] = useState(false);

  const closeSignupModal = () => setSignupState(false);
  const closeLoginModal = () => setLoginState(false);

  return (
    <div className="w-full bg-white/70 dark:bg-white/25 backdrop-blur-lg rounded-2xl p-4 space-y-5">
      <section className="w-full flex justify-between gap-x-4 border-b-2 border-sky-400 pb-3">
        <Header title="My Account" />
      </section>
      <section className="flex gap-x-5 bg-gray-400/30 dark:bg-gray-800/70 rounded-lg p-3">
        <div className="w-max h-max rounded-full outline outline-4 outline-sky-500 p-2">
          <UserRound className="w-16 h-16" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Guest</h1>
          <h2 className="text-neutral-700 dark:text-neutral-400">
            example@example.com
          </h2>
        </div>
      </section>
      <section className="w-full flex flex-col justify-center items-center space-y-4 pt-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold">Don't have account?</h1>
          <p className="text-neutral-700 dark:text-neutral-300">
            Please ( login / sign up ) to get full access!
          </p>
        </div>
        <img src={AngrySvg} alt="angry" className="w-52 h-52" />
        <div className="flex items-center gap-x-3">
          <Button onClick={() => setLoginState(true)}>LOGIN</Button>
          <p>OR</p>
          <Button
            className="bg-sky-700 dark:bg-gray-900 dark:text-white"
            onClick={() => setSignupState(true)}
          >
            SIGN UP
          </Button>
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
