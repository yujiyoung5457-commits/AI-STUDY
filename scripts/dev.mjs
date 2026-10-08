import { spawn } from "node:child_process";

const children = new Set();

const start = (command, args, options = {}) => {
  const child = spawn(command, args, {
    stdio: "inherit",
    shell: process.platform === "win32",
    ...options,
  });

  children.add(child);
  child.on("exit", () => children.delete(child));
  return child;
};

const backendIsRunning = async () => {
  try {
    const response = await fetch("http://localhost:4000/db-test", {
      signal: AbortSignal.timeout(1500),
    });
    return response.ok;
  } catch {
    return false;
  }
};

if (!(await backendIsRunning())) {
  start(process.execPath, ["server/server.js"]);
} else {
  console.log("Auth server is already running on http://localhost:4000");
}

const nextCommand = process.platform === "win32" ? "npx.cmd" : "npx";
start(nextCommand, ["next", "dev"]);

const shutdown = () => {
  for (const child of children) {
    child.kill("SIGTERM");
  }
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
