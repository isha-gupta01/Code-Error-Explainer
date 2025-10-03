import { program } from "commander";
import chalk from "chalk";
import ora from "ora";
import {getErrorExplanationGen} from "../geminiClient.js"

(async () => {
  try {
    program
      .name("error-explainer")
      .description("A CLI tool to explain any code error using OpenAI")
      .version("1.0.0");

    program
      .command("explain <error>")
      .description("Explain a given error")
      .action(async (error: string) => {
        const spinner = ora(chalk.cyanBright("Analyzing error...")).start();

        try {
          const explanation = await getErrorExplanationGen(error);
          spinner.succeed(chalk.blueBright("Analysis Completed!\n"));
          console.log(chalk.green("Error explanation:\n"));
          console.log(chalk.magentaBright(explanation));
        } catch (innerErr: unknown) {
          spinner.fail("Failed to get explanation.");
          if (innerErr instanceof Error) {
            console.error(chalk.red(innerErr.message));
          } else {
            console.error(chalk.red(JSON.stringify(innerErr, null, 2)));
          }
        }
      });

    program.parseAsync(process.argv); // <-- use parseAsync for async actions
  } catch (err: unknown) {
    console.error(chalk.red("Fatal error in CLI:"));
    if (err instanceof Error) console.error(chalk.red(err.message));
    else console.error(chalk.red(JSON.stringify(err, null, 2)));
  }
})();

