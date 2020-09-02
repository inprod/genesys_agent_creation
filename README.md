# Genesys Agent Creation

This is a sample Changeset and web server to create Genesys Engage agents within
the contact center via a basic web site. Off load the creation of agents from the
IT service desk and allow none technical users to perform this task safely by using
predefined templates.

This is an extention of the following blog article https://www.inprod.io/automating-genesys-agent-creation/

# What is InProd
InProd is a DevOps and change management tool for the Genesys Engage platform.
Within InProd Changesets can be created that move changes between multiple
environments or perform scripted changes such as automatically creating agents
via sctipts, AD integraion or a web page as displayed here.

Learn more at https://www.inprod.io

# Getting Started

These instructions will get you a copy of the project up and running on your
local machine for development and testing purposes.

# Docker installation

Build the docoker image with
* `docker build -t genesys_agent_creation .`
Start up the container with 
* `docker run -p 8080:8080 genesys_agent_creation`

You should be able to connect via http://localhost:8080


# Traditional installation

## Prerequisites
Node.js (v8.12.0)
Node Package Manager (v6.4.1)

## Installation

Install http-server globally

```bash
sudo npm install -g http-server
```
## Config
* Upload the attached sample changeset to InProd and adjust as needed
* Within the `index.js` file upadate the variable `CHANGESET_ID` to the ID of the changeset.

## Run

Run application on local server

```bash
http-server --proxy http://demo-box
```

## Built With

* [jQuery](https://jquery.com/) - Used for Ajax calls and DOM manipulation
* [Bootstrap](https://getbootstrap.com/) - Used for responsiveness and styling
* [http-server](https://github.com/indexzero/http-server) - Command line http server
