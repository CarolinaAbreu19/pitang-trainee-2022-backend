import { Router } from "express";
import deleteAppointment from "../controllers/deleteAppointment.js";
import listAppointments from "../controllers/listAppointments.js";
import registerAppointment from "../controllers/registerAppointment.js";

const router = Router();

router.get('/appointment', listAppointments);
router.post('/appointment', registerAppointment);
router.delete('/appointment/:id', deleteAppointment);

export default router;