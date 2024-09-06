import { expect } from 'chai';

describe('Book Appointment API', function () {
    this.timeout(5000);

    const bookAppointment = (req, res) => {
        const { fullName, phoneNumber, department, appointmentDate } = req.body;
        if (!fullName || !phoneNumber || !department || !appointmentDate) {
            return res.status(400).send('All fields are required.');
        }

        if (isNaN(phoneNumber)) {
            return res.status(400).send('Invalid phone number.');
        }

        // Mock department validation
        const validDepartments = ["Cardiology", "Neurology", "Pediatrics", "Orthopedics"];
        if (!validDepartments.includes(department)) {
            return res.status(400).send('Invalid department.');
        }

        // Check if appointment date is in the future
        const today = new Date();
        const appointment = new Date(appointmentDate);
        if (appointment <= today) {
            return res.status(400).send('Appointment date must be in the future.');
        }

        if (fullName.length > 100) {
            return res.status(400).send('Full name is too long.');
        }

        return res.send('Appointment booked successfully');
    };

    // Test for invalid department
    it('should return status 400 for invalid department', function (done) {
        const req = {
            body: {
                fullName: "John Doe",
                phoneNumber: "1234567890",
                department: "InvalidDepartment",
                appointmentDate: "2024-09-01"
            }
        };
        const res = {
            status: function (code) {
                expect(code).to.equal(400);
                return this;
            },
            send: function (message) {
                try {
                    expect(message).to.equal('Invalid department.');
                    done();
                } catch (err) {
                    done(err);
                }
            }
        };

        bookAppointment(req, res);
    });

    // Test for past appointment date
    it('should return status 400 for past appointment date', function (done) {
        const req = {
            body: {
                fullName: "John Doe",
                phoneNumber: "1234567890",
                department: "Cardiology",
                appointmentDate: "2023-08-01" 
            }
        };
        const res = {
            status: function (code) {
                expect(code).to.equal(400);
                return this;
            },
            send: function (message) {
                try {
                    expect(message).to.equal('Appointment date must be in the future.');
                    done();
                } catch (err) {
                    done(err);
                }
            }
        };

        bookAppointment(req, res);
    });

    // Test for excessively long full name
    it('should return status 400 for long full name', function (done) {
        const req = {
            body: {
                fullName: "A".repeat(101), 
                phoneNumber: "1234567890",
                department: "Cardiology",
                appointmentDate: "2024-09-01"
            }
        };
        const res = {
            status: function (code) {
                expect(code).to.equal(400);
                return this;
            },
            send: function (message) {
                try {
                    expect(message).to.equal('Full name is too long.');
                    done();
                } catch (err) {
                    done(err);
                }
            }
        };

        bookAppointment(req, res);
    });

    // Test for successful booking with different valid department
    it('should book an appointment successfully with another valid department', function (done) {
        const req = {
            body: {
                fullName: "Jane Smith",
                phoneNumber: "0987654321",
                department: "Neurology",
                appointmentDate: "2024-09-02"
            }
        };
        const res = {
            send: function (message) {
                try {
                    expect(message).to.equal('Appointment booked successfully');
                    done();
                } catch (err) {
                    done(err);
                }
            }
        };

        bookAppointment(req, res);
    });

    // Test for appointment date exactly one day in the future
    it('should book an appointment successfully for a date exactly one day in the future', function (done) {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);

        const req = {
            body: {
                fullName: "John Doe",
                phoneNumber: "1234567890",
                department: "Cardiology",
                appointmentDate: tomorrow.toISOString().split('T')[0]
            }
        };
        const res = {
            send: function (message) {
                try {
                    expect(message).to.equal('Appointment booked successfully');
                    done();
                } catch (err) {
                    done(err);
                }
            }
        };

        bookAppointment(req, res);
    });

    // Test for appointment date exactly at the current time
    it('should return status 400 for appointment date set to the current time', function (done) {
        const req = {
            body: {
                fullName: "John Doe",
                phoneNumber: "1234567890",
                department: "Cardiology",
                appointmentDate: new Date().toISOString()
            }
        };
        const res = {
            status: function (code) {
                expect(code).to.equal(400);
                return this;
            },
            send: function (message) {
                try {
                    expect(message).to.equal('Appointment date must be in the future.');
                    done();
                } catch (err) {
                    done(err);
                }
            }
        };

        bookAppointment(req, res);
    });
});
