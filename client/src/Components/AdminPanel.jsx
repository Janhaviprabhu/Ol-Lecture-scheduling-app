import { Box, Flex, Heading, Select, Table, TableCaption, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react'
import {Button,FormControl,FormLabel,Input,Stack,} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Instructors = () => {
    const[data,setData]=useState([])
    // const [formData,setFormData]=useState({name:"",level:"",description:"",image:""})
    // const [batch,setBatch]=useState([])
    // const[batchdata,setBatchdata]=useState({date:"",instructor:""})
    const [name, setName] = useState('');
    const [level, setLevel] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [batchDate, setBatchDate] = useState('');
    const [batchInstructor, setBatchInstructor] = useState('');
    // const [instructors, setInstructors] = useState([]);
 const [batchList, setBatchList] = useState([]);
    function getInstructors(){
     return axios.get("https://onlineschedule.onrender.com/admin/instructors")
    }

useEffect(()=>{
    getInstructors().then((res)=>{
        setData(res.data)
        console.log(res.data)
    })
},[])

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://onlineschedule.onrender.com/admin/courses', {
        name,
        level,
        description,
        image,
        batches: batchList,
      });
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleBatchSubmit = (e) => {
    e.preventDefault();
    const newBatch = {
      date: batchDate,
      instructor: batchInstructor,
    };
    setBatchList([...batchList, newBatch]);
    console.log(newBatch)
  };

  return (
    <div>
        <Flex>
<Box width={"50%"}>
<Heading marginTop={10} marginBottom={20} as={'h1'}>Instructors List</Heading>
<TableContainer borderRadius={9}boxShadow={"xl"} margin={'auto'} width='90%'>
  <Table variant='simple'>
    <TableCaption>All Instructors</TableCaption>
    <Thead>
      <Tr>
        <Th>Serial No.</Th>
        <Th>Instructor's Name</Th>
        
      </Tr>
    </Thead>
    <Tbody>
        {data.map((ele,i)=>{
           return( <Tr key={i}>
        <Td>{i+1}</Td>
        <Td>{ele.name}</Td>
      </Tr>
           )
        })}
      
    </Tbody>
  </Table>
</TableContainer>
</Box>
<Box minH={"100vh"} width={"50%"} bg="blue.50">
  <Heading  p={20} lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
            Add Courses
          </Heading>
    <Flex gap={3} p={5} borderRadius={10} width={"60%"} margin="auto" align={"center"} justify={"center"} bg="white"boxShadow={"xl"}>
        <form onSubmit={handleSubmit}>
        <FormLabel>
          Name:
          <Input placeholder='Enter course name' type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </FormLabel>
        <br />
        <FormLabel>
          Level:
          <Input placeholder='Basic/Intermediate/Expert' type="text" value={level} onChange={(e) => setLevel(e.target.value)} />
        </FormLabel>
        <br />
        <FormLabel>
          Description:
          <Input placeholder={'Add description'} type={"text"} value={description} onChange={(e) => setDescription(e.target.value)} />
        </FormLabel>
        <br />
        <FormLabel>
          Image:
          <Input placeholder='Add image URL' type="text" value={image} onChange={(e) => setImage(e.target.value)} />
        </FormLabel>
        <br />
       
        <br />
        <ul>
          {batchList.map((batch, index) => (
            <li key={index}>
              {batch.date} -{' '}
              {data.find((instructor) => instructor._id=== batch.instructor)?.name}
            </li>
          ))}
        </ul>
        <Button bg={"green.500"}
                  color={"white"}
                  _hover={{
                    bg: "green.200",
                  }} type="submit">Add Course</Button>
      </form>
       <FormLabel>
          Add Batch:
          <form onSubmit={handleBatchSubmit}>
            <FormLabel>
              Date:
              <Input type="date" value={batchDate} onChange={(e) => setBatchDate(e.target.value)} />
            </FormLabel>
            <FormLabel>
              Instructor:
              <Select value={batchInstructor} onChange={(e) => setBatchInstructor(e.target.value)}>
                <option value="">Select an Instructor</option>
                {data.map((instructor) => (
                  <option key={instructor._id} value={instructor._id}>
                    {instructor.name}
                  </option>
                ))}
              </Select>
            </FormLabel>
            <Button bg={"orange.500"}
                  color={"white"}
                  _hover={{
                    bg: "orange.200",
                  }} type="submit">Add Batch</Button>
                  <Text fontWeight={300}>Add batch first</Text>
          </form>
        </FormLabel>
      </Flex>
</Box>
      </Flex>
    </div>
  )
}

export default Instructors
