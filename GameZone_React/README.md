# 🎮 GameZone — Gaming Tournament Portal (React)

This is the React conversion of the supplied Gaming Tournament Portal. The original GameZone dark gaming theme, CSS layouts, image assets, intro video, and Player / Organizer / Admin roles have been retained. The app continues to use the same LocalStorage keys so existing browser demo data can be reused.

## Technology

- React 18
- Vite
- React Router
- Existing CSS3 styles (Grid, Flexbox and CSS animations)
- Browser LocalStorage

## Run locally

Install Node.js (Node 18 or newer), open this folder in VS Code, then run:

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (normally `http://localhost:5173`).

Create a production build with:

```bash
npm run build
npm run preview
```

## Demo accounts

| Role | Email | Password |
|---|---|---|
| Admin | `admin@gamezone.com` | `admin123` |
| Organizer | `organizer@gamezone.com` | `organizer123` |
| Player | Create an account from Sign Up | Your chosen password |

Public Sign Up allows Player and Organizer roles. Admin is seeded as a demo account and is not selectable on public registration.

## Modules

### Player
- Sign up and login
- Browse, search and filter tournaments
- View tournament details
- Register once per tournament, subject to available slots
- View registered tournaments and profile

### Organizer
- Organizer dashboard and registration summary
- Create, edit and delete tournaments
- Set game, type, schedule, prize, slots, status and description
- Filter registrations by tournament and remove an entry

### Admin
- System dashboard
- Create, edit and delete tournaments
- View player accounts and ban / unban players

## LocalStorage keys

| Key | Purpose |
|---|---|
| `gz_users` | Player, Organizer and demo Admin accounts |
| `gz_session` | Current login session (password is not copied into the session) |
| `gz_tournaments` | Tournament records |
| `gz_registrations` | Tournament registration records |

The data layer includes JSON parse fallback handling and keeps the original storage key names. Existing values are not automatically cleared during the conversion.

## Project structure

```text
GameZone_React/
├── public/
│   └── assets/
│       ├── images/
│       └── videos/
├── src/
│   ├── App.jsx
│   ├── components.jsx
│   ├── main.jsx
│   ├── pages.jsx
│   ├── store.jsx
│   └── styles/
│       ├── style.css
│       ├── auth.css
│       ├── admin.css
│       ├── user.css
│       ├── organizer.css
│       └── react-fixes.css
├── index.html
├── package.json
└── vite.config.js
```

## Organizer create-tournament fix

The supplied `js/organizer.js` started and ended with Markdown code fences, which made it invalid JavaScript in the browser. The Organizer HTML files were also wrapped in Markdown fences. The React version removes those wrappers and uses a React-controlled form with submit handling, required-field validation, slot validation, edit mode, and LocalStorage persistence.

The earlier Player tournament filter also had malformed Free / Paid option values; the React filter uses valid controlled select options.

## Notes

- This is a front-end academic demonstration. LocalStorage is browser-specific and is not a shared database between different devices or browsers.
- Demo passwords are stored in browser LocalStorage to meet the original client-side project requirement. Do not use this authentication approach for a real production service; production apps require server-side authentication and hashed passwords.
- The project uses BrowserRouter. For static hosting, configure the host to rewrite app routes to `index.html` so refreshing a nested route continues to work.
