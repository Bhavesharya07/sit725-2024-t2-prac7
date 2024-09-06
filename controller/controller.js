import Appointment from '../model/model.js';

export const bookAppointment = (req, res) => {
    const appointment = new Appointment({
        fullName: req.body.fullName,
        phoneNumber: req.body.phoneNumber,
        department: req.body.department,
        appointmentDate: req.body.appointmentDate
    });

    appointment.save()
        .then(() => {
            res.send('Appointment booked successfully');
        })
        .catch((err) => {
            res.status(500).send('Error occurred while booking appointment');
        });
};
