import { DeleteDateColumn } from "typeorm";
import { Constructor } from "./constructor";
import { Exclude } from "class-transformer";

export function DeletedAt<TBase extends Constructor>(Base: TBase) {
    abstract class AbstractBase extends Base {
        @DeleteDateColumn({ type: 'timestamp', name: 'deleted_at' })
        @Exclude({ toPlainOnly: true })
        deletedAt: Date;
    }
    return AbstractBase;
}