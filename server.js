const express = require('express');
const app = express();

const { connect } = require('./db');
connect();

const allRoute = require('./routes/all.route');
const activeRoute = require('./routes/active.route');
const completedRoute = require('./routes/completed.route');

app.set("json spaces", 2);
app.use(express.json());
app.use("/", allRoute);
// app.use("/active", activeRoute);
// app.use("completed", completedRoute);

app.listen(8080);