# Upgraded Personal Professional Portfolio Website

A premium, modern, and highly interactive developer portfolio website designed for **Vaddepalli Kanishq**. The site is structured using clean semantic HTML5, glassmorphic CSS3 layouts, and vanilla JavaScript handlers that coordinate client-side caching to simulate a full stack administrative dashboard.

---

## 🌟 Key Features

1. **🌗 Dual Theme Engine (Light & Dark Mode)**:
   - Configured with custom CSS variables that transition smoothly on click.
   - Saves theme preference persistently inside the user's browser via `window.localStorage`.
   - Prevented loading screen flashes using inline pre-render initialization checks.

2. **📊 Developer Performance Console Dashboard**:
   - **Overview Panel**: Displays dynamic progress indicators detailing technical skills.
   - **Analytics Panel**: Custom-coded SVG Line Graph showing developer hours and commits. Points are hoverable to overlay metadata tooltips relative to the SVG node.
   - **Tasks & Focus Panel**:
     - *Pomodoro focus widget*: Features start, pause, and reset controls with an active SVG circular progress stroke that maps countdown progression. Supports work (25m) and break (5m) configurations.
     - *Activity Backlog*: Live task list enabling adding, checking off, or deleting tasks dynamically.

3. **📝 Collapsible Interactive Resume**:
   - Multi-tab support enabling toggle filters between **Experience** and **Education**.
   - Collapsible accordion elements that expand to reveal detailed items and rotate indicators.
   - Configured with print-specific style rules and a "Print/Save Resume" button to convert it into a neat PDF document.

4. **🔄 Dynamic Projects & Skills Sync**:
   - Built an administrative console at `skills.html` and `projects.html` to register new skills/projects.
   - Local storage lists are parsed and dynamically loaded onto both the admin listings and the home page grids (`index.html`) without hardcoded values.

5. **✉️ Capturing Contact Forms & Inbox Feed**:
   - Displays vital social channels and contact links.
   - Inquiries submitted through the form write to `localStorage` and feed instantly into a **Submitted Inquiries Local Inbox** feed at the bottom of the contact page, allowing local message review and deletion.

6. **🔍 Career Opportunities Search Hub**:
   - A suggestions directory in `jobs.html` with category filters (Internships, Full-Time, Freelance) and real-time character keyword inputs that dynamically filter role cards with animated fades.

---

## 📁 File Structure

- [index.html](file:///c:/Users/vadde/OneDrive/Documents/INTERNSHIP/Future%20Interns/Personal%20Professional%20Portfolio%20Website/index.html): Homepage containing the Hero section, Dev Console Dashboard, Collapsible Resume, dynamic Skills, and dynamic Projects list.
- [skills.html](file:///c:/Users/vadde/OneDrive/Documents/INTERNSHIP/Future%20Interns/Personal%20Professional%20Portfolio%20Website/skills.html): Management page to register or remove skills.
- [projects.html](file:///c:/Users/vadde/OneDrive/Documents/INTERNSHIP/Future%20Interns/Personal%20Professional%20Portfolio%20Website/projects.html): Management page to register, publish, or remove projects.
- [contact.html](file:///c:/Users/vadde/OneDrive/Documents/INTERNSHIP/Future%20Interns/Personal%20Professional%20Portfolio%20Website/contact.html): Vitals hub, communication forms, and the client-side Inquiry Inbox dashboard.
- [jobs.html](file:///c:/Users/vadde/OneDrive/Documents/INTERNSHIP/Future%20Interns/Personal%20Professional%20Portfolio%20Website/jobs.html): suggested openings portal with search filters.
- [style.css](file:///c:/Users/vadde/OneDrive/Documents/INTERNSHIP/Future%20Interns/Personal%20Professional%20Portfolio%20Website/style.css): Styling guidelines, dark mode classes, glassmorphic styles, keyframe animations, and custom scrollbar mappings.
- [script.js](file:///c:/Users/vadde/OneDrive/Documents/INTERNSHIP/Future%20Interns/Personal%20Professional%20Portfolio%20Website/script.js): Caching modules, count intervals, SVGs tooltips, Pomodoro timers, contact managers, and job portal filters.

---

## 🚀 Getting Started

Since this is a fully static client-side project, it runs directly out-of-the-box.

### Method 1: Local Filesystem
Double-click `index.html` on your desktop or file manager to open it in your browser of choice.

### Method 2: Local Web Server (Recommended)
Launch a local server inside the folder to ensure relative routes resolve consistently:
```bash
# Node.js option (using http-server)
npx http-server ./

# Python option
python -m http.server 8000
```
Then navigate to `http://localhost:8080` or `http://localhost:8000` in your web browser.

---

## 🛠️ Technologies Used

- **Markup**: Semantic HTML5 structures.
- **Styling**: Vanilla CSS3 (custom variable systems, flexbox/grid containers, glassmorphism, responsive media queries).
- **Behavior & Caching**: Vanilla JavaScript (ES6+, DOM Events, Web Storage API, SVG paths calculations).
