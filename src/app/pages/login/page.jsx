import Loading from "@/app/components/Loading";
import dynamic from "next/dynamic";
//import LoginForm from "@/app/components/LoginForm";
import { Suspense } from "react";

const LoginForm = dynamic(() => import("@/app/components/LoginForm"));


function LoginPage() {
  return (
    <div className="flex flex-col justify-center items-center w-full h-screen bg-blue-700">
      <h1 className="text-[60px] font-extrabold text-white pl-10">
        Welcome!👋
      </h1>
      <Suspense fallback={<Loading />}>
        <LoginForm />
      </Suspense>
    </div>
  );
}

export default LoginPage;
