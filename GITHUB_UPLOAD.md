# PRASHANT - Upload to GitHub

## Step-by-Step Guide to Push to GitHub

### Step 1: Create a GitHub Repository

1. Go to [github.com](https://github.com) and log in to your account
2. Click the **"+"** icon in the top right corner
3. Select **"New repository"**
4. Name it: `PRASHANT` (or any name you prefer)
5. Add description: `Daily Activity Tracker App with Chat, Friends, and Notes Sharing`
6. Choose **Public** (so others can see and contribute)
7. **DO NOT** initialize with README (we already have one)
8. Click **"Create repository"**

### Step 2: Get the Repository URL

After creating, you'll see commands to push existing code. Copy the repository URL (it looks like):
```
https://github.com/YOUR_USERNAME/PRASHANT.git
```

### Step 3: Connect Local Repository to GitHub

From the project root (`c:\Users\skris\Desktop\arad`), run:

```bash
# Remove origin if it exists
git remote remove origin

# Add your GitHub repository
git remote add origin https://github.com/YOUR_USERNAME/PRASHANT.git

# Verify the connection
git remote -v
```

Replace `YOUR_USERNAME` with your GitHub username.

### Step 4: Push to GitHub

```bash
# Set the main branch and push
git branch -M main
git push -u origin main
```

This will prompt for authentication:
- **Username**: Your GitHub username
- **Password**: Your GitHub personal access token (not your password!)

### Creating a Personal Access Token

If authentication fails:

1. Go to [github.com/settings/tokens](https://github.com/settings/tokens)
2. Click **"Generate new token"** → **"Generate new token (classic)"**
3. Name: `PRASHANT Upload`
4. Select scopes: `repo` (all repo permissions)
5. Click **"Generate token"**
6. **Copy the token immediately** (you won't see it again)
7. Use this token as your password when pushing

### Step 5: Verify Upload

1. Go to your GitHub repository page
2. You should see all your files there!
3. The README.md will be displayed on the main page

## Using SSH (Optional - More Secure)

If you prefer SSH authentication:

### Generate SSH Key

```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
# Press Enter for default location
# Set passphrase (optional)
```

### Add SSH Key to GitHub

1. Copy your SSH key:
```bash
type $env:USERPROFILE\.ssh\id_ed25519.pub
```

2. Go to [github.com/settings/keys](https://github.com/settings/keys)
3. Click **"New SSH key"**
4. Paste your key and save

### Push with SSH

```bash
git remote remove origin
git remote add origin git@github.com:YOUR_USERNAME/PRASHANT.git
git push -u origin main
```

## Common Issues

### "Permission denied (publickey)"
- Make sure SSH key is added to GitHub
- Or use HTTPS instead with personal access token

### "remote: Repository not found"
- Check if repository URL is correct
- Make sure repository is public

### "fatal: 'origin' does not appear to be a 'git' repository"
- Make sure you're in the correct directory (`c:\Users\skris\Desktop\arad`)
- Run `git init` to initialize if needed

## Next Steps

### After Pushing to GitHub

1. **Add a License** (Optional)
   - Click `Add file` → `Create new file` → `LICENSE`
   - Choose a license template (ISC recommended)

2. **Enable GitHub Pages** (Optional - Deploy frontend)
   - Go to Settings → Pages
   - Select `main` branch and `/root` directory

3. **Add Collaborators** (Optional)
   - Go to Settings → Collaborators
   - Add team members

4. **Create Issues** for features
   - Go to Issues tab
   - Document bugs, features, improvements

5. **Create Pull Requests** for contributions

## Sharing Your Repository

Once pushed, share the link:
```
https://github.com/YOUR_USERNAME/PRASHANT
```

## Quick Reference

```bash
# Check current status
git status

# See all commits
git log --oneline

# View remote URL
git remote -v

# Update repository after making local changes
git add -A
git commit -m "your message"
git push origin main

# Pull latest changes (if working with others)
git pull origin main
```

## Automatic Deployment (Optional)

### Deploy to Heroku/Render (Free backends)

1. Push to GitHub (completed above)
2. Sign up at [Heroku.com](https://www.heroku.com) or [Render.com](https://render.com)
3. Connect your GitHub repository
4. Set environment variables in dashboard
5. Deploy with one click!

---

**Congratulations! Your PRASHANT app is now on GitHub! 🎉**

Share the repository link with your team and friends. They can now:
- View your code
- Clone and run it locally
- Contribute improvements
- Track issues and features

---

For more info: [GitHub Docs](https://docs.github.com/en/get-started)
