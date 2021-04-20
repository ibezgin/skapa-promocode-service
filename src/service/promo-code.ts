import { Inject } from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";
import { PromoCodeEntity } from "../database/entities/promo-code";
import { CRUD } from "./crud";
import { Logger } from "winston";
import { MongoRepository } from "typeorm";

export class PromoCodeService extends CRUD<PromoCodeEntity> {
    constructor(
        @InjectRepository(PromoCodeEntity)
        protected promoCodeRepo: MongoRepository<PromoCodeEntity>,
    ) {
        super(promoCodeRepo);
    }
}
