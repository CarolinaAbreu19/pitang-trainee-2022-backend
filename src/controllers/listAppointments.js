import appointments from "../models/appointmentModel.js";

const listAppointments = async (req, res) => {
    const { filter } = req.query;

    const list = await appointments;
   
    switch (filter) {
        case 'date': {
            return res.status(200).json("Ordenados por data");
        }
        case 'time': {
            return res.status(200).json("Ordenados por horário");
        }
        default:
            return res.status(200).json(list);
    }
}

export default listAppointments;