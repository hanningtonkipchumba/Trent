# TRENT School Management Website

This is a standalone static website for the TRENT school management platform.

## Added features

- The homepage date and greeting now follow the visitor's local browser time.
- All former demo buttons are now **Get the app** and lead to `apps.html`.
- `dashboard.html` is a private Supabase-backed analytics dashboard.

## One-time analytics setup

1. Create a Supabase project.
2. In its SQL Editor, run `supabase-setup.sql` after replacing `YOUR_OWNER_EMAIL` with your email.
3. In **Authentication > Users**, create an owner user with that same email and a strong password.
4. Copy the project URL and publishable/anon key from **Settings > API** into both `script.js` and `dashboard.js`. In `dashboard.js`, also set `OWNER_EMAIL`.
5. Replace the three `href="#"` placeholders in `apps.html` with your real School, Parent, and Student app URLs.

Never put a Supabase `service_role` key in this repository. The database policy limits analytics reads to your configured email.

## Publish to GitHub

```powershell
git add index.html script.js apps.html apps.css dashboard.html dashboard.css dashboard.js supabase-setup.sql README.md
git commit -m "Add local time, app links, and private analytics dashboard"
git push origin main
```

After deployment, visit `/dashboard.html` on your website and sign in.

## Open in VS Code

1. Open VS Code.
2. Select **File → Open Folder**.
3. Choose this `trent-coming-soon` folder.
4. Open `index.html` in a browser, or use the Live Server extension for automatic refresh while editing.

## Files

- `index.html` — website structure and content
- `styles.css` — base layout and responsive styles
- `school.css` — TRENT dashboard and school-platform styles
- `script.js` — small page behavior
