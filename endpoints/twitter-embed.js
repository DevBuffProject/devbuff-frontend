import axios from "axios"

export default async (req, res, next) => {
  const error = (code, message) => {
    res.writeHead(code, {'Content-Type': 'application/json'});
    res.end(JSON.stringify({ error: message }))
  }

  const url = require('url')
  const query = url.parse(req.url, true).query
  const tweetUrl = query.url

  if (!tweetUrl) error(401, 'url param missing')

  try {
    const { data } = await axios.get(`https://publish.twitter.com/oembed?url=${tweetUrl}`)

    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(data))
  } catch (e) {
    error(500, 'internal error')
  }

  // const ogs = require('open-graph-scraper')
  // const query = url.parse(req.url, true).query
  //
  // if (query.url) {
  //   ogs({ url: query.url })
  //     .then(({ result }) => {
  //       let data = {}
  //
  //       if (result) data = result
  //
  //       res.writeHead(200, {'Content-Type': 'application/json'});
  //       res.end(JSON.stringify(data))
  //     })
  //     .catch(() => {
  //       res.writeHead(500, {'Content-Type': 'application/json'});
  //       res.end(JSON.stringify({ error: 'internal error' }))
  //     })
  // } else {
  //   res.writeHead(401, {'Content-Type': 'application/json'});
  //   res.end(JSON.stringify({ error: 'url param missing' }))
  // }
}
