import { Router, type IRouter } from "express";
import healthRouter from "./health";
import walletRouter from "./wallet";
import leadsRouter from "./leads";

const router: IRouter = Router();

router.use(healthRouter);
router.use("/wallet", walletRouter);
router.use(leadsRouter);

export default router;
