import * as commander from "commander";
import { PackageManager } from "./lib/PackageManager";
import { UnknownPackageManagerError } from "./lib/UnknownPackageManagerError";
import { installAndInvoke } from "./lib/installAndInvoke";

export interface Options {
  use?: string | undefined;
}

export const identifyPackageManagerFromOption = (
  value: string | undefined
): PackageManager | undefined => {
  switch (value) {
    case undefined:
      return undefined;
    case "npm":
      return PackageManager.Npm;
    case "yarn":
      return PackageManager.Yarn;
    case "pnpm":
      return PackageManager.Pnpm;
    default:
      throw new UnknownPackageManagerError(value);
  }
};

const action = async (
  packageIdentifier: string,
  args: string[],
  options: Options
) => {
  const packageManager = identifyPackageManagerFromOption(options.use);
  await installAndInvoke({
    packageIdentifier,
    packageManager,
    args,
  });
};

export const program = commander
  .createCommand("create-this")
  .option(
    "--use <package-manager>",
    "Explicitly specify the package manager to use."
  )
  .argument("<identifier>", "The identifier of the starter-kit package to use")
  .argument("[args...]", "Arguments to pass to the invoked starter kit.")
  .allowUnknownOption(true)
  .allowExcessArguments(true)
  .action(action);
