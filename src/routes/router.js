import { Router } from "express";
import listAppointments from "../controllers/listAppointments.js";
import registerAppointment from "../controllers/registerAppointment.js";

const router = Router();

router.post('/appointment', registerAppointment);
router.get('/appointment', listAppointments);

export default router;