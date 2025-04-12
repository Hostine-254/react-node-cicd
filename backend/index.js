const express = require("express")
const cors = require("cors")
const cookieParser = require('cookie-parser')
/**Added this to handle upload limits */
const bodyParser = require('body-parser') 
/**End of added portion */
require("dotenv").config()
const connectDB = require("./config/db")
const router = require("./routes")


const app = express()
app.use(bodyParser.json({limit: "50mb"}))
app.use(bodyParser.urlencoded({extended : true,parameterLimit : 100000,limit : "500mb"})) 
app.use(cors({
    origin : process.env.FRONTEND_URL,
    credentials : true,
}))
app.use(express.json())
app.use(cookieParser())

app.use("/api",router)

//  Serve static files from React
app.use(express.static(path.join(__dirname, '../frontend/build')));

//  Wildcard route to serve React for all unmatched GET requests
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

const PORT = 8080 || process.env.PORT

connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log("Connected to DB")
        console.log("Server is running")
    })

})
