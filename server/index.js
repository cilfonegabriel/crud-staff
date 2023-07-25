const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'employees_crud',
})

app.post('/create',(req,res) => {
    const name = req.body.name;
    const age = req.body.age;
    const country = req.body.country;
    const post = req.body.post;
    const years = req.body.years;

    db.query('INSERT INTO employees (name, age, country, post, years) VALUES(?,?,?,?,?)',[name, age, country, post, years],
    (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send('Employee registered successfully!');
        }
    }
    );
});

app.get('/employees',(req,res) => {
    db.query('SELECT * FROM employees',
    (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    }
    );
});

app.put('/update',(req,res) => {
    const id = req.body.id;
    const name = req.body.name;
    const age = req.body.age;
    const country = req.body.country;
    const post = req.body.post;
    const years = req.body.years;

    db.query(
        'UPDATE employees SET name=?, age=?, country=?, post=?, years=? WHERE id=?',
        [name, age, country, post, years, id],
        (err, result) => {
          if (err) {
            console.log(err);
          } else {
            res.send('Employee updated successfully!');
          }
        }
      );      
});


app.listen(3001,() => {
    console.log ('running on port 3001');
});