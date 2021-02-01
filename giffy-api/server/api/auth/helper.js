function generateAuthHash() {
  const randomStr =
    Math.random().toString(36).slice(5) + Math.random().toString(36).slice(5);
  return randomStr;
}

module.exports = {
  generateAuthHash,
};
