import React from 'react';
import "./App.css";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import ReactTooltip from "react-tooltip";

const App = () => {
  return (
    <div className="container">
      <h1>トレログ</h1>
    <div>
     <CalendarHeatmap
     //表示月
     startDate={new Date("2021-06-01")}
     endDate={new Date("2021-12-31")}

     values={[
       { date: "2021-09-30", count: 1 },
       // ...and so on
     ]}

     //color
     classForValue={(value) => {
       if (!value) {
        return "color-empty";
       }
       return `color-scale-${value.count}`;
     }}
     tooltipDateAttrs={(value) => {
       if (!value || !value.date) {
         return null;
       }
       // react-tooltipの構成
       return {
         "data-tip": `${value.date} has count: &{
           value.count
         }`,
       };
     }}
    />
    </div>
    <ReactTooltip />
    </div>
  );
};

export default App;