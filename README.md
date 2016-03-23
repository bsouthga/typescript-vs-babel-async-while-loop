## Example of current memory leak issue in babel relating to async functions and while loops.

This repo contains a file...

```javascript
const asyncOp = async function() {
  return true;
};

const asyncLoop = async function(callback = () => {}) {
  let count = 1000000;

  while (count--) {
    await asyncOp();
    if (count % 10000 === 0) {
      console.log(process.memoryUsage());
    }
  }

  callback();
};

asyncLoop();
```

That is compiled with babel 6 and typescript (without any changes) and illustrates a memory leak in babel.

## Requirements

Node version 4 or later (for native generators)

## Usage

after installing node and cloning this repo...

```shell
npm install && npm test
```
