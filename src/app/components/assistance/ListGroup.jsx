"use client";
import NewList from "./NewList";
import Search from "../Search";
import AutoCompliteProvider from "../ContextDataAutoCompliteInput";
import TableGroups from "../TableGroups";
import ReportListProvider from "./ListReportsContext";

export default function ListGroup() {
  
  return (
    <ReportListProvider>
      <div className="flex flex-col gap-3 h-[calc(100vh-5rem)] ">
        <AutoCompliteProvider>
          <div className="flex justify-between text-white items-center flex-wrap gap-2">
            <Search />
            <div className="flex items-center">
              <NewList />
            </div>
          </div>
        </AutoCompliteProvider>
        <div className="w-full sm:h-[78vh] 2xl:h-[80vh]">
          <TableGroups colorHeaders="purple" typeSelect="takeList" />
        </div>
      </div>
    </ReportListProvider>
  );
}
