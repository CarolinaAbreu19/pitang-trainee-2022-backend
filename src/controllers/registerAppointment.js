import appointments from "../models/appointmentModel.js";

const registerAppointment = async (req, res) => {
    const { name, birth_date, day, time } = req.body;

    if(!name) {
        return res.status(400).json({ message: "Name field is required" });
    }
    if(!birth_date) {
        return res.status(400).json({ message: "Birth date field is required" });
    }
    if(!day) {
        return res.status(400).json({ message: "Day field is required" });
    }
    if(!time) {
        return res.status(400).json({ message: "Time field is required" });
    }
    
    const filterDays = await appointments.filter(appointment => appointment.day === day);
    if(filterDays.length >= 20) {
        return res.status(400).json({ message: "No more schedules for this day" });
    }

    const filterSchedule = await appointments.filter(appointment => appointment.day === day && appointment.time === time);
    if(filterSchedule.length >= 2) {
        return res.status(400).json({ message: "No vacancy for this schedule" });
    }


    const newUser = await appointments.push({
        name: name,
        birth_date: birth_date,
        day: day,
        time: time,
    });

    return res.status(200).json({ message: "ok", appointment: appointments });
}

export default registerAppointment;