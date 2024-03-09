"use client";
import dynamic from "next/dynamic";
const ItemsChart = dynamic(() => import("@/components/dashboard/ItemsChart"), {
  ssr: false,
});
import { getDashboardData } from "@/services/api";
import { useDashboardData } from "@/services/queries";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CategoryChart from "@/components/dashboard/CateGoryChart";
import ProfitChart from "@/components/dashboard/ProfitChart";

export default function Home() {
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);

  //  function to convert single digit to double digit for time
  function padTo2Digits(num) {
    return num.toString().padStart(2, "0");
  }

  //   function to convert date to string
  function convertDate(date) {
    let month = padTo2Digits(date.getMonth() + 1);
    let day = padTo2Digits(date.getDate());
    let year = date.getFullYear();
    return `${year}-${month}-${day}`;
  }

  async function getData() {
    setIsLoading(true);
    let data = await getDashboardData({
      from: convertDate(fromDate),
      to: convertDate(toDate),
    });
    // console.log(data);
    setData(data);
    setIsLoading(false);
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-10 ">
        <div className="space-x-5   flex items-center ">
          <p className="text-primary w-[50px]  ">From</p>
          <DatePicker
            className="bg-secondary px-2 py-2 rounded-sm max-w-[120px]"
            selected={fromDate}
            onChange={(fromDate) => setFromDate(fromDate)}
          />
        </div>
        <div className="space-x-5 flex items-center ">
          <p className="text-primary w-[50px] ">To</p>
          <DatePicker
            className="bg-secondary px-2 py-2 rounded-sm max-w-[120px]"
            selected={toDate}
            onChange={(toDate) => setToDate(toDate)}
          />
        </div>
      </div>
      <div className=" mt-5">
        <button
          disabled={isLoading}
          onClick={() => getData()}
          className="bg-primary text-white font-semibold px-2 py-1 rounded"
        >
          {isLoading ? "Loading..." : "Get Data"}
        </button>
      </div>

      {data && (
        <div className="my-10">
          <div className="flex items-center justify-between text-primary border-b border-primary pb-1">
            <p>Total Expense : {data.totalExpense + " ₹"}</p>
            <p>Total Revenue : {data.totalRevenue + " ₹"}</p>
            <p>Total Profit : {data.totalRevenue - data.totalExpense + " ₹"}</p>
          </div>
          {<ItemsChart itemsChart={data.itemsChart} />}
          {<CategoryChart categoryChart={data.categoryChart} />}
          {<ProfitChart profitChart={data.profitChart} />}
        </div>
      )}
    </div>
  );
}
