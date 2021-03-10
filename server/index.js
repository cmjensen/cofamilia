require('dotenv').config();
const express = require('express')
const userCtrl = require('./controllers/user')
const expensesCtrl = require('./controllers/expenses')
const childCtrl = require('./controllers/child')
const mailCtrl = require('./controllers/mailer')
const massive = require('massive')
const session = require('express-session')


const app = express();
const { SESSION_SECRET, SERVER_PORT, CONNECTION_STRING } = process.env

app.use(express.json());
app.use(
    session({
        secret: SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24
        }
    })
)

massive({
    connectionString: CONNECTION_STRING,
    ssl: { rejectUnauthorized: false }
}).then( db => {
    app.set('db', db)
    console.log('db connected')
}).catch(err => console.log(err))

//AUTH ENDPOINTS
app.post('/api/auth/register', userCtrl.register);
app.post('/api/auth/login', userCtrl.login);
app.get('/api/auth/user', userCtrl.getUser);
app.post('/api/auth/logout', userCtrl.logoutUser);

//EXPENSES ENDPOINTS
app.get('/api/expenses', expensesCtrl.getExpenses);
app.post('/api/expense', expensesCtrl.addExpense);
app.put('/api/expense/:id', expensesCtrl.updateExpense)
app.delete('/api/expense/:id', expensesCtrl.deleteExpense);


//CHILD ENDPOINTS
app.get('/api/child', childCtrl.getChild);
app.post('/api/child', childCtrl.addChild);

//MAIL ENDPOINT
app.post('/api/mail', mailCtrl.sendEmail);


app.listen(SERVER_PORT, () => console.log(`Running on port ${SERVER_PORT}`));