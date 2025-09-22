# Qatari Community Website Setup Guide

---

## 1. Install Required Tools

- **Visual Studio Code (VSC)**  
  Download and install:  
  https://code.visualstudio.com/download

- **Node.js (includes npm)**  
  Download and install the LTS (Long-Term Support) version:  
  https://nodejs.org/

- **Git**  
  Download and install:  
  https://git-scm.com/downloads/win

---

## 2. Create a GitHub Account

If you don't have one already, sign up for a free account:  
https://github.com/signup

---

## 3. Set Up Visual Studio Code with GitHub

- Open **Visual Studio Code**.
- Sign in with your GitHub account (look for the accounts icon in the bottom-left corner or use the Command Palette: `Ctrl+Shift+P` and type "Sign in").

---

## 4. Clone the Project

1. Create a folder on your computer where you want to keep the website project.
2. Open a terminal (you can use the built-in VSC terminal: `Ctrl+` \` ).
3. Run the following command to clone the repository:

```bash
git clone https://github.com/Bumyy/QatariVirtualLanding.git
```

4. Open the cloned folder in VSC (`File > Open Folder...`).

---

## 5. Branch Setup & Working with Git

- In VSC’s left panel, click the **Source Control** icon (looks like a branching path).
- Under **Repositories**, you should see the website repo.
- At the bottom-left of VSC, click the branch name (it will likely say `master`).
- A menu will appear at the top. Select or switch to the `dev` branch — **this is where all development work happens**.
- The `master` branch is reserved for the live, production version of the site.

---

## 6. Install Project Dependencies

- Before you can run the website, you need to install all the required packages defined in `package.json`.
- Open the VSC terminal and run:

```bash
npm install
```

---

## 7. Environment Variable Setup

- In the Explorer tab, find the `.env.example` file.
- **Copy** and **paste** this file in the same root folder.
- Rename the new file from `copy of .env.example` to just `.env`.
- This `.env` file is ignored by Git and will store secret keys or environment-specific settings. Open it and fill in the required values.

_Example `.env` content:_

```
PUBLIC_API_ENDPOINT=https://api.example.com/data
SECRET_ADMIN_KEY=keep_this_value_secret
```

---

## 8. Running the Website Locally

- To start the local development server, run the following command in your terminal:

```bash
npm run dev
```

- Your terminal will show you a local URL, usually `http://localhost:4321`.
- Open this URL in your web browser to see the website.
- The site will automatically reload whenever you save changes to a file!

---

## 9. Editing and Committing Changes

- Use the **Explorer** tab in VSC to browse the project files. Most of your work will be in the `src/` directory (e.g., editing pages in `src/pages/` or components in `src/components/`).
- After making your changes, go to the **Source Control** tab.
- Click the **+ (plus)** icon next to changed files to "stage" them.
- Write a clear and descriptive **commit message** in the message box (e.g., "feat: add user profile page" or "fix: correct navbar link").
- Click the **checkmark (✓) icon** to commit your changes.
- Finally, click the **Sync Changes** button (or the little cloud icon) to push your commits to the `dev` branch on GitHub so the team can see them.

---

## 10. Other Useful Commands

All commands are run from the project root in your terminal.

| Command           | Action                                                         |
| :---------------- | :------------------------------------------------------------- |
| `npm install`     | Installs or updates dependencies                               |
| `npm run dev`     | Starts the local development server with hot-reloading         |
| `npm run build`   | Creates a production-ready build in the `./dist/` folder       |
| `npm run preview` | Lets you preview the production build locally before deploying |

---

## Summary

- Clone repo → Switch to `dev` branch
- Run `npm install` to get all packages
- Set up your `.env` file from the example
- Edit code in the `src/` folder
- Run `npm run dev` to test your changes locally
- Stage, commit, and push your changes via Git

---

If you get stuck or need help, just ask! Happy coding 🚀
