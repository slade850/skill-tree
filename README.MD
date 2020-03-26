# SKILL TREE 


:clipboard: Description

Skill tree allows you to visualize the list of skills to be acquired for each module of the Application Designer Developer referential.
For users registering the Skill tree serves to visualize his level for each skill and to compare with other users of the same promotion.
---
## TODO

#### Design the database:
* [x] create the MCD 
* [x] create the MPD

#### Designing the application : 
* [x] make wireframe/ model

#### Set up the database:
* [x] create the database with phpmyadmin

#### Develop the backend part:
* [x] create the server
* [x] database connection
* [ ] create the component modules
* [ ] create the skills component
* [x] create user component
* [x] creat query with user id
* [x] create the authentication in user component
* [x] create query for take all users by promotion
* [x] create query for take all users by promotion and level

#### Develop the front end:
* [ ] create the homepage
* [ ] create the modal description
* [ ] create the authentication page

# ENTITIES 

#### USERS
- ID
- FIRSTNAME
- LASTNAME
- EMAIL
- PASSWORD
- AVATAR
- ROLE

#### MODULES
- ID
- TITLE

#### SKILLS
- ID
- TITLE
- DESCRIPTION
- MODULE_ID

#### LEVELS
- ID
- NAME

#### USERS_SKILLS_LEVELS
- USER_ID
- SKILL_ID
- LEVEL_ID

#### PROMOTIONS
- ID
- NAME
- YEAR
  
#### USERS_PROMOTIONS
- USER_ID
- PROMOTION_ID