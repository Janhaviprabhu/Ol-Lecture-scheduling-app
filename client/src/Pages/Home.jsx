import { Box, Button, Heading, HStack, Image } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../Components/Navbar'

const Home = () => {
  return (
    <div>
        <Heading>Online Lecture Scheduling Module</Heading>
        <Box paddingTop={20} margin={'auto'} width={'20%'} >Schedule lectures<Image  src='https://gifdb.com/images/high/cute-calendar-sticker-animated-graphic-5jio11mx3sxzgdlc.gif'/></Box>
      <HStack justifyContent={'center'} gap={10} mt={20}><Link  to={'/admin'}><Button  bg={"green.500"} color={"white"} _hover={{bg: "green.200", }}>Admin</Button></Link>
      <Link to={'/instructor'}><Button bg={"purple.500"} color={"white"} _hover={{bg: "purple.200", }}>Instructor</Button></Link></HStack>
    </div>
  )
}

export default Home
