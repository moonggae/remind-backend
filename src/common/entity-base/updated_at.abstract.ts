import { UpdateDateColumn } from "typeorm";
import { Constructor } from "./constructor";

export function UpdatedAt<TBase extends Constructor>(Base: TBase) {
    abstract class AbstractBase extends Base {
        @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
        updatedAt: Date;
    }
    return AbstractBase;
}