import Header from "@/app/components/Header";
import ChangePass from '@/app/components/ChangePass'
function page() {
  return (
    <>
      <Header title="Mi cuenta" />
      <div className="text-white flex flex-col justify-center items-center gap-4">
        <div className="flex gap-3 bg-blue-600 rounded-lg p-3 items-center w-1/2 justify-center shadow-lg">
          <label htmlFor="nombre">Mi nombre</label>
          <input
            type="text"
            placeholder="nombre"
            id="nombre"
            className="rounded-full bg-blue-800 p-3"
            disabled
          />
        </div>
        <div className="flex gap-3 bg-blue-600 rounded-lg p-3 items-center w-1/2 justify-center shadow-lg">
          <label htmlFor="boleta">Boleta</label>
          <input
            type="text"
            placeholder="Boleta"
            id="boleta"
            className="rounded-full bg-blue-800 p-3"
            disabled
          />
        </div>
        <div className="flex gap-3 bg-blue-600 rounded-lg p-3 items-center w-1/2 justify-center shadow-lg">
          <label htmlFor="correo">Correo</label>
          <input
            type="text"
            placeholder="Correo"
            id="correo"
            className="rounded-full bg-blue-800 p-3"
            disabled
          />
        </div>
        <ChangePass />
      </div>
    </>
  );
}

export default page;
