import { Spawnable } from "spawnable";

export const installAndInvokeWithPnpm = async (
  packageIdentifier: string,
  args?: string[] | undefined
) => {
  const pnpx = new Spawnable(["pnpx", packageIdentifier, ...(args ?? [])], {
    shell: true,
    stdio: ["inherit", "inherit", "inherit"],
  });

  await pnpx.spawn();
  await pnpx.waitForExit();
};
