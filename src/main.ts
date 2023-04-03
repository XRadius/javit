import * as app from '.';
import * as commander from 'commander';

export function main() {
  return new commander.Command(require('../package').name)
    .description(require('../package').description)
    .version(require('../package').version)
    .addCommand(commandParse());
}

function commandParse() {
  return new commander.Command('parse')
    .arguments('<path...>')
    .description('Parse metadata')
    .option('--force', 'Determines whether to force a refresh')
    .action(app.actions.parseAsync);
}
