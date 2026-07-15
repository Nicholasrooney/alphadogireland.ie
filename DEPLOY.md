# Deploying alphadogireland.ie (Git → Hostinger)

This site is plain static HTML/CSS/JS — no build step. Whatever is committed to the
`main` branch on GitHub is exactly what goes live once Hostinger pulls it.

## The repo
- **GitHub:** https://github.com/Nicholasrooney/alphadogireland.ie
- **Local:** `C:\Claudework\AlphaDogireland.ie`

The big raw files (the 177 MB source video and the Instagram screenshots) are in
`_source/` and are **git-ignored** — they stay on the PC and never bloat the repo or the
live site. The web-ready compressed video lives at `images/hero.mp4`.

## Everyday workflow
1. Edit the files on the PC (text, images, etc.).
2. Commit and push:
   ```
   git add -A
   git commit -m "Describe the change"
   git push
   ```
3. In Hostinger → **Websites → alphadogireland.ie → Advanced → Git**, click
   **Deploy / Pull** (or leave auto-deploy on so it pulls on every push).

## One-time Hostinger setup
1. In hPanel go to **Websites → Manage → Advanced → GIT**.
2. **Repository:** `https://github.com/Nicholasrooney/alphadogireland.ie.git`
3. **Branch:** `main`
4. **Directory:** `public_html`  (leave blank/`/` if it deploys to the web root)
5. Click **Create**. Hostinger clones the repo into your web root.
6. (Optional) Enable **Auto Deployment** and copy the webhook URL into the GitHub repo
   under **Settings → Webhooks** so every `git push` redeploys automatically.
7. Point the `alphadogireland.ie` domain at this hosting and enable SSL (free Let's
   Encrypt in hPanel) so the site loads on `https://`.

## Notes
- If Hostinger serves from a subfolder, make sure `index.html` ends up at the web root.
- After DNS + SSL are live, submit `https://alphadogireland.ie/sitemap.xml` in Google
  Search Console to get the pages indexed.
