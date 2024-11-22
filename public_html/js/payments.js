fetch('/getupcomingappts',{
    method: 'GET',
    })
    .then(response => response.json())  // Parsing the JSON response
    .then(data => {
        console.log(data)

        const apptsDropdown = document.getElementById('appts');


        const customerDropdown = document.getElementById('customers');

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

            option.value = appointment.appointmentId; // Use unique ID as the value
            option.textContent = `${appointment.customerName} - ${formattedDate} (${appointment.serviceName})`;
            
            
            
            apptsDropdown.appendChild(option);

            const customerOption = document.createElement('option');


            customerOption.value = appointment.customerId
            customerOption.textContent = appointment.customerName;

            customerDropdown.appendChild(customerOption)
        
            
            apptsDropdown.addEventListener('change',function(){
                document.getElementById('paymentInfo').style.display='block'
                customerDropdown.value=appointment.customerId
                customerDropdown.disabled = true;

                paymentDue = document.getElementById('paymentDue')
                charge = document.getElementById('charge')
                paid = document.getElementById('paid')

                document.getElementById('addNewPayment').onclick = function(){
                    alert('adding new payment')
                    if (!paymentDue || !charge || !paid){
                        alert('Fill out everything!')
                        return
                    }

                    paymentData = {
                        apptId: parseInt(apptsDropdown.value),
                        customerId:parseInt(customerDropdown.value),
                        paymentDue:paymentDue.value,
                        charge:parseFloat(charge.value),
                        paid:parseFloat(paid.value)
                    }

                    fetch('/addnewpayment', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(paymentData),
                    })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(`HTTP error! Status: ${response.status}`);
                        }
                        return response.json();
                    })
                    .then(data => {
                        console.log(data)
                        if (data.message=='success'){
                            alert("payment added")
                        }
                        else{
                            alert('logical error')
                        }
                        // if (data.message=='existing'){
                        //     alert("Service already exists!")
                        // }
                        // else if (data.message=='success'){
                        //     alert('Service successfully added')
                        //     location.reload(); // Reload to reflect changes
                
                        // }
                        // else{
                        //     alert('logical error')
                        // }
                        
                     
                    })
                    .catch(error => {
                        console.error('Error adding new payment:', error);
                        alert('Failed to add payment. Please try again.');
                    });
                    


                }
            }
                

        )
        

        });


    })
    .catch(error =>{
        console.log(error)

    })