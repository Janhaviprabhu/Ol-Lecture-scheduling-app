import { Button, Image } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <Image src='https://gifdb.com/images/high/cute-calendar-sticker-animated-graphic-5jio11mx3sxzgdlc.gif'/>
      <Link to={'/admin'}><Button>Admin</Button></Link>
      <Link to={'/instructor'}><Button>Instructor</Button></Link>
    </div>
  )
}

export default Home
