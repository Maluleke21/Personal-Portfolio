# Hlavutelo Maluleke

**[Open the live portfolio](https://hlavutelo-portfolio.onrender.com/)**

An interactive desktop portfolio for my software development and data engineering work. Select **Open desktop** on the lock screen, or open **Selected projects** to go straight to Finder.

## Explore the desktop

| App | What you can do |
| --- | --- |
| Finder | Browse FitForge, Healthcare_DB, Mn’wanati and Fredrose Security. Select **CV** to preview or download my résumé. |
| Healthcare_DB in Finder | Run the ETL demo on synthetic clinic records. Remove a duplicate, standardise region names and compare visit totals. |
| Camera and Photos | Capture a shot or choose an image. Download it or keep it in a photo roll stored in your browser on this device. |
| Notes and Calendar | Read my engineering notes and explore my career timeline. |
| Safari and Mail | Find project links, my GitHub profile and contact details. |

## Run locally

The compiled site is included in `dist/`. With Git and Python 3 installed, run:

```sh
git clone --branch hlavutelo-desktop --single-branch https://github.com/Maluleke21/Personal-Portfolio.git
cd Personal-Portfolio
python -m http.server 8000 --directory dist
```

Open [localhost:8000](http://localhost:8000). On Windows, `py -3` also works in place of `python`. Allow camera access when prompted to try live capture.

## Rebuild after editing

Edit the React components in `src/`. With Node.js and npm installed, run the following from the repository root:

```sh
npm install
npm run build
```

Babel compiles the TSX files into `dist/app.js`. Styles are in `dist/style.css`. Render builds the `hlavutelo-desktop` branch and serves `dist/`.
