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
  database: 'CarFixerUpdated',
  connectionLimit:  10  
};
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

const pool = mysql.createPool(connectionObj);
// Serve static files from the 'public_html' directory
app.use(express.static(path.join(__dirname, 'public_html')));
app.use(express.json());




// getting employees who offer a certain service
app.get('/getserviceemployees',(req,res) =>{
  service = req.query.service

  query = `SELECT DISTINCT firstName,lastName,employeeId 
    FROM Employee_Specialties 
    JOIN Employees USING (employeeId)
        WHERE serviceName='${service}' `

  pool.query(query, (err, results) => {
    if (err) {
        console.error('Database Error:', err); // Log the error
        res.status(500).send(err); // Send the error to the client
    } else {
        res.status(200).json(results);
    }
});

}
)

// Add Customer Endpoint
app.post('/addcustomer', (req, res) => {
  const { firstName, lastName, phone, email, address } = req.body;

  // Log the request body for debugging
  console.log('Request Body:', req.body);
  // firstName = req.body.firstName;
  // lastName = req.body.lastName;
  // phone = req.body.phone;
  // email = req.body.email;
  // address = req.body.address;

  const query = `
      INSERT INTO Customers (firstName, lastName, phone, email, address) 
      VALUES (?, ?, ?, ?, ?)`;

  pool.query(query, [firstName, lastName, phone, email, address], (err, results) => {
      if (err) {
          console.error('Database Error:', err); // Log the error
          res.status(500).send(err); // Send the error to the client
      } else {
          console.log('Insert Results:', results); // Log successful insert
          res.status(200).json({ message: 'Customer added successfully!' });
      }
  });
});

// app.post('/addcustomer', (req, res) => {
//     const { firstName, lastName, phone, email, address } = req.body;
//     const query = `INSERT INTO Customers (firstName, lastName, phone, email, address) VALUES (?, ?, ?, ?, ?)`;

//     connection.query(query, [firstName, lastName, phone, email, address], (err, results) => {
//         if (err) {
//             console.error('Error inserting customer:', err);
//             res.status(500).send('Failed to add customer.');
//         } else {
//             res.status(200).json({ message: 'Customer added successfully!' });
//         }
//     });
// });

// update customer
app.post('/updatecustomer', (req, res) => {
  const { customerId, firstName, lastName, phone, email, address } = req.body;
  const query = `
      UPDATE Customers 
      SET firstName = ?, lastName = ?, phone = ?, email = ?, address = ? 
      WHERE customerId = ?`;
  pool.query(query, [firstName, lastName, phone, email, address, customerId], (err, results) => {
      if (err) return res.status(500).send(err);
      res.json({ message: 'Customer updated successfully!' });
  });
});
// Delete customer

app.delete('/deletecustomer/:id', (req, res) => {
  const { id } = req.params;
  const query = `DELETE FROM Customers WHERE customerId = ?`;
  pool.query(query, [id], (err, results) => {
      if (err) return res.status(500).send(err);
      res.json({ message: 'Customer deleted successfully!' });
  });
});




app.get('/getemployeeservices',(req,res)=>{
  employeeId = req.query.employeeId

  pool.query(`SELECT serviceName 
    FROM Employee_Specialties 
    WHERE employeeId =${employeeId}`,(err, results)=> {
    if (err) {
        console.error('Error getting', err);
        return;
    }
    console.log(results)
    return res.json(results)

  });
  



})
// add new employee
app.post('/addemployee', (req, res) => {
  const { firstName, lastName, email, workPhone, personalPhone } = req.body;
  const query = `
      INSERT INTO Employees (firstName, lastName, email, workPhone, personalPhone)
      VALUES (?, ?, ?, ?, ?)`;
  pool.query(query, [firstName, lastName, email, workPhone, personalPhone], (err, results) => {
      if (err) return res.status(500).send(err);
      res.status(200).json({ message: 'Employee added successfully!' });
  });
});

// update employee information
app.post('/updateemployee', (req, res) => {
  const { employeeId, firstName, lastName, email, workPhone, personalPhone } = req.body;

  const query = `
      UPDATE Employees 
      SET firstName = ?, lastName = ?, email = ?, workPhone = ?, personalPhone = ? 
      WHERE employeeId = ?`;

  pool.query(query, [firstName, lastName, email, workPhone, personalPhone, employeeId], (err, results) => {
      if (err) return res.status(500).send(err);
      res.json({ message: 'Employee updated successfully!' });
  });
});


// delete employee

app.delete('/deleteemployee/:id', (req, res) => {
  const { id } = req.params;
  const query = `DELETE FROM Employees WHERE employeeId = ?`;
  pool.query(query, [id], (err, results) => {
      if (err) return res.status(500).send(err);
      res.json({ message: 'Employee deleted successfully!' });
  });
});

app.post('/updateemployeeservices',(req,res)=>{
  console.log(req.body)
  employeeId = req.body.employeeId
  services = req.body.services;


  pool.query(`delete from employee_specialties where employeeId=${employeeId}`,(err,results)=>{
    if (err) {
        console.error('Error deleting data:', err);
        return;
    }
    else{
      if (services.length==0){
        return res.json({message:'success'})
      }

      const values = services.map(service => [employeeId, service]);

      const sql = `INSERT INTO Employee_Specialties (employeeId, serviceName) VALUES ?`;

      pool.query(sql, [values], (err, results) => {
        if (err) {
            console.error('Error inserting data:', err);
            return;
        }
        return res.json({message:'success'})

      });
          

    }

  }
  
  )


})


app.delete('/deletecar/:licensePlate', (req, res) => {
  console.log(req.params)
  const { licensePlate } = req.params;
  const query = `DELETE FROM Cars WHERE licensePlate = '${licensePlate}'`;
  pool.query(query,  (err, results) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.json({ message: 'success' });
  });
});

app.post('/editcar',(req,res) =>{

  const {licensePlate, newLicensePlate, carMake,carModel,carYear,ownerId} = req.body;



  if (!licensePlate || !newLicensePlate || !carMake || !carModel || !carYear || !ownerId) {
    return res.status(400).json({ message: "Invalid input. All fields are required." });
  }
  query = `UPDATE Cars 
  SET licensePlate ='${newLicensePlate}', carMake = '${carMake}', carModel = '${carModel}',
  carYear = ${carYear}, ownerId = ${ownerId} 
  WHERE licensePlate='${licensePlate}';    
  `

  query = `UPDATE Cars 
      SET licensePlate = '${newLicensePlate}', carMake = '${carMake}', 
      carModel = '${carModel}', carYear = ${carYear}, ownerId = ${ownerId}
      WHERE licensePlate = '${licensePlate}';
    `;
  pool.query(query,(err,results)=>{
    if(err){
      console.log(err)
      res.status(404).json({message:"error in updating database",error:err});
    }
    else{
      console.log('car updated')
      return res.json({message:'success'})

    }


  })

})

app.get('/getcars',(req,res) =>{
  console.log('getting cars')

  pool.query(`SELECT Cars.*, customerId ,CONCAT(firstName, ' ',lastName) AS customerName
              FROM Cars
              JOIN Customers ON OwnerId = customerId;`, (err, results) => {
                if (err) {
                  return console.error('Error retrieving Items Table:', err.message);
                } 
                else {
                  console.log('Data in Cars Table joining customer name');
                  console.log(results);
                  return res.json({results})
                }
                })
})

app.post('/addcar',(req,res) =>{
  console.log(req.body)
  licensePlate = req.body.licensePlate
  carMake = req.body.carMake
  carModel = req.body.carModel
  carYear = parseInt(req.body.carYear)
  ownerId = parseInt(req.body.ownerId)

  pool.query(`SELECT * FROM Cars WHERE licensePlate='${licensePlate}'`, (err, results) => {
    if (err) {
      return res.status(404).send('Error retrieving Cars Table:', err.message);
    } else {
      if(results.length>0){
        return res.json({message:'existing'})

      }
      else{
        pool.query(`INSERT INTO Cars () 
          VALUES ('${licensePlate}','${carMake}','${carModel}',${carYear},${ownerId})
          `,(err,results)=>{
            if (err){
              return res.status(404).send('error inserting data '+err)
            }
            else{
              console.log('data inserted')
              return res.json({message:'success'})
            }



        })

      }
    }
    // Close the connection pool
    // pool.end();
  })


  


})

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


// delete a service
app.delete('/deleteservice/:serviceName', (req, res) => {
  const { serviceName } = req.params;
  const query = `DELETE FROM Services WHERE serviceName = '${serviceName}'`;
  pool.query(query,  (err, results) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.json({ message: 'success' });
  });
});

//adding service
app.post('/addservice',(req,res) =>{
  console.log(req.body)

  const {serviceName,serviceDescription,} = req.body;

  pool.query('SELECT * FROM Services WHERE serviceName = ?', [serviceName], (err, results) => {
    if (err) {
        return res.status(404).send('Error retrieving Service Table:', err.message);
    }
    console.log(results);

    if (results.length > 0) {
        console.log('data not added');
        return res.json({message: 'existing'});
    }

    pool.query('INSERT INTO Services (serviceName, serviceDescription) VALUES (?, ?)', 
        [serviceName, serviceDescription], 
        (err, results) => {
            if (err) {
                return res.status(404).send('Error inserting data: ' + err.message);
            }
            console.log('data inserted');
            return res.json({message: 'success'});
        }
    );
});
  // pool.query(`SELECT * FROM Services WHERE serviceName='${serviceName}'`, (err, results) => {
  //   if (err) {
  //     return res.status(404).send('Error retrieving Service Table:', err.message);
  //   } else {
  //     console.log(results.length)
  //     if(results.length>0){
  //       console.log('data not added')
  //       return res.json({message:'existing'})

  //     }
  //     else{
  //       pool.query(`INSERT INTO Services (serviceName,serviceDescription) 
  //         VALUES ('${serviceName}','${serviceDescription}')
  //         `,(err,results)=>{
  //           if (err){
  //             return res.status(404).send('error inserting data '+err)
  //           }
  //           else{
  //             console.log('data inserted')
  //             return res.json({message:'success'})
  //           }



  //       })

  //     }
  //   }

  // })


  


})

// edit service information
app.post('/editservice',(req,res) =>{

  console.log(req.body)
  const {newServiceDescription, serviceName} = req.body;
 
  query = `UPDATE Services 
      SET serviceDescription = '${newServiceDescription}'
      WHERE serviceName = '${serviceName}';
    `;
  pool.query(query,(err,results)=>{
    if(err){
      console.log(err)
      res.status(404).json({message:"error in updating database",error:err});
    }
    else{
      console.log('service updated')
      return res.json({message:'success'})

    }


  })

})


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
