/* ============================================================
   🎨 YOUR PROJECTS — this file controls the Projects page.

   HOW TO ADD A PROJECT:
   1. Copy one whole block, from its opening {  to its closing },
   2. Paste it right below the line that says "PASTE NEW PROJECTS HERE"
   3. Change the text. Save. Refresh your browser. Done! 🎉

   WHAT EACH LINE MEANS:
   - title:        the project's name
   - date:         when you did it (any text, like "March 2026")
   - description:  one or two sentences about it
   - image:        a picture from the images/ folder, like "images/my-photo.jpg".
                   Use "" (empty quotes) if you don't have a picture —
                   the site will make a pretty colored card instead.
   - link:         where the project lives (a Google Doc, video, etc.).
                   Use "" if there's nothing to link to.
   - tags:         a few words to group projects, like ["art", "school"]
   - featured:     true  = also show this on the home page
                   false = only show it on the Projects page

   The first project in this list shows first on the page.
   ============================================================ */

const PROJECTS = [
  // ⬇️ PASTE NEW PROJECTS HERE (newest at the top) ⬇️

  {
    title: "Science Fair: River Water Quality Study",
    date: "March 2026",
    description: "I tested water samples from three spots along our local river for pH, nitrates, and turbidity, and mapped how water quality changes downstream.",
    image: "images/placeholder-science.svg",
    link: "",
    tags: ["science", "research"],
    featured: true,
  },

  {
    title: "Watercolor Series: Four Seasons",
    date: "January 2026",
    description: "A set of four watercolor paintings, one for each season, shown at our school's winter art exhibition.",
    image: "images/placeholder-art.svg",
    link: "",
    tags: ["art"],
    featured: true,
  },

  {
    title: "Beach Clean-Up Club",
    date: "Ongoing since 2025",
    description: "I help organize monthly beach clean-ups with my school's volunteering club — so far we've collected over 200 bags of trash!",
    image: "",
    link: "",
    tags: ["volunteering", "leadership"],
    featured: true,
  },

  {
    title: "My First Website (this one!)",
    date: "June 2026",
    description: "I learned how a website is put together and now I keep this site updated all by myself.",
    image: "",
    link: "",
    tags: ["tech"],
    featured: false,
  },
];
