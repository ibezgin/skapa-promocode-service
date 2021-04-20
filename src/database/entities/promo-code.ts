import { IsNumberString, IsString } from "class-validator";
import { Column, Entity, Index, ObjectID, ObjectIdColumn } from "typeorm";

@Entity()
export class PromoCodeEntity {
    @ObjectIdColumn()
    id?: ObjectID;

    @Column()
    @IsString()
    @Index({ unique: true })
    name?: string;

    @Column()
    @IsNumberString()
    sale?: string;

    @Column()
    createdAt?: string = new Date().toISOString();

    public constructor(data?: PromoCodeEntity) {
        if (data) {
            this.name = data.name;
            this.sale = data.createdAt;
            this.createdAt = data.createdAt;
        }
    }
}
