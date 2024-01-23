// Importa las dependencias necesarias.
"use client";
import React, { Suspense, useContext } from "react";
import { BiListCheck } from "react-icons/bi";
import Loading from "./Loading";
import Link from "next/link";
import ButtonStyled from "./styled/ButtonStyled";
import loadingIndividual from "./assistance/LoadingIndividual.module.css";
import { ReportListContext } from "./assistance/ListReportsContext";
import style from "./reports/ReportsList.module.css";

// Componente funcional para la tabla de grupos.
function TableGroups({ colorHeaders, typeSelect = "check" }) {
  // Obtiene el contexto de la lista de informes.
  const reports = useContext(ReportListContext);

  // Manejador para cargar/unload la lista.
  const handleLoad = (id_lista_asistencia) => {
    reports.setGroups((prev) =>
      prev.map((report) =>
        report.id_lista_asistencia === id_lista_asistencia
          ? { ...report, loading: !report.loading }
          : report
      )
    );
  };

  // Renderiza el componente principal.
  return (
    <div className="h-full overflow-y-scroll ">
      {/* Tabla de grupos */}
      <table className="table-fixed table h-full bg-blue-800 rounded-lg p-2 shadow-xl text-white w-full border-collapse text-center">
        <thead className={`text-${colorHeaders}`}>
          <tr>
            <th className="w-20 p-3 hidden sm:table-cell">
              <h3 className="text-xl font-bold ">Ciclo</h3>
            </th>
            {/* ... (más encabezados) */}
            <th className="p-3">
              <h3 className="text-xl font-bold">Tomar lista</h3>
            </th>
          </tr>
        </thead>
        <tbody className=" p-2 relative">
          {/* Renderiza el contenido condicionalmente según la carga de datos */}
          {reports.isLoading ? (
            <tr>
              <td className="absolute h-full w-full">
                <Loading />
              </td>
            </tr>
          ) : (
            <Suspense fallback={<Loading />}>
              {!reports.groups ? (
                <tr></tr>
              ) : reports.groups.length > 0 ? (
                reports.groups.map((item, i) => (
                  <tr
                    key={item.id_lista_asistencia}
                    className={` p-2 ${i % 2 == 0 ? "bg-blue-700" : ""}`}
                  >
                    {/* ... (celdas de datos) */}
                    {typeSelect == "check" ? (
                      <td>
                        {/* Caja de verificación */}
                        <div className={"p-2 " + style.checkboxWrapper}>
                          <input
                            type="checkbox"
                            id={item.id_lista_asistencia}
                            checked={
                              item.checked == undefined ? false : item.checked
                            }
                            onChange={() => {
                              reports.handleCheked(item.id_lista_asistencia);
                            }}
                          />
                          <label
                            className={style.checkInput}
                            htmlFor={item.id_lista_asistencia}
                          ></label>
                        </div>
                      </td>
                    ) : (
                      <td className="h-full p-3 flex justify-center items-center">
                        {/* Botón para tomar lista */}
                        <ButtonStyled
                          onClick={() => handleLoad(item.id_lista_asistencia)}
                          className={`p-[3px] flex-wrap ${
                            item.loading ? "bg-opacity-0" : ""
                          }`}
                          color={i % 2 == 0 ? "purple" : "blue"}
                        >
                          <Link
                            href={`/pages/assistence/${item.id_lista_asistencia}`}
                            shallow
                          >
                            {item.loading ? (
                              // Indicador de carga
                              <div className="w-32">
                                <div className={loadingIndividual.loader}></div>
                              </div>
                            ) : (
                              // Contenido normal
                              <div className="flex justify-center items-center w-32 gap-2">
                                <span>Tomar lista</span>
                                <BiListCheck size={25} />
                              </div>
                            )}
                          </Link>
                        </ButtonStyled>
                      </td>
                    )}
                  </tr>
                ))
              ) : (
                // Mensaje cuando no hay elementos
                <tr className="absolute w-full h-full text-center flex justify-center items-center">
                  <td>
                    <div>
                      <h3 className="font-bold text-2xl">No hay elementos</h3>
                    </div>
                  </td>
                </tr>
              )}
            </Suspense>
          )}
        </tbody>
      </table>
    </div>
  );
}

// Exporta el componente principal.
export default TableGroups;
