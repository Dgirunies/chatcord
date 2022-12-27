const path = require('path')
const express = require('express')

const app = express()
const PORT = 3000 || process.env.PORT

// SET STATIC FOLDER TO BE ABLE TO ACCESS IT
app.use(express.static(path.join(__dirname, 'public')))


app.listen(PORT, () => console.log(`Server running on port ${PORT}`))