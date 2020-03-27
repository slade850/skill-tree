# SKILL TREE 
### you can test the API at <http://julien-bardin.tech:8000/api/>

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
  
# API route descriptions

#### users route [see here Postman's screens](./postman_view/user_request/)

- ##### /api/user/register
    to register a new user you must fill in the following fields:
        {  
            "firstName": "string",
           "lastName": "string",
           "email": "email",
           "password": "password",
           "promotion_id": number (id of user promotion)
        }
     
- ##### /api/user/authenticate
    to authenticate user you must fill in the following fields:
        {
           "email": "email",
           "password": "password"
        }
    after validating the authentication you receive a token with a header cookie, you don't need to manage the token

- ##### /api/user/info (you must be authenticated.)
    return an object with the information of the authenticate user

- ##### api/user/skillslevels (you must be authenticated.)
    return all skills id and levels id for the authenticate user

- ##### /api/user/byskill/:skill_id (you must be authenticated.)
    return the level id corresponding to the requested skill the authenticate user

- ##### /api/user/bylevel/:level_id (you must be authenticated.)
    return all skills with the requested level the authenticate user


- ##### /api/user/group (you must be authenticated.)
    return all users in the same promotion of the authenticate user

- ##### /api/user/groupbylevel/:level_id (you must be authenticated.)
    return all users and their skills with the requested level

- ##### /api/user/groupbyskill/:skill_id (you must be authenticated.)
    return all users and their level with the requested skill