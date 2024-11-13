const express = require('express');
const path = require('path')
const app = express();
const mysql = require('mysql2');


const port = 3000; // Change port number to something above 1024


require('dotenv').config();

const dbPort = process.env.DB_PORT || 3306; 

const connectionObj = {
  host: 'localhost',
  port:dbPort,
  user: 'caruser',
  password: 'Scsucsc540',
  database: 'CarFixer',
  connectionLimit:  10  
};

const pool = mysql.createPool(connectionObj);

// // Query to get all tables in the database
// pool.query('SELECT * FROM Customers', (err, results) => {
//   if (err) {
//     console.error('Error retrieving tables:', err.message);
//   } else {
//     console.log('Data in Customers Table');
//     console.log(results);
//   }
//   // Close the connection pool
//   // pool.end();
// });





// Serve static files from the 'public_html' directory
app.use(express.static(path.join(__dirname, 'public_html')));



app.get('/getemployees',(req,res)=>{

  pool.query('SELECT * FROM Employees', (err, results) => {
    if (err) {
      return console.error('Error retrieving Employees Table:', err.message);
    } else {
      console.log('Data in Items Table');
      console.log(results);
      return res.json(results)
    }
    // Close the connection pool
    // pool.end();
  })



} )


app.get('/getitems', (req,res) =>{

  pool.query('SELECT * FROM Items', (err, results) => {
    if (err) {
      return console.error('Error retrieving Items Table:', err.message);
    } else {
      console.log('Data in Items Table');
      console.log(results);
      return res.json(results)
    }
    // Close the connection pool
    // pool.end();
  })
}
);

app.get('/getservices', (req,res) =>{
  // Query to get all tables in the database
  pool.query('SELECT * FROM Services', (err, results) => {
    if (err) {
      return console.error('Error retrieving Services Table:', err.message);
    } else {
      console.log('Data in Services Table');
      console.log(results);
      return res.json(results)
    }
    // Close the connection pool
    // pool.end();
  })
}
);



app.get('/getcustomers', (req,res) =>{
  // Query to get all tables in the database
  pool.query('SELECT * FROM Customers', (err, results) => {
    if (err) {
      return console.error('Error retrieving Customers Table:', err.message);
    } else {
      console.log('Data in Customers Table');
      console.log(results);
      return res.json(results)
    }
    // Close the connection pool
    // pool.end();
  });
})



app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public_html','car-shop-index.html'));
});
app.get('/:file', (req, res) => {
  file = req.params.file

  res.sendFile(path.join(__dirname, 'public_html',file));
});
  
app.listen(port, '0.0.0.0', () => {
  console.log(`Server running at port ${port}`);
});
