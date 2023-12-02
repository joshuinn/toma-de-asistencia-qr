"use client";
import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend);

const BACK_PURPLE = "rgba(130, 62, 241,0.5)";
const BACK_BLUE = "rgba(50, 116, 245,0.5)";
const BACK_GREEN = "rgba(79, 230, 228,0.5)";
const BACK_PINK = "rgba(237, 58, 152,0.5)";
const BACK_YELLOW = "rgba(247, 146, 17,0.5)";

const BORDER_PURPLE = "rgba(130, 62, 241,1)";
const BORDER_BLUE = "rgba(50, 116, 245,1)";
const BORDER_GREEN = "rgba(79, 230, 228,1)";
const BORDER_PINK = "rgba(237, 58, 152,1)";
const BORDER_YELLOW = "rgba(247, 146, 17,1)";


const allColors = [
  {
    backgroundColor: BACK_PINK,
    borderColor: BORDER_PINK,
  },
  {
    backgroundColor: BACK_BLUE,
    borderColor: BORDER_BLUE,
  },
  {
    backgroundColor: BACK_YELLOW,
    borderColor: BORDER_YELLOW,
  },
  {
    backgroundColor:BACK_GREEN,
    borderColor: BORDER_GREEN,
  },
  {
    backgroundColor: BACK_PURPLE,
    borderColor: BORDER_PURPLE,
  },
];
function getColor(color) {
  const colors = ["pink", "blue", "yellow", "green", "purple"];
  const indexColor = colors.findIndex((col) => color == col);
  const newColor = allColors[indexColor] ?? {
    backgroundColor: BACK_PURPLE,
    borderColor: BORDER_PURPLE,
  };
  return newColor;
}
const GenPieChart = ({ data, titleColor, mainColor, secondColor }) => {
  const newMainColor = getColor(mainColor);
  const newSecondColor = getColor(secondColor);
  const newTitleColor = getColor(titleColor);
  const chartData = {
    labels: ["Asistencia", "Inasistencia"],
    datasets: [
      {
        label: "Porcentaje",
        data: data,
        backgroundColor: [
          newMainColor.backgroundColor,
          newSecondColor.backgroundColor,
        ],
        borderColor: [newMainColor.borderColor, newSecondColor.borderColor],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="bg-blue-600 rounded-lg shadow-lg p-4 flex justify-evenly items-center h-72 mt-4">
      <div className="flex flex-col justify-around text-center h-full">
        <div>
          <h3 className="text-xl text-pink">Porcentaje de Asistencia total</h3>
        </div>
        <div>
          <p>
            Porcentaje de asitencia: <br />
            <span className="text-pink text-xl">{data[0]}%</span>
          </p>
          <p>
            Porcentaje de inasistencia: <br />
            <span className="text-purple text-xl">{data[1]}%</span>
          </p>
        </div>
      </div>
      <div className="h-60">
        <Pie data={chartData} />
      </div>
    </div>
  );
};
export default GenPieChart;
