/******************************************************************************\
 * Name: index.ts
 *
 * Purpose: Entrypoint into the application.
 *          Note this file was auto-generated by the LoopBack CLI scaffolding.
 *
 * Author: naasse (nate.asselstine@gmail.com)
 \******************************************************************************/

import {ApiApplication, ApplicationConfig} from "./application";

export * from "./application";

export async function main(options: ApplicationConfig = {}): Promise<ApiApplication> {
    const app = new ApiApplication(options);
    await app.boot();
    await app.start();

    const url = app.restServer.url;
    console.log(`Server is running at ${url}`);
    console.log(`Try ${url}/pokemon`);

    return app;
}

if (require.main === module) {
    // Run the application
    const config = {
        "rest": {
            "port": +(process.env.PORT ?? 3210),
            "host": process.env.HOST,
            "gracePeriodForClose": 5000,
            "openApiSpec": {
                "setServersFromRequest": true
            }
        }
    };
    main(config).catch(err => {
        console.error("Cannot start the application.", err);
        process.exit(1);
    });
}
