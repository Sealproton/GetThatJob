import category from '../../assets/pro2/category.svg';
import calendar from '../../assets/pro2/calendar.svg';
import money from '../../assets/pro2/money.svg';
import followOn from '../../assets/pro2/followOn.svg';
import followOff from '../../assets/pro2/followOff.svg';
import time from '../../assets/pro2/time.svg';
import applyicon from '../../assets/pro2/applyicon.svg';
import { Link, useNavigate } from 'react-router-dom';
import { usePro } from '../../contexts/Professional';
import { useAuth } from '../../contexts/Authorization';
import { useEffect } from 'react';
import { Button } from '@chakra-ui/button';
import { EmailIcon } from '@chakra-ui/icons';
import { useToast } from '@chakra-ui/react';
import axios from 'axios';

export const JobHeader = (props) => {
  const navigate = useNavigate();
  const { state } = useAuth();
  const {
    getJobFollowStatus,
    dayAgo,
    jobFollow,
    setJobFollow,
    updateJobFollowStatus,
    addJobProfessionalData,
  } = usePro();
  const {
    logo,
    company_name,
    job_title,
    job_type,
    job_category,
    salary_max,
    salary_min,
    job_created_at,
    job_id,
  } = props.data;

  useEffect(() => {
    getJobFollowStatus(state.userID, job_id);
  }, []);

  const handleChangeStatus = () => {
    if (jobFollow) {
      let data = {
        job_professional_id: jobFollow.job_professional_id,
        job_professional_follow: !jobFollow.job_user_following,
      };
      updateJobFollowStatus(data);
      setJobFollow({
        ...jobFollow,
        job_user_following: !jobFollow.job_user_following,
      });
    } else {
      let data = {
        userID: state.userID,
        job_id: job_id,
      };
      addJobProfessionalData(data);
      setJobFollow({ job_user_following: true });
    }
  };
  const toast = useToast();

  return (
    <div className='1280px'>
      {/*---------------------------------------------------------Company Logo Section-------------------------------------------*/}
      <section className="flex justify-between mt-[21.3344px]">
        <div className="flex  gap-[21.3344px]">
          <img src={logo} className="w-[98px] h-[98px]" />
          <div>
            <p className="text-[26px] font-[Montserrat]">{company_name}</p>
            <div
              className='flex items-center gap-[5.334px] w-[160.008px] hover:cursor-pointer mt-2'
              onClick={handleChangeStatus}
            >
              <img
                src={
                  jobFollow && jobFollow.job_user_following
                    ? followOn
                    : followOff
                }
                className='w-[53.336px] h-[53.336px]'
              />
              <p className=' text-[16px]  text-[#616161] font-[Inter] font-[400] tracking-[1.667px]'>
                {jobFollow && jobFollow.job_user_following
                  ? ' Following'
                  : 'Follow'}
              </p>
            </div>
          </div>
        </div>
        {props.page === 'jobDetail' ? (
          <Link to={`/apply/${job_id}`}>
            <button className='flex items-center justify-center gap-[10.667px] bg-[#F48FB1] hover:bg-[#de7b9c] w-[230.678px] h-[74.67px] py-[21.3344px] px-[26.668px] rounded-[21.3344px] transition-all duration-300'>
              <img src={applyicon} className='w-[32.0016px] h-[32.0016px]' />
              <p className='text-[16px] text-white font-[Inter] tracking-[1.667px] '>
                APPLY NOW
              </p>
            </button>
          </Link>
        ) : (
          <Button
            leftIcon={<EmailIcon />}
            _hover={{ bg: "#de7b9c" }}
            fontSize="1.2rem"
            color="white"
            bg="#F48FB1"
            display="flex"
            padding="2.5rem"
            gap="0.5rem"
            alignItems="center"
            rounded="23px"
            className="font-[Inter] tracking-[1.667px]"
            onClick={props.handle}
          >
            SEND APPLICATION
          </Button>
        )}
      </section>
      {/*------------------------------------------------------Job Title Section-----------------------------------------------*/}
      <section className="flex flex-col items-center mt-[13.334px]">
        <h1 className="text-[48px] text-[#373737] font-[400] font-[Montserrat] ">
          {job_title}
        </h1>
        <div className="flex gap-[5.334px]">
          <img src={time} className="w-[20.001px] h-[20.001px]" />
          <p className="text-[12.334px] font-[Inter] tracking-[2.001px] uppercase">
            posted {dayAgo(job_created_at)}
          </p>
        </div>
        {/*boxes div*/}
        <div className="flex gap-[42.669px] mt-[20.668px]">
          <div className="flex flex-col items-center justify-center min-w-[374.685px] px-[32px] h-[88px] border-[1.3334px] border-[#BF5F82] bg-white rounded-[10.667px] shadow-pro2">
            <p className="text-[18px] text-[#616161] font-[400] font-[Montserrat] tracking-[0.2001px]">
              Category
            </p>
            <div className="flex items-center gap-2 ">
              <img src={category} className="w-[32px] h-[32px]" />
              <p className="text-[26.0016px] text-[#373737] font-[400] font-[Montserrat] tracking-[0.15px]">
                {job_category}
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center w-[277.347px] h-[88px] px-[32px] border-[1.3334px] border-[#BF5F82] bg-white rounded-[10.667px] shadow-pro2">
            <p className="text-[18px] text-[#616161] font-[400] font-[Montserrat] tracking-[0.2001px]">
              Type
            </p>
            <div className="flex items-center gap-2 ">
              <img src={calendar} className="w-[32px] h-[32px]" />
              <p className="text-[26.0016px] text-[#373737] font-[400] font-[Montserrat] tracking-[0.15px]">
                {job_type}
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center min-w-[106.672px] h-[88px] w-auto px-[32px] border-[1.3334px] border-[#BF5F82] bg-white rounded-[10.667px] shadow-pro2">
            <p className="text-[18px] text-[#616161] font-[400] font-[Montserrat] tracking-[0.2001px]">
              Salary
            </p>
            <div className="flex items-center gap-2 ">
              <img src={money} className="w-[32px] h-[32px]" />
              <p className="text-[26.0016px] text-[#373737] font-[400] font-[Montserrat] tracking-[0.15px]">
                {salary_min} - {salary_max}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
