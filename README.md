# Express Path Combiner

Simple Express project that serves a `public` folder as static content
and exposes a `/combine` endpoint that joins two path segments.

## Setup

```bash
npm install
npm start
```

Then open http://localhost:3000

## Deploy to Vercel

```bash
npm i -g vercel
vercel
```

Or connect the repo in the Vercel dashboard — `vercel.json` routes all requests to `index.js`, and the `public` folder is served statically.

## Endpoints

- `GET /` — serves `public/index.html`
- `GET /combine?a=foo&b=bar` — returns `{ "combined": "foo/bar" }`
- `GET /view?file=sample.txt` — joins `public` + the filename and sends its content as plain text (displayed in browser, not downloaded)
- `GET /shorten?file=sample.txt` — creates a short URL for a file, returns `{ "shortUrl": "http://localhost:3000/s/aB3xK9", "code": "aB3xK9", "file": "sample.txt" }`
- `GET /s/:code` — resolves the short code and sends the file as plain text

Example:

```bash
curl "http://localhost:3000/view?file=sample.txt"

# Create a short link
curl "http://localhost:3000/shorten?file=sample.txt"

# Use the short link
curl "http://localhost:3000/s/aB3xK9"
```

Note: short links are stored in memory, so they reset when the server restarts.
