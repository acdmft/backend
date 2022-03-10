import React from "react";
import { useEffect, useState } from "react";
const axios = require("axios");


export default function App() {
  const [students, setStudents] = useState([]);
  
  useEffect(() => {
    axios.get("http://localhost:8080/students")
      .then((res) =>{ 
        console.log(students);
        
        setStudents(res)})
  }, []);


    return  students ? (
  <>
    {students.data.map((student)=>{
    return (<ul><li>{student.name}</li>
      <li>{student.age}</li>
      <li>{student.gender}</li></ul>)
  })}
    
    
  </>
    ) : (<p>Loading...</p>);

  
}
