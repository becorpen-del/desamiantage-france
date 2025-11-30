import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import path from "node:path";
import process from "node:process";
import dotenv from "dotenv";

const envFile = existsSync(path.resolve(process.cwd(), ".env"))
  ? path.resolve(process.cwd(), ".env")
  : path.resolve(process.cwd(), ".env.example");

dotenv.config({ path: envFile });

const [command, ...rest] = process.argv.slice(2);

if (!command) {
  console.error("Aucune commande fournie. Exemple : npm run dev");
  process.exit(1);
}

const stack = (process.env.STACK ?? "next").toLowerCase();
const workspaceMap = {
  next: "apps/next-leads",
  static: "apps/static-leads",
};

const workspace = workspaceMap[stack];

if (!workspace) {
  console.error(`STACK \"${stack}\" non reconnu. Utilisez \"next\" ou \"static\".`);
  process.exit(1);
}

const npmCommand = process.platform === "win32" ? "npm.cmd" : "npm";
const workspacePath = path.resolve(process.cwd(), workspace);

console.log(`> Stack sélectionné : ${stack} (workspace ${workspace})`);

const child = spawn(npmCommand, ["run", command, ...rest], {
  stdio: "inherit",
  env: process.env,
  cwd: workspacePath,
});

child.on("exit", code => {
  process.exit(code ?? 1);
});
