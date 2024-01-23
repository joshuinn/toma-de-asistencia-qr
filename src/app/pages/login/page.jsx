// Importar el componente LoginForm desde la ruta "@/app/components/LoginForm".
import LoginForm from "@/app/components/LoginForm";

// Definir el componente funcional LoginPage.
function LoginPage() {
  return (
    // Contenedor principal de la página de inicio de sesión.
    <div className="flex flex-col gap-2 justify-center items-center w-full h-screen bg-blue-700">

      {/* Título de bienvenida. */}
      <h1 className="text-[40px] text-center mb-3 sm:text-[60px] font-extrabold text-white pl-10 ">
        Welcome!👋
      </h1>

      {/* Utilizar el componente LoginForm para el formulario de inicio de sesión. */}
      <LoginForm />

    </div>
  );
}

// Exportar el componente LoginPage como componente predeterminado.
export default LoginPage;
