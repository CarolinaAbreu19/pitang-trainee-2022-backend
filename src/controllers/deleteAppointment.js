import appointments from "../models/appointmentModel.js";

const deleteAppointment = async (req, res) => {
    const { id } = req.params;

    const appointmentFound = await appointments.findIndex(appointment => appointment.id === parseInt(id));
    if(appointmentFound === -1) {
        return res.status(404).json({ message: "Appointment not found" });
    }

    appointments.splice(appointmentFound, 1);

    return res.status(200).json({ message: "Appointment deleted successfully" });
}

export default deleteAppointment;