const demonstrateSyncVsAsync = () => {
  // TODO: Log a message at the start
  console.log("🌠 Script Start");

  // TODO: Create a synchronous operation that logs a message
  function syncOp() {
    console.log("🔵 Synchronous Operation");
  }

  syncOp();

  // TODO: Create an asynchronous operation using setTimeout that logs a message after 2 seconds
  async function asyncOp(timeout) {
    setTimeout(() => {
      console.log("🟡 Asynchronous Operation");
    }, timeout);

    syncOp(2000);
  }

  // TODO: Log a message at the end
  console.log("✔ Script End");
};
