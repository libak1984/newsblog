# News Blog
Website to post blog
## Prerequisites
* Docker
* Docker-Compose
## Stack
* Node.js
* Express.js
* Angularjs 1.6
* Mongodb
* ElasticSearch
## Steps to run this application
1) Git clone https://github.com/libak1984/newsblog.git
2) Run docker-compose up

* URL to access Website http://localhost:5001
* URL to access Webapi http://localhost:5000/api/info
## Api Endpoints
Health check
* http://localhost:5000/api/info

Profile creation
* http://localhost:5000/api/profile/create

Validate user
* http://localhost:5000/api/user/validate

Blog creation
* http://localhost:5000/api/blog/create

Blog list
* http://localhost:5000/api/blog/list

Blog search
* http://localhost:5000/api/blog/search
