import React, { useState } from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { loginUser } from "../Redux/auth/actions"

const Login = () => {
  const { logLoading, loggedUser, logError } = useSelector(
    (store) => store.auth
  );
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    console.log(formData);
    dispatch(loginUser(formData)).then(
      // loggedUser: payload,
    //   console.log(loggedUser)
   navigate('/')
    );
  }

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  if (logLoading) {
    return <div>....Loading</div>;
  } else if (logError) {
    return <div>....Error</div>;
  }
  return (
    <>
      <Flex
        minH={"100vh"}
        align={"center"}
        bg={"blue.50"}
        mt={0}
        justify={"center"}
      >
        <Stack spacing={8} mx={"auto"} mt={0} maxW={"lg"} py={2} px={1}>
          <Box w={"100%"} rounded={"lg"} bg={"white"} boxShadow={"xl"} p={10}>
             <Heading lineHeight={1.1} fontSize={"4xl"}>Log In </Heading>
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  placeholder="Enter email"
                  value={formData.email}
                  name="email"
                  onChange={(e) => handleChange(e)}
                />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  placeholder="Enter password"
                  value={formData.password}
                  name="password"
                  onChange={(e) => handleChange(e)}
                />
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                ></Stack>
                <Button
                  bg={"blue.500"}
                  color={"white"}
                  _hover={{
                    bg: "blue.200",
                  }}
                  onClick={(e) => handleSubmit(e)}
                >
                  Login
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </>
  );
};
export default Login