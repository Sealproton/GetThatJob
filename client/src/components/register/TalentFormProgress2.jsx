import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
  InputGroup,
  InputLeftAddon,
  FormHelperText,
  Alert,
  AlertIcon,
  CloseButton,
  useToast,
} from "@chakra-ui/react";
import { useGlobalContext } from "../../contexts/registerContext.jsx";
import MobileInput from "./MobileInput.jsx";

function TalentFormProgress2() {
  const {
    registerPage,
    setRegisterPage,
    customTextStyle,
    name,
    setName,
    phone,
    setPhone,
    birthDate,
    setBirthDate,
    linkedinUrl,
    setLinkedinUrl,
  } = useGlobalContext();

  const [showEmptyFieldAlert, setShowEmptyFieldAlert] = useState(false);
  const toast = useToast();

  const handleNextClick = () => {
    // Check if any of the required fields are empty
    if (!name || !phone || !birthDate || !linkedinUrl) {
      toast({
        title: "Empty Fields",
        description: "Please fill in all input fields.",
        status: "warning",
        position: "bottom",
        duration: 5000, // Toast duration in milliseconds
        isClosable: true,
      });
    } else {
      setRegisterPage(registerPage + 1);
    }
  };

  return (
    <div className="flex w-full">
      {/* left */}
      <div className="flex flex-col w-full items-end font-[Inter] ">
        {/* Register */}
        <div className="flex flex-col w-[80%]">
          <div className="flex cursor-pointer">
            <div
              onClick={() => {
                setRegisterPage(registerPage - 1);
              }}
              className="mr-4 w-[32px] h-[32px] bg-[#373737] rounded-full text-white text-center font-semibold flex items-center justify-center"
            >
              1
            </div>
            <div className="mr-4 text-[16px]">
              <p className="text-[10px]">IN PROGRESS</p>
              <p>Login</p>
              <p>Information</p>
            </div>
            <div className="mr-4 w-[32px] h-[32px] bg-[#F48FB1] rounded-full text-white text-center font-semibold flex items-center justify-center">
              2
            </div>
            <div className="mr-4 text-[16px] ]">
              <p className="text-[10px]">PENDING</p>
              <p>Personal</p>
              <p>Information</p>
            </div>
            <div
              onClick={handleNextClick}
              className="mr-4 w-[32px] h-[32px] bg-[#E1E2E1] rounded-full text-white text-center font-semibold flex items-center justify-center"
            >
              3
            </div>
            <div className="text-[16px] text-[#8E8E8E]">
              <p className="text-[10px]">PENDING</p>
              <p>Login</p>
              <p>Professional</p>
            </div>
          </div>
          <Box w="100%" maxW="lg" mt={10} borderRadius="md">
            <form>
              <Stack spacing={4}>
                <span className="text-[#616161] text-[10px] tracking-[1.5px] uppercase">
                  You can complete this information later but we recommend you
                  to do it now
                </span>
                <FormControl id="name" isRequired>
                  <FormLabel sx={customTextStyle}>NAME</FormLabel>
                  <Input
                    isRequired
                    borderColor="#F48FB1"
                    focusBorderColor="#F48FB1"
                    _hover={{ borderColor: "#F48FB1" }}
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(event) => {
                      setName(event.target.value);
                    }}
                  />
                </FormControl>
                <FormControl id="phone" isRequired>
                  <FormLabel sx={customTextStyle}>Phone</FormLabel>
                  <MobileInput />
                  {/* <InputGroup>
                    <InputLeftAddon children="+66" />
                    <Input
                      borderColor="#F48FB1"
                    focusBorderColor="#F48FB1"
                      type="tel"
                      placeholder="Enter your phone number"
                      value={phone}
                      maxLength={9}
                      onChange={(event) => {
                        setPhone(event.target.value);
                      }}
                      pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                    />
                  </InputGroup> */}
                  <FormHelperText className="text-[#8E8E8E] text-[12px] lowercase">
                    +[country code][number]
                  </FormHelperText>
                </FormControl>
                <FormControl id="birthDate" isRequired>
                  <FormLabel sx={customTextStyle}>BIRTHDATE</FormLabel>
                  <Input
                    borderColor="#F48FB1"
                    focusBorderColor="#F48FB1"
                    _hover={{ borderColor: "#F48FB1" }}
                    type="date"
                    placeholder="Enter your birthdate"
                    value={birthDate}
                    onChange={(event) => {
                      setBirthDate(event.target.value);
                    }}
                  />
                </FormControl>
                <FormControl id="linkedinUrl" isRequired>
                  <FormLabel sx={customTextStyle}>Linkedin URL</FormLabel>
                  <Input
                    borderColor="#F48FB1"
                    focusBorderColor="#F48FB1"
                    _hover={{ borderColor: "#F48FB1" }}
                    type="url"
                    placeholder="Enter Linkedin URL"
                    value={linkedinUrl}
                    onChange={(event) => {
                      setLinkedinUrl(event.target.value);
                    }}
                  />
                </FormControl>
              </Stack>
              <center>
                {showEmptyFieldAlert && (
                  <Alert status="warning" borderRadius="md" mt={5}>
                    <AlertIcon />
                    Please fill in all input fields.
                    <CloseButton
                      onClick={() => setShowEmptyFieldAlert(false)}
                      position="absolute"
                      right="8px"
                      top="8px"
                    />
                  </Alert>
                )}
                <Button
                  px={5}
                  py={5}
                  mt={8}
                  mr={5}
                  type="button"
                  bg="#F48FB1"
                  _hover={{ bg: "#BF5F82" }}
                  variant="solid"
                  size="sm"
                  fontSize="md"
                  color="white"
                  borderRadius="16px"
                  onClick={() => {
                    setRegisterPage(registerPage - 1);
                  }}
                >
                  &lt; PREVIOUS
                </Button>
                {/* <Button
                  mt={8}
                  mr={5}
                  px={5}
                  py={5}
                  type="button"
                  borderColor="#F48FB1"
                  focusBorderColor="#F48FB1"
                  variant="outline"
                  size="sm"
                  fontSize="md"
                  textColor="#616161"
                  borderRadius="16px"
                  onClick={handleSubmit}
                >
                  SKIP THIS!
                </Button> */}
                <Button
                  px={5}
                  py={5}
                  mt={8}
                  type="button"
                  bg="#F48FB1"
                  _hover={{ bg: "#BF5F82" }}
                  variant="solid"
                  size="sm"
                  fontSize="md"
                  color="white"
                  borderRadius="16px"
                  onClick={handleNextClick}
                >
                  NEXT &gt;
                </Button>
              </center>
            </form>
          </Box>
        </div>
      </div>
    </div>
  );
}

export default TalentFormProgress2;
