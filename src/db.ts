import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../src/entity/User";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "root",
    database: "metamask",
    synchronize: true,
    logging: false,
    entities: [User],
    migrations: [],
    subscribers: [],
});

AppDataSource
    .initialize()
    .then(() => {
        console.log("Data Source with typeorm has been initialized successfully.")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
    })
