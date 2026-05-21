# Deploying YourTransport to GitHub Pages

This directory contains two pre-configured options for hosting the **YourTransport** project on GitHub Pages. Choose the option that best fits your workflow.

---

## Option A: Direct Static Deployment (Simplest)
This option uses the pre-compiled, static build output. There is no need to run any build commands or install Node.js dependencies.

The built files are located in the [build-output/](./build-output) directory. All paths inside the HTML/CSS/JS files have been compiled to use relative paths (`./assets/...`), meaning the site will work out of the box on any subdomain or subfolder.

### Deployment Steps:
1. **Initialize Git and Commit Files**:
   Navigate into the `build-output` directory, initialize a new Git repository, and commit all files:
   ```bash
   cd build-output
   git init -b main
   git add .
   git commit -m "Initial commit of static build"
   ```

2. **Create a GitHub Repository**:
   - Go to GitHub and create a new repository (e.g., `your-transport`). Do NOT initialize it with a README, `.gitignore`, or license.

3. **Push to GitHub**:
   Link your local repository to GitHub and push your files:
   ```bash
   git remote add origin https://github.com/<your-username>/your-transport.git
   git push -u origin main
   ```

4. **Enable GitHub Pages**:
   - On GitHub, navigate to your repository's **Settings** tab.
   - On the left sidebar, click **Pages**.
   - Under **Build and deployment**, set **Source** to **Deploy from a branch**.
   - Select your branch (e.g., `main`) and folder (select `/ (root)`), then click **Save**.
   - Your site will be live at `https://<your-username>.github.io/your-transport/` within a couple of minutes!

---

## Option B: Source Code with Automated Build (Recommended)
This option copies the source code and uses a GitHub Actions workflow to automatically compile and deploy the site whenever you push to GitHub.

The files are located in the [source-with-actions/](./source-with-actions) directory and include the Vite configuration (`vite.config.js`) and the workflow file (`.github/workflows/deploy.yml`).

### Deployment Steps:
1. **Initialize Git and Commit Files**:
   Navigate into the `source-with-actions` directory, initialize a new Git repository, and commit all files:
   ```bash
   cd source-with-actions
   git init -b main
   git add .
   git commit -m "Initial commit of source code with GitHub Actions"
   ```

2. **Create a GitHub Repository**:
   - Go to GitHub and create a new repository (e.g., `your-transport`). Do NOT initialize it with a README, `.gitignore`, or license.

3. **Push to GitHub**:
   Link your local repository to GitHub and push your files:
   ```bash
   git remote add origin https://github.com/<your-username>/your-transport.git
   git push -u origin main
   ```

4. **Enable Actions Deployment on GitHub**:
   - On GitHub, navigate to your repository's **Settings** tab.
   - On the left sidebar, click **Pages**.
   - Under **Build and deployment**, change **Source** from *Deploy from a branch* to **GitHub Actions**.
   - Head over to the **Actions** tab of your repository to view the build and deployment progress.
   - Once completed, your site will be live at `https://<your-username>.github.io/your-transport/` and will automatically re-deploy every time you push new code!
