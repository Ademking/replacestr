<div align="center">
    <img src="https://i.imgur.com/4122j5z.png" alt="screenshot">
</div>

# replacestr 

replacestr is a simple utility that can be used to replace a string in your files. Replacing a string in a file is a common task for developers.
You don't need to know how to write a regex to replace a string in a file. Easy to use and easy to understand.

For example, if you want to replace all occurrences of `foo` with `bar` in a file, you can use the following command:

```
replacestr -f myfile.txt -s foo -r bar
```

## Usage

```
$ replacestr -f myfile.txt -s foo -r bar
$ replacestr -f myfolder/*.txt -s foo -r bar
$ replacestr -f myfolder/**/*.txt -s foo -r bar
$ replacestr -f *.txt -s foo -r bar -i test.txt # ignore case
$ replacestr -f C:/Users/Adem/Myfolder/*.txt -s old -r new -i test.txt
```

To display the help for the tool use the -h flag:

```
$ replacestr -h
```

| Flag (short)  | Flag (long)           | Description                           |
| ------------- | --------------------- | ------------------------------------- |
| -f <files...> | --files <files...>    | File(s) or folder to search in.       |
| -s <string>   | --search <string>     | String to search for.                 |
| -r <string>   | --replace <string>    | String to replace with.               |
| -i <files...> | --ignore <files...>   | File(s) to ignore.                    |
| -e <encoding> | --encoding <encoding> | Encoding to use. Default "utf-8"      |
| -q            | --silent              | Silent mode: no output                |
| -h            | --help                | Show help                             |
| -v            | --version             | Show version                          |
| -p            | --pretend             | Pretend mode: no changes will be made |
| -a            | --about               | About replacestr                      |
| -o <file>     | --output <file>       | Output file                           |

## Installation

#### Using npx you can run the script without installing it first:

```
npx replacestr -f myfile.txt -s foo -r bar
```

#### Globally via npm

```
npm install -g replacestr
```

This will install replacestr globally so that it may be run from the command line anywhere.

## Development

Checkout this repository locally, then:

```
$ npm i
$ npm run start -- --help
```

## Changelog

[1.0.0] Initial release.

