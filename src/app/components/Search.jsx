"use client";
import React, { useContext, useEffect, useState } from "react";
import { formatText } from "./helpers/formatTextList.helper";
import AutoCompliteProvider, {
  AutoCompliteContext,
} from "./ContextDataAutoCompliteInput";
import { CiSearch } from "react-icons/ci";
import { AiOutlineReload } from "react-icons/ai";
import InputStyled from "./styled/InputStyled";
import { HiOutlineSwitchHorizontal } from "react-icons/hi";
import axios from "axios";
import reportsFormatedWithDate from "./helpers/reportsFormatedWithDate";
function Search({
  dataSearch,
  setDataSearch,
  setReports,
  data,
  handleRefresh,
  isChangeInput = false,
  setIsLoading = false,
  searchByOtherType = "",
}) {
  const { dataAutoComplite } = useContext(AutoCompliteContext);
  const [typeSearch, setChangeTypeSearch] = useState("text");
  const date = new Date();
  const todayDate =
    date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();
  const handleInput = (e) => {
    let text = e.target.value;
    if (!(e.target.name == "grupo" && searchByOtherType.length > 5)) {
      text = formatText(e.target.name, e.target.value);
    }
    setDataSearch({
      ...dataSearch,
      [e.target.name]: text,
    });
  };
  async function getReportsWithDate(fecha_min = "", fecha_max = "") {
    try {
      if (fecha_min.length == 0 || fecha_max.length == 0) {
        fecha_min = fecha_min.length == 0 ? fecha_max : fecha_min;
        fecha_max = fecha_min;
      }
      const response = await axios.post("/api/reports", {
        fecha_min,
        fecha_max,
      });
      if (response.status == 200) {
        const dataFormated = reportsFormatedWithDate(response.data);
        return dataFormated;
      }
    } catch (error) {}
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (dataSearch.fecha_min.length > 0 || dataSearch.fecha_max.length > 0) {
      setIsLoading(true);
      const dataFormated = await getReportsWithDate(
        dataSearch.fecha_min,
        dataSearch.fecha_max
      );
      if (dataFormated) {
        setReports(dataFormated);
      }
      /*if(dataFormated.length >0){
        }*/
      setIsLoading(false);
      return;
    }
    if (dataSearch.grupo.length == 0 && dataSearch.ciclo.length == 0) {
      setReports(data);
      return;
    }
    let newList = data.filter((item) => {
      if (
        item.ciclo.includes(dataSearch.ciclo) &&
        (item.grupo.includes(dataSearch.grupo) ||
          item.materia.includes(dataSearch.grupo))
      )
        return item;
    });
    setReports(newList);
  };
  const handleChangeTypeSearch = () => {
    setDataSearch({
      ...dataSearch,
      grupo: "",
      fecha_min: "",
      fecha_max: "",
    });
    setChangeTypeSearch(typeSearch == "text" ? "date" : "text");
  };

  return (
    <>
      <form
        className="flex justify-center gap-3 items-center flex-wrap bg-blue-600 p-4 rounded-xl shadow-lg flex-grow"
        onSubmit={handleSubmit}
      >
        {typeSearch == "date" ? null : (
          <div className="flex gap-2 items-center">
            <InputStyled
              type="search"
              placeholder="Ciclo"
              name="ciclo"
              value={dataSearch.ciclo}
              onChange={handleInput}
              list="options_ciclo"
              className="w-52"
            />
            <p>y</p>
          </div>
        )}

        <datalist id="options_ciclo">
          {dataAutoComplite.ciclo
            ? dataAutoComplite.ciclo.map((ciclo) => (
                <option value={ciclo.ciclo} key={ciclo.id_ciclo}></option>
              ))
            : null}
          reports
        </datalist>
        <div className="flex items-center gap-2">
          <InputStyled
            type={typeSearch}
            placeholder={searchByOtherType ? searchByOtherType : "Grupo"}
            name={typeSearch == "text" ? "grupo" : "fecha_min"}
            value={
              typeSearch == "text" ? dataSearch.grupo : dataSearch.fecha_min
            }
            onChange={handleInput}
            list="options_grupo"
            className="w-52"
            max={todayDate}
          />
          {typeSearch !== "date" ? null : (
            <div className="flex items-center gap-2 flex-wrap">
              <p>a</p>
              <InputStyled
                type="date"
                placeholder="Grupo"
                name="fecha_max"
                value={dataSearch.fecha_max}
                onChange={handleInput}
                list="options_grupo"
                className="w-52"
                max={todayDate}
              />
            </div>
          )}
        </div>
        <div
          className={`mr-4 hover:text-blue cursor-pointer ${
            isChangeInput ? "visible" : "hidden"
          }`}
        >
          <HiOutlineSwitchHorizontal
            size={20}
            onClick={handleChangeTypeSearch}
            className="cursor-pointer"
          />
        </div>
        <datalist id="options_grupo">
          {dataAutoComplite.grupo
            ? dataAutoComplite.grupo.map((grupo) => (
                <option value={grupo.grupo} key={grupo.id_grupo}></option>
              ))
            : null}
        </datalist>
        <button className="rounded border p-3 flex gap-1 items-center hover:text-purple transition-all">
          Buscar
          <CiSearch size={20} />
        </button>
      </form>
      <button
        onClick={handleRefresh}
        className="p-6 bg-blue-600 flex gap-2 items-center rounded-xl shadow-lg hover:text-purple  group transition-all flex-grow justify-center"
      >
        <span>Refrescar</span>
        <AiOutlineReload
          className="cursor-pointer  group-hover:rotate-45    transition-transform"
          size={20}
        />
      </button>
    </>
  );
}

export default Search;
