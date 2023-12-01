"use client";
import GenPieChart from "./GenPieChart";
const someData = [30, 50];
function Chart() {
  return (
    <div className="h-[calc(100vh-4rem)] overflow-y-scroll shadow-lg">
      <GenPieChart
        data={someData}
        mainColor="pink"
        secondColor="purple"
        titleColor="green"
      />
      <GenPieChart
        data={[2,10]}
        mainColor="yellow"
        secondColor="blue"
        titleColor="green"
      />
      <GenPieChart
        data={[70,30]}
        mainColor="green"
        secondColor="purple"
        titleColor="green"
      />
    </div>
  );
}

export default Chart;
