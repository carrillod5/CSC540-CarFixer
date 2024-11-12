fetch('/getitems', {
    method: 'GET',
    })
    .then(response => response.json())  // Parsing the JSON response
    .then(data => {
        console.log('Response from server:', data);

        itemTable = document.getElementById('itemTable').getElementsByTagName("tbody")[0];
        
        data.forEach(item => {
            const newRow = itemTable.insertRow();
            const itemName = newRow.insertCell(0);
            const itemPrice = newRow.insertCell(1);
            const itemStock = newRow.insertCell(2);
            const cellActions = newRow.insertCell(3);

            // Fill in the cells with data
            itemName.textContent = item.itemName;
            itemPrice.textContent = '$'+item.price;
            itemStock.textContent = item.stock;





            // Create an Edit button
            const editButton = document.createElement("button");
            editButton.textContent = "Edit";
            editButton.onclick = function() {
                // Add logic to handle the edit action
                // alert("for "+ customer.firstName+" "+customer.lastName)
                openModal('editmodal')
                document.getElementById('editItemName').value = item.itemName
                document.getElementById('editItemPrice').value = item.price
                document.getElementById('editItemStock').value = item.stock

 

            };

            // Append the Edit button to the last cell (cellActions)
            cellActions.appendChild(editButton);
                
            
        });
        

    })
    .catch(error => {
        console.error('Error sending data:', error);
    });
// }


