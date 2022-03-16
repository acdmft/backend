import "./App.css";
import { useState } from "react";

import axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [file, setFile] = useState([]);

  const addFile = (e) => {
    setFile(e.target.files[0]);
  }

  const onChange = (e) => {
    setName(e.target.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("image", file);
    formData.append("name", name);
    
    axios({method: "post", 
    url: "http://localhost:8001/user", 
    data: formData, 
    headers: { "Content-Type": "multipart/form-data "},
    });
  };

  return (
    <div className="formWrapper">

      <form onSubmit={onSubmit}>
        <div>
        <label htmlFor="name">Username: </label>
        <input
          type="name"
          id="name"
          name="name"
          placeholder="username"
          onChange={onChange}
          required
        />
        </div>
        <div>
        <label htmlFor="file">Select image: </label>
        <input type="file" id="file" name="image" onChange={addFile} accept="image/*" />
        </div>
        <button>Send</button>
      </form>
    </div>
  );
}
export default App;
