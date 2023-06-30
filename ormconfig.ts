import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { DataSource } from "typeorm";


const config: DataSource = new DataSource({
    type: 'mariadb',
    host: "hostname",
    port: 3306,
    database: "remind",
    username: "admin",
    password: "password",
    entities: ['dist/**/*.entity{.ts,.js}'],
    synchronize: false,
    migrationsTableName: "migrations",
    migrations: ["migrations/*.ts"],
    migrationsRun: true
})

export default config;