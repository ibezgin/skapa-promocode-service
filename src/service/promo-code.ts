import { InjectRepository } from "typeorm-typedi-extensions";
import { PromoCodeEntity } from "../database/entities/promo-code";
import { CRUD } from "./crud";
import { MongoRepository } from "typeorm";
import { Helper } from "../helper";
import moment from "moment";

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

        const createdAt = moment.utc().format("X");

        const code = await super.create({
            name: generatePromocode,
            sale,
            userId,
            createdAt,
        });
        return code;
    }

    public async findByUserId(userId: string) {
        return await super.find({ userId });
    }

    public async findByName(name: string) {
        const code = await super.findOne({
            where: { name },
        });

        return code;
    }
}
