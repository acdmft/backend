import React from "react";
import { useEffect, useState } from "react";
// react-hook-form
import { useForm } from "react-hook-form";

const axios = require("axios");


export default function App() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [students, setStudents] = useState([]);
  const [reload, setReload] = useState(false);

  const fetchStudents = () => {
    axios.get("http://localhost:8080/students").then((res) => {
      console.log(res.status);
      setStudents(res);
    })
    .catch((err)=>console.log(err));
  }

  useEffect(() => {
    fetchStudents();
  }, [reload])

  const onSubmit = (data) => {

    axios.post("http://localhost:8080/students", data)
      .then((res)=>{
        console.log(res);
        setReload((prev) => !prev);
      })
  }

  return students.data !== undefined ? (
    <>
      {students.data.map((student, index) => {
        return (
          <ul key={`${student.name}-${index}`}>
            <li>{student.name}</li>
            <li>{student.age}</li>
            <li>{student.gender}</li>
          </ul>
        );
      })}
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("name", { required: true })} />
        {errors.name && <p>Name is required</p>}
        <input type="submit" />
      </form>
    </>
  ) : (
    <p>Loading...</p>
  );
}
