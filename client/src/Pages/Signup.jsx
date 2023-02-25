import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";


export default function Signup() {
  const [formData, setFormData] = useState({ name:"",email: "",password: ""});
  const navigate = useNavigate();

   async function handleSignup(user){
   let signup=await axios.post("https://onlineschedule.onrender.com/signup",user)
   console.log(signup.data);
   return (signup.data);
  }

  function handleSubmit(e) {
    e.preventDefault();
   
  
    try {
       handleSignup(formData).then((res)=>{
      if(res==="Email already exist , Try using diffrent email"){
        alert("Email already exist , Try using diffrent email")
      }
      else if (res==="Sign up Successfully!!"){
        alert("Sign up Successfully!!")
        navigate('/login')
      }
    })
  

    } catch (err) {
      console.log(err);
    }

}


  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    
  }


  return (
    <>
      <Flex minH={"90vh"} align={"center"} justify={"center"} bg="blue.50">
        <Stack
          spacing={8}
          w="full"
          mx={"auto"}
          maxW={"sm"}
          bg={"white"}
          rounded={"xl"}
          boxShadow={"lg"}
          p={10}
          my={12}
        >
          <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
            SignUp
          </Heading>
          
          
            <Stack spacing={6}>
              <FormControl id="name" isRequired>
              <FormLabel>Name</FormLabel>
              <Input
                placeholder="sample"
                _placeholder={{ color: "gray.500" }}
                type="text"
                value={formData.name}
                name="name"
                onChange={ handleChange}
              />
            </FormControl>
            <FormControl id="email" isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                placeholder="sample@email.com"
                _placeholder={{ color: "gray.500" }}
                type="email"
                value={formData.email}
                name="email"
                onChange={ handleChange}
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
                onChange={handleChange}
              />
            </FormControl>
            <Button
            onClick={handleSubmit}
              bg={"blue.400"}
              color={"white"}
              w="full"
              mt={2}
              _hover={{
                bg: "blue.500",
              }}
              type="submit"
              value={"Register"}
            >Signup</Button>
             </Stack>
          <Stack pt={6}>
              <Text align={'center'}>
                Already a user? <Link to='/login' color={'blue.400'} >Login</Link>
              </Text>
            </Stack>
         
        </Stack>
      </Flex>
</>
 );
}