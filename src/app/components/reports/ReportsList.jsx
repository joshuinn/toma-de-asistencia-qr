"use client";
import { useContext } from "react";
import { FaListCheck } from "react-icons/fa6";
import GenPDFReport from "./GenPDFReport";
import GenExcelReport from "./GenExcelReport";
import ButtonStyled from "../styled/ButtonStyled";
import Search from "../search/Search";
import AutoCompliteProvider from "../context/ContextDataAutoCompliteInput";
import { ReportListContext } from "../assistance/ListReportsContext";
import TableGroups from "../TableGroups";

function ReportsList() {
  const reports = useContext(ReportListContext);
  const selectAll = () => {
    reports.setGroups((prev) =>
      prev.map((report) => ({ ...report, checked: true }))
    );
  };
  return (
    <div className="h-[85vh] p-4 m-[-4px] ">
      <div className="flex items-center gap-4 flex-wrap">
        <AutoCompliteProvider>
            <Search isChangeInput />
        </AutoCompliteProvider>
        <div className="flex flex-grow flex-wrap justify-center gap-10 mt-2 bg-blue-600 p-3 rounded-lg shadow-lg">
          <ButtonStyled
            color="purple"
            onClick={selectAll}
            disabled={!reports.groups.length > 0}
          >
            <span>Seleccionar Todo</span>
            <FaListCheck size={20} />
          </ButtonStyled>

          <GenPDFReport
            fecha_min={reports.dataSearch.fecha_min}
            fecha_max={reports.dataSearch.fecha_max}
          />
          <GenExcelReport
            fecha_min={reports.dataSearch.fecha_min}
            fecha_max={reports.dataSearch.fecha_max}
          />
        </div>
      </div>
      <div className="w-full h-4/6 sm:h-[65vh] 2xl:h-[80vh] mt-5 shadow-lg">
        <TableGroups colorHeaders="blue" />
      </div>
    </div>
  );
}

export default ReportsList;
