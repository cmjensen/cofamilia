require('dotenv').config();
const express = require('express')
const userCtrl = require('./controllers/user')
const expensesCtrl = require('./controllers/expenses')
const contactsCtrl = require('./controllers/contacts')
const childCtrl = require('./controllers/child')
const mailCtrl = require('./controllers/mailer')
const massive = require('massive')
const session = require('express-session')
// const path = require('path')


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
app.put('/api/expense/:expense_id', expensesCtrl.updateExpense)
app.delete('/api/expense/:expense_id', expensesCtrl.deleteExpense);

//CONTACTS ENDPOINTS
app.get('/api/contacts', contactsCtrl.getContacts);
app.post('/api/contact', contactsCtrl.addContacts);
app.put('/api/contact/:contact_id', contactsCtrl.updateContact);
app.delete('/api/contact/:contact_id', contactsCtrl.deleteContact);


//CHILD ENDPOINTS
app.get('/api/child', childCtrl.getChild);
app.post('/api/child', childCtrl.addChild);
app.get('/api/child/join', childCtrl.checkJoin);

//MAIL ENDPOINT
app.post('/api/mail', mailCtrl.sendEmail);


app.listen(SERVER_PORT, () => console.log(`Running on port ${SERVER_PORT}`));

// app.use( express.static( `${__dirname}/../build`));

// app.get('*', ( req,res )=> { 
// res.sendFile(path.join(__dirname, '../build/index.html')) 
// })