import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios.get("http://backend:8080/api/message")
      .then(res => setMessage(res.data))
      .catch(err => setMessage("Error connecting to backend"));
  }, []);

  return (
    <div>
      <h1>Frontend</h1>
      <p>Message from backend: {message}</p>
    </div>
  );
}

export default App;
