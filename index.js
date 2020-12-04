const express = require('express');
const app = express();
const cors = require('cors');

const { connect } = require('./db');
connect();

const todosRoute = require('./routes/todos.route');

app.set("json spaces", 2);
app.use(cors());
app.use(express.json());
app.use("/api/todos", todosRoute);

app.listen(3001);