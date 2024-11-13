fetch('/getemployees', {
    method: 'GET',
    })
    .then(response => response.json())  // Parsing the JSON response
    .then(data => {
        console.log('Response from server:', data);

        employeeTable = document.getElementById('employeeTable').getElementsByTagName("tbody")[0];
        
        data.forEach(employee => {
            const newRow = employeeTable.insertRow();
            const employeeName = newRow.insertCell(0);
            const employeeEmail = newRow.insertCell(1);
            const workPhone = newRow.insertCell(2);
            const personalPhone = newRow.insertCell(3);
            const totalAppts = newRow.insertCell(4);


            const cellActions = newRow.insertCell(5);

            // Fill in the cells with data
            employeeName.textContent = employee.firstName +" "+employee.lastName;
            employeeEmail.textContent = employee.email;
            workPhone.textContent = employee.workPhone;
            personalPhone.textContent = employee.personalPhone;
            totalAppts.textContent = employee.totalAppts;





            // Create an Edit button
            const editButton = document.createElement("button");
            editButton.textContent = "Edit";
            editButton.onclick = function() {
                // Add logic to handle the edit action
                // alert("for "+ customer.firstName+" "+customer.lastName)
                openModal('editmodal')
                document.getElementById('editFName').value = employee.firstName
                document.getElementById('editLName').value = employee.lastName
                document.getElementById('editEmail').value = employee.email
                document.getElementById('editWorkPhoneNum').value = employee.workPhone
                document.getElementById('editPersonalPhoneNum').value = employee.personalPhone
                


 

            };

            // // Append the Edit button to the last cell (cellActions)
            cellActions.appendChild(editButton);
                
            
        });
        

    })
    .catch(error => {
        console.error('Error sending data:', error);
    });
// }


