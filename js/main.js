/* ============================================================
   MAIN.JS — the "engine" that turns your data files into pages.
   You don't need to edit this file. To change what the website
   says, edit the files in the data/ folder instead.
   ============================================================ */

(function () {
  "use strict";

  // Data files define these; fall back to safe defaults if one is missing.
  var profile = typeof PROFILE !== "undefined" ? PROFILE : {};
  var projects = typeof PROJECTS !== "undefined" ? PROJECTS : [];
  var awards = typeof AWARDS !== "undefined" ? AWARDS : [];
  var posts = typeof POSTS !== "undefined" ? POSTS : [];

  var page = document.body.dataset.page || "home";

  /* ---------- small helpers ---------- */

  // Escape text so quotes/symbols in the data never break the page.
  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function slugify(s) {
    return String(s).toLowerCase().trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  // Deterministic pretty gradient for projects without a photo.
  var GRADIENTS = [
    ["#a18cd1", "#fbc2eb"], ["#84fab0", "#8fd3f4"], ["#f6d365", "#fda085"],
    ["#a1c4fd", "#c2e9fb"], ["#fbc2eb", "#a6c1ee"], ["#fddb92", "#d1fdff"],
  ];
  function gradientFor(title) {
    var hash = 0;
    for (var i = 0; i < title.length; i++) hash = (hash * 31 + title.charCodeAt(i)) >>> 0;
    var g = GRADIENTS[hash % GRADIENTS.length];
    return "linear-gradient(135deg, " + g[0] + ", " + g[1] + ")";
  }

  function emptyState(emoji, message) {
    return (
      '<div class="empty-state"><span class="emoji">' + emoji + "</span>" +
      esc(message) + "</div>"
    );
  }

  /* ---------- nav + footer (same on every page) ---------- */

  function renderNav() {
    var links = [
      { href: "index.html", label: "Home", key: "home" },
      { href: "projects.html", label: "Projects", key: "projects" },
      { href: "blog.html", label: "Blog", key: "blog" },
      { href: "about.html", label: "About", key: "about" },
    ];
    var nav = document.createElement("nav");
    nav.className = "site-nav";
    nav.innerHTML =
      '<div class="nav-inner">' +
      '<a class="nav-brand" href="index.html">' + esc(profile.name || "My Website") + "</a>" +
      '<div class="nav-links">' +
      links.map(function (l) {
        var active = l.key === page ? ' class="active"' : "";
        return '<a href="' + l.href + '"' + active + ">" + l.label + "</a>";
      }).join("") +
      "</div></div>";
    document.body.prepend(nav);
  }

  function renderFooter() {
    var footer = document.createElement("footer");
    footer.className = "site-footer";
    footer.innerHTML =
      "<div class='container'>© " + new Date().getFullYear() + " " +
      esc(profile.name || "") + " · Made with ❤️</div>";
    document.body.append(footer);
  }

  /* ---------- project cards ---------- */

  function projectCard(p) {
    var thumb = p.image
      ? '<img class="thumb" src="' + esc(p.image) + '" alt="' + esc(p.title) + '">'
      : '<div class="thumb-fallback" style="background:' + gradientFor(p.title || "?") + '">' +
        esc((p.title || "?").charAt(0).toUpperCase()) + "</div>";

    var tags = (p.tags || [])
      .map(function (t) { return '<span class="tag">' + esc(t) + "</span>"; })
      .join("");

    var open = p.link
      ? '<a class="project-card" href="' + esc(p.link) + '" target="_blank" rel="noopener">'
      : '<div class="project-card">';
    var close = p.link ? "</a>" : "</div>";

    return (
      open + thumb +
      '<div class="card-body">' +
      '<span class="date">' + esc(p.date || "") + "</span>" +
      "<h3>" + esc(p.title || "Untitled project") + "</h3>" +
      "<p>" + esc(p.description || "") + "</p>" +
      '<div class="tags">' + tags + "</div>" +
      "</div>" + close
    );
  }

  function renderProjectGrid(container, list) {
    if (!list.length) {
      container.innerHTML = emptyState("🌱", "No projects here yet — exciting things coming soon!");
      return;
    }
    container.innerHTML = '<div class="card-grid">' + list.map(projectCard).join("") + "</div>";
  }

  /* ---------- contact links ---------- */

  function contactLinksHtml() {
    var links = (profile.links || []).filter(function (l) { return l && l.url; });
    if (!links.length) return "";
    return (
      '<div class="contact-links">' +
      links.map(function (l) {
        return '<a href="' + esc(l.url) + '" target="_blank" rel="noopener">' + esc(l.label) + "</a>";
      }).join("") +
      "</div>"
    );
  }

  /* ---------- page: home ---------- */

  function renderHome() {
    var hero = document.getElementById("hero");
    if (hero) {
      var photo = profile.photo
        ? '<div class="hero-photo"><img src="' + esc(profile.photo) + '" alt="Photo of ' + esc(profile.name || "me") + '"></div>'
        : "";
      hero.innerHTML =
        '<div class="hero-text">' +
        '<p class="hello">Hi, I\'m</p>' +
        "<h1>" + esc(profile.name || "Your Name") + "</h1>" +
        '<p class="tagline">' + esc(profile.tagline || "") + "</p>" +
        '<div class="btn-row">' +
        '<a class="btn" href="projects.html">See my projects</a>' +
        '<a class="btn ghost" href="about.html">About me</a>' +
        "</div></div>" + photo;
    }

    var featuredBox = document.getElementById("featured-projects");
    if (featuredBox) {
      var featured = projects.filter(function (p) { return p.featured; });
      if (!featured.length) featured = projects.slice(0, 3);
      renderProjectGrid(featuredBox, featured);
    }
  }

  /* ---------- page: projects ---------- */

  function renderProjects() {
    var grid = document.getElementById("project-grid");
    var filterBar = document.getElementById("filter-bar");
    if (!grid) return;

    var allTags = [];
    projects.forEach(function (p) {
      (p.tags || []).forEach(function (t) {
        if (allTags.indexOf(t) === -1) allTags.push(t);
      });
    });

    function show(tag) {
      var list = tag === "all"
        ? projects
        : projects.filter(function (p) { return (p.tags || []).indexOf(tag) !== -1; });
      renderProjectGrid(grid, list);
      if (filterBar) {
        filterBar.querySelectorAll(".filter-btn").forEach(function (b) {
          b.classList.toggle("active", b.dataset.tag === tag);
        });
      }
    }

    if (filterBar && allTags.length && projects.length) {
      filterBar.innerHTML =
        '<button class="filter-btn" data-tag="all">All</button>' +
        allTags.map(function (t) {
          return '<button class="filter-btn" data-tag="' + esc(t) + '">' + esc(t) + "</button>";
        }).join("");
      filterBar.addEventListener("click", function (e) {
        var btn = e.target.closest(".filter-btn");
        if (btn) show(btn.dataset.tag);
      });
    }

    show("all");
  }

  /* ---------- page: about ---------- */

  function renderAbout() {
    var aboutBox = document.getElementById("about-content");
    if (aboutBox) {
      var photo = profile.photo
        ? '<div class="about-photo"><img src="' + esc(profile.photo) + '" alt="Photo of ' + esc(profile.name || "me") + '"></div>'
        : "";
      var bioParagraphs = (profile.bio || [])
        .map(function (p) { return "<p>" + esc(p) + "</p>"; })
        .join("");
      aboutBox.innerHTML =
        '<div class="about-layout">' + photo +
        '<div class="about-text"><h2>Hi, I\'m ' + esc(profile.name || "...") + " 👋</h2>" +
        (bioParagraphs || "<p>(Write about yourself in data/profile.js!)</p>") +
        contactLinksHtml() +
        "</div></div>";
    }

    var awardsBox = document.getElementById("awards-list");
    if (awardsBox) {
      if (!awards.length) {
        awardsBox.innerHTML = emptyState("🏆", "Awards and activities will show up here.");
        return;
      }
      awardsBox.innerHTML =
        '<ul class="award-list">' +
        awards.map(function (a) {
          return (
            '<li class="award-item">' +
            '<span class="award-year">' + esc(a.year || "") + "</span>" +
            '<div class="award-body"><h3>' + esc(a.title || "") + "</h3>" +
            "<p>" + esc(a.description || "") + "</p></div></li>"
          );
        }).join("") +
        "</ul>";
    }
  }

  /* ---------- page: blog ---------- */

  function postSlug(post) {
    return post.slug || slugify(post.title || "post");
  }

  function postExcerpt(post) {
    if (post.excerpt) return post.excerpt;
    var plain = String(post.content || "")
      .replace(/[#>*_`\[\]()!-]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    return plain.length > 150 ? plain.slice(0, 150) + "…" : plain;
  }

  function renderBlog() {
    var box = document.getElementById("blog-content");
    var titleBox = document.getElementById("blog-title");
    if (!box) return;

    var slug = new URLSearchParams(window.location.search).get("post");
    var post = slug
      ? posts.filter(function (p) { return postSlug(p) === slug; })[0]
      : null;

    if (post) {
      // single post view
      if (titleBox) titleBox.style.display = "none";
      var body = typeof marked !== "undefined"
        ? marked.parse(String(post.content || ""))
        : "<p>" + esc(post.content || "") + "</p>";
      box.innerHTML =
        '<article class="post-article">' +
        '<a class="back-link" href="blog.html">← All posts</a>' +
        '<p class="date">' + esc(post.date || "") + "</p>" +
        "<h1>" + esc(post.title || "Untitled") + "</h1>" +
        '<div class="post-body">' + body + "</div>" +
        "</article>";
      document.title = (post.title || "Post") + " · " + (profile.name || "Blog");
      return;
    }

    // post list view
    if (!posts.length) {
      box.innerHTML = emptyState("✏️", "No posts yet — the first one is coming soon!");
      return;
    }
    box.innerHTML =
      '<ul class="post-list">' +
      posts.map(function (p) {
        return (
          '<a class="post-item" href="blog.html?post=' + encodeURIComponent(postSlug(p)) + '">' +
          '<span class="date">' + esc(p.date || "") + "</span>" +
          "<h3>" + esc(p.title || "Untitled") + "</h3>" +
          "<p>" + esc(postExcerpt(p)) + "</p></a>"
        );
      }).join("") +
      "</ul>";
  }

  /* ---------- go! ---------- */

  renderNav();

  if (page === "home") renderHome();
  if (page === "projects") renderProjects();
  if (page === "about") renderAbout();
  if (page === "blog") renderBlog();

  renderFooter();
})();
