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
    autoLoadEntities: true,
    synchronize: false,

    migrationsRun: false,
}

const dataSource = new DataSource({
    type: 'mariadb',
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,

    synchronize: false,

    entities: ['src/**/*.entity.ts'],

    migrationsTableName: "migrations",
    migrations: [__dirname + "/migrations/**/*{.ts,.js}"],
})



export default dataSource;