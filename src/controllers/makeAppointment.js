import appointments from "../models/appointmentModel.js";

const makeAppointment = async (req, res) => {
    const { id } = req.params;

    try {
        const appointmentFound = await appointments.find(appointment => appointment.id === parseInt(id));
        if(!appointmentFound) {
            return res.status(404).json({ message: "Appointment not found" });
        }

        appointmentFound.situation = 'done';

        return res.status(200).json({ message: "Appointment done", appointment: appointmentFound });
    } catch (error) {
        console.error(error);
    }
}

export default makeAppointment;