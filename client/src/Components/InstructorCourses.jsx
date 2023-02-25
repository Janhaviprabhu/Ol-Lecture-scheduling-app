import React, { useState, useEffect } from 'react';
import axios from 'axios';

function InstructorPanel() {
  const [lectures, setLectures] = useState([]);
  
  const id =(localStorage.getItem('id'))

  useEffect(() => {
      axios.get(`https://onlineschedule.onrender.com/instructor/lectures`,{params: {
    id: id,
  },})
      .then(response => setLectures(response.data))
      .catch(error => console.error(error));
  }, [id]);
console.log(lectures);
  return (
    <div>
      <h1>Your Lectures</h1>
      <ul>
        {lectures.map((lecture, index) => (
          <li key={index}>
            <h2>{lecture.name}</h2>
            <p>Date: {lecture.batches[0].date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default InstructorPanel;