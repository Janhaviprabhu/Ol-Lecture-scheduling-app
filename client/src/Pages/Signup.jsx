import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
} from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../Redux/auth/actions";


export default function Signup() {
  const { isRegister, authLoading, authError } = useSelector(
    (store) => store.auth
  );
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    console.log(formData);
    try {
      dispatch(registerUser(formData))
      .then(()=>{
        navigate('/login')
      })
    } catch (err) {
      console.log(err);
    }

}


  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    
  }

  if (authLoading) {
    return <div>....Loading</div>;
  } else if (authError) {
    return <div>....Error</div>;
  }
  return (
    <>
      <Flex minH={"100vh"} align={"center"} justify={"center"} bg="blue.50">
        <Stack
          spacing={4}
          w="full"
          maxW={"md"}
          bg={"white"}
          rounded={"xl"}
          boxShadow={"lg"}
          p={10}
          my={12}
        >
          <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
            SignUp
          </Heading>
          <form onSubmit={handleSubmit}>
            <FormControl id="email" isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                placeholder="sample@email.com"
                _placeholder={{ color: "gray.500" }}
                type="email"
                value={formData.email}
                name="email"
                onChange={(e) => handleChange(e)}
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                placeholder="password"
                _placeholder={{ color: "gray.500" }}
                type="password"
                value={formData.password}
                name="password"
                onChange={(e) => handleChange(e)}
              />
            </FormControl>
            <Input
              bg={"blue.400"}
              color={"white"}
              w="full"
              mt={2}
              _hover={{
                bg: "blue.500",
              }}
              type="submit"
              value={"Register"}
            />
          </form>
        </Stack>
      </Flex>
</>
 );
}