fetch('/getupcomingappts',{
    method: 'GET',
    })
    .then(response => response.json())  // Parsing the JSON response
    .then(data => {
        console.log(data)

        const apptsDropdown = document.getElementById('appts');

        data.forEach(appointment => {
            const option = document.createElement('option');


            // Parse and format date
            const appointmentDate = new Date(appointment.date); // Parse the ISO string
            const formattedDate = appointmentDate.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            });

            // Parse and format time
            const [hours, minutes] = appointment.time.split(':');
            const formattedTime = new Date(0, 0, 0, hours, minutes).toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
            });

            option.value = appointment.id; // Use unique ID as the value
            option.textContent = `${appointment.customerName} - ${formattedDate} (${appointment.serviceName})`;
            
            
            
            apptsDropdown.appendChild(option);
        });

        apptsDropdown.addEventListener('change',function(){
            document.getElementById('paymentInfo').style.display='block'
        }
            

        )
        


    })
    .catch(error =>{
        console.log(error)

    })