import LoginForm from "@/components/auth/login-form";
import ActionButton from "@/components/commons/action-button";
import { Icons } from "@/components/commons/icons";

export default function LoginPage() {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      {/* <ActionButton
				className="absolute left-4 top-4 sm:top-8 sm:left-8"
				href="/"
				title="Back"
				name="chevronLeft"
			/> */}
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <Icons.logo className="mx-auto h-6 w-6" />
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome back
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your email to sign in your account
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
