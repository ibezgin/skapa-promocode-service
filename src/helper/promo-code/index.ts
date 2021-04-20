import { Logger } from "../../logger";
import voucher_codes from "voucher-code-generator";
import { log } from "winston";

export class PromoCodeHelper {
    public generate(count = 1, length = 8) {
        try {
            const promoCode = voucher_codes.generate({
                length,
                count,
                charset: voucher_codes.charset("alphabetic"),
            });

            return promoCode;
        } catch (e) {
            Logger.error("Sorry, not possible.");
        }
    }
}
