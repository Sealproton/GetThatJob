import { ChakraProvider } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
  Textarea,
  InputGroup,
  InputLeftAddon,
  FormHelperText,
  useToast,
} from "@chakra-ui/react";
import { useGlobalContext } from "../../contexts/registerContext.jsx";
import UploadPdf from "../register/UploadPdf.jsx";
import { useAuth } from "../../contexts/Authorization.jsx";
import axios from "axios";
import uploadlogo from "../../assets/register-images/pdf-upload.svg";

export function ProfessionalProfile() {
  const { profFormStyle, userType } = useGlobalContext();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [linkedinUrl, setlinkedinUrl] = useState("");
  const [title, setTitle] = useState("");
  const [professionalExperience, setProfessionalExperience] = useState("");
  const [educationalInfo, setEducationalInfo] = useState("");
  const [cv, setCv] = useState("");
  const [selectedFileName, setSelectedFileName] = useState(null);
  const [formattedUpdatedTime, setFormattedUpdatedTime] = useState(""); // Declare formattedDate2 in the component's state

  const toast = useToast();
  const { state } = useAuth();
  // console.log(state.userID);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (userType === "PROFESSIONAL") {
      if (file) {
        if (file.type === "application/pdf" && file.size <= 5 * 1024 * 1024) {
          setCv(file);
          setSelectedFileName(file.name);
        } else {
          setCv(null);
          setSelectedFileName(null);
          toast({
            title: "Wrong file type or size",
            description: "Please upload a PDF file under 5MB.",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
      } else {
        // No file selected, clear the selected file and file name
        setCv(null);
        setSelectedFileName(null);
      }
    }
  };

  const getProfProfile = async () => {
    const response = await axios.get(
      `http://localhost:4000/aoo/${state.userID}`
    );
    const isoDate = response.data.data.birthdate;
    const formattedDate = isoDate.slice(0, 10);

    const updatedTime = response.data.data.updated_at;
    const date = new Date(updatedTime);
    const newFormattedUpdatedTime = `${date
      .toISOString()
      .slice(0, 10)} at ${date.toLocaleTimeString()}`;

    setEmail(response.data.data.email);
    setName(response.data.data.username);
    setPhone(response.data.data.phone);
    setBirthDate(formattedDate);
    setlinkedinUrl(response.data.data.linkedin);
    setTitle(response.data.data.title);
    setProfessionalExperience(response.data.data.experience);
    setEducationalInfo(response.data.data.education);
    setCv(response.data.data.cv);
    setSelectedFileName(response.data.data.cv);
<<<<<<< HEAD
    // console.log(response.data.message);
=======
>>>>>>> 23f155d (feat : add method GET for front and backend)
  };

  useEffect(() => {
    getProfProfile();
  }, []);
<<<<<<< HEAD

  const handleSaveChanges = async () => {
    try {
      // Prepare the updated profile data object
      const updatedProfileData = {
        email: email,
        username: name,
        phone: phone,
        birthdate: birthDate,
        linkedin: linkedinUrl,
        title: title,
        experience: professionalExperience,
        education: educationalInfo,
        cv: cv,
      };

      // Make a PUT request to update the profile data
      await axios.put(
        `http://localhost:4000/aoo/${state.userID}`,
        updatedProfileData
      );

      // Display a success message to the user
      toast({
        title: "Profile updated successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      // Handle any errors that may occur during the update process
      console.error("Error updating profile:", error);
      toast({
        title: "Error updating profile",
        description:
          "An error occurred while updating your profile. Please try again later.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };
=======
>>>>>>> 23f155d (feat : add method GET for front and backend)

  return (
    <ChakraProvider>
      <div className="flex flex-col pl-[160px] font-[Inter]">
        <h1 className="text-[45px] font-[Montserrat] mb-4 mt-[43px]">
          Profile
        </h1>
        <div className="ml-4">
          <h1 className="text-[32px] font-[Montserrat]">
            Personal Information
          </h1>
          <Box w="100%" maxW="lg" mt="12px" borderRadius="md">
            <form>
              <Stack spacing={4}>
                <FormControl id="email" isRequired>
                  <FormLabel sx={profFormStyle}>Email</FormLabel>
                  <Input
                    borderColor="#F48FB1"
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                    }}
                  />
                </FormControl>
                {/* <FormControl id="password" isRequired>
                  <FormLabel sx={profFormStyle}>Password</FormLabel>
                  <Input
                    borderColor="#F48FB1"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(event) => {
                      setPassword(event.target.value);
                    }}
                  />
                </FormControl>
                <FormControl id="passwordConfirm" isRequired>
                  <FormLabel sx={profFormStyle}>
                    Password Confirmation
                  </FormLabel>
                  <Input
                    borderColor="#F48FB1"
                    type="password"
                    placeholder="Confirm your password"
                    value={passwordConfirmation}
                    onChange={(event) => {
                      setPasswordConfirmation(event.target.value);
                    }}
                  />
                </FormControl> */}
                <FormControl id="name" isRequired>
                  <FormLabel sx={profFormStyle}>NAME</FormLabel>
                  <Input
                    borderColor="#F48FB1"
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(event) => {
                      setName(event.target.value);
                    }}
                  />
                </FormControl>
                <FormControl id="phone" isRequired>
                  <FormLabel sx={profFormStyle}>Phone</FormLabel>
                  <InputGroup>
                    <InputLeftAddon children="+66" />
                    <Input
                      borderColor="#F48FB1"
                      type="tel"
                      placeholder="Enter your phone number"
                      value={phone}
                      maxLength={9}
                      onChange={(event) => {
                        setPhone(event.target.value);
                      }}
                      pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                    />
                  </InputGroup>
                  <FormHelperText className="text-[#8E8E8E] text-[16px] lowercase">
                    +[country code][number]
                  </FormHelperText>
                </FormControl>
                <FormControl id="birthDate" isRequired>
                  <FormLabel sx={profFormStyle}>BIRTHDATE</FormLabel>
                  <Input
                    borderColor="#F48FB1"
                    type="date"
                    placeholder="Enter your birthdate"
                    value={birthDate}
                    onChange={(event) => {
                      setBirthDate(event.target.value);
                    }}
                  />
                </FormControl>
                <FormControl id="linkedinUrl" isRequired>
                  <FormLabel sx={profFormStyle}>Linkedin URL</FormLabel>
                  <Input
                    borderColor="#F48FB1"
                    type="url"
                    placeholder="Enter Linkedin URL"
                    value={linkedinUrl}
                    onChange={(event) => {
                      setlinkedinUrl(event.target.value);
                    }}
                  />
                </FormControl>
              </Stack>

              <h1 className="ml-2 text-[32px] font-[Montserrat] mt-[53px] mb-[11px]">
                Professional Information
              </h1>
              <h3 className="text-[16px] mb-[11px] text-[#616161]">
                Changes made here will be reflected in your future applications
              </h3>

              <Stack spacing={4}>
                <FormControl id="title" isRequired>
                  <FormLabel sx={profFormStyle}>TITLE</FormLabel>
                  <Input
                    borderColor="#F48FB1"
                    type="text"
                    placeholder="Enter your title"
                    value={title}
                    onChange={(event) => {
                      setTitle(event.target.value);
                    }}
                  />
                </FormControl>
                <FormControl id="experience" w="100%" maxW="lg" isRequired>
                  <FormLabel sx={profFormStyle}>
                    PROFESSIONAL EXPERIENCE
                  </FormLabel>
                  <Textarea
                    w="1013px"
                    h="341px"
                    borderColor="#F48FB1"
                    type="text"
                    placeholder="Enter your company info"
                    value={professionalExperience}
                    onChange={(event) => {
                      setProfessionalExperience(event.target.value);
                    }}
                  />
                </FormControl>
                <FormControl id="eduInfo" isRequired>
                  <FormLabel sx={profFormStyle}>EDUCATION</FormLabel>
                  <Textarea
                    w="1013px"
                    h="154px"
                    borderColor="#F48FB1"
                    type="text"
                    placeholder="Enter your educational info"
                    value={educationalInfo}
                    onChange={(event) => {
                      setEducationalInfo(event.target.value);
                    }}
                  />
                </FormControl>
              </Stack>
            </form>
          </Box>
          <div className=" flex flex-col mt-[11px]">
            <p className="mb-3 text-[#373737] text-[13px] tracking-[1.5px] uppercase">
              Upload / Update Your CV
            </p>
            <div>
              {/* <UploadPdf /> */}
              <div className="mx-auto bg-white rounded-lg flex">
                <input
                  type="file"
                  id="pdf-upload"
                  className="hidden"
                  onChange={handleFileChange}
                  accept={
                    userType === "PROFESSIONAL"
                      ? ".pdf"
                      : userType === "RECRUITER"
                      ? ".jpg,.jpeg,.png"
                      : undefined // Allow any file type if not specified
                  }
                />
                <label
                  htmlFor="pdf-upload"
                  className="cursor-pointer flex items-center justify-center w-[160px] h-auto p-[13px] rounded-xl bg-[#F48FB1] text-white hover:bg-pink-600 transition duration-300"
                >
                  <img src={uploadlogo} className="pr-2" alt="logo" />
                  {userType === "PROFESSIONAL"
                    ? "Choose a file"
                    : userType === "RECRUITER"
                    ? "Choose a file"
                    : "Choose a file"}
                </label>

                {selectedFileName ? (
                  <div className="mt-4 ml-4">
                    <p>File selected: {selectedFileName}</p>
                  </div>
                ) : (
                  <div className="ml-4 mt-3">
                    <p>No file chosen</p>
                  </div>
                )}

                {/* {cv && (
                  <div className="mt-2">
                    <p>File selected: {cv.name}</p>
                  </div>
                )} */}
                {cv === null && userType === "PROFESSIONAL" && (
                  <div className="ml-4 mt-3">
                    <p>No file chosen</p>
                  </div>
                )}
              </div>
            </div>

            <p className="mt-2 text-[#8E8E8E] text-[16px]">
              Only PDF. Max size 5MB
            </p>

            <p className="mt-2 text-[#8E8E8E] text-[16px]">
              Last Updated: {formattedUpdatedTime}
            </p>

            <Button
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
              SAVE CHANGES
            </Button>
          </div>
        </div>
      </div>
    </ChakraProvider>
  );
}
