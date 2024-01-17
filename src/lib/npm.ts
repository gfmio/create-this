import { Spawnable } from "spawnable";

export const installAndInvokeWithNpm = async (
  packageIdentifier: string,
  args?: string[] | undefined
) => {
  const npx = new Spawnable(["npx", packageIdentifier, ...(args ?? [])], {
    shell: true,
    stdio: ["inherit", "inherit", "inherit"],
  });

  await npx.spawn();
  await npx.waitForExit();
};
