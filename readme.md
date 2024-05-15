# OMS USER SERVICE V1

## HOW TO RUN PROJECT

### Prerequisite

- install npm
- install mysql

#

### Clone & Build

- git clone https://git.dexagroup.com/oms/oms-api-user.git
- cd oms-api-user
- npm install
- npm migrate
- npm start

#

### Check

- swagger : http://localhost:8356/api/v1/docs

#

## HOW TO DO DEVELOPMENT

- git pull origin develop (if not exist in local branch)
- git checkout develop (if existing branch not sandbox)
- git fetch
- git rebase
- git checkout -b feature-branch (remove -b if want to use previous feature-branch)
- git fetch and then git rebase sandbox (if use previous feature-branch)
- < development process >
- < devloper testing process >
- git add .
- git commit -m "commit message"
  - use semantic commit message like this https://gist.github.com/joshbuchea/6f47e86d2510bce28f8e7f42ae84c716
- git checkout develop
- git merge feature-branch
- git push -u origin develop
