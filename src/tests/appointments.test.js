import request from 'supertest';
import app from '../app';

describe('POST /appointment', () => {
    test('It should respond with an object with a success message and the new Appointment', async () => {
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
            expect(response.body.appointment.length).toBe(1);
            expect(response.statusCode).toBe(200);
    });
});