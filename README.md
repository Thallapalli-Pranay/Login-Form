# Login Page (Static Demo)

A simple, self-contained login page — plain HTML/CSS/JS, no build step, no backend required to run it.

**Live demo credentials:** username `demo`, password `demo123`

## What's in here

```
index.html    the page markup
style.css     all styling
script.js     form validation + fake auth check + UI behavior
```

There's no server. `script.js` checks the username/password against a hardcoded demo value in the browser. It's meant as a starting point for the UI — see "Connecting real auth" below for wiring it to something real.

## Run it locally

No install needed. Just open `index.html` in a browser, or serve it locally:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Put this on GitHub and deploy it

1. Create a new repository on GitHub (or use the one you already made).
2. Push these three files to it:
   ```bash
   git init
   git add .
   git commit -m "Initial login page"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo>.git
   git push -u origin main
   ```
3. Turn on GitHub Pages: repo **Settings → Pages → Source → Deploy from a branch → main / (root)**. GitHub will give you a live URL a minute or two later.

## Forking

If this lives in a repo you want others (or your other GitHub account) to fork: on GitHub, click **Fork** in the top-right of the repo page — that creates their own copy under their account. No extra setup needed on your end; the site is static so a fork works out of the box once they also enable Pages on their copy (step 3 above).

## Connecting real auth

Right now `checkCredentials()` in `script.js` just compares strings in the browser — fine for a demo, not safe for anything real. To hook it up to an actual backend:

```js
async function checkCredentials(username, password) {
  const res = await fetch('https://your-api.example.com/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  return res.ok;
}
```

Given your .NET background, this pairs naturally with an ASP.NET Core Web API endpoint doing the real credential check (hashed passwords, JWT/session issuance, etc.) — happy to help scaffold that side too if you want it.
