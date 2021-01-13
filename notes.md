# Code Review I

## Collaboration

Roses
* Pair programming, and switching roles
* Feels empowering, fun working in a team x2

Thorns
* Testing can slow us down, especially on config
* Tasks sometimes seem overlapping, merge conflicts
* Relinquishing control of implementation


### GIT

Semantic Commits:

- Nature of commit (feat,doc, test, debug, etc)
- Area of commit coverage (models, routes, react, redux, docs)
- Present tense description of commit

### TASKS

- Tickets should local, specific
- 15 mins - 2hrs of work estimated
- Fall into specific User Stories

User Story: As an X, I want to Y, by Z
Break down into Vertical Slices
Then, horizontal Tickets


## Codebase

### README

* Title, desc of project
* Include yrself as collaborators
* Link to deployed version
* Instructions for running locally

### Models

* What is a User? An Owner? A buyer? A site Admin?
* Have roles on User (Admin, Owner, Customer, etc.) ENUM
* Avoid `Sequelize.ARRAY` whenever possible!
* Order Model
    * One User
    * Many Properties as Line Items
    * `isActive` Boolean property, to indicate if it's user's current cart
    * Price = INTEGER (as Pennies) or DECIMAL
    * Don't use `FLOAT`

### Routes

* Avoid passing `req.body` in directly
* Add Auth gates for protected routes

```
const isAdmin = (req, res, next) => req.user.isAdmin ? next() : res.send("Go away!")
```

* Routes seem pretty RESTful :)

REpresentational
State
Transfer

GET www.netflix.com/shows/queerEye/eps/1?time=55


## Goals

* NEXT CODE REVIEW
* Deployed Tier I (MVP Shopping experience)