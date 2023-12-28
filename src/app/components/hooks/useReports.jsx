"use client";
import axios from "axios";
import { useEffect, useState } from "react";

function useReports() {
  const [isLoading, setIsLoading] = useState(true);
  const [groups, setGroups] = useState([]);
  const [data, setData] = useState([]);
  const [refreshGroups, setRefreshGroups] = useState(false);
  const [listToExport, setListToExport] = useState([]);
  const [dataSearch, setDataSearch] = useState({
    ciclo: "",
    grupo: "",
    fecha_min:"",
    fecha_max:""
  });
  useEffect(() => {
    const getGroup = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("/api/groups");
        setGroups(response.data);
        setData(response.data);
      } catch (e) {
        console.log(e);
      } 
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 500);
      return () => clearTimeout(timer);
    };
    getGroup();
  }, [refreshGroups]);
  const handleRefreshGroups = () => {
    setRefreshGroups(!refreshGroups);
    setDataSearch({
      ciclo: "",
      grupo: "",
    });
  };
  const handleSearch = (e) => {
    e.preventDefault();
    if (dataSearch.grupo.length == 0 && dataSearch.ciclo.length == 0) {
      setGroups(data);
      return;
    }
    let newList = data.filter((item) => {
      if (
        item.ciclo.includes(dataSearch.ciclo) &&
        item.grupo.includes(dataSearch.grupo)
      )
        return item;
    });
    setGroups(newList);
  };
  const handleCheked = (id_lista_asistencia) => {
    setGroups((prev) =>
      prev.map((report) =>
        report.id_lista_asistencia == id_lista_asistencia
          ? { ...report, checked: !report.checked }
          : report
      )
    );
  };
  useEffect(() => {
    setListToExport(
      groups.filter((report) => (report.checked ? report : null))
    );
  }, [groups]);
  return {
    isLoading,
    groups,
    handleRefreshGroups,
    handleSearch,
    data,
    setGroups,
    dataSearch,
    setDataSearch,
    listToExport,
    handleCheked
  };
}

export default useReports;
