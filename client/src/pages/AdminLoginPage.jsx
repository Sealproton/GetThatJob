import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/Authorization';
import Navbar from '../components/navbar';
import { Spinner } from '@chakra-ui/react';
import { Otp } from '../components/Login/Otp';
import ChangePass from '../components/Login/ChangePass';
import { ResetSuccess } from '../components/Login/ResetSuccess';
import React from 'react';
import {
  Input,
  InputGroup,
  InputRightElement,
  useToast,
} from '@chakra-ui/react';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
function AdminLoginPage() {
  const toast = useToast();
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading, loginResult, setLoginResult } = useAuth();
  const [page, setPage] = useState('login');
  const handleSubmit = (event) => {
    event.preventDefault();
    login({
      email,
      password,
      userType: 'ADMIN',
    });
  };

  useEffect(() => {
    if (loginResult) {
      if (loginResult === 401) {
        toast({
          title: 'Invalid Password.',
          description: 'Please check your password.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
        setLoginResult(null);
      } else if (loginResult === 404) {
        toast({
          title: 'Invalid email.',
          description: 'Please check your email.',
          status: 'error',
          duration: 2000,
          isClosable: true,
        });
        setLoginResult(null);
      } else {
        toast({
          title: 'Something wrong.',
          description: 'Please try again late.',
          status: 'error',
          duration: 2000,
          isClosable: true,
        });
        setLoginResult(null);
      }
    }
  }, [loginResult]);
  return (
    <div className='relative'>
      {loading && (
        <div className='absolute z-50 w-screen h-screen opacity-80 bg-white flex justify-center items-center'>
          <Spinner
            thickness='4px'
            speed='0.65s'
            emptyColor='gray.200'
            color='#F48FB1'
            size='xl'
          />
        </div>
      )}
      <Navbar />
      {page === 'otp' && <Otp props={{ setEmail, email, setPage }} />}
      {page === 'changePass' && <ChangePass email={email} setPage={setPage} />}
      {page === 'resetSuccess' && <ResetSuccess setPage={setPage} />}
      {page === 'login' && (
        <div className='flex flex-row justify-center items-start bg-[#F5F5F6] w-srceen h-screen gap-[60px] pt-[80px]'>
          <form
            className='flex flex-col  ml-[150px] mr-[60px]'
            onSubmit={handleSubmit}
          >
            <h1 className='text-[48px] font-[Montserrat] font-[400] text-[#373737] mb-2 text-center'>
              Welcome to Admin Page
            </h1>
            <h2 className='text-[20px] font-[Montserrat] font-[500] text-[#373737] mt-2 mb-4 text-center'>
              Login as Admin....
            </h2>
            <div className='flex flex-col w-full justify-center items-center'>
              <div>
                <label>
                  <p className='text-[10px] font-[Inter] font-[400] text-[#373737]'>
                    EMAIL
                  </p>
                  <input
                    id='email'
                    name='email'
                    type='email'
                    placeholder='some.user@mail.com'
                    onChange={(event) => {
                      setEmail(event.target.value);
                    }}
                    value={email}
                    className='border-[1px] border-[#F48FB1] rounded-[8px] w-[356px] h-[36px] flex flex-col justify-center text-[14px] p-[8px] font-[Inter] font-[400] text-[#8E8E8E]'
                  />
                </label>
              </div>
              <div className='w-[60%] mt-2'>
                <label>
                  <p className='text-[10px] font-[Inter] font-[400] text-[#373737]'>
                    PASSWORD
                  </p>
                  <InputGroup>
                    <Input
                      bg='#FFFFFF'
                      border='1px'
                      borderColor='#F48FB1'
                      rounded='8px'
                      width='356px'
                      height='36px'
                      color='#8E8E8E'
                      fontStyle='Inter'
                      fontWeight='400'
                      fontSize='14px'
                      padding='8px'
                      id='password'
                      name='password'
                      type={show ? 'text' : 'password'}
                      placeholder='******'
                      onChange={(event) => {
                        setPassword(event.target.value);
                      }}
                    />
                    <InputRightElement paddingRight='4px' paddingBottom='4px'>
                      <div
                        className='h-[30px] w-[30px] bg-[#FFFFFF] flex flex-row justify-center items-center'
                        onClick={handleClick}
                      >
                        {show ? (
                          <div className='h-[30px] w-[30px] flex flex-row justify-center items-center hover:cursor-pointer'>
                            <AiOutlineEyeInvisible />
                          </div>
                        ) : (
                          <div className='h-[30px] w-[30px] flex flex-row justify-center items-center hover:cursor-pointer'>
                            <AiOutlineEye />
                          </div>
                        )}
                      </div>
                    </InputRightElement>
                  </InputGroup>
                </label>
              </div>
              <div className='mt-2 flex w-[60%] flex-row justify-between'>
                <h1
                  className=' text-[12px] hover:cursor-pointer'
                  onClick={() => setPage('otp')}
                >
                  Forgot Password?
                </h1>
                <button
                  type='submit'
                  className='rounded-[16px] bg-[#F48FB1] text-[16px] w-[80px] h-[40px] hover:bg-[#d77696] font-[Inter] font-[500] text-[#FFFFFF]'
                >
                  LOGIN
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default AdminLoginPage;
