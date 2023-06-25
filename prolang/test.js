import { readFileSync } from 'fs';
import interpret from './index.js';
interpret(readFileSync('testfile', {encoding: 'utf-8'}));