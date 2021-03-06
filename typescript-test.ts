/// <reference path='./typings/main.d.ts' />

console.log("  ---- running typescript test ");

const asyncOp = async function() {
  return true;
};

const asyncLoop = async function(callback = function() {}) {
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
