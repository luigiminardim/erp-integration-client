import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";

export type AppCommand =
  | { type: "start"; options: { openWindow: boolean; filePath: string } }
  | { type: "unknown" };

export function parseCommand(args: string[]): AppCommand {
  const argv = yargs(hideBin(args))
    .command(["start", "*"], "", (yargs) =>
      yargs
        .option("no-window", { type: "boolean", description: "Dismiss windown opening",  default: true })
        .option("file-path", { type: "string", description: "Path to CSV file",  default: "/home/luigi/Desktop/erp-integration-client/data/items.csv" })
    )
    .help()
    .parseSync();
  const command = argv._[0];
  switch (command) {
    case undefined:
    case "start":
      return { type: "start", options: { openWindow: !argv["no-window"], filePath: argv["file-path"] } };
  }
  return { type: "unknown" };
}
