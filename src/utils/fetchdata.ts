export async function fetchVpnGateList() {
  console.log('Fetching VPNGateList');
  const fetchms = performance.now(); //dev
  const res = await (await fetch('http://www.vpngate.net/api/iphone/')).text();
  console.log(`Fetched in ${(performance.now() - fetchms).toFixed(2)}ms`);
  const checkms = performance.now();
  const lines = res.split('\n').slice(2, -2);
  const parsed = lines.map((val) => parseVpnData(val));
  return parsed;
}

function parseVpnData(vpnString: string) {
  const values = vpnString.split(',');

  const [
    hostname,
    ip,
    score,
    ping,
    speed,
    countryLong,
    countryShort,
    NumVpnSessions,
    Uptime,
    TotalUsers,
    TotalTraffic,
    LogType,
    Operator,
    Message,
  ] = values.slice(0, values.length - 1);

  //? #HostName,IP,Score,Ping,Speed,CountryLong,CountryShort,NumVpnSessions,Uptime,TotalUsers,TotalTraffic,LogType,Operator,Message,OpenVPN_ConfigData_Base64
  return {
    hostname,
    ip,
    score,
    ping,
    speed,
    countryLong,
    countryShort,
    NumVpnSessions,
    Uptime,
    TotalUsers,
    TotalTraffic,
    LogType,
    Operator,
    Message,
  };
}
