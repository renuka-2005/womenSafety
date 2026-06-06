import React, { useState,useEffect } from "react";
import axios from "axios";
import "./AddContact.css"
import {useNavigate, Navigate } from "react-router";
import { jwtDecode } from "jwt-decode";


function AddContact() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    contactName: "",
    phone: "",
     relation:"",
        email:"",
  });

  const [user,setUser]=useState({});
  
   useEffect(() => {
         const token = localStorage.getItem("token");
         if (token) {
           const decoded = jwtDecode(token);
           setUser(decoded.userId);
         }
       }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        "http://localhost:8080/contacts" || "https://womensafety-r0s4.onrender.com/contacts",
        formData,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      alert("Contact Added Successfully");
      
      setFormData({
        contactName: "",
        phone: "",
        relation:"",
        email:"",
      });

      console.log(res.data);
      navigate(`/contacts/${user.userId}`);
    } catch (err) {
      console.log(err);
      alert("Failed to add contact");
    }
  };

  return (
    <div className="container">
      <h2>Add Emergency Contact</h2>

      <form onSubmit={handleSubmit} className="contact-form">
        <input
          type="text"
          name="contactName"
          placeholder="Enter Contact Name"
          value={formData.contactName}
          onChange={handleChange}
          required
        />

        <input
          type="tel"
          name="phone"
          placeholder="Enter Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
        />


 <input
          type="text"
          name="relation"
          placeholder="Enter relation"
          value={formData.relation}
          onChange={handleChange}
          required
        />

         <input
          type="text"
          name="email"
          placeholder="Enter Your Email"
          value={formData.email}
          onChange={handleChange}
          required
        />


        <button type="submit">
          Add Contact
        </button>
      </form>
    </div>
  );
}

export default AddContact;