window.onload = function () {
    const addButton = document.getElementById('addCustomer');
    const addModal = document.getElementById('modal');
    const editModal = document.getElementById('editmodal');

    // Function to close modals
    function closeModal(modalId) {
        document.getElementById(modalId).style.display = 'none';
    }

    // Function to open modals
    function openModal(modalId) {
        document.getElementById(modalId).style.display = 'block';
    }

    // Populate the table with existing customers
    fetch('/getcustomers', { method: 'GET' })
        .then(response => response.json())
        .then(data => {
            const customerTable = document.getElementById('customerTable').getElementsByTagName("tbody")[0];

            data.forEach(customer => {
                const newRow = customerTable.insertRow();
                const cellId = newRow.insertCell(0);
                const cellName = newRow.insertCell(1);
                const cellPhone = newRow.insertCell(2);
                const cellEmail = newRow.insertCell(3);
                const cellAddress = newRow.insertCell(4);
                const cellActions = newRow.insertCell(5);

                // Fill in the cells with data
                cellId.textContent = customer.customerId;
                cellName.textContent = `${customer.firstName} ${customer.lastName}`;
                cellPhone.textContent = customer.phone;
                cellEmail.textContent = customer.email;
                cellAddress.textContent = customer.address;

                // Create an Edit button
                const editButton = document.createElement("button");
                editButton.textContent = "Edit";
                editButton.onclick = function () {
                    openModal('editmodal');

                    // Populate modal fields with existing customer data
                    document.getElementById('editFName').value = customer.firstName;
                    document.getElementById('editLName').value = customer.lastName;
                    document.getElementById('editPhoneNum').value = customer.phone;
                    document.getElementById('editEmail').value = customer.email;
                    document.getElementById('editAddress').value = customer.address;

                    // Save changes
                    editModal.querySelector('input[type="submit"]').onclick = function () {
                        const updatedCustomer = {
                            customerId: customer.customerId,
                            firstName: document.getElementById('editFName').value,
                            lastName: document.getElementById('editLName').value,
                            phone: document.getElementById('editPhoneNum').value,
                            email: document.getElementById('editEmail').value,
                            address: document.getElementById('editAddress').value,
                        };

                        fetch('/updatecustomer', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(updatedCustomer),
                        })
                            .then(response => response.json())
                            .then(data => {
                                alert('Customer updated successfully!');
                                closeModal('editmodal');
                                location.reload(); // Reload to reflect changes
                            })
                            .catch(error => console.error('Error updating customer:', error));
                    };
                };

                cellActions.appendChild(editButton);
            });
        })
        .catch(error => console.error('Error fetching customers:', error));

    // Handle "Add New Customer"
    addButton.onclick = function () {
        openModal('modal');
        addModal.querySelector('input[type="submit"]').onclick = function () {
            const newCustomer = {
                firstName: document.getElementById('fname').value,
                lastName: document.getElementById('lname').value,
                phone: document.getElementById('phoneNum').value,
                email: document.getElementById('email').value,
                address: document.getElementById('address').value,
            };
    
            fetch('/addcustomer', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newCustomer),
            })
                .then(response => response.json())
                .then(data => {
                    alert('Customer added successfully!'); // Notification here
                    closeModal('modal');
                    location.reload(); // Reload the page to reflect changes
                })
                .catch(error => console.error('Error adding customer:', error));
        };
    };
    
};
