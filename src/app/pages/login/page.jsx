import LoginForm from "@/app/components/LoginForm";

function LoginPage() {
  return (
    <div className="flex flex-col gap-2 justify-center items-center w-full h-screen bg-blue-700">
      <h1 className="text-[40px] text-center mb-3 sm:text-[60px] font-extrabold text-white pl-10 ">
        Welcome!👋
      </h1>
      <LoginForm />
    </div>
  );
}

export default LoginPage;
