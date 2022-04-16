import appointments from "../models/appointmentModel.js";

const listAppointments = async (req, res) => {
    const { filter, value } = req.query;

    let list = [];
   
    switch (filter) {
        case 'date': {
            list = await appointments.filter(appointment => appointment.date_appointment === value);
        }
        case 'time': {
            list = await appointments.filter(appointment => appointment.time_appointment === value);
        }
        default:
            list = await appointments;
        }

        if(list.length === 0) {
            return res.status(200).json({ message: "No results", appointments: list });
        }
        return res.status(200).json({ message: "Appointments listed successfully", appointments: list });
}

export default listAppointments;