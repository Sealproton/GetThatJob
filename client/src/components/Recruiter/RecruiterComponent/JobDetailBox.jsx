import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  CloseJobButton,
  ClosedJobButton,
  formatNumber,
  formatDate,
} from "./Recruiter-1-2-Component";

function JobDetailBox(props) {
  const [item, setItem] = useState({ active: 0 });
  const data = props.datas;
  let minSalary = formatNumber(data.salary_min);
  minSalary = minSalary.replace(/\.0+/, ".0");
  let maxSalary = formatNumber(data.salary_max);
  maxSalary = maxSalary.replace(/\.0+/, ".0");
  const handleToggleActive = () => {
    let newActive = item.active === 1 ? 0 : 1;
    setItem({ ...item, active: newActive });
  };

  let mandatory = data.job_mandatory.split("`");
  let optional = data.job_optional.split("`");
  return (
    <div
      className={`flex flex-col w-[1258.72px] mt-[21.33px] justify-between items-start rounded-[8px] shadow-md group ${
        item.active === 1 ? `is-active bg-white` : `  bg-white duration-500`
      }`}
    >
      <div
        className={`flex flex-row w-full h-[100px] justify-between items-center rounded-[8px] duration-500`}
      >
        <div className="flex flex-col pl-[21.3px]">
          <p className="text-[21px] font-[Montserrat] font-medium">
            {data.job_title}
          </p>
          <div className="flex flex-row gap-3 text-[13px]">
            <div className="flex flex-row items-center">
              <svg
                width="15"
                height="16"
                viewBox="0 0 15 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="Group">
                  <path
                    id="Vector"
                    d="M6.25 6.81938V1.125L13.125 4.875V13.625H1.875V4.875L6.25 6.81938ZM7.5 3.23062V8.74312L3.125 6.79875V12.375H11.875V5.61688L7.5 3.23125V3.23062Z"
                    fill="#8E8E8E"
                  />
                </g>
              </svg>
              <p className="pl-[4px] text-[#8E8E8E]">{data.job_category}</p>
            </div>
            <div className="flex flex-row items-center">
              <svg
                width="15"
                height="16"
                viewBox="0 0 15 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="Group">
                  <path
                    id="Vector"
                    d="M10.625 2.375H13.125C13.2908 2.375 13.4497 2.44085 13.5669 2.55806C13.6842 2.67527 13.75 2.83424 13.75 3V13C13.75 13.1658 13.6842 13.3247 13.5669 13.4419C13.4497 13.5592 13.2908 13.625 13.125 13.625H1.875C1.70924 13.625 1.55027 13.5592 1.43306 13.4419C1.31585 13.3247 1.25 13.1658 1.25 13V3C1.25 2.83424 1.31585 2.67527 1.43306 2.55806C1.55027 2.44085 1.70924 2.375 1.875 2.375H4.375V1.125H5.625V2.375H9.375V1.125H10.625V2.375ZM12.5 7.375H2.5V12.375H12.5V7.375ZM9.375 3.625H5.625V4.875H4.375V3.625H2.5V6.125H12.5V3.625H10.625V4.875H9.375V3.625ZM3.75 8.625H5V9.875H3.75V8.625ZM6.875 8.625H8.125V9.875H6.875V8.625ZM10 8.625H11.25V9.875H10V8.625Z"
                    fill="#8E8E8E"
                  />
                </g>
              </svg>
              <p className="pl-[4px] text-[#8E8E8E]">{data.job_type}</p>
            </div>
            <div className="flex flex-row items-center">
              <svg
                width="15"
                height="16"
                viewBox="0 0 15 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="Group">
                  <path
                    id="Vector"
                    d="M7.5 14.25C4.04813 14.25 1.25 11.4519 1.25 8C1.25 4.54813 4.04813 1.75 7.5 1.75C10.9519 1.75 13.75 4.54813 13.75 8C13.75 11.4519 10.9519 14.25 7.5 14.25ZM7.5 13C8.82608 13 10.0979 12.4732 11.0355 11.5355C11.9732 10.5979 12.5 9.32608 12.5 8C12.5 6.67392 11.9732 5.40215 11.0355 4.46447C10.0979 3.52678 8.82608 3 7.5 3C6.17392 3 4.90215 3.52678 3.96447 4.46447C3.02678 5.40215 2.5 6.67392 2.5 8C2.5 9.32608 3.02678 10.5979 3.96447 11.5355C4.90215 12.4732 6.17392 13 7.5 13ZM5.3125 9.25H8.75C8.83288 9.25 8.91237 9.21708 8.97097 9.15847C9.02958 9.09987 9.0625 9.02038 9.0625 8.9375C9.0625 8.85462 9.02958 8.77513 8.97097 8.71653C8.91237 8.65792 8.83288 8.625 8.75 8.625H6.25C5.8356 8.625 5.43817 8.46038 5.14515 8.16735C4.85212 7.87433 4.6875 7.4769 4.6875 7.0625C4.6875 6.6481 4.85212 6.25067 5.14515 5.95765C5.43817 5.66462 5.8356 5.5 6.25 5.5H6.875V4.25H8.125V5.5H9.6875V6.75H6.25C6.16712 6.75 6.08763 6.78292 6.02903 6.84153C5.97042 6.90013 5.9375 6.97962 5.9375 7.0625C5.9375 7.14538 5.97042 7.22487 6.02903 7.28347C6.08763 7.34208 6.16712 7.375 6.25 7.375H8.75C9.1644 7.375 9.56183 7.53962 9.85485 7.83265C10.1479 8.12567 10.3125 8.5231 10.3125 8.9375C10.3125 9.3519 10.1479 9.74933 9.85485 10.0424C9.56183 10.3354 9.1644 10.5 8.75 10.5H8.125V11.75H6.875V10.5H5.3125V9.25Z"
                    fill="#8E8E8E"
                  />
                </g>
              </svg>
              <p className="pl-[4px] text-[#8E8E8E]">
                {minSalary}-{maxSalary}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center gap-5 text-center text-[#616161] text-[13px]">
          <div className="flex flex-col items-center justify-center gap-1">
            <svg
              width="16"
              height="15"
              viewBox="0 0 16 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="Group">
                <path
                  id="Vector"
                  d="M1.90188 4.2838L7.68125 0.818805C7.77839 0.760523 7.88953 0.729736 8.00281 0.729736C8.11609 0.729736 8.22724 0.760523 8.32438 0.818805L14.0981 4.28443C14.1445 4.31219 14.1828 4.35148 14.2094 4.39847C14.236 4.44546 14.25 4.49855 14.25 4.55255V12.5001C14.25 12.6658 14.1842 12.8248 14.0669 12.942C13.9497 13.0592 13.7908 13.1251 13.625 13.1251H2.375C2.20924 13.1251 2.05027 13.0592 1.93306 12.942C1.81585 12.8248 1.75 12.6658 1.75 12.5001V4.55193C1.74999 4.49792 1.76397 4.44484 1.79059 4.39785C1.81721 4.35085 1.85555 4.31156 1.90188 4.2838ZM3 5.08318V11.8751H13V5.08255L8.0025 2.08255L3 5.08255V5.08318ZM8.0375 8.56131L11.3475 5.77193L12.1525 6.72818L8.04625 10.1888L3.8525 6.73256L4.6475 5.76755L8.0375 8.56131Z"
                  fill="#616161"
                />
              </g>
            </svg>
            <p>
              Open on
              <br />
              {formatDate(data.created_at)}
            </p>
          </div>
          <div className="flex flex-col text-[#616161]">
            <div className="flex flex-row items-center justify-center gap-1">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="Group">
                  <path
                    id="Vector"
                    d="M8 14.25C4.54813 14.25 1.75 11.4519 1.75 8C1.75 4.54813 4.54813 1.75 8 1.75C11.4519 1.75 14.25 4.54813 14.25 8C14.25 11.4519 11.4519 14.25 8 14.25ZM4.88313 11.91C5.76784 12.6173 6.8673 13.0018 8 13C9.23125 13 10.3581 12.555 11.2294 11.8175C10.8223 11.3998 10.3357 11.0681 9.79815 10.8418C9.26064 10.6155 8.6832 10.4992 8.1 10.5C7.49537 10.4993 6.89719 10.6243 6.34342 10.867C5.78964 11.1097 5.29236 11.4649 4.88313 11.91ZM4.01 11.0125C4.53528 10.455 5.16917 10.0111 5.87259 9.70795C6.576 9.40483 7.33405 9.24897 8.1 9.25C8.83853 9.24904 9.56998 9.39398 10.2523 9.67649C10.9347 9.959 11.5545 10.3735 12.0763 10.8963C12.6113 10.1432 12.9273 9.25665 12.9891 8.33495C13.0509 7.41324 12.8562 6.49243 12.4266 5.67466C11.9969 4.85689 11.3491 4.17414 10.555 3.70215C9.76088 3.23017 8.85155 2.9874 7.92788 3.00078C7.0042 3.01417 6.10229 3.28318 5.3222 3.77797C4.54211 4.27277 3.91435 4.974 3.50856 5.80388C3.10277 6.63375 2.93481 7.55982 3.02332 8.47934C3.11184 9.39887 3.45336 10.2759 4.01 11.0131V11.0125ZM8 8.625C7.33696 8.625 6.70107 8.36161 6.23223 7.89277C5.76339 7.42393 5.5 6.78804 5.5 6.125C5.5 5.46196 5.76339 4.82607 6.23223 4.35723C6.70107 3.88839 7.33696 3.625 8 3.625C8.66304 3.625 9.29893 3.88839 9.76777 4.35723C10.2366 4.82607 10.5 5.46196 10.5 6.125C10.5 6.78804 10.2366 7.42393 9.76777 7.89277C9.29893 8.36161 8.66304 8.625 8 8.625ZM8 7.375C8.33152 7.375 8.64946 7.2433 8.88388 7.00888C9.1183 6.77446 9.25 6.45652 9.25 6.125C9.25 5.79348 9.1183 5.47554 8.88388 5.24112C8.64946 5.0067 8.33152 4.875 8 4.875C7.66848 4.875 7.35054 5.0067 7.11612 5.24112C6.8817 5.47554 6.75 5.79348 6.75 6.125C6.75 6.45652 6.8817 6.77446 7.11612 7.00888C7.35054 7.2433 7.66848 7.375 8 7.375Z"
                    fill="#616161"
                  />
                </g>
              </svg>
              <p>{data.total_candidate}</p>
            </div>
            <p>
              Total
              <br />
              Candidates
            </p>
          </div>
          <div className="flex flex-col text-[#F48FB1]">
            <div className="flex flex-row items-center justify-center gap-1">
              <p>{data.candidate_on_track}</p>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="Group">
                  <path
                    id="Vector"
                    d="M8 14.25C4.54813 14.25 1.75 11.4519 1.75 8C1.75 4.54813 4.54813 1.75 8 1.75C11.4519 1.75 14.25 4.54813 14.25 8C14.25 11.4519 11.4519 14.25 8 14.25ZM4.88313 11.91C5.76784 12.6173 6.8673 13.0018 8 13C9.23125 13 10.3581 12.555 11.2294 11.8175C10.8223 11.3998 10.3357 11.0681 9.79815 10.8418C9.26064 10.6155 8.6832 10.4992 8.1 10.5C7.49537 10.4993 6.89719 10.6243 6.34342 10.867C5.78964 11.1097 5.29236 11.4649 4.88313 11.91ZM4.01 11.0125C4.53528 10.455 5.16917 10.0111 5.87259 9.70795C6.576 9.40483 7.33405 9.24897 8.1 9.25C8.83853 9.24904 9.56998 9.39398 10.2523 9.67649C10.9347 9.959 11.5545 10.3735 12.0763 10.8963C12.6113 10.1432 12.9273 9.25665 12.9891 8.33495C13.0509 7.41324 12.8562 6.49243 12.4266 5.67466C11.9969 4.85689 11.3491 4.17414 10.555 3.70215C9.76088 3.23017 8.85155 2.9874 7.92788 3.00078C7.0042 3.01417 6.10229 3.28318 5.3222 3.77797C4.54211 4.27277 3.91435 4.974 3.50856 5.80388C3.10277 6.63375 2.93481 7.55982 3.02332 8.47934C3.11184 9.39887 3.45336 10.2759 4.01 11.0131V11.0125ZM8 8.625C7.33696 8.625 6.70107 8.36161 6.23223 7.89277C5.76339 7.42393 5.5 6.78804 5.5 6.125C5.5 5.46196 5.76339 4.82607 6.23223 4.35723C6.70107 3.88839 7.33696 3.625 8 3.625C8.66304 3.625 9.29893 3.88839 9.76777 4.35723C10.2366 4.82607 10.5 5.46196 10.5 6.125C10.5 6.78804 10.2366 7.42393 9.76777 7.89277C9.29893 8.36161 8.66304 8.625 8 8.625ZM8 7.375C8.33152 7.375 8.64946 7.2433 8.88388 7.00888C9.1183 6.77446 9.25 6.45652 9.25 6.125C9.25 5.79348 9.1183 5.47554 8.88388 5.24112C8.64946 5.0067 8.33152 4.875 8 4.875C7.66848 4.875 7.35054 5.0067 7.11612 5.24112C6.8817 5.47554 6.75 5.79348 6.75 6.125C6.75 6.45652 6.8817 6.77446 7.11612 7.00888C7.35054 7.2433 7.66848 7.375 8 7.375Z"
                    fill="#F48FB1"
                  />
                </g>
              </svg>
            </div>
            <p>
              Candidates
              <br />
              on track
            </p>
          </div>
        </div>
        <div className="flex flex-row items-center gap-4 mr-[74.67px]">
          <Link to={`/showjobposting/${data.job_id}`}>
            <button className="flex flex-row items-center justify-center w-[149.34px] h-[53.33px] text-[15px] gap-3">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="Group">
                  <path
                    id="Vector"
                    d="M18.031 16.617L22.314 20.899L20.899 22.314L16.617 18.031C15.0237 19.3082 13.042 20.0029 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20.0029 13.042 19.3082 15.0237 18.031 16.617ZM16.025 15.875C17.2941 14.5699 18.0029 12.8204 18 11C18 7.132 14.867 4 11 4C7.132 4 4 7.132 4 11C4 14.867 7.132 18 11 18C12.8204 18.0029 14.5699 17.2941 15.875 16.025L16.025 15.875Z"
                    fill="#616161"
                  />
                </g>
              </svg>
              SHOW
            </button>
          </Link>
          {data.job_status === "track" && (
            <CloseJobButton
              mark={data.job_id}
              refreshData={props.refreshData}
            />
          )}
          {data.job_status === "closed" && <ClosedJobButton />}
          <Link to={`/editjob/${data.job_id}`}><button className="flex flex-row items-center justify-center bg-[#F48FB1] w-[154.67px] h-[53.36px] gap-2 text-white rounded-[21.33px] text-[15px] hover:bg-[#bf5f82] duration-200">
            EDIT
          </button></Link>
        
        </div>
      </div>
      <div className="flex flex-row items-between w-full">
        <div className="overflow-hidden max-h-0 w-full group-[.is-active]:max-h-[600px] duration-500 ml-[30px] mr-[30px] mb-[10px] text-[14px]">
          <div className="mt-[16px]">
            <p className="text-[#BF5F82] text-[14px] font-[Montserrat]">
              About the job position
            </p>
            <p className="mt-[10.66px]">{data.job_position}</p>
          </div>
          <div className="mt-[16px]">
            <p className="text-[#BF5F82] text-[14px] font-[Montserrat]">
              Mandatory Requirements
            </p>
            <ul style={{ listStyleType: 'none' }}>
            {mandatory.map((item, key) => {
              return (
                <li key={key} className="mt-[10.66px] ">
                  - {item}
                </li>
              );
            })}
            </ul>
          </div>
          <div className="mt-[16px] pb-[16px]">
            <p className="text-[#BF5F82] text-[14px] font-[Montserrat]">
              Optional Requirements
            </p>
            <ul style={{ listStyleType: 'none' }}>
            {optional.map((item, key) => {
              return (
                <li key={key} className="mt-[10.66px]">
                  - {item}
                </li>
              );
            })}
            </ul>
          </div>
        </div>
        <div className="flex items-end h-full relative bg-slate-500">
          <div
            className="flex flex-col justify-end items-end cursor-pointer group-[.is-active]:rotate-[180deg] duration-500 mr-[21.33px] absolute bottom-6 right-1"
            onClick={handleToggleActive}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="Group">
                <path
                  id="Vector"
                  d="M12 13.172L16.95 8.22205L18.364 9.63605L12 16L5.636 9.63605L7.05 8.22205L12 13.172Z"
                  fill="#616161"
                />
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobDetailBox;
