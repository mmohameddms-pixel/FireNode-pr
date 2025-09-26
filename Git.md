List of **Git commands**

---

### **1. Git Setup and Configuration**

| **Command**                                        | **Usage**                                 |
| -------------------------------------------------- | ----------------------------------------- |
| `git config --global user.name "Your Name"`        | Sets your Git username globally.          |
| `git config --global user.email "you@example.com"` | Sets your email address globally.         |
| `git config --global core.editor <editor>`         | Sets the default editor for Git.          |
| `git config --list`                                | Lists all the Git configuration settings. |

---

### **2. Repository Initialization and Basic Setup**

| **Command**                   | **Usage**                                                   |
| ----------------------------- | ----------------------------------------------------------- |
| `git init`                    | Initializes a new Git repository.                           |
| `git clone <url>`             | Clones an existing remote repository to your local machine. |
| `git remote add origin <url>` | Adds a remote repository and names it `origin`.             |
| `git remote -v`               | Lists all the remote repositories.                          |

---

### **3. File Operations**

| **Command**                    | **Usage**                                                                             |
| ------------------------------ | ------------------------------------------------------------------------------------- |
| `git add <file>`               | Stages a specific file for the next commit.                                           |
| `git add .`                    | Stages all changes in the working directory.                                          |
| `git rm <file>`                | Removes a file from the working directory and stages the removal for the next commit. |
| `git mv <old-name> <new-name>` | Renames or moves a file and stages the changes.                                       |

---

### **4. Commit and History Management**

| **Command**               | **Usage**                                                                |
| ------------------------- | ------------------------------------------------------------------------ |
| `git commit -m "message"` | Creates a commit with a descriptive message.                             |
| `git commit --amend`      | Edits the last commit or adds additional changes to it.                  |
| `git log`                 | Displays the commit history.                                             |
| `git log --oneline`       | Shows a compact, one-line commit history.                                |
| `git diff`                | Displays differences between the working directory and the staging area. |
| `git diff --staged`       | Shows differences between staged changes and the last commit.            |

---

### **5. Branching and Merging**

| **Command**                     | **Usage**                                                      |
| ------------------------------- | -------------------------------------------------------------- |
| `git branch`                    | Lists all branches in the repository.                          |
| `git branch <branch-name>`      | Creates a new branch.                                          |
| `git checkout <branch-name>`    | Switches to the specified branch.                              |
| `git checkout -b <branch-name>` | Creates a new branch and switches to it.                       |
| `git merge <branch-name>`       | Merges the specified branch into the current branch.           |
| `git rebase <branch-name>`      | Reapplies commits from the current branch onto another branch. |
| `git branch -d <branch-name>`   | Deletes a branch locally.                                      |

---

### **6. Working with Remotes**

| **Command**                | **Usage**                                                                            |
| -------------------------- | ------------------------------------------------------------------------------------ |
| `git fetch`                | Downloads changes from the remote repository without modifying your local branch.    |
| `git pull`                 | Fetches changes from the remote repository and merges them into your current branch. |
| `git push origin <branch>` | Pushes local changes in the specified branch to the remote repository.               |
| `git remote remove <name>` | Removes a remote repository.                                                         |

---

### **7. Stash Operations**

| **Command**       | **Usage**                                                   |
| ----------------- | ----------------------------------------------------------- |
| `git stash`       | Saves uncommitted changes and clears the working directory. |
| `git stash list`  | Lists all saved stashes.                                    |
| `git stash apply` | Reapplies the most recent stash.                            |
| `git stash drop`  | Deletes a specific stash.                                   |

---

### **8. Tagging**

| **Command**                      | **Usage**                                       |
| -------------------------------- | ----------------------------------------------- |
| `git tag <tag-name>`             | Creates a lightweight tag.                      |
| `git tag -a <tag-name> -m "msg"` | Creates an annotated tag with a message.        |
| `git push origin <tag-name>`     | Pushes a specific tag to the remote repository. |
| `git tag -d <tag-name>`          | Deletes a local tag.                            |

---

### **9. Resetting and Reverting**

| **Command**                  | **Usage**                                                             |
| ---------------------------- | --------------------------------------------------------------------- |
| `git reset --soft <commit>`  | Moves `HEAD` to the specified commit but keeps changes staged.        |
| `git reset --mixed <commit>` | Moves `HEAD` to the specified commit and unstages changes.            |
| `git reset --hard <commit>`  | Moves `HEAD` to the specified commit and discards all changes.        |
| `git revert <commit>`        | Creates a new commit that undoes the changes of the specified commit. |

---

### **10. Debugging and Inspection**

| **Command**         | **Usage**                                                  |
| ------------------- | ---------------------------------------------------------- |
| `git status`        | Shows the state of the working directory and staging area. |
| `git reflog`        | Lists the history of `HEAD` changes.                       |
| `git blame <file>`  | Shows who made each change in a file.                      |
| `git show <commit>` | Displays details about a specific commit.                  |

---

### **11. Useful Aliases**

Git allows creating shortcuts for frequently used commands.

| **Alias**                               | **Command**                                   |
| --------------------------------------- | --------------------------------------------- |
| `git config --global alias.st status`   | Creates an alias `git st` for `git status`.   |
| `git config --global alias.co checkout` | Creates an alias `git co` for `git checkout`. |

---

### **The Most Useful Commands**

**Most frequently used commands** for everyday tasks:

1. **`git status`**:

   - Use it to check the current state of your repository.
   - Usage: `git status`

2. **`git add <file>`** and **`git commit`**:

   - Stage changes and save them to the repository.
   - Usage:
     ```bash
     git add file.txt
     git commit -m "Commit message"
     ```

3. **`git pull`** and **`git push`**:

   - Sync your local repository with the remote repository.
   - Usage:
     ```bash
     git pull origin main
     git push origin main
     ```

4. **`git branch`** and **`git checkout`**:

   - Create and switch between branches.
   - Usage:
     ```bash
     git branch feature-branch
     git checkout feature-branch
     ```

5. **`git log`**:

   - View the commit history.
   - Usage: `git log --oneline`

6. **`git merge`**:

   - Combine changes from another branch into your current branch.
   - Usage:
     ```bash
     git merge feature-branch
     ```

7. **`git stash`**:
   - Temporarily save your changes without committing them.
   - Usage:
     ```bash
     git stash
     git stash apply
     ```

---

### **Conclusion**

While all Git commands serve specific purposes, the **most useful commands** are:

- `git status`
- `git add`
- `git commit`
- `git pull`
- `git push`
- `git branch`
- `git checkout`
- `git stash`
