// alert('vehicles.js being read')
fetch('/getappts',{    
    method: 'GET',
    }
)
    .then(response => response.json())
    .then(data =>{
        console.log(data)

    })
    .catch(error => 
        console.log("error retrieving appointments "+ error)

    )

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

document.getElementById('addappt').onclick = function(){
    alert('adding appointment')

    apptDate = document.getElementById('apptDate').value
    apptTime = document.getElementById('apptTime').value
    apptIssue = document.getElementById('apptIssue').value

    carId = document.getElementById('cars').value
    service = document.getElementById('services').value
    employeeId = document.getElementById('employees').value

    checkedItems = getCheckedItems()
    formData = {
        date:apptDate,
        time: apptTime,
        issue: apptIssue,
        carId: carId,
        service: service,
        employeeId:employeeId,
        items: checkedItems
    }
    console.log(formData)


    fetch('addappt', {
        method: 'POST',  // Use POST to add data to the server
        headers: {
            'Content-Type': 'application/json'  // Inform server we're sending JSON data
        },
        body: JSON.stringify(formData)})
    .then(response => response.json())
    .then(data =>{
        console.log(data)
        if (data.message=='success'){
            alert("appointment added to database")
            location.reload();

        }
        else{
            alert('logical error')
        }
    })
    .catch(error => {
        console.error('Error sending data:', error);
    });

        
}

// Function to get checked items
function getCheckedItems() {

    const itemCheckbox = document.getElementById('items');


    // Get all checkboxes inside the itemCheckbox div
    const checkboxes = itemCheckbox.querySelectorAll('input[type="checkbox"]');
    const checkedItems = [];

    // Iterate over checkboxes and collect checked ones
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            checkedItems.push(checkbox.value);
        }
    });

    return checkedItems;
}



