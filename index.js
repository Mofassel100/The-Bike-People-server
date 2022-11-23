
const express = require('express');
const cors = require('cors')



require('dotenv').config()
// middlewere
app.use(cors())
app.use(express.json())
