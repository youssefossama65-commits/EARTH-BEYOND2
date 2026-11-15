# Beyond Earth 🚀

An interactive space-discovery website about equipment NASA left behind: Apollo Lunar Module & Rover, Surveyor 3, Sojourner, Spirit & Opportunity, Viking, InSight, Ingenuity, Dawn, NEAR Shoemaker, Pioneer 10, Kepler and more.

Built for the **NASA Space Apps Challenge 2026** — *NASA's Discarded Equipment Storytelling*.

## Pages

| Page | Description |
|------|-------------|
| `index.html` | Landing page — "Start Session" |
| `session.html` | Ship Bay — 3D guided tour with narration |
| `devices.html` | Catalog of all devices |
| `device.html?device=ID` | Details page for one device |
| `room.html?device=ID` | 3D room to explore a device's parts |

## Tech

Plain HTML, CSS and JavaScript with [Three.js](https://threejs.org/) (bundled as `three.min.js`). No build step and no dependencies to install.

## Run locally

Just open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Deploy on GitHub Pages

1. Push this repo to GitHub.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, select `main` and `/ (root)`, then **Save**.
4. After a minute the site is live at `https://<username>.github.io/<repo-name>/`.

## Credits

Images and mission information: NASA (images.nasa.gov, science.nasa.gov, NSSDC). NASA media is generally not copyrighted, see the [NASA media usage guidelines](https://www.nasa.gov/nasa-brand-center/images-and-media/).
