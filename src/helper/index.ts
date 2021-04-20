import { PromoCodeHelper } from "./promo-code";

export class Helper {
    private cache: {
        promoCode?: PromoCodeHelper;
    } = {};
    public get promoCode() {
        return (
            this.cache.promoCode ||
            (this.cache.promoCode = new PromoCodeHelper())
        );
    }
}
