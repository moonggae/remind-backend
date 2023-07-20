import { DeleteDateColumn } from "typeorm";
import { Constructor } from "./constructor";

export function DeletedAt<TBase extends Constructor>(Base: TBase) {
    abstract class AbstractBase extends Base {
        @DeleteDateColumn({ type: 'timestamp', name: 'deleted_at' })
        deletedAt: Date;
    }
    return AbstractBase;
}