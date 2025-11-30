async function fetchVpnGateList() {
  console.log('Fetching VPNGateList');
  const fetchms = performance.now(); //dev
  const res = await (await fetch('http://www.vpngate.net/api/iphone/')).text();
  console.log(`Fetched in ${(performance.now() - fetchms).toFixed(2)}ms`);
  const checkms = performance.now();
  console.log('Validating...');
  const lines = res.split('\n');
  const validIpRegex =
    /^(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}$/;
  const results = lines
    .map((line) => {
      const parts = line.split(',');
      if (validIpRegex.test(parts[1])) {
        return parts[1];
      }
      return null;
    })
    .filter((result) => result !== null) as string[];
  console.log(`Validated in ${(performance.now() - checkms).toFixed(2)}ms`);
  return results;
}
