import React, { useState, useEffect, useRef } from 'react';
import {
  ChakraProvider,
  Box,
  Button,
  Spinner,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Textarea,
  useToast,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { createClient } from '@supabase/supabase-js';
import { useGlobalContext } from '../../contexts/registerContext.jsx';
import axios from 'axios';
import UploadPdf from '../register/UploadPdf.jsx';
import { useAuth } from '../../contexts/Authorization.jsx';
import uploadlogo from '../../assets/register-images/pdf-upload.svg';

export function RecruiterProfile() {
  const { profFormStyle, userType } = useGlobalContext();
  const [companyName, setCompanyName] = useState('');
  const [recruiterEmail, setRecruiterEmail] = useState('');
  const [recruiterPassword, setRecruiterPassword] = useState('');
  const [recruiterpasswordConfirmation, setRecruiterPasswordConfirmation] =
    useState('');
  const [companyWebsite, setCompanyWebsite] = useState('');
  const [aboutCompany, setAboutCompany] = useState('');
  const [logo, setLogo] = useState('');
  const [selectedFileName, setSelectedFileName] = useState(null);
  const [formattedUpdatedTime, setFormattedUpdatedTime] = useState('');
  const [newLogo, setNewLogo] = useState('');
  const [selectedLogoFileName, setSelectedLogoFileName] = useState(null);

  const { state } = useAuth();
  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (/(jpg|jpeg|png)$/i.test(file.type) && file.size <= 5 * 1024 * 1024) {
        setLogo(file);
        setSelectedFileName(file.name);
      } else {
        setLogo(null);
        setSelectedFileName(null);
        toast({
          title: 'Wrong file type or size',
          description: 'Please upload a JPG or PNG file under 5MB.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    } else {
      // No file selected, clear the selected file and file name
      setLogo(null);
      setSelectedFileName(null);
    }
  };

  const getRecfProfile = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/recruiter/getrecruiter`,
        { id: state.userID }
      );

      const updatedTime = response.data.data.updated_at;
      const date = new Date(updatedTime);
      const newFormattedUpdatedTime = `${date
        .toISOString()
        .slice(0, 10)} at ${date.toLocaleTimeString()}`;

      const { data } = response;

      const {
        recruiter_id,
        company_name,
        company_email,
        company_description,
        company_website,
        logo,
        user_id,
      } = data.data;

      setCompanyName(data.data.company_name);
      setAboutCompany(data.data.company_description);
      setRecruiterEmail(data.data.company_email);
      setCompanyWebsite(data.data.company_website);
      setLogo(data.data.logo);
      setSelectedFileName(data.data.logo);
      setFormattedUpdatedTime(newFormattedUpdatedTime);
      // console.log(logo);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (/(jpg|jpeg|png)$/i.test(file.type) && file.size <= 5 * 1024 * 1024) {
        setNewLogo(file);
        setSelectedLogoFileName(file.name);
      } else {
        setNewLogo(null);
        setSelectedLogoFileName(null);
        toast({
          title: 'Wrong file type or size',
          description: 'Please upload a JPG or PNG file under 5MB.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    }
  };

  // const handleSaveChanges = async () => {
  //   const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  //   const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  //   const supabase = createClient(supabaseUrl, supabaseAnonKey);
  //   let logoTest = logo;

  //   try {
  //     if (newLogo) {
  //       const { data, error: recError } = await supabase.storage
  //         .from("files")
  //         .upload(`companyicon/${Date.now()}${newLogo.name}`, newLogo, {
  //           cacheControl: "3600",
  //           upsert: false,
  //         });
  //       const urlPath = await supabase.storage
  //         .from("files")
  //         .getPublicUrl(data.path);
  //       logoTest = urlPath.data.publicUrl;

  //       if (recError) {
  //         throw recError; // Throw the error to trigger the catch block
  //       }
  //     }

  //     const updatedRecData = {
  //       logo: logoTest,
  //       company_email: recruiterEmail,
  //       company_name: companyName,
  //       company_website: companyWebsite,
  //       company_description: aboutCompany,
  //     };

  //     await axios.put(
  //       `${import.meta.env.VITE_SERVER_URL}/recruiter/getrecruiter/${state.userID}`,
  //       updatedRecData
  //     );

  //     // Display a success message to the user
  //     toast({
  //       title: "Profile updated successfully",
  //       status: "success",
  //       duration: 5000,
  //       isClosable: true,
  //     });
  //   } catch (error) {
  //     // Handle any errors that may occur during the update process
  //     console.error("Error updating profile:", error);
  //     toast({
  //       title: "Error updating profile",
  //       description:
  //         "An error occurred while updating your profile. Please try again later.",
  //       status: "error",
  //       duration: 5000,
  //       isClosable: true,
  //     });
  //   }
  // };

  const handleSaveChanges = async () => {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    let logoTest = logo;

    try {
      if (newLogo) {
        const { data, error: recError } = await supabase.storage
          .from('files')
          .upload(`companyicon/${Date.now()}${newLogo.name}`, newLogo, {
            cacheControl: '3600',
            upsert: false,
          });
        const urlPath = await supabase.storage
          .from('files')
          .getPublicUrl(data.path);
        logoTest = urlPath.data.publicUrl;

        if (recError) {
          throw recError; // Throw the error to trigger the catch block
        }
      }

      const updatedRecData = {
        logo: logoTest,
        company_email: recruiterEmail,
        company_name: companyName,
        company_website: companyWebsite,
        company_description: aboutCompany,
      };

      await axios.put(
        `${import.meta.env.VITE_SERVER_URL}/recruiter/getrecruiter/${
          state.userID
        }`,
        updatedRecData
      );

      // Display a success message to the user
      toast({
        title: 'Profile updated successfully',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

      // Set a timeout before reloading the page
      setTimeout(() => {
        window.location.reload();
      }, 2000); // 2000 milliseconds = 2 seconds
    } catch (error) {
      // Handle any errors that may occur during the update process
      console.error('Error updating profile:', error);
      toast({
        title: 'Error updating profile',
        description:
          'An error occurred while updating your profile. Please try again later.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    getRecfProfile();
  }, []);
  return (
    <>
      <div className='flex pl-[160px] font-[Inter] h-[973px] w-[1565px] bg-[#F5F5F6]'>
        <Box w='100%' maxW='lg' mt={10} borderRadius='md'>
          <h1 className='text-[45px] font-[Montserrat] mb-4'>Profile</h1>
          <div className='flex mb-[11px]'>
            <div className='w-[100px] h-[100px]  rounded-2xl shadow-lg'>
              <img src={logo} alt='' />
            </div>
            <div className='ml-2 flex flex-col'>
              <p className='mb-3 text-[#373737] text-[13px] tracking-[1.5px] uppercase'>
                company logo
              </p>
              {/* <UploadPdf /> */}
              <div>
                <div className='mx-auto rounded-lg flex'>
                  <input
                    type='file'
                    id='pdf-upload'
                    className='hidden'
                    onChange={handleLogoChange}
                    accept='.jpg,.jpeg,.png'
                  />
                  <label
                    htmlFor='pdf-upload'
                    className='cursor-pointer flex items-center justify-center w-[160px] h-auto p-[13px] rounded-xl bg-[#F48FB1] text-white hover:bg-[#BF5F82] transition duration-300'
                  >
                    <img src={uploadlogo} className='pr-2' alt='logo' />
                    Choose a file
                  </label>

                  {/* {selectedLogoFileName ? (
                    <div className="m-2 ml-4">
                      <p>Logo selected: {selectedLogoFileName}</p>
                    </div>
                  ) : selectedFileName ? (
                    <div className="m-2 ml-4">
                      <p>Logo selected: {selectedFileName}</p>
                    </div>
                  ) : (
                    <div className="ml-4 mt-3">
                      <p>No logo chosen</p>
                    </div>
                  )} */}

                  {selectedLogoFileName || selectedFileName ? (
                    <div className='m-2 ml-4'>
                      Selected:
                      {selectedLogoFileName || selectedFileName.slice(-10)}
                    </div>
                  ) : (
                    <div className='ml-4 mt-3'>No logo chosen</div>
                  )}
                </div>
              </div>
              <p className='mt-2 text-[#8E8E8E]'>
                Only JPG,JPEG,PNG. Max size 5MB
              </p>
            </div>
          </div>
          <form>
            <Stack spacing={4}>
              <FormControl id='recruiterEmail' isRequired>
                <FormLabel sx={profFormStyle}>COMPANY EMAIL</FormLabel>
                <Input
                  fontWeight='400'
                  background='#FFFFFF'
                  borderColor='#F48FB1'
                  focusBorderColor='#F48FB1'
                  _hover={{ borderColor: '#F48FB1' }}
                  type='email'
                  placeholder='Enter your email address'
                  value={recruiterEmail}
                  onChange={(event) => {
                    setRecruiterEmail(event.target.value);
                  }}
                />
              </FormControl>
              <FormControl id='companyName' isRequired>
                <FormLabel sx={profFormStyle}>COMPANY NAME</FormLabel>
                <Input
                  fontWeight='400'
                  background='#FFFFFF'
                  borderColor='#F48FB1'
                  focusBorderColor='#F48FB1'
                  _hover={{ borderColor: '#F48FB1' }}
                  type='name'
                  placeholder='Enter your company name'
                  value={companyName}
                  onChange={(event) => {
                    setCompanyName(event.target.value);
                  }}
                />
              </FormControl>
              {/* <FormControl id="recruiterPassword" isRequired>
                <FormLabel sx={customTextStyle}>Password</FormLabel>
                <Input
                  borderColor="#F48FB1"
                  type="password"
                  placeholder="Enter your password"
                  value={recruiterPassword}
                  onChange={(event) => {
                    setRecruiterPassword(event.target.value);
                  }}
                />
              </FormControl>
              <FormControl id="recruiterPasswordConfirm" isRequired>
                <FormLabel sx={customTextStyle}>
                  Password Confirmation
                </FormLabel>
                <Input
                  borderColor="#F48FB1"
                  type="password"
                  placeholder="Enter your password"
                  value={recruiterpasswordConfirmation}
                  onChange={(event) => {
                    setRecruiterPasswordConfirmation(event.target.value);
                  }}
                />
              </FormControl> */}
              <FormControl id='companyWebsite' isRequired>
                <FormLabel sx={profFormStyle}>Company Website</FormLabel>
                <Input
                  fontWeight='400'
                  background='#FFFFFF'
                  borderColor='#F48FB1'
                  focusBorderColor='#F48FB1'
                  _hover={{ borderColor: '#F48FB1' }}
                  type='url'
                  placeholder='Enter your company url'
                  value={companyWebsite}
                  onChange={(event) => {
                    setCompanyWebsite(event.target.value);
                  }}
                />
              </FormControl>
              <FormControl id='companyInfo' isRequired>
                <FormLabel sx={profFormStyle}>About the company</FormLabel>
                <Textarea
                  w='1013px'
                  h='229px'
                  fontWeight='400'
                  background='#FFFFFF'
                  borderColor='#F48FB1'
                  focusBorderColor='#F48FB1'
                  _hover={{ borderColor: '#F48FB1' }}
                  type='text'
                  placeholder='Enter your company info'
                  value={aboutCompany}
                  onChange={(event) => {
                    setAboutCompany(event.target.value);
                  }}
                />
              </FormControl>
            </Stack>
            <p className='mt-2 text-[#8E8E8E] text-[16px]'>
              Last Updated: {formattedUpdatedTime}
            </p>
            {/* <Button
              letterSpacing="2px"
              w="220px"
              h="53px"
              mt={8}
              mb={8}
              type="button"
              bg="#F48FB1"
              variant="solid"
              size="sm"
              fontSize="19px"
              color="white"
              borderRadius="19px"
              onClick={handleSaveChanges}
            >
              UPDATE PROFILE
            </Button> */}
            <Button
              letterSpacing='2px'
              w='220px'
              h='53px'
              mt={8}
              mb={8}
              type='button'
              bg='#F48FB1'
              _hover={{ bg: '#BF5F82' }}
              variant='solid'
              size='sm'
              fontSize='19px'
              color='white'
              borderRadius='19px'
              onClick={onOpen} // Open the confirmation dialog
            >
              UPDATE PROFILE
            </Button>
            <AlertDialog
              isOpen={isOpen}
              leastDestructiveRef={cancelRef}
              onClose={onClose}
            >
              <AlertDialogOverlay>
                <AlertDialogContent>
                  <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                    Confirm Update
                  </AlertDialogHeader>

                  <AlertDialogBody>
                    Are you sure you want to update your profile?
                  </AlertDialogBody>

                  <AlertDialogFooter>
                    <Button
                      ref={cancelRef}
                      onClick={onClose} // Close the dialog without updating
                    >
                      Cancel
                    </Button>
                    <Button
                      colorScheme='pink'
                      onClick={handleSaveChanges} // Call handleSaveChanges when confirmed
                      ml={3}
                    >
                      Update Profile
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialogOverlay>
            </AlertDialog>
          </form>
        </Box>
      </div>
    </>
  );
}
/*  */
