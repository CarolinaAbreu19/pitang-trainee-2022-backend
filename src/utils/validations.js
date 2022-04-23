import * as yup from 'yup';

const appointmentSchema = yup.object({
    name: yup.string().required(),
    birth_date: yup.string().required(),
    date_appointment: yup.string().required(),
    time_appointment: yup.number().required()
});

export default appointmentSchema;