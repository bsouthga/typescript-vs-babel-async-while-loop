console.log("  ---- running javascript test ");


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
