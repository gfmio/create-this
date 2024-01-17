import type { ParseOptions } from "commander";
import { program } from "./program";

export const main = async (
  argv?: string[] | undefined,
  parseOptions?: ParseOptions
) => {
  try {
    await program.parseAsync(argv, parseOptions);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
