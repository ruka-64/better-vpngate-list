import { Hono } from 'hono';
import { renderer } from './renderer';
import { fetchVpnGateList } from './utils/fetchdata';
import { parseUnixTimestamp } from './utils/parseTimestamp';

const app = new Hono();

app.use(renderer);

app.get('/', async (c) => {
  const data = await fetchVpnGateList();
  return c.render(
    <>
      <h1>VPNGate Server List</h1>
      <h2>{data.length} Servers available</h2>

      <table>
        <thead>
          <tr>
            <th>IP</th>
            <th>Latency</th>
            <th>CountryLong</th>
            <th>Sessions</th>
            <th>Uptime</th>
            <th>Total Users</th>
            <th>Log duration</th>
            <th>Operator</th>
          </tr>
        </thead>
        <tbody id='vpnData'>
          {data.map((x) => {
            if (typeof x === 'string') return;
            return (
              <tr>
                <td>{x.ip}</td>{' '}
                <td class={'min'}>
                  <span class={'tableValue'}>{x.ping}</span>
                  <span>ms</span>
                </td>
                <td>{x.countryLong}</td>
                <td>
                  <span class={'tableValue'}>{x.NumVpnSessions}</span>
                  <span>sessions</span>
                </td>
                <td>{parseUnixTimestamp(Number(x.Uptime))}</td>
                <td>
                  <span class={'tableValue'}>{x.TotalUsers}</span>
                  <span>Users</span>
                </td>
                <td>{x.LogType}</td>
                <td>{x.Operator}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
});
export default app;
