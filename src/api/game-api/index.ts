import { Router } from "express";
import { promoCodeServiceRouter } from "./promo-code";

const router = Router();

router.use("/promo-code", promoCodeServiceRouter);

export const gameApi = router;
