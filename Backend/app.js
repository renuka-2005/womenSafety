require("dotenv").config();

const express=require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors=require("cors");
const mongoose=require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const methodOverride = require("method-override");
const MongoStore = require("connect-mongo");
const session = require("express-session");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const router=express.Router();
const User=require("./models/User");
const Alert=require("./models/Alert");
const Contact=require("./models/Contact");
const Location=require("./models/Location");
const nodemailer = require("nodemailer");
const twilio = require("twilio");
const { v4: uuidv4 } = require("uuid");
const auth=require("./middleware/auth");


const dbUrl = process.env.MONGODB_URI;

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride("_method"));
app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "/public")));

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

io.on("connection", (socket) => {

  console.log(
    "User Connected:",
    socket.id
  );

 socket.on("locationUpdate", (data) => {

  io.emit(
    data.trackingId,
    data
  );

});

  socket.on("disconnect", () => {

    console.log(
      "User Disconnected"
    );

  });

});
async function main() {
  await mongoose.connect(dbUrl);
}
main()
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

const store = MongoStore.create({
  mongoUrl: dbUrl,
  crypto: {
    secret: process.env.SECRET,
  },
  touchAfter: 24 * 3600,
});

app.use(
  session({
    store: store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,

    cookie: {
      expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    },
  })
);

store.on("error", () => {
  console.log("SESSION STORE ERROR");
});


const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

async function sendSOSMail(email, locationLink) {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "SOS Emergency Alert",
    text: `
SOS ALERT!

I need immediate help.

My Location:
${locationLink}
    `,
  });
}

async function sendSOSSMS(phone, locationLink) {

  try {

    await twilioClient.messages.create({

      body: `
🚨 SOS ALERT 🚨

Emergency assistance required.

Location:
${locationLink}
      `,

      from: process.env.TWILIO_PHONE_NUMBER,

      to: phone

    });

    console.log(
      "SMS Sent Successfully"
    );

  } catch (error) {

    console.log(
      "SMS Error:",
      error.message
    );

  }

}

app.post('/register', async (req, res) => {
 try {
 const { username, email, password,phone,emergency_contact } = req.body;
 const hashedPassword = await bcrypt.hash(password, 10);
 const user = new User({ username, email, password: hashedPassword ,phone,emergency_contact});
 await user.save();
 res.status(201).json({ message: 'User registered successfully' });
 } catch (error) {
 res.status(500).json({ error: 'Registration failed' });
 }
 });

app.post('/login', async (req, res) => {
 try {
 const { username, password } = req.body;
 const user = await User.findOne({ username });
 if (!user) {
 return res.status(401).json({ error: 'Authentication failed' });
 }
 const passwordMatch = await bcrypt.compare(password, user.password);
 if (!passwordMatch) {
 return res.status(401).json({ error: 'Authentication failed' });
 }
 const token = jwt.sign({ userId: user._id }, process.env.SECRET, {
 expiresIn: '1h',
 });
 res.status(200).json({ token });
 } catch (error) {
 res.status(500).json({ error: 'Login failed' });
 }
 });


 app.get("/current-user", async (req, res) => {

  try {

    const authHeader =
      req.headers.authorization;

    console.log("HEADER:", authHeader);

    if (!authHeader) {

      return res.status(401).json({
        message: "No token provided",
      });

    }

    const token =
      authHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.SECRET
    );

    console.log(decoded);

    const user = await User.findById(
      decoded.userId
    );

    if (!user) {

      return res.status(404).json({
        message: "User not found",
      });

    }

    res.status(200).json(user);

  } catch (err) {

    console.log(err);

    res.status(401).json({
      message: "Invalid Token",
    });

  }

});

app.post("/contacts",async(req,res)=>{
 try{
   const {contactName,relation,phone,email}=req.body;
  const token = req.headers.authorization;

    console.log("TOKEN:", token);

    if (!token) {

      return res.status(401).json({
        message: "No token provided",
      });

    }

    const decoded = jwt.verify(
      token,
      process.env.SECRET
    );

    const newContacts=new Contact({
      userId:decoded.userId,
      contactName:contactName,
      relation:relation,
      phone:phone,
      email: email
    });
    await newContacts.save();
    res.status(201).json({ message: 'contacts added successfully' });
 } catch(err){
  console.error("CONTACT ERROR:", err);

  res.status(500).json({
    message: err.message
  });
}
});

app.get("/contacts/:id", async (req, res) => {
  try {
    const contacts = await Contact.find({ userId: req.params.id });

    if (!contacts)
      return res.status(404).json({
        message: "contacts not found"
      });

    res.status(200).json(contacts);

  } catch (error) {
    res.status(500).json({
      message: "Error fetching contacts",
      error
    });
  }
});
app.delete("/deletecontacts/:id",auth,async(req,res)=>{
  try{
    const contactId=req.params.id;
    const deletedContact=await Contact.findOneAndDelete({userId:contactId});
    if(!deletedContact){
      return res.status(404).json({
        success: false,
        message: "Contact not found"
      });
    }
     res.status(200).json({
      success: true,
      message: "Contact deleted successfully",
      data: deletedContact
    });
  } catch(err){
    console.log(err);

    res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
});

app.put("/updatecontacts/:id", auth, async (req, res) => {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true
      }
    );

    if (!updatedContact) {
      return res.status(404).json({
        success: false,
        message: "Contact not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Contact updated successfully",
      data: updatedContact
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});
app.post("/sos", async (req, res) => {
  try {
    const { latitude, longitude , locationAddress} = req.body;
    const token = req.headers.authorization;
const trackingId = uuidv4();
    console.log("TOKEN:", token);

    if (!token) {

      return res.status(401).json({
        message: "No token provided",
      });

    }

    const decoded = jwt.verify(
      token,
      process.env.SECRET
    );

    const locationLink =
      `https://maps.google.com/?q=${latitude},${longitude}`;

    const contacts = await Contact.find();
    const trackingLink =
`https://womensafety-1-01fw.onrender.com//${trackingId}`;
    for (const contact of contacts) {

  if (contact.phone) {

    await sendSOSSMS(
      contact.phone,
     trackingLink
    );

  }

}
console.log("Latitude:", latitude);
console.log("Longitude:", longitude);
    const alert=new Alert({
      userId:decoded.userId,
      latitude,
      longitude,
      locationAddress,
      trackingId
    });
    await alert.save();
    io.emit("receiveLocation", {
  userId: decoded.userId,
  latitude,
  longitude,
  locationAddress,
  timestamp: new Date()
});
    res.json({
  success: true,
  trackingId,
  trackingLink:
    `https://womensafety-1-01fw.onrender.com/track/${trackingId}`
});
    
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Failed to send alerts",
    });
  }
});


app.post(
 "/update-location",
 async (req,res) => {

 const {
   trackingId,
   latitude,
   longitude
 } = req.body;

 await Location.findOneAndUpdate(

   { trackingId },

   {
     trackingId,
    latitude,
    longitude
   },
    {
    upsert: true,
    new: true
  }

 );

 io.emit(
   trackingId,
   {
     latitude,
     longitude
   }
 );

 res.json({
   success:true
 });

});

app.get("/alerts/:id",async(req,res)=>{
  try {
    const alerts = await Alert.find({ userId: req.params.id });

    if (!alerts)
      return res.status(404).json({
        message: "alerts not found"
      });

    res.status(200).json(alerts);

  } catch (error) {
    res.status(500).json({
      message: "Error fetching alerts",
      error
    });
  }
});


app.post("/location",async(req,res)=>{
  try{
    const {latitude,longitude}=req.body;
     const token = req.headers.authorization;

    console.log("TOKEN:", token);

    if (!token) {

      return res.status(401).json({
        message: "No token provided",
      });

    }

    const decoded = jwt.verify(
      token,
      process.env.SECRET
    );

    const newLocation=new Location({
      userId:decoded.userId,
      latitude:latitude,
      longitude:longitude,
     
    });
    await newLocation.save();
    res.status(201).json({message:"location added successfully"});

  } catch(err){
    res.status(500).json({message:"Server Error"});
  }
});

app.get("/location-history",async(req,res)=>{
  try{
     const token = req.headers.authorization;

    console.log("TOKEN:", token);

    if (!token) {

      return res.status(401).json({
        message: "No token provided",
      });

    }

    const decoded = jwt.verify(
      token,
      process.env.SECRET
    );
    const locations= await Location.find({
      userId:decoded.userId
    });
    res.status(200).json({Location:locations});

  } catch(err){
    console.log(err);
   res.status(500).json({
      message:"Server Error",
      error: err.message
   });
  }
});




server.listen(8080, () => {
  console.log("Server running on port 8080");
});
