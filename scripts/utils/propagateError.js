module.exports = async function (callback, action) {
  let error = undefined;
  try {
    await action();
  } catch (e) {
    error = e;
    console.error("Unhandled exception: ", e);
  } finally {
    callback(error);
  }
};
