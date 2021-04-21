import { Inject } from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";
import { PromoCodeEntity } from "../database/entities/promo-code";
import { CRUD } from "./crud";
import { Logger } from "winston";
import { MongoRepository } from "typeorm";
import { Helper } from "../helper";

export class PromoCodeService extends CRUD<PromoCodeEntity> {
    helper: Helper = new Helper();

    constructor(
        @InjectRepository(PromoCodeEntity)
        protected promoCodeRepo: MongoRepository<PromoCodeEntity>,
    ) {
        super(promoCodeRepo);
    }

    public async generate(
        userId: string,
        sale: string,
    ): Promise<PromoCodeEntity> {
        const generated = this.helper.promoCode.generate();

        const generatePromocode = generated[0];

        const code = await super.create({
            name: generatePromocode,
            sale,
            userId,
        });
        return code;
    }
}
