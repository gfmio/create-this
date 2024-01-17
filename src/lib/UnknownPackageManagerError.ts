import { ExtendableError } from "ts-error";

export class UnknownPackageManagerError extends ExtendableError {
  constructor(public readonly packageManager: string) {
    super(`Unknown package manager ${packageManager}`);
  }
}
