# 🌷 How to Update Your Website

This is your guide to keeping your website up to date. No coding experience
needed — promise! Keep this file around and come back to it whenever you
want to change something.

---

## 1. How your website is organized

Your website folder looks like this:

```
📁 your-website/
├── 📁 data/        ⭐ THE ONLY FOLDER YOU EDIT
│   ├── profile.js     → your name, photo, bio, contact links
│   ├── projects.js    → your projects
│   ├── awards.js      → your awards & activities
│   └── posts.js       → your blog posts
├── 📁 images/      ⭐ DROP YOUR PHOTOS IN HERE
└── everything else    → the "engine" — you never need to touch it
```

**The golden rule:** you only ever edit files inside `data/` and add
pictures to `images/`. Everything else just works.

To edit a file, open it in any text editor — **TextEdit** (Mac),
**Notepad** (Windows), or [VS Code](https://code.visualstudio.com/) if you
want something nicer (it color-codes things, which makes mistakes easier
to spot).

> ⚠️ **If you use TextEdit on Mac:** go to TextEdit → Settings → and pick
> "Plain Text", otherwise it may mess up the quote marks.

To see your changes: save the file, then refresh the website in your
browser. That's it — there's no "build" or "compile" step.

---

## 2. How to add a project 🎨

1. Open `data/projects.js`
2. Find the line that says `⬇️ PASTE NEW PROJECTS HERE ⬇️`
3. Copy an existing project block — everything from a `{` to its matching `},`
4. Paste it right under that line
5. Change the text between the quotes

**Before:**

```js
const PROJECTS = [
  // ⬇️ PASTE NEW PROJECTS HERE (newest at the top) ⬇️

  {
    title: "Science Fair: River Water Quality Study",
    ...
```

**After (new project added on top):**

```js
const PROJECTS = [
  // ⬇️ PASTE NEW PROJECTS HERE (newest at the top) ⬇️

  {
    title: "My Short Film About Recycling",
    date: "September 2026",
    description: "A 3-minute documentary I filmed and edited for class.",
    image: "images/recycling-film.jpg",
    link: "https://youtube.com/watch?v=...",
    tags: ["film", "school"],
    featured: true,
  },

  {
    title: "Science Fair: River Water Quality Study",
    ...
```

**To add a picture for it:** put the photo file into the `images/` folder,
then write its name in the `image:` line, like `"images/recycling-film.jpg"`.
No photo? Just write `image: "",` and the site makes a pretty colored card.

**To remove a project:** delete its whole block, from `{` to `},`.

---

## 3. How to write a blog post ✏️

1. Open `data/posts.js`
2. Copy a post block, paste it under `⬇️ PASTE NEW POSTS HERE ⬇️`
3. Change the title and date
4. Write your post between the two **backtick** marks ( \` ) — that's the
   key above Tab, *not* a regular quote mark

Inside your post you can use simple formatting:

| You type | You get |
|---|---|
| `## My heading` | a big heading |
| `**bold**` | **bold** |
| `*italic*` | *italic* |
| `- item` | a bullet point |
| `[click here](https://example.com)` | a link |
| `![my dog](images/dog.jpg)` | a photo (put it in `images/` first) |

---

## 4. How to update your photo, bio, and awards

- **Your photo:** put your picture in `images/` (for example `me.jpg`),
  then open `data/profile.js` and change the photo line to
  `photo: "images/me.jpg",`
- **Your name / tagline / bio:** also in `data/profile.js` — just edit the
  text between the quotes.
- **Contact links:** in `data/profile.js`, in the `links:` list. Delete a
  line to hide it, copy a line to add one.
- **Awards & activities:** open `data/awards.js` and copy/edit the blocks,
  same as projects.

---

## 5. How to put your website on the internet 🌍 (one-time setup)

Your site will live on **GitHub Pages** — it's free.

1. Go to [github.com](https://github.com) and create an account
2. Click the **+** (top right) → **New repository**
3. Name it exactly: `yourusername.github.io` (using *your* username)
   and set it to **Public** → **Create repository**
4. Click **"uploading an existing file"**, drag your whole website
   folder's contents in (all the files and folders), and click
   **Commit changes**
5. Go to the repo's **Settings → Pages**, and under "Branch" choose
   `main` and **Save**
6. Wait a minute or two, then visit `https://yourusername.github.io` — your
   website is live! 🎉

---

## 6. How to publish updates after that

**The easy way (in your browser, from any computer):**

1. Go to your repository on github.com
2. Click into `data/`, then the file you want (like `projects.js`)
3. Click the **pencil icon** ✏️ (top right of the file)
4. Make your edits, then click **Commit changes**
5. Wait ~1 minute and refresh your website — your change is live

To upload new photos: open the `images/` folder on github.com →
**Add file → Upload files**.

**The local way (edit on your computer):**

1. Install [GitHub Desktop](https://desktop.github.com) (no terminal needed)
   and clone your repository to your computer
2. Edit your files, and double-click `index.html` to preview the site
3. In GitHub Desktop: write a short note about what you changed →
   **Commit to main** → **Push origin**

---

## 7. If something breaks 🚑

If a page suddenly shows up empty or wrong, you almost certainly have a tiny
typo in a `data/` file. The usual suspects:

- ❌ a missing **comma** after a `}` or after a `"text"` line
- ❌ a missing **quote mark** — every piece of text needs one at each end
- ❌ a quote mark *inside* your text — write `it's` is fine, but if you need
  a double quote inside text, use 'single quotes' around that text instead
- ❌ curly “smart quotes” from a word processor — use plain `"` quotes
  (this is why Plain Text mode matters in TextEdit)

**How to check:** compare your block character-by-character against one
that still works. The pattern is always:

```js
  {
    title: "some text",     ← quote, text, quote, comma
    date: "some text",
  },                        ← closing brace, comma
```

**The undo button:** if you can't find the problem, GitHub remembers every
version of every file. On github.com, open the file → click **History**
(top right) → click the version from before your change → copy the old
content back. You can never permanently break anything. 💪
