#!/usr/bin/env node

import { Command } from '../../bin/cli';
import { assertArgs, getProjectRoot, printHelp } from '../utils/args';

export const expoLint: Command = async (argv) => {
  const args = assertArgs(
    {
      // Types
      '--help': Boolean,
      // Aliases
      '-h': '--help',
    },
    argv
  );

  if (args['--help']) {
    printHelp(`Utility for setting up linting for an expo project`, 'Usage', 'Options');
  }

  // Load modules after the help prompt so `npx expo lint -h` shows as fast as possible.
  const { lintAsync } = require('./lintAsync') as typeof import('./lintAsync');
  const { logCmdError } = require('../utils/errors') as typeof import('../utils/errors');
  const projectRoot = getProjectRoot(args);

  return lintAsync(projectRoot).catch(logCmdError);
};
