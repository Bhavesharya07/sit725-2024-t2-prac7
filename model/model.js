import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    appointmentDate: {
        type: Date,
        required: true
    }
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

export default Appointment;
