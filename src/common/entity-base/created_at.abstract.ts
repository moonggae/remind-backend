import { CreateDateColumn } from "typeorm";
import { Constructor } from "./constructor";

export function CreatedAt<TBase extends Constructor>(Base: TBase) {
    abstract class AbstractBase extends Base {
        @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
        createdAt: Date;
    }
    return AbstractBase;
}