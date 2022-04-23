import appointments from "../models/appointmentModel.js";
import crypto from "crypto";

const registerAppointment = async (req, res) => {
    const { name, birth_date, date_appointment, time_appointment } = req.body;
    
    const filterDays = await appointments.filter(appointment => appointment.date_appointment === date_appointment);
    if(filterDays.length >= 20) {
        return res.status(400).json({ message: "No more schedules for this day", error: "date_error" });
    }

    const filterSchedule = filterDays.filter(appointment => appointment.time_appointment === time_appointment);
    if(filterSchedule.length >= 2) {
        return res.status(400).json({ message: "No more available appointments for this schedule", error: "time_error" });
    }

    await appointments.push({
        id: crypto.randomUUID(),
        name: name,
        birth_date: birth_date,
        date_appointment: date_appointment,
        time_appointment: time_appointment,
        situation: "waiting"
    });

    return res.status(201).json({ message: "Appointment registered successfully", appointment: appointments });
}

export default registerAppointment;