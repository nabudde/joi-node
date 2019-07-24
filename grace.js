const Joi = require("joi");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(express.json());
bodyParser.json(app);

let signup = [];
let signin = [];
let Trips = [];
let bookings = [];


app.post("/api/v1/signup", (req, res) => {
  const schema = Joi.object().keys({
    Email: Joi.string().regex(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/).required(),
    Password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
    First_name: Joi.string().alphanum().min(3).max(30).required(),
    Last_name: Joi.string().alphanum().min(3).max(30).required()
  });
  const result = Joi.validate(req.body, schema);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
  }
  const create_signup = {
    Email: req.body.Email,
    Password: req.body.Password,
    First_name: req.body.First_name,
    Last_name: req.body.Last_name
  };
  const result_signup={
    First_name: req.body.First_name,
    Last_name: req.body.Last_name,
    Email: req.body.Email
  }

  signup.push(create_signup);
  res.send(result_signup);
});

app.post("/api/v1/signin", (req, res) => {
  const schema = Joi.object().keys({
    Email: Joi.string().regex(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/).required(),
    Password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required()
  });
  const result = Joi.validate(req.body, schema);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
  }

  const create_signin = {
    Email: req.body.Email,
    Password: req.body.Password
  };
  
  signin.push(create_signin);
  res.send(create_signin);
});

app.post("/api/v1/create", (req, res) => {
  const schema = Joi.object().keys({
    trip_id: Joi.number().required(),
    seating_capacity: Joi.number().required(),
    bus_license_number: Joi.number().required(),
    origin: Joi.string().alphanum().required(),
    destination: Joi.string().alphanum().required(),
    trip_date: Joi.date().required(),
    fare: Joi.number().required()
  });
  const result = Joi.validate(req.body, schema);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
  }
  const create_trip = {
    trip_id: req.body.trip_id,
    seating_capacity: req.body.seating_capacity,
    bus_license_number: req.body.bus_license_number,
    origin: req.body.origin,
    destination: req.body.destination,
    trip_date: req.body.trips_date,
    fare: req.body.fare
  };
  Trips.push(create_trip);
  res.send(create_trip);
});

app.get("/api/v1/trips", (res, req) => {
  req.json({
      status: "success",
      data: Trips
  });
});
app.get("/api/v1/trips/:trip_id", (req, res) => {
  const specificTrip = Trips.find(t => t.trip_id == req.params.trip_id);
  if (!specificTrip)
    res.status(404).send("the provided trip_id is not available");
  res.send(specificTrip);
});
app.delete("/api/v1/delete/:trip_id", (req, res) => {
  const tripDelete = Trips.find(t => t.trip_id == req.params.trip_id);
  if (!tripDelete)
    res.status(404).send("the provided trip_id is not available");
  const index = Trips.indexOf(tripDelete);
  Trips.splice(index, 1);
  res.send(tripDelete);
});
app.post("/api/v1/bookaseat", (req, res) => {
    const schema = Joi.object().keys({
        id: Joi.number().required(),
        trip_id: Joi.number().required(),
        user_id: Joi.number().required(),
        created_on: Joi.date().required()
      });
      const result = Joi.validate(req.body, schema);
      if (result.error) {
        res.status(400).send(result.error.details[0].message);
      }
  const bookASeat = {
    id: req.body.id,
    trip_id: req.body.trip_id,
    user_id: req.body.user_id,
    created_on: req.body.created_on
  };
  bookings.push(bookASeat);
  res.send(bookASeat);
});
app.get("/api/v1/allbookings", (req, res) => {
  res.send(bookings);
});
app.delete("/api/v1/deletebooking/:id", (req, res) => {
  const deleteBooking = bookings.find(b => b.id == req.params.id);
  if (!deleteBooking) res.status(404).send("provided id is not available");
  const Index = bookings.indexOf(deleteBooking);
  bookings.splice(Index, 1);
  res.send(deleteBooking);
});

app.listen(4000, () => console.log("Listening on port 4000"));
