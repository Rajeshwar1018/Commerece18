require('dotenv').config();
const express=require('express')
require('./utils/db')
const app = express();


const userRoutes=require('./Routes/UserRoutes')
const productRoutes=require('./Routes/ProductRoutes')
const cartRoutes=require('./Routes/CartRoutes')
const orderRoutes=require('./Routes/OrderRoutes')

app.use(express.json())
app.use("/api/user", userRoutes)
app.use("/api/product", productRoutes)
app.use("/api/cart", cartRoutes)
app.use("/api/order", orderRoutes)


const PORT = 4321;


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});



