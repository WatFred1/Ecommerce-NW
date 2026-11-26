import {env} from "../config/index.js"
import {logger} from "../lib/logger.js"

async function main(): Promise<void>{

    const [{default: app},{prisma}]= await Promise.all([
        import("../app.js"),
        import("../lib/prisma.js")
    ]);

    await prisma.$connect();

    logger.info("Postgressql conectado correctamente");

    app.listen(env.PORT, () =>{
        logger.info(
            { port: env.PORT },
            "API iniciada correctamente"
        );
    })
}

main().catch((error: unknown) => {
    logger.fatal({ error }, "Error al iniciar la API");
    process.exitCode =1;
});