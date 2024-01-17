import { PackageManager } from "./PackageManager";
import { UnableToIdentifyPackageManagerError } from "./UnableToIdentifyPackageManagerError";
import { UnknownPackageManagerError } from "./UnknownPackageManagerError";
import { guessPackageManager } from "./guessPackageManager";
import { installAndInvokeWithNpm } from "./npm";
import { installAndInvokeWithPnpm } from "./pnpm";
import { installAndInvokeWithYarn } from "./yarn";

export interface Options {
  packageManager?: PackageManager | undefined;
  packageIdentifier: string;
  args?: string[];
}

export const installAndInvoke = async (
  options: Options,
  argv?: string[] | undefined
) => {
  const packageManager = options.packageManager ?? guessPackageManager(argv);

  if (packageManager === undefined) {
    throw new UnableToIdentifyPackageManagerError();
  }

  switch (packageManager) {
    case PackageManager.Npm: {
      return installAndInvokeWithNpm(options.packageIdentifier, options.args);
    }
    case PackageManager.Yarn: {
      return installAndInvokeWithYarn(options.packageIdentifier, options.args);
    }
    case PackageManager.Pnpm: {
      return installAndInvokeWithPnpm(options.packageIdentifier, options.args);
    }
    default: {
      throw new UnknownPackageManagerError(packageManager);
    }
  }
};
