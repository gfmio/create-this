import { ExtendableError } from "ts-error";

export class UnableToIdentifyPackageManagerError extends ExtendableError {
  constructor() {
    super(
      `Could not automatically identify the package manager in use. Please specify one with --use <package-manager>`
    );
  }
}
