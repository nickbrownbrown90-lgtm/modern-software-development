# Modern SDLC Academy (PWA + Google Apps Script)

An interactive, phone-installable Progressive Web App (PWA) and course curriculum for learning end-to-end modern software delivery, powered by an automated Google Apps Script serverless API backend.

---

## Architecture

- **Frontend Course Hub & PWA**: Hosted on **GitHub Pages** (`https://nickbrownbrown90-lgtm.github.io/modern-software-development/`).
  - Standalone mobile display (`display: standalone`) with launcher icons and custom theme styling.
  - Service worker caching (`sw.js`) for offline lesson access and instant loading.
  - Interactive glossary search and direct access to Lesson 0001 and SDLC reference sheets.
- **Backend API**: Hosted on **Google Apps Script** via `@google/clasp`.
  - Script ID: `13xy-hksCSYZ0ypCmTPNGagXWq9s-l8SrXRjqw0Zuwk_SKgmq90vK1FDz`
  - Deployment ID: `AKfycbyhpwUTeATP4uQLuyGeT4ldPTWaNZm0snaPWRMGZfh1AAMdIH7P6YXv_Q2SztE-eeFg`
  - Live Endpoint: `https://script.google.com/macros/s/AKfycbyhpwUTeATP4uQLuyGeT4ldPTWaNZm0snaPWRMGZfh1AAMdIH7P6YXv_Q2SztE-eeFg/exec`

---

## 🚀 1. Deploying to GitHub Pages

1. **Create the repository on GitHub**:
   - Go to [github.com/new](https://github.com/new) and create a repository named:
     `modern-software-development`
   - (Or if using `gh` CLI in your terminal: `gh repo create modern-software-development --public --source=. --remote=origin --push`)

2. **Push your code**:
   ```bash
   cd "/Users/nick/AGI projects/Teach/modern-software-development"
   git remote add origin https://github.com/nickbrownbrown90-lgtm/modern-software-development.git
   git push -u origin main
   ```

3. **Activate GitHub Pages**:
   - In your GitHub repository: go to **Settings** > **Pages** (in the left sidebar).
   - Under **Build and deployment > Source**, select **Deploy from a branch**.
   - Under **Branch**, select `main` and `/ (root)`, then click **Save**.
   - Your live site will be ready in ~1 minute at:  
     👉 **`https://nickbrownbrown90-lgtm.github.io/modern-software-development/`**

---

## 📲 2. Installing on Mobile Devices

### Android Phone (Google Chrome / Edge)
1. Open the GitHub Pages URL in Chrome: `https://nickbrownbrown90-lgtm.github.io/modern-software-development/`
2. Tap the **"📲 Install Mobile App"** button at the top, or tap the three dots (**⋮**) in the top right.
3. Select **Install app** (or **Install Modern SDLC Academy**).
4. The app installs directly into your Android App Drawer and home screen as a standalone application.

### iPhone / iPad (Safari)
1. Open the GitHub Pages URL in **Safari**.
2. Tap the **Share** button (box with upward arrow at bottom of screen).
3. Scroll down and tap **Add to Home Screen**.
4. Tap **Add**.
5. The app icon appears on your home screen and launches in fullscreen standalone mode.

---

## 🔄 3. Updating the Google Apps Script Backend
To push updates to `Code.js`:
```bash
export PATH="$HOME/.npm-global/bin:$PATH"
clasp push
clasp deploy -i "AKfycbyhpwUTeATP4uQLuyGeT4ldPTWaNZm0snaPWRMGZfh1AAMdIH7P6YXv_Q2SztE-eeFg" -d "Update backend API"
```
