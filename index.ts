import { resolve } from 'dnslink';
import http from 'http';
import url, { URLSearchParams } from 'url';

const server = http.createServer(async (req, res) => {
  const parsed = url.parse(req.url);
  const params = new URLSearchParams(req.url);
  if (!params.get('domain')) return res.end('no domain supplied');
  const cid = await resolve(params.get('domain'));
  res.end(
`<svg xmlns="http://www.w3.org/2000/svg" width="114" height="20">
  <linearGradient id="b" x2="0" y2="100%">
    <stop offset="0" stop-color="#bbb" stop-opacity=".1"/>
    <stop offset="1" stop-opacity=".1"/>
  </linearGradient>
  <mask id="a">
    <rect width="114" height="20" rx="3" fill="#fff"/>
  </mask>
  <g mask="url(#a)">
    <path fill="#555" d="M0 0h62v20H0z"/>
    <path fill="#E05D44" d="M62 0h52v20H62z"/>
    <path fill="url(#b)" d="M0 0h114v20H0z"/>
  </g>
  <g fill="#fff" text-anchor="middle" font-family="Verdana,DejaVu Sans,Geneva,sans-serif" font-size="11">
    <text x="31" y="15" fill="#010101" fill-opacity=".3">coverage</text>
    <text x="31" y="14">coverage</text><text x="87" y="15" fill="#010101" fill-opacity=".3">39.47%</text>
    <text x="87" y="14">39.47%</text>
  </g>
</svg>`);
});

server.listen(3000, () => console.log('Serving badges on port 3000'));
