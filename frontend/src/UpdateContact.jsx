import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function UpdateContact() {
  const { id } = useParams();
  const navigate = useNavigate();
const [userId, setUserId] = useState({});
  const [formData, setFormData] = useState({
    contactName: "",
    relation: "",
    phone: "",
    email: "",
  });

  useEffect(() => {
    axios
      .get( `https://womensafety-r0s4.onrender.com/updatecontacts/${id}`)
      // .get(`http://localhost:8080/updatecontacts/${id}`)
      .then((res) => {
        setFormData(res.data);

      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  useEffect(() => {
      const token = localStorage.getItem("token");
      if (token) {
        const decoded = jwtDecode(token);
        setUserId(decoded.userId);
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

      await axios.put(
        `https://womensafety-r0s4.onrender.com/updatecontacts/${id}`,
        // `http://localhost:8080/updatecontacts/${id}`,
        formData,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      alert("Contact Updated Successfully");
      navigate(`/contacts/${userId}`);
    } catch (err) {
      console.log(err);
      alert("Failed to update contact");
    }
  };

  return (
    <div className="container">
      <h2>Update Contact</h2>

      <form onSubmit={handleSubmit} className="contact-form">
        <input
          type="text"
          name="contactName"
          placeholder="Contact Name"
          value={formData.contactName}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="relation"
          placeholder="Relation"
          value={formData.relation}
          onChange={handleChange}
          required
        />

        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <button type="submit">
          Update Contact
        </button>
      </form>
    </div>
  );
}

export default UpdateContact;