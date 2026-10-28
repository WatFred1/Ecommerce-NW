
import "dotenv/config";
import app from "./app.js";
import { prisma } from "./lib/prisma.js";

const PORT = Number(process.env.PORT ?? 3000);
async function main() {

await prisma.$connect();
console.log("PostgreSQL conectado correctamente");
const server = app.listen(PORT, () => {
console.log(`API ejecutándose en http://localhost:${PORT}`);
});
const shutdown = () => server.close(async () => {
await prisma.$disconnect();
process.exit(0);
});
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
}
main().catch((error) => {
console.error("Error iniciando API:", error);
process.exit(1);
});