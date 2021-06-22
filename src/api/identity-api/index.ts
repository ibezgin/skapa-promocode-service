import { Router } from "express";
import { tokenServiceRouter } from "./token";

const router = Router();

router.use("/token", tokenServiceRouter);

export const identityApi = router;
