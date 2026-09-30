# Contributing

This guide assumes you have never used Git before. Git is the tool that records changes on your computer. GitHub is the website where you share those changes and propose them to the project.

## Before you start

- Install [Git](https://git-scm.com/).
- Confirm that Git is installed:

   ```text
   git --version
   ```

- Create a GitHub account if you do not have one yet.
- On Windows, use Git Bash for the commands in this guide, not PowerShell or Command Prompt.
- Set your Git identity before making your first commit. Without this step, `git commit` will fail with an error:

   ```text
   git config --global user.name "Your Name"
   git config --global user.email "you@example.com"
   ```

## First contribution

### 1. Fork the repository

Open this repository on GitHub and click **Fork**. A fork is your personal copy of the repository on GitHub. Choose your own account as the destination.

### 2. Clone your fork

On your fork's GitHub page, click **Code**, copy the HTTPS URL, and run these commands in a terminal. Replace the placeholder with your GitHub username:

```text
git clone https://github.com/<your-username>/Git-Github-Onboarding-Sandbox_Hacktoberfest-2026.git
cd Git-Github-Onboarding-Sandbox_Hacktoberfest-2026
```

### 3. Create a branch

Create a separate branch for your work. A branch keeps your changes away from the `main` branch:

```text
git checkout -b my-first-change
```

### 4. Make a change

Open the project folder in your editor. Pick an issue from the Issues tab and make the change it describes. Save your file(s).

### 5. Check your changes

Ask Git which files changed:

```text
git status
```

Open the `index.html` file of the app you changed (`todo/`, `notes/`, or `expenses/`) in your browser and check that your change works.

### 6. Commit your change

Stage the file, then create a commit with a short description:

```text
git add <path/to/your-changed-file>
git commit -m "Describe your change"
```

### 7. Push your branch

Send your branch from your computer to your fork on GitHub:

```text
git push -u origin my-first-change
```

### 8. Open a pull request

1. Open your fork on GitHub.
2. Click **Compare & pull request** for the branch you just pushed.
3. Make sure the base repository is this project and the base branch is `main`.
4. Add a clear title and description. Link the issue you worked on if there is one.
5. Complete the checklist and click **Create pull request**.

## Sync your fork before new work

The original project is called the upstream repository. Add it as a remote once:

```text
git remote add upstream https://github.com/Mozilla-Campus-Club-Cummins/Git-Github-Onboarding-Sandbox_Hacktoberfest-2026.git
```

Before starting new work, update your local `main` branch:

```text
git checkout main
git fetch upstream
git pull upstream main
git push origin main
```

Then create a fresh branch:

```text
git checkout -b describe-your-new-change
```

If you already added the `upstream` remote, do not add it again. You can check your remotes with:

```text
git remote -v
```

## Resolve a simple merge conflict

A merge conflict happens when two changes affect the same part of a file. Git marks the conflict in the file with lines like these:

```text
<<<<<<< HEAD
My version of the line
=======
The upstream version of the line
>>>>>>> upstream/main
```

To resolve it:

1. Open the marked file.
2. Decide which text to keep, or combine both versions.
3. Delete the lines beginning with `<<<<<<<`, `=======`, and `>>>>>>>`.
4. Save the file.
5. Mark the conflict as resolved and finish the merge:

   ```text
   git add path/to/the-conflicted-file
   git commit -m "Resolve merge conflict"
   ```

Run `git status` to confirm that no conflicts remain. If you are unsure which version to keep, ask for help before committing.

## Common mistakes

- Making changes directly on `main` instead of creating a branch first.
- Forgetting to pull or sync before starting new work.
- Running `git add .` without checking whether it stages unrelated files.
- Committing without running `git status` and reviewing what changed.
- Pushing the wrong branch.
- Opening a pull request from the wrong repository or against the wrong base branch.
