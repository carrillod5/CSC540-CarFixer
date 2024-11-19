// alert('vehicles.js being read')
fetch('/getcars', {
    method: 'GET',
    })
    .then(response => response.json())  // Parsing the JSON response
    .then(data => {
        console.log(data)
        cars = data.results

        carOption = document.getElementById('cars')

        cars.forEach(car => {
            // Create an option element


            const option = document.createElement('option');
            // Set the option text and value
            option.textContent = `${car.customerName} - ${car.carMake} ${car.carModel} ${car.carYear}`; // Use `car.name` if car is an object, or `car` if it's a string
            option.value = car.licensePlate; // Similarly, use `car.value` or the raw car data

            // Append the option to the select element
            carOption.appendChild(option);
        });




    })

    .catch(error => {
        console.error('Error sending data:', error);
    });



fetch('/getservices', {
    method: 'GET',
    })
    .then(response => response.json())  // Parsing the JSON response
    .then(data => {
        // console.log('Response from server:', data);

        console.log(data)
  
        serviceOption = document.getElementById('services')

        data.forEach(service => {
            // Create an option element


            const option = document.createElement('option');
            // Set the option text and value
            option.textContent = service.serviceName; // Use `car.name` if car is an object, or `car` if it's a string
            option.value = service.serviceName; // Similarly, use `car.value` or the raw car data

            // Append the option to the select element
            serviceOption.appendChild(option);
        });

        serviceOption.addEventListener('change', event => {
            const selectedValue = event.target.value;
            // alert(`You selected: ${selectedValue}`);
            employeeOption = document.getElementById('employees')
            // Clear all existing options

            fetch(`/getserviceemployees?service=${selectedValue}`, {
                method: 'GET',
                })
            .then(response => response.json())  // Parsing the JSON response
            .then(employees => {
                employeeOption.innerHTML = ''; 



                if(employees.length==0){
                    alert(`No Employee assigned to this service!`)
                    document.getElementById('items').style.display='none'
                    employeeOption.style='display: none;'
                    serviceOption.value=""
                    return
                }

                employeeOption.style='display: block; margin: 0 auto;'
    
                document.getElementById('items').style='display:block; margin: 0 auto; align:center;'


                employees.forEach(employee => {

                    const option = document.createElement('option');
                    // Set the option text and value
                    option.textContent = employee.firstName +" "+employee.lastName // Use `car.name` if car is an object, or `car` if it's a string
                    option.value = employee.employeeId; // Similarly, use `car.value` or the raw car data
        
                    // Append the option to the select element
                    employeeOption.appendChild(option);
                    
    

                })


            })
            .catch(error => {
                console.error('Error sending data:', error);
            });
        })






    })
    .catch(error => {
        console.error('Error sending data:', error);
    });

    fetch('/getitems', {
        method: 'GET',
        })
        .then(response => response.json())  // Parsing the JSON response
        .then(data => {
            console.log('Response from server:', data);

            itemCheckbox = document.getElementById('items')
            data.forEach(item =>{

                if (item.stock==0){
                    return
                }
                    // Create a label for the checkbox
                const label = document.createElement('label');
                label.textContent = item.itemName;
                label.htmlFor = item.itemName;

                // Create the checkbox input
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.id = item.itemName;
                checkbox.name = item.itemName;
                checkbox.value = item.itemName;

                // Append the checkbox and label to the items div
                itemCheckbox.appendChild(label);
                itemCheckbox.appendChild(checkbox);
                itemCheckbox.appendChild(document.createElement('br')); // Add a line break for spacing
                itemCheckbox.appendChild(document.createElement('br')); // Add a line break for spacing


            } )
    
        })
        .catch(error => {
            console.error('Error sending data:', error);
        });



