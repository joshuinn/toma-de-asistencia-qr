// Importar el icono FaCheckCircle de react-icons.
import { FaCheckCircle } from "react-icons/fa";

// Definir el componente funcional CardAlertScanner.
function CardAlertScanner({ onClick, color, children }) {
  // El componente acepta tres propiedades:
  // - onClick: Función que se ejecutará cuando se haga clic en el botón.
  // - color: Color del texto en el botón (se usa para la clase de texto).
  // - children: Contenido del componente, que puede ser cualquier cosa que se desee renderizar dentro del botón.

  // Renderizar el botón de alerta con estilos condicionales basados en las propiedades proporcionadas.
  return (
    <button
      onClick={onClick} // Asignar la función onClick al evento de clic del botón.
      className={`absolute top-0 right-0 m-5 bg-blue-800 shadow-2xl p-4 rounded-lg flex flex-col items-center justify-center gap-2 text-${color} w-60 h-28`}
    >
      {children} {/* Renderizar el contenido del componente (puede ser texto, otros componentes, etc.). */}
    </button>
  );
}

// Exportar el componente CardAlertScanner como componente predeterminado.
export default CardAlertScanner;
