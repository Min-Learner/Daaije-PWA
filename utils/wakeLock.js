export default function wakeLock() {
  let wakeLock;
  const acquireLock = async () => {
    try {
      wakeLock = await navigator.wakeLock.request("screen");
    } catch (err) {
      console.log(`${err.name}, ${err.message}`);
    }
  };

  const releaseLock = () => {
    if (wakeLock) {
      wakeLock.release().then(() => (wakeLock = null));
    }
  };

  const handleVisibilityChange = () =>
    document.visibilityState === "hidden" ? releaseLock() : acquireLock();

  return { acquireLock, handleVisibilityChange };
}
