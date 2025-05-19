require('dotenv').config();
const express=require('express')
require('./utils/db')
const app = express();


const userRoutes=require('./Routes/UserRoutes')
const productRoutes=require('./Routes/ProductRoutes')

app.use(express.json())
app.use("/api/user", userRoutes)



const PORT = 4321;



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});



