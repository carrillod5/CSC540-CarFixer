
// window.onload = function(){


    fetch('/getcustomers', {
        method: 'GET',
    })
        .then(response => response.json())  // Parsing the JSON response
        .then(data => {
            // alert("customers data received")
            console.log('Response from server:', data);

            customerTable = document.getElementById('customerTable').getElementsByTagName("tbody")[0];

            // If `data` is an array of customers
            data.forEach(customer => {
                const newRow = customerTable.insertRow();
                const cellName = newRow.insertCell(0);
                const cellPhone = newRow.insertCell(1);
                const cellEmail = newRow.insertCell(2);
                const cellAddress = newRow.insertCell(3);
                const cellVehicles = newRow.insertCell(4);
                const cellActions = newRow.insertCell(5);

                // Fill in the cells with data
                cellName.textContent = customer.firstName + " " + customer.lastName;
                cellPhone.textContent = customer.phone;
                cellEmail.textContent = customer.email;
                cellAddress.textContent = customer.address;
                cellVehicles.textContent = customer.vehicles || "N/A";


                // Create an Edit button
                const editButton = document.createElement("button");
                editButton.textContent = "Edit";
                editButton.onclick = function() {
                    // Add logic to handle the edit action
                    // alert("for "+ customer.firstName+" "+customer.lastName)
                    openModal('editmodal')
                    document.getElementById('editFName').value = customer.firstName
                    document.getElementById('editLName').value = customer.lastName
                    document.getElementById('editFName').value = customer.firstName
                    document.getElementById('editPhoneNum').value = customer.phone
                    document.getElementById('editEmail').value = customer.email
                    document.getElementById('editAddress').value = customer.address

                };

                // Append the Edit button to the last cell (cellActions)
                cellActions.appendChild(editButton);
                    
                
            });


        })
        .catch(error => {
            console.error('Error sending data:', error);
        });
    // }


