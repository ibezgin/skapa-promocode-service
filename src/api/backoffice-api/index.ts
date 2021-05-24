import { Router } from "express";
import { promoCodeServiceRouter } from "./promo-service";

const router = Router();

router.use("/promo-code", promoCodeServiceRouter);

export const backofficeApi = router;
