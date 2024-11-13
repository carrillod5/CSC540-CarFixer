fetch('/getservices', {
    method: 'GET',
    })
    .then(response => response.json())  // Parsing the JSON response
    .then(data => {
        console.log('Response from server:', data);

        serviceTable = document.getElementById('serviceTable').getElementsByTagName("tbody")[0];
        
        data.forEach(service => {
            const newRow = serviceTable.insertRow();
            const serviceName = newRow.insertCell(0);
            const serviceDescription = newRow.insertCell(1);
            const cellActions = newRow.insertCell(2);

            // Fill in the cells with data
            serviceName.textContent = service.serviceName;
            serviceDescription.textContent = service.serviceDescription;



            // Create an Edit button
            const editButton = document.createElement("button");
            editButton.textContent = "Edit";
            editButton.onclick = function() {
                // Add logic to handle the edit action
                // alert("for "+ customer.firstName+" "+customer.lastName)
                openModal('editmodal')
                document.getElementById('editServiceName').value = service.serviceName
                document.getElementById('editServiceDescription').value = service.serviceDescription
 

            };

            // Append the Edit button to the last cell (cellActions)
            cellActions.appendChild(editButton);
                
            
        });
        

    })
    .catch(error => {
        console.error('Error sending data:', error);
    });
// }


