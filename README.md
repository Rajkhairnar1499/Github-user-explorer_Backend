# Autonomize_AI Assignment

## API Backend Development :

A build the backend service using Node.js and Express.js that interfaces with the GitHub API to fetch and persist user data. 
This service will support operations such as storing user details, identifying mutual followers, searching, updating, and soft deleting records in MongoDB database.

#### Tech Stack:

Backend Framework: Node.js with Express.js
Database: MongoDB

####  Endpoints:

1. GitHub User Data Storage: 

```bash 
GET "/api/users/fetch/:username"
```

2. Mutual Followers as Friends: 
```bash 
GET "/api/users/mutual-followers/:username" 
```

3. Search Functionality: 
```bash 
GET "/api/users/search?username=evanphx" 
```

4. Soft Delete User Recordse: 
```bash 
DELETE "/api/users/delete/:username" 
```

5. Update User Details: 
```bash 
PATCH "/api/users/update/:username" 
```

6. List Users with Sorting: 
```bash 
GET "/api/users/list?sortBy=following&order=desc" 
```

### For Testing : 


1. GitHub User Data Storage: 

```bash 
GET - "https://github-user-explorer-backend.onrender.com/api/users/fetch/evanphx"

```

2. Mutual Followers as Friends: 
```bash 
GET "https://github-user-explorer-backend.onrender.com/api/users/mutual-followers/:username" 
```

3. Search Functionality: 
```bash 
GET "https://github-user-explorer-backend.onrender.com/api/users/search?username=evanphx" 
```

4. Soft Delete User Recordse: 
```bash 
DELETE "https://github-user-explorer-backend.onrender.com/api/users/delete/:username" 
```

5. Update User Details: 
```bash 
PATCH "https://github-user-explorer-backend.onrender.com/api/users/update/:username" 
```

6. List Users with Sorting: 

Query Parameters

 - Key: sortBy 
 - Value: following, public_gists, public_repos, followers, created_at

 - Key: order
 - Value: asc, desc

```bash 
GET "https://github-user-explorer-backend.onrender.com/api/users/list?sortBy=following&order=desc" 
```

## Thank You