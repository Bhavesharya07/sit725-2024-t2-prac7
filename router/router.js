import express from 'express';
import { bookAppointment } from '../controller/controller.js';

const router = express.Router();

router.post('/submit_appointment', bookAppointment);

export default (app) => {
    app.use('/appointments', router);
};
