const express = require('express')
const app = express()
const PORT = 3000
const productsRouter = require('./src/routes/products')
app.use(express.json())
app.use('/admin/products', productsRouter)

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
})
