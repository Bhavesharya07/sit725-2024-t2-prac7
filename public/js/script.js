$(document).ready(function () {
    $('#appointmentForm').submit(function (event) {
        event.preventDefault(); 

        const formData = {
            fullName: $('#name').val(),
            phoneNumber: $('#phone').val(),
            department: $('#reason').val(),
            appointmentDate: $('#date').val()
        };

        $.ajax({
            type: 'POST',
            url: '/submit_appointment',
            data: formData,
            success: function (response) {
                alert(response); 
                $('#appointmentForm')[0].reset(); 
            },
            error: function (error) {
                alert('Error occurred while booking appointment. Please try again.'); 
            }
        });
    });
});
let socket = io();
 socket.on('number',(msg)=>{
 console.log('Random Number: ' + msg);
 });