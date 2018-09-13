const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send({hi: 'there'})
})

const PORT = preocess.env.PORT || 5000;
app.listen(PORT);