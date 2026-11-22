# Hlavutelo Maluleke | Portfolio

I’m a data engineer and software developer based in Johannesburg. This portfolio showcases my work in healthcare analytics, fitness software, and web development.

[Live portfolio](https://maluleke.netlify.app/) · [Selected projects](https://maluleke.netlify.app/project) · [Résumé](https://maluleke.netlify.app/resume)

## Featured projects

| Project | What I built |
| --- | --- |
| Healthcare_DB | A Python pipeline that cleans CDC healthcare records, loads them into PostgreSQL, and supports analysis in Jupyter. |
| FitForge | A mobile-first app for planning workouts, tracking nutrition, and reviewing progress. |
| Fredrose Security Services | A responsive React and TypeScript website for a security company in Malamulele. |

## Run locally

The portfolio uses React, React Router, React-Bootstrap, and custom CSS. With Git, Node.js, and npm installed, run the following commands to check out the branch used for the current Netlify release.

```sh
git clone --branch update-portfolio-resume https://github.com/Maluleke21/Personal-Portfolio.git
cd Personal-Portfolio
npm ci --legacy-peer-deps
npm start
```

Open the development server at [localhost:3000](http://localhost:3000).

## Update the portfolio

| To update | Edit |
| --- | --- |
| Project descriptions and links | `src/components/Projects/Projects.js` |
| Project images | `src/Assets/Projects/` |
| Olive theme and layout | `src/style.css` and `src/index.css` |
| Résumé preview and download | Replace `public/Hlavutelo-Maluleke-CV.pdf`. Both use the same file. |

## Publish to Netlify

Run `npm run build`, then upload the generated `build/` folder to the existing **maluleke** project using Netlify Drop. The current release uses manual deployment. Keep `public/_redirects` in the source so direct links to `/project` and `/resume` work after deployment.
