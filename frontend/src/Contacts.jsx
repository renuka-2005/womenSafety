import React, { useState } from "react";
import './Contacts.css'
import { useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import UpdateContact from "./UpdateContact";



function Contacts() {
  const navigate = useNavigate();
const [contacts, setContacts] = useState([]);
 const [userId, setUserId] = useState({});
const { id } = useParams();
const [user,setUser]=useState({});

 useEffect(() => {

  const token = localStorage.getItem("token");

  axios
    .get(
       "https://womensafety-r0s4.onrender.com/current-user",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((res) => setUser(res.data))
    .catch((err) => console.log(err));

}, []);


useEffect(()=>{
    axios
    .get( `https://womensafety-r0s4.onrender.com/contacts/${id}`)
    .then((res)=> setContacts(res.data))
    .catch((err)=> console.log(err));
},[id]);

useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      setUserId(decoded.id);
    }
  }, []);


  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete( `https://womensafety-r0s4.onrender.com/deletecontacts/${id}`, {
          headers: { Authorization: ` ${token}` },
        });
        alert("Contact deleted successfully!");
        // navigate(`contacts/${user.userId}`);
      } catch (err) {
        console.error(err);
        alert("Failed to delete the  contact. Please try again.");
      }
    }
  }

  const handleEdit= async () => {
  
      try {
        const token = localStorage.getItem("token");
        await axios.delete( `https://womensafety-r0s4.onrender.com/contacts/${id}`, {
          headers: { Authorization: ` ${token}` },
        });
        alert("Contact update successfully!");
        navigate("/contacts");
      } catch (err) {
        console.error(err);
        alert("Failed to update the  contact. Please try again.");
      }
    
  };

return (
<div className="container">


    
  <h2 className="title">Emergency Contacts</h2>

  <Link to="/addcontact"><button className="edit-btn">Add</button></Link>
 <div className="contacts-list">
  {contacts.map((contact) => (
    <div key={contact._id} className="contact-card">
      <h3>{contact.contactName}</h3>
      <p>{contact.relation}</p>
      <p>{contact.phone}</p>
      <p>{contact.email}</p>

      <div className="actions">
        
        
         <button
          className="edit-btn"
           onClick={() => navigate(`/updatecontacts/${contact._id}`)}
        >
          Edit
        </button>

        <button
          className="delete-btn"
          onClick={() => handleDelete(contact._id)}
        >
          Delete
        </button>
      </div>
    </div>
  ))}
</div>
</div>

);
}

export default Contacts;
