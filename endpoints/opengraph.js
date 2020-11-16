export default function async (req, res, next) {
  const url = require('url')
  const ogs = require('open-graph-scraper')
  const query = url.parse(req.url, true).query

  if (query.url) {
    ogs({ url: query.url })
      .then(({ result }) => {
        let data = {}

        if (result) data = result

        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(data))
      })
      .catch(() => {
        res.writeHead(500, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({ error: 'internal error' }))
      })
  } else {
    res.writeHead(401, {'Content-Type': 'application/json'});
    res.end(JSON.stringify({ error: 'url param missing' }))
  }
}
