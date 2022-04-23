import { Router } from "express";
import appointmentSchema from "../config/validations.js";
import deleteAppointment from "../controllers/deleteAppointment.js";
import listAppointments from "../controllers/listAppointments.js";
import makeAppointment from "../controllers/makeAppointment.js";
import registerAppointment from "../controllers/registerAppointment.js";
import validateBodyMiddleware from "../middlewares/validateBodyMiddleware.js";

const router = Router();

router.get('/appointment', listAppointments);
router.post('/appointment', validateBodyMiddleware(appointmentSchema), registerAppointment);
router.patch('/appointment/:id', makeAppointment);
router.delete('/appointment/:id', deleteAppointment);

export default router;