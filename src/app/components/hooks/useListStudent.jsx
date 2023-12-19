"use client";
import axios from "axios";
import { useEffect, useState } from "react";

async function useListStudent() {
  const [isLoading, setIsloading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    const getDataStudent = async () => {
      try {
        const { data } = await axios.post("/api/getStudents", list);
        setData(data);
      } catch (error) {}
    };
    getDataStudent();
  }, []);

  if (isLoading) {
    return isLoading;
  }
  return data;
}

export default useListStudent;
