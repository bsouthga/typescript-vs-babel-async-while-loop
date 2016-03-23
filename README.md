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

## Result

The javascript / babel test continuously grows the heap...

```
---- running javascript test
{ rss: 39841792, heapTotal: 27015520, heapUsed: 15859928 }
{ rss: 57339904, heapTotal: 50750048, heapUsed: 30702592 }
{ rss: 77328384, heapTotal: 62101344, heapUsed: 32424216 }
.
.
.
{ rss: 854241280, heapTotal: 825733984, heapUsed: 803286272 }
{ rss: 862793728, heapTotal: 833989472, heapUsed: 813753192 }
{ rss: 875638784, heapTotal: 847404640, heapUsed: 816131472 }
{ rss: 884195328, heapTotal: 855660128, heapUsed: 826600432 }
{ rss: 892747776, heapTotal: 863915616, heapUsed: 837067544 }
{ rss: 901300224, heapTotal: 872171104, heapUsed: 847533640 }
{ rss: 909852672, heapTotal: 880426592, heapUsed: 858000576 }
{ rss: 918405120, heapTotal: 888682080, heapUsed: 868467568 }
{ rss: 931254272, heapTotal: 902097248, heapUsed: 870845920 }
{ rss: 939806720, heapTotal: 910352736, heapUsed: 881312024 }
{ rss: 948359168, heapTotal: 918608224, heapUsed: 891778848 }
{ rss: 956911616, heapTotal: 926863712, heapUsed: 902245904 }
{ rss: 965464064, heapTotal: 935119200, heapUsed: 912712800 }
{ rss: 974024704, heapTotal: 943374688, heapUsed: 923179792 }
```

While the typescript example does not

```
---- running typescript test
{ rss: 32104448, heapTotal: 17716064, heapUsed: 6921080 }
{ rss: 37400576, heapTotal: 22863712, heapUsed: 12754688 }
{ rss: 50458624, heapTotal: 34202976, heapUsed: 9599264 }
{ rss: 50466816, heapTotal: 34202976, heapUsed: 14028992 }
{ rss: 52740096, heapTotal: 37286752, heapUsed: 12801056 }
{ rss: 64057344, heapTotal: 55849568, heapUsed: 21137120 }
{ rss: 69521408, heapTotal: 52789856, heapUsed: 23714024 }
{ rss: 71446528, heapTotal: 55861600, heapUsed: 28131048 }
.
.
.
{ rss: 79785984, heapTotal: 62041184, heapUsed: 12603744 }
{ rss: 79785984, heapTotal: 62041184, heapUsed: 16578768 }
{ rss: 80576512, heapTotal: 62041184, heapUsed: 20950304 }
{ rss: 81498112, heapTotal: 63073120, heapUsed: 22313848 }
{ rss: 81498112, heapTotal: 63073120, heapUsed: 26287224 }
{ rss: 81612800, heapTotal: 64105056, heapUsed: 30657536 }
{ rss: 80576512, heapTotal: 62041184, heapUsed: 15689832 }
{ rss: 80576512, heapTotal: 62041184, heapUsed: 20095856 }
{ rss: 81014784, heapTotal: 63073120, heapUsed: 24465808 }
{ rss: 80773120, heapTotal: 63073120, heapUsed: 24602912 }
{ rss: 80773120, heapTotal: 63073120, heapUsed: 29008592 }
```
