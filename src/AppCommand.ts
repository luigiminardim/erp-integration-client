import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";

export type AppCommand =
  | { type: "run"; options: { openWindow: boolean } }
  | { type: "unknown" };

export function parseCommand(args: string[]): AppCommand {
  const argv = yargs(hideBin(args))
    .command(["run", "*"], "", (yargs) =>
      yargs.option("no-window", { type: "boolean", default: true })
    )
    .help()
    .parseSync();
  switch (argv[0]) {
    case undefined:
    case "run":
      return { type: "run", options: { openWindow: !argv["no-window"] } };
  }
  return { type: "unknown" };
}
