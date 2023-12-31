import React, { useState } from "react";
import dollarSign from "../../../assets/dollorSign.svg";

function SalaryRangeInput({ setSalaryMin, setSalaryMax, min, max }) {
  const [salary_min, setSalaryMinLocal] = useState(min);
  const [salary_max, setSalaryMaxLocal] = useState(max);

  const handleMin = (event) => {
    setSalaryMinLocal(event.target.value);
    setSalaryMin(event.target.value);
  };
  const handleMax = (event) => {
    setSalaryMaxLocal(event.target.value);
    setSalaryMax(event.target.value);
  };

  return (
    <div className="flex items-center">
      <div className="relative">
        <img
          src={dollarSign}
          alt="Dollar Sign"
          className="absolute left-0 bottom-[12px] pl-3 flex items-center pointer-events-none w-[35px]"
        />
        <input
          className="w-[136px] h-[48px] pl-12 pr-4 text-[16px] font-[400] text-[#8E8E8E] border border-[#F48FB1] rounded-lg shadow-sm focus:outline-none focus:border-[[#F48FB1] focus:border-2"
          type="number"
          placeholder="min"
          maxLength="7"
          value={min}
          onChange={handleMin}
        />
      </div>
      <span className="mx-2">-</span>
      <div className="relative">
        <img
          src={dollarSign}
          alt="Dollar Sign"
          className="absolute left-0 bottom-[12px] pl-3 flex items-center pointer-events-none w-[35px]"
        />
        <input
          className="w-[136px] h-[48px] pl-12 pr-4 text-[16px] font-[400] text-[#8E8E8E] border border-[#F48FB1] rounded-lg shadow-sm focus:outline-none focus:border-[[#F48FB1] focus:border-2"
          type="number"
          placeholder="max"
          value={max}
          onChange={handleMax}
        />
      </div>
    </div>
  );
}

export default SalaryRangeInput;
