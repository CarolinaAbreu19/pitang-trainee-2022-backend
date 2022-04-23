import request from 'supertest';
import app from '../app';

describe('GET /appointment', () => {
    test("List all appointments. There must be no appointments when starting the server", async () => {
        const listAppointments = await request(app).get('/appointment');

        expect(listAppointments.body).toHaveProperty("message");
        expect(listAppointments.body).toHaveProperty("appointments");
        expect(listAppointments.body.message).toBe("No results");
        expect(listAppointments.body.appointments.length).toBe(0);
        expect(listAppointments.statusCode).toBe(200);
    });
});

describe('POST /appointment', () => {
    test('Normal requisition, all inputs correctly informed. Must return status code 201', async () => {
        const newAppointment = await request(app)
            .post('/appointment')
            .send({
                name: 'jest test',
                birth_date: '23/04/2022',
                date_appointment: '23/04/2023',
                time_appointment: 8
            });

        expect(newAppointment.body).toHaveProperty("message");
        expect(newAppointment.body).toHaveProperty("appointment");

        expect(newAppointment.body.appointment).toHaveProperty("id");
        expect(newAppointment.body.appointment).toHaveProperty("name");
        expect(newAppointment.body.appointment).toHaveProperty("birth_date");
        expect(newAppointment.body.appointment).toHaveProperty("date_appointment");
        expect(newAppointment.body.appointment).toHaveProperty("time_appointment");
        expect(newAppointment.body.appointment).toHaveProperty("situation");

        expect(newAppointment.body.appointment.name).toBe("jest test");
        expect(newAppointment.body.appointment.birth_date).toBe("23/04/2022");
        expect(newAppointment.body.appointment.date_appointment).toBe("23/04/2023");
        expect(newAppointment.body.appointment.time_appointment).toBe(8);
        expect(newAppointment.body.appointment.situation).toBe("waiting");

        expect(newAppointment.statusCode).toBe(201);

        const response = await request(app).get("/appointment");
        expect(response.body).toHaveProperty("message");
        expect(response.body).toHaveProperty("appointments");
        expect(response.body.appointments.length).toBe(1);
        expect(response.statusCode).toBe(200);
    });
});

describe('POST /appointment', () => {
    test('Trying to make an appointment without the name field. Must return error 400', async () => {
        const newAppointment = await request(app)
            .post('/appointment')
            .send({
                birth_date: '23/04/2022',
                date_appointment: '23/04/2023',
                time_appointment: 8
            });

        expect(newAppointment.body).toHaveProperty("message");
        expect(newAppointment.body).toHaveProperty("error_path");
        expect(newAppointment.body.message).toBe("name is a required field");
        expect(newAppointment.body.error_path).toBe("name");
        expect(newAppointment.statusCode).toBe(400);

        const response = await request(app).get("/appointment");
        expect(response.body).toHaveProperty("message");
        expect(response.body).toHaveProperty("appointments");
        expect(response.body.appointments.length).toBe(1);
        expect(response.statusCode).toBe(200);
    });
});

describe('POST /appointment', () => {
    test('Trying to make an appointment without the birth_date field. Must return error 400', async () => {
        const newAppointment = await request(app)
            .post('/appointment')
            .send({
                name: 'jest test',
                date_appointment: '23/04/2023',
                time_appointment: 8
            });

        expect(newAppointment.body).toHaveProperty("message");
        expect(newAppointment.body).toHaveProperty("error_path");
        expect(newAppointment.body.message).toBe("birth_date is a required field");
        expect(newAppointment.body.error_path).toBe("birth_date");
        expect(newAppointment.statusCode).toBe(400);

        const response = await request(app).get("/appointment");
        expect(response.body).toHaveProperty("message");
        expect(response.body).toHaveProperty("appointments");
        expect(response.body.appointments.length).toBe(1);
        expect(response.statusCode).toBe(200);
    });
});

describe('POST /appointment', () => {
    test('Trying to make an appointment without the date_appointment field. Must return error 400', async () => {
        const newAppointment = await request(app)
            .post('/appointment')
            .send({
                name: 'jest test',
                birth_date: '23/04/2023',
                time_appointment: 8
            });

        expect(newAppointment.body).toHaveProperty("message");
        expect(newAppointment.body).toHaveProperty("error_path");
        expect(newAppointment.body.message).toBe("date_appointment is a required field");
        expect(newAppointment.body.error_path).toBe("date_appointment");
        expect(newAppointment.statusCode).toBe(400);

        const response = await request(app).get("/appointment");
        expect(response.body).toHaveProperty("message");
        expect(response.body).toHaveProperty("appointments");
        expect(response.body.appointments.length).toBe(1);
        expect(response.statusCode).toBe(200);
    });
});

describe('POST /appointment', () => {
    test('Trying to make an appointment without the time_appointment field. Must return error 400', async () => {
        const newAppointment = await request(app)
            .post('/appointment')
            .send({
                name: 'jest test',
                birth_date: '23/04/2022',
                date_appointment: '23/04/2023'
            });

        expect(newAppointment.body).toHaveProperty("message");
        expect(newAppointment.body).toHaveProperty("error_path");
        expect(newAppointment.body.message).toBe("time_appointment is a required field");
        expect(newAppointment.body.error_path).toBe("time_appointment");
        expect(newAppointment.statusCode).toBe(400);

        const response = await request(app).get("/appointment");
        expect(response.body).toHaveProperty("message");
        expect(response.body).toHaveProperty("appointments");
        expect(response.body.appointments.length).toBe(1);
        expect(response.statusCode).toBe(200);
    });
});

describe('POST /appointment', () => {
    test('Trying to make an appointment with an invalid time_appointment field. Must return error 400', async () => {
        const newAppointment = await request(app)
            .post('/appointment')
            .send({
                name: 'jest test',
                birth_date: '23/04/2022',
                date_appointment: '23/04/2023',
                time_appointment: 7
            });

        expect(newAppointment.body).toHaveProperty("message");
        expect(newAppointment.body.message).toBe("Invalid time_appointment value");
        expect(newAppointment.statusCode).toBe(400);

        const response = await request(app).get("/appointment");
        expect(response.body).toHaveProperty("message");
        expect(response.body).toHaveProperty("appointments");
        expect(response.body.appointments.length).toBe(1);
        expect(response.statusCode).toBe(200);
    });
});

describe('POST /appointment', () => {
    test('Trying to make more than 2 appointments in the same schedule. Must return error 400', async () => {
        const newAppointment = await request(app)
            .post('/appointment')
            .send({
                name: 'jest test',
                birth_date: '23/04/2022',
                date_appointment: '23/04/2023',
                time_appointment: 8
        });

        expect(newAppointment.body).toHaveProperty("message");
        expect(newAppointment.body).toHaveProperty("appointment");

        expect(newAppointment.body.appointment).toHaveProperty("id");
        expect(newAppointment.body.appointment).toHaveProperty("name");
        expect(newAppointment.body.appointment).toHaveProperty("birth_date");
        expect(newAppointment.body.appointment).toHaveProperty("date_appointment");
        expect(newAppointment.body.appointment).toHaveProperty("time_appointment");
        expect(newAppointment.body.appointment).toHaveProperty("situation");

        expect(newAppointment.body.appointment.name).toBe("jest test");
        expect(newAppointment.body.appointment.birth_date).toBe("23/04/2022");
        expect(newAppointment.body.appointment.date_appointment).toBe("23/04/2023");
        expect(newAppointment.body.appointment.time_appointment).toBe(8);
        expect(newAppointment.body.appointment.situation).toBe("waiting");

        expect(newAppointment.statusCode).toBe(201);

        const newAppointmentError = await request(app)
            .post('/appointment')
            .send({
                name: 'jest test',
                birth_date: '23/04/2022',
                date_appointment: '23/04/2023',
                time_appointment: 8
        });

        expect(newAppointmentError.body).toHaveProperty("message");
        expect(newAppointmentError.body).toHaveProperty("error");
        expect(newAppointmentError.body.message).toBe("No more available appointments for this schedule");
        expect(newAppointmentError.body.error).toBe("time_error");
        expect(newAppointmentError.statusCode).toBe(400);

        const response = await request(app).get("/appointment");
        expect(response.body).toHaveProperty("message");
        expect(response.body).toHaveProperty("appointments");
        expect(response.body.appointments.length).toBe(2);
        expect(response.statusCode).toBe(200);
    });
});

describe('GET /appointment', () => {
    test('Filter appointments by date', async () => {
        const newAppointment = await request(app)
            .post('/appointment')
            .send({
                name: 'jest test',
                birth_date: '23/04/2022',
                date_appointment: '24/04/2023',
                time_appointment: 9
            });

        const filterDate = await request(app).get('/appointment?filter=date&value=23/04/2023');

        expect(filterDate.body).toHaveProperty("message");
        expect(filterDate.body).toHaveProperty("appointments");
        expect(filterDate.body.message).toBe("Appointments listed successfully");
        expect(filterDate.body.appointments.length).toBe(2);
        expect(filterDate.statusCode).toBe(200);

        const filterAnotherDate = await request(app).get('/appointment?filter=date&value=24/04/2023');

        expect(filterAnotherDate.body).toHaveProperty("message");
        expect(filterAnotherDate.body).toHaveProperty("appointments");
        expect(filterAnotherDate.body.message).toBe("Appointments listed successfully");
        expect(filterAnotherDate.body.appointments.length).toBe(1);
        expect(filterAnotherDate.statusCode).toBe(200);
    });
});