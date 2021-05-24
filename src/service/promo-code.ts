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
            creator: "game-client",
            createdAt,
        });
        return code;
    }

    public async findByName(name: string) {
        const code = await super.findOne({
            where: { name },
        });

        return code;
    }

    public async findByPaginate(count: number, offset: number) {
        const take = count || 10;
        const skip = offset || 0;

        const [result, total] = await super.findAndCount({
            order: { name: "DESC" },
            take: take,
            skip: skip,
        });

        return {
            data: result,
            count: total,
        };
        super.findAndCount();
    }
}
