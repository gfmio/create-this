import { PackageManager } from "./PackageManager";

export type Argv = string[];
export type Argv1 = string;

/**
 * Returns the value at index 1 if it is an array or the value as-is if it is a string.
 *
 * @param value The value to extract the first argument from.
 * @returns The first argument
 */
export const extractFirst = (value: Argv | Argv1): Argv1 | undefined =>
  typeof value === "string" ? value : value[1];

/**
 * Guesses that the current process is running under `npx` or `npm`.
 *
 * When executed with `npx`, there is typically the string `npm` or `npx` in
 * argv[1].
 */
export const isProbablyNpm = (value?: Argv | Argv1 | undefined): boolean => {
  const argv1 = extractFirst(value ?? process.argv);
  return (
    !isProbablyPnpm(value) &&
    !!argv1 &&
    (argv1.includes("npm") || argv1.includes("npx"))
  );
};

/**
 * Guesses that the current process is running under `yarn`.
 *
 * When executed with `yarn`, there is typically the string `yarn` in argv[1].
 */
export const isProbablyYarn = (value?: Argv | Argv1 | undefined): boolean =>
  !!extractFirst(value ?? process.argv)?.includes("yarn");

/**
 * Guesses that the current process is running under `pnpm`.
 *
 * When executed with `pnpm`, there is typically the string `pnpm` in argv[1].
 */
export const isProbablyPnpm = (value?: Argv | Argv1 | undefined): boolean =>
  !!extractFirst(value ?? process.argv)?.includes("pnpm");

/**
 * Guesses the package manager based on the provided value.
 *
 * @param value - The value to guess the package manager from.
 * @returns The guessed package manager or undefined if it cannot be determined.
 */
export const guessPackageManager = (
  value?: Argv | Argv1 | undefined
): PackageManager | undefined => {
  if (isProbablyNpm(value)) {
    return PackageManager.Npm;
  }
  if (isProbablyYarn(value)) {
    return PackageManager.Yarn;
  }
  if (isProbablyPnpm(value)) {
    return PackageManager.Pnpm;
  }
  return undefined;
};
