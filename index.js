require('dotenv').config();

const { PORT } = process.env;

const vhost = require('vhost');
const express = require("express");
const moxxiproxxi = express();
const config = require('./.config.js');

Object.keys(config.domains).forEach(domain => {
  const settings = config.domains[domain];

  settings.app = express();

  settings.proxies.forEach(proxySetting => {
    settings.app.use(proxySetting.path, proxySetting.proxy);
  });
});

Object.keys(config.domains).forEach(domain => {
  const settings = config.domains[domain];

  settings.vhosts.forEach(vhostSetting => {
    moxxiproxxi.use(vhost(vhostSetting, settings.app));
  });
});

moxxiproxxi.listen(PORT);

