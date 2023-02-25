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
  Text,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom"


import axios from "axios";
import { AuthContext } from "../Context/AppContext";


const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" })
  const navigate = useNavigate();
 const {handleAdminLogin,handleUserLogin  } = React.useContext(AuthContext)

 async function handleLogin(user){
   let login=await axios.post("https://onlineschedule.onrender.com/login",user)
   return (login.data);
  }





  function handleSubmit(e) {
    e.preventDefault();
    if(formData.email!=="" && formData.password!==""){
      handleLogin(formData).then((res)=>{
        if(res.message==='User Logged in as Admin'){
          handleAdminLogin()
          alert(res.message)
          navigate('/admin')
        }else if (res.message==="User Logged in Succefully!!"){
          handleUserLogin()
          localStorage.setItem("id",res.id)
          alert(res.message)
            navigate('/instructor')
        }else{
         alert("Enter correct Credentials")
        }
      })
    }else {
      alert("Please enter all feilds")
    }
    
  }

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
          <Box w={"120%"} rounded={"lg"} bg={"white"} boxShadow={"xl"} p={10}>
             <Heading lineHeight={1.1} fontSize={"4xl"}>Log In </Heading>
            <Stack spacing={6}>
              <FormControl id="email" isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                required
                  type="email"
                  placeholder="Enter email"
                  value={formData.email}
                  name="email"
                  onChange={(e) => handleChange(e)}
                />
              </FormControl>
              <FormControl id="password" isRequired>
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
               <Stack pt={6}>
              <Text align={'center'}>
                Not a user? <Link to='/signup' color={'blue.400'} >Signup</Link>
              </Text>
            </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </>
  );
};
export default Login