const fs = require('fs');
const util = require('util');

const getRandomProxy = (proxyArr) => {
  return proxyArr[Math.floor(Math.random() * proxyArr.length)];
};

// Get the proxy details from the random proxy that got selected
const readProxyFilePromise = util.promisify(fs.readFile);
const proxyDetails = async (fileName) => {
  const proxyFileData = await readProxyFilePromise(fileName);
  const proxyArr = proxyFileData.toString().split('\n');

  let randomProxy = getRandomProxy(proxyArr);
  proxyArr.filter((proxy) => proxy !== randomProxy);
  randomProxy = randomProxy.split(':');

  const proxyDetails = {
    host: randomProxy[0],
    port: randomProxy[1],
    username: randomProxy[2],
    password: randomProxy[3],
  };

  return proxyDetails;
};

proxyDetails('vips-residential2.txt')
  .then((data) => console.log(data))
  .catch((err) => console.error(err));