import { Router } from "express";
import registerAppointment from "../controllers/registerAppointment.js";

const router = Router();

router.post('/appointment', registerAppointment);

export default router;