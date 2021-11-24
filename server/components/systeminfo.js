const OS = require("os");
const username = OS.hostname();
const osname = OS.version();
const osFreemem = OS.freemem();
const osTotlemem = OS.totalmem();
const osplatform = OS.platform();
const osnetwork = OS.networkInterfaces();
const userinfo = OS.userInfo();
const systemdata = {
  username,
  osname,
  osFreemem,
  osTotlemem,
  osplatform,
  osplatform,
  osnetwork,
  userinfo,
};
module.exports = systemdata;
