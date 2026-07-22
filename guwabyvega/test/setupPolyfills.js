// Global polyfills for Vega RN Jest runner
global.jest = global.jest || {};
if (!global.jest.now) {
  global.jest.now = Date.now;
}

// Override requestAnimationFrame to avoid legacy setup.js jest.now call
global.requestAnimationFrame = function (callback) {
  return setTimeout(() => callback(Date.now()), 0);
};
