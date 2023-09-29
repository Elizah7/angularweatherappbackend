const express = require("express")
const app = express(express())
const cors = require("cors")

const { connection } = require("./config/db")
const router = require("./routes/weather_route")

require("dotenv").config()
app.use(cors())
app.use(express.json())

app.use("/weather",router)




app.listen(process.env.port, async () => {
   try {
      await connection
      console.log("connected to mongodb")
   } catch (error) {
      console.log(error.message)
   }
   console.log("server is running")
})

