// @ts-check
import chalk from 'chalk';
import { readFileSync } from 'node:fs';
import path from 'node:path';

const msgPath = path.resolve('.git/COMMIT_EDITMSG');
const msg = readFileSync(msgPath, 'utf-8').trim();

const commitRE =
	/^(revert: )?(feat|fix|docs|dx|style|refactor|perf|test|workflow|build|ci|chore|types|wip|release)(\(.+\))?: .{1,50}/;

if (!commitRE.test(msg)) {
	console.log();
	console.error(
		`  ${chalk.white(chalk.bgRed(' ERROR '))} ${chalk.red(
			`invalid commit message format.`
		)}\n\n` +
			chalk.red(
				`  Proper commit message format is required for automated changelog generation. Examples:\n\n`
			) +
			`    ${chalk.green(`feat(compiler): add 'comments' option`)}\n` +
			`    ${chalk.green(
				`fix(v-model): handle events on blur (close #28)`
			)}\n\n` +
			chalk.red(
				`  See https://gist.github.com/qoomon/5dfcdf8eec66a051ecd85625518cfd13 for more details.\n`
			)
	);
	process.exit(1);
}
