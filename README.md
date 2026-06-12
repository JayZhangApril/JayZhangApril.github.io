# My Personal Website 🌷

A simple personal portfolio website — projects, blog, awards, and about me.

- **No build step, no installs.** Plain HTML/CSS/JS: double-click
  `index.html` to view it, push to GitHub Pages to publish it.
- **All content lives in the [`data/`](data/) folder** — to update the
  site, you only ever edit those four small files and drop photos into
  [`images/`](images/).

👉 **To learn how to update the site, read [HOW-TO-UPDATE.md](HOW-TO-UPDATE.md).**

## Pages

| Page | What it shows | Content comes from |
|---|---|---|
| `index.html` | Hero + featured projects | `data/profile.js`, `data/projects.js` |
| `projects.html` | All projects, filterable by tag | `data/projects.js` |
| `blog.html` | Blog posts (written in markdown) | `data/posts.js` |
| `about.html` | Bio, photo, awards & activities | `data/profile.js`, `data/awards.js` |

## Under the hood (for the curious)

`js/main.js` reads the data files and renders each page. `css/style.css`
holds all styling — site colors are CSS variables at the top of that file.
`js/marked.min.js` ([marked](https://github.com/markedjs/marked), MIT) turns
blog markdown into HTML. There are no other dependencies.
