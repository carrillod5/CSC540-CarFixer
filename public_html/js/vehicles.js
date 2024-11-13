// alert('vehicles.js being read')



fetch('/getcustomers', {
    method: 'GET',
})
    .then(response => response.json())  // Parsing the JSON response
    .then(customers => {

        const customerSelect = document.getElementById("customers");

        customers.forEach(customer =>{
            const option = document.createElement('option');
            option.value = customer.customerId
            option.textContent = customer.customerId+". "+customer.firstName+" "+customer.lastName
            customerSelect.appendChild(option);
        }


        )

    })

    .catch(error => {
        console.error('Error sending data:', error);
    });