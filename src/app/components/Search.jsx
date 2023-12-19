"use client";
import React, { useContext, useEffect, useState } from "react";
import { formatText } from "./formatTextList.helper";
import { AutoCompliteContext } from "./ContextDataAutoCompliteInput";
import { CiSearch } from "react-icons/ci";
import { AiOutlineReload } from "react-icons/ai";
import InputStyled from "./styled/InputStyled";
import ButtonStyled from "./styled/ButtonStyled";
import { HiOutlineSwitchHorizontal } from "react-icons/hi";
function Search({
  dataSearch,
  setDataSearch,
  setReports,
  data,
  handleRefresh,
  isChangeInput = false,
}) {
  const { dataAutoComplite } = useContext(AutoCompliteContext);
  const [changeTypeSearch, setChangeTypeSearch] = useState(false);

  const handleInput = (e) => {
    const text = formatText(e.target.name, e.target.value);
    setDataSearch({
      ...dataSearch,
      [e.target.name]: text,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (dataSearch.grupo.length == 0 && dataSearch.ciclo.length == 0) {
      setReports(data);
      return;
    }
    let newList = data.filter((item) => {
      if (
        item.ciclo.includes(dataSearch.ciclo) &&
      (item.grupo.includes(dataSearch.grupo))
      )
        return item;
    });
    setReports(newList);
  };
  const handleChangeTypeSearch = () => {
    setChangeTypeSearch(!changeTypeSearch);
  };

  return (
    <>
      <form
        className="flex justify-center gap-3 items-center flex-wrap bg-blue-600 p-4 rounded-xl shadow-lg"
        onSubmit={handleSubmit}
      >
        <div className="flex gap-2 items-center">
          <label>Ciclo</label>
          <InputStyled
            type="search"
            placeholder="Ciclo"
            name="ciclo"
            value={dataSearch.ciclo}
            onChange={handleInput}
            list="options_ciclo"
          />
        </div>

        <datalist id="options_ciclo">
          {dataAutoComplite.ciclo
            ? dataAutoComplite.ciclo.map((ciclo) => (
                <option value={ciclo.ciclo} key={ciclo.id_ciclo}></option>
              ))
            : null}
        </datalist>
        <div className="flex items-center gap-2">
        <p>y</p>
        <label>Grupo</label>
        <InputStyled
          type={changeTypeSearch ? "date" : "text"}
          placeholder="Grupo"
          name="grupo"
          value={dataSearch.grupo}
          onChange={handleInput}
          list="options_grupo"
          />
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
        className="p-6 bg-blue-600 flex gap-2 items-center rounded-xl shadow-lg hover:text-purple  group transition-all"
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
