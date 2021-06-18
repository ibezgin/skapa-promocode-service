import { Router } from "express";
import { tokenServiceRouter } from "./token";

const router = Router();

router.use("/identity-api", tokenServiceRouter);

export const identityApi = router;
