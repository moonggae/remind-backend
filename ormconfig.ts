import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import * as dotenv from 'dotenv' 
import { DataSource } from "typeorm";

dotenv.config()

export const ormconfig: TypeOrmModuleOptions = {
    type: 'mariadb',
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    timezone: "Z",
    autoLoadEntities: true,
    synchronize: false,
    logging: false,

    migrationsRun: false,
}

const dataSource = new DataSource({
    type: ormconfig.type,
    host: ormconfig.host,
    port: ormconfig.port,
    database: ormconfig.database,
    username: ormconfig.username,
    password: ormconfig.password,
    timezone: ormconfig.timezone,

    synchronize: ormconfig.synchronize,

    entities: ['src/**/*.entity.ts'],

    migrationsTableName: "migrations",
    migrations: [__dirname + "/migrations/**/*{.ts,.js}"],
})



export default dataSource;