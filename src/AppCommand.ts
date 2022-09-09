import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";

export type AppCommand =
  | {
      type: "openWindow";
    }
  | {
      type: "start";
    };

export async function parseCommand(): Promise<AppCommand> {
  const argv = await yargs(hideBin(process.argv))
    .command(["run", "*"], {
      type: "boolean",
      description: "Run without displaying a window",
      default: false,
    })
    .help()
    .parseSync();
  console.log(argv.noDisplay);
  if (argv.noDisplay) {
    return { type: "start" };
  } else {
    return { type: "openWindow" };
  }
}
