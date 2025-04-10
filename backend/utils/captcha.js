const svgCaptcha = require('svg-captcha');

const generateCaptcha = () => {
  const captcha = svgCaptcha.create({
    size: 6,
    noise: 3,
    color: true,
    background: '#f0f0f0'
  });
  return {
    text: captcha.text.toLowerCase(),
    data: captcha.data
  };
};

module.exports = { generateCaptcha };