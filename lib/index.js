#!/usr/bin/env node
const rep = require('tiny-replace-files')
const { Command } = require('commander')
const colors = require('colors')
const fs = require('fs')
const program = new Command()
const asciiBanner = '\r\n                    __                     __      \r\n   ________  ____  / /___ _________  _____/ /______\r\n  / ___/ _ \\/ __ \\/ / __ `/ ___/ _ \\/ ___/ __/ ___/\r\n / /  /  __/ /_/ / / /_/ / /__/  __(__  ) /_/ /    \r\n/_/   \\___/ .___/_/\\__,_/\\___/\\___/____/\\__/_/     \r\n         /_/                                       '

// disable console.warn
console.warn = () => {}

// get the version from package.json
const version = require('../package.json').version

program
  .name('replacestr')
  .description('Replace all occurrences of a string in your files.')
  .version(asciiBanner + '\r\n\r\nVersion: ' + version, '-v, --version', 'current version')

program.option('-a, --about', 'about replacestr')
.option('-f, --files <files...>', 'file(s) to replace')
.option('-s, --search <string>', 'search string')
.option('-r, --replace <string>', 'replace string')
.option('-i, --ignore <files...>', 'file(s) to ignore')
.option('-e, --encoding <encoding>', 'encoding (Default is "utf-8") \navailable encoding: "ascii", "utf-8", "utf16le", "ucs-2", "base64", "latin1", "binary", "hex"')
.option('-q, --silent', 'silent mode - no output')
.option('-o, --output <file>', 'save output to file')
.option('-p, --pretend', 'pretend mode - no changes will be made')

program.addHelpText(
  'after',
  `
  
  Example:
    $ replacestr -f "*.txt" -s "hello" -r "hey"
    $ replacestr -f C:/Users/Adem/*.txt -s "old" -r "new" -i "test.txt"`
)

program.addHelpText('beforeAll', `${asciiBanner}v${version}\r\n`)
program.showHelpAfterError('(add --help for additional information)')

// show help if no arguments are given
if (process.argv.length <= 2) {
  program.help()
}

program.showSuggestionAfterError(true)
program.parse()

const options = program.opts()

if (options.about) {
  console.log(asciiBanner + '\r\n\r\nVersion: ' + version)
  process.exit(0)
}
if (options.files && options.search && options.replace) {
  const opts = {
    files: options.files,
    from: options.search,
    to: options.replace,
    encoding: options.encoding || 'utf-8',
    ignore: options.ignore || null,
    countMatches: true,
    freeze: options.pretend || false
  }

  let allFiles = rep.replaceStringInFilesSync(opts)
  let changedFiles = allFiles.filter(file => file.changed)

  // if there are no changed files
  if (changedFiles.length === 0 && !options.silent) {
    console.log(`\r\n${asciiBanner}v${version}\r\n`)
    console.log(`\r\n${changedFiles.length} file(s) scanned - ${colors.red('No changes')}`)
  }
  // if there are changes
  if (changedFiles.length > 0 && !options.silent) {
    console.log(`\r\n${asciiBanner}v${version}\r\n`)
    console.log(`\r\n${changedFiles.length} file(s) scanned - ${colors.green(changedFiles.length + ` file(s) ${options.pretend ? 'would have' : 'have'} been changed` + (options.pretend ? ' (Pretend mode)' : ''))}`)
    console.log('==========================================================')
    for (let file of changedFiles) {
      console.log(` ${colors.green(file.file)} (${file.replaceCounts} occurrences)`)
    }
  }
  // save output to file
  if (options.output) {
    let output = ''
    output += `${asciiBanner}v${version}\r\n`
    date = new Date()
    output += `\r\n${date.toLocaleString()}\r\n`
    output += `\r\n${changedFiles.length} file(s) scanned - ${changedFiles.length} file(s) changed\r\n\r\n`
    for (let file of changedFiles) {
      output += `${file.file} (${file.replaceCounts} occurrences)\n`
    }
    fs.writeFileSync(options.output, output)
  }
} else {
  console.log(`\r\n${asciiBanner}v${version}\r\n`)
  // if no files are given
  if (!options.files) {
    console.log(`\r\n${colors.red(`Error: required option '-f, --files <files...>' not specified`)}`)
  }
  // if no search string is given
  else if (!options.search) {
    console.log(`\r\n${colors.red(`Error: required option '-s, --search <string>' not specified`)}`)
  }
  // if no replace string is given
  else if (!options.replace) {
    console.log(`\r\n${colors.red(`Error: required option '-r, --replace <string>' not specified`)}`)
  }
}
