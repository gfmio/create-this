import path from "path";
import { Spawnable } from "spawnable";

export const installPackageWithYarn = async (packageIdentifier: string) => {
  const stdout: string[] = [];
  const stderr: string[] = [];

  const yarnAdd = new Spawnable(["yarn", "global", "add", packageIdentifier], {
    // stdio: ["ignore", "inherit", "inherit"],
    shell: true,
  });

  await yarnAdd.spawn();

  const yarnAddChildProcess = yarnAdd.childProcess()!;

  yarnAddChildProcess.stdout!.on("data", (data: Buffer) =>
    stdout.push(data.toString("utf-8"))
  );
  yarnAddChildProcess.stdout!.pipe(process.stdout);

  yarnAddChildProcess.stderr!.on("data", (data: Buffer) =>
    stderr.push(data.toString("utf-8"))
  );
  yarnAddChildProcess.stderr!.pipe(process.stderr);

  await yarnAdd.waitForExit();

  return { stdout, stderr };
};

export const identifyBinaryName = async ({
  stdout,
  stderr,
}: {
  stdout: string[];
  stderr: string[];
}) => {
  if (stdout[stdout.length - 2]?.startsWith("success Installed")) {
    const binaryName = stdout[stdout.length - 1]?.trim().slice(2);
    if (!binaryName) {
      throw new Error("Could not identify binary name.");
    }
    return binaryName;
  }

  if (
    stderr[stderr.length - 1]?.startsWith("warning") &&
    stderr[stderr.length - 1]?.endsWith("has no binaries\n")
  ) {
    throw new Error(stderr[stderr.length - 1]!.trim().slice(8));
  }

  throw new Error("Could not identify binary name.");
};

export const findGlobalBinDirectory = async () => {
  const stdout: string[] = [];
  const stderr: string[] = [];

  const yarnAdd = new Spawnable(["yarn", "global", "bin"]);

  await yarnAdd.spawn();

  const yarnAddChildProcess = yarnAdd.childProcess()!;

  yarnAddChildProcess.stdout!.setEncoding("utf-8");
  yarnAddChildProcess.stdout!.on("data", (data: string) => stdout.push(data));

  yarnAddChildProcess.stderr!.setEncoding("utf-8");
  yarnAddChildProcess.stderr!.on("data", (data: string) => stderr.push(data));

  await yarnAdd.waitForExit();

  return stdout[0]!.trim();
};

export const executeBinary = async (
  globalBinDirectory: string,
  binaryName: string,
  args: string[] = []
) => {
  const binaryPath = path.join(globalBinDirectory, binaryName);

  const binary = new Spawnable([binaryPath, ...args], {
    stdio: ["inherit", "inherit", "inherit"],
    shell: true,
  });

  await binary.spawn();

  await binary.waitForExit();
};

export const installAndInvokeWithYarn = async (
  packageIdentifier: string,
  args?: string[] | undefined
) => {
  const { stdout, stderr } = await installPackageWithYarn(packageIdentifier);
  const binaryName = await identifyBinaryName({ stdout, stderr });
  const globalBinDirectory = await findGlobalBinDirectory();
  await executeBinary(globalBinDirectory, binaryName, args ?? []);
};
