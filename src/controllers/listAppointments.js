import appointments from "../models/appointmentModel.js";

const listAppointments = async (req, res) => {
    const { filter, value } = req.query;
   
    switch (filter) {
        case 'date': {
            const dateList = await appointments.filter(appointment => appointment.date_appointment === value);
            return res.status(200).json({ message: "Appointments filtered by date", appointments: dateList });
        }
        case 'time': {
            const timeList = await appointments.filter(appointment => appointment.time_appointment === value);
            return res.status(200).json({ message: "Appointments filtered by time", appointments: timeList });
        }
        default:
            const list = await appointments;
            return res.status(200).json({ message: "Appointments listed successfully", appointments: list });
    }
}

export default listAppointments;