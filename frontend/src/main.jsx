import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login.jsx";
import Register from "./Register.jsx";
import DashBoard from "./DashBoard.jsx";
import Navbar from "./Navbar.jsx";
import Home from "./Home.jsx";
import Footer from "./Footer.jsx";
import Contacts from "./Contacts.jsx";
import AddContact from "./AddContact.jsx";
import UpdateContact from "./UpdateContact.jsx";
import Alert from "./Alert.jsx";
import TrackLocation from "./TrackLocation.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Navbar />

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/alerts/:id" element={<Alert />} />
      <Route path="/dashboard" element={<DashBoard />} />
      <Route path="/updatecontacts/:id" element={<UpdateContact />} />
      <Route path="/contacts/:id" element={<Contacts />} />
      <Route path="/addcontact" element={<AddContact />}></Route>
      <Route path="/register" element={<Register />} />
      <Route path="/track/:trackingId" element={<TrackLocation />} />
      <Route path="/login" element={<Login />} />
    </Routes>
    <Footer />
  </BrowserRouter>,
);
