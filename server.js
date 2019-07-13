const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');


const index = require('./routes/index')
const tasks = require('./routes/tasks')

const app = express();

const PORT = 3601

// View Engine

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile)

// Set Static folder ( Angular stuff here )

app.use(express.static(path.join(__dirname, 'client')))

// Body parser ( Read )
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.use('/', index)
app.use('/api', tasks)


app.listen(PORT, function(){
    console.log(`Back end server listening on port ${PORT}`)
})