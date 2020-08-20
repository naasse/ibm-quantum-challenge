import {ApiApplication, ApplicationConfig} from "./application";

export * from "./application";

export async function main(options: ApplicationConfig = {}) {
    const app = new ApiApplication(options);
    await app.boot();
    await app.start();
    return app;
}

if (require.main === module) {
    // Run the application
    const config = {
        "rest": {
            "port": +(process.env.PORT ?? 3000),
            "host": process.env.HOST,
            "gracePeriodForClose": 5000, // 5 seconds
            "openApiSpec": {
                "setServersFromRequest": true,
            },
        },
    };
    main(config).catch(err => {
        console.error("Failed to start the application.", err);
        process.exit(1);
    });
}
