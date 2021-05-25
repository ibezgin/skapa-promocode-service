import { IsBoolean, IsString } from "class-validator";
import { Column, Entity, Index, ObjectID, ObjectIdColumn } from "typeorm";

@Entity("promocode")
export class PromoCodeEntity {
    @ObjectIdColumn()
    id?: ObjectID;

    @Column()
    @IsString()
    @Index({ unique: true })
    name?: string;

    @Column()
    sale?: string;

    @Column()
    createdAt?: string = new Date().toISOString();

    @Column()
    @IsString()
    adminId?: string;

    @Column()
    @IsBoolean()
    used?: boolean;

    @Column()
    @IsString()
    QRCodeId?: string;

    public constructor(data?: PromoCodeEntity) {
        if (data) {
            this.name = data.name;
            this.sale = data.sale;
            this.createdAt = data.createdAt;
            this.adminId = data.adminId;
            this.used = data.used;
            this.QRCodeId = data.QRCodeId;
        }
    }
}
