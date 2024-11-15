fetch('/getemployees', {
    method: 'GET',
    })
    .then(response => response.json())  // Parsing the JSON response
    .then(data => {
        console.log('Response from server:', data);

        employeeTable = document.getElementById('employeeTable').getElementsByTagName("tbody")[0];
        
        data.forEach(employee => {
            const newRow = employeeTable.insertRow();
            const employeeId = newRow.insertCell(0);
            const employeeName = newRow.insertCell(1);
            const employeeEmail = newRow.insertCell(2);
            const workPhone = newRow.insertCell(3);
            const personalPhone = newRow.insertCell(4);
            const totalAppts = newRow.insertCell(5);


            const cellActions = newRow.insertCell(6);

            const cellActions2 = newRow.insertCell(7);


            // Fill in the cells with data
            employeeId.textContent = employee.employeeId;
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

            // Create an Edit Services button
            const editServices = document.createElement("button");
            editServices.textContent = "Edit Services";
            editServices.onclick = function() {
                // Add logic to handle the edit action
                // alert("for "+ customer.firstName+" "+customer.lastName)
                openModal('editservices')

                getServices(employee);


            };

            // Append the buttons to the last cell (cellActions)
            cellActions.appendChild(editButton);

            cellActions2.appendChild(editServices);

                
            
        });
        

    })
    .catch(error => {
        console.error('Error sending data:', error);
    });

function getServices(employee){

    fetch('/getservices', {
        method: 'GET',
        })
        .then(response => response.json())  // Parsing the JSON response
        .then(data => {
            console.log('Response from server:', data);

            
            const servicesList = document.getElementById('servicesList');
            servicesList.innerHTML = '';  // Clear previous checkboxes

            // Create checkboxes based on services returned from the server
            data.forEach(service => {
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.id = service.serviceName;
                checkbox.name = 'services';
                checkbox.value = service.serviceName;

                // Label for the checkbox
                const label = document.createElement('label');
                label.htmlFor = service.serviceName;
                label.textContent = service.serviceName;

                // Append the checkbox and label to the services list
                servicesList.appendChild(checkbox);
                servicesList.appendChild(label);
                servicesList.appendChild(document.createElement('br')); // Line break
                servicesList.appendChild(document.createElement('br')); // Line break

                document.getElementById('updateServices').onclick = function(){
                    alert('updating services for '+employee.firstName+" "+employee.lastName)

                    // Collect the checked checkboxes
                    const checkedServices = [];
                    const checkboxes = document.querySelectorAll('#servicesList input[type="checkbox"]:checked');

                    checkboxes.forEach(checkbox => {
                        checkedServices.push(checkbox.value);
                    });

                    // Log the selected services or send them to the server
                    console.log(`Employee:${employee.employeeId}  Selected services: ${checkedServices}`);

                                

                }
            });

            
    
        })
        .catch(error => {
            console.error('Error sending data:', error);
        });


}

