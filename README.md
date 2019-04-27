## WeatherAppApi (ExpressJS, NodeJS)

This project was generated with [Express Generator](https://expressjs.com/en/starter/generator.html).
For Database I have used MongoDB along with Mongoose as an ODM. Connection URL of MongoDB is in .env
```
MONGO_URL = mongodb://localhost:27017/weatherApp
```

The production build of Angular App has been placed in public/ folder and it will be served on localhost:3000 in browser if you run this App.

> nodule_modules aren't committed with this code, please run following command if you clone this repository.
```
npm install
```

## NVM (Node Version Manager)

nvm is a bash script utility that is used to manage multiple versions of Node on your machine. It is not recommended to directly install multiple versions of node on your system as you will have to manually update environment variables to direct to the correct directory everytime you want to switch node version. nvm provide us easy to use bash commands to install, manage and toggle multiple versions of node on your machine.

To install or update nvm, open your bash shell and paste following cURL command:

```
$ curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh | bash
```
or Wget:
```
$ wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh | bash
The script clones the nvm repository to ~/.nvm and adds the source line to your profile (~/.bash_profile, ~/.zshrc, ~/.profile, or ~/.bashrc).
```
> On Linux, after running the install script, if you get nvm: command not found simply close your current terminal, open a new terminal, and try verifying again.

Note: On OS X, if you get nvm: command not found after running the install script, one of the following might be the reason:-

your system may not have a [.bash_profile file] where the command is set up. Simply create one with touch ~/.bash_profile and run the install script again.
you might need to restart your terminal instance. Open a new tab/window in your terminal and retry.
If the above doesn't fix the problem, open your .bash_profile and add the following line of code:
```
source ~/.bashrc
```
## Node
I am using node's version 8.9.0 for this projects. Install it using nvm by pasting following command into bash shell.
```
$ nvm install 8.9.0
```
This will install said node version which can be verified by using the following command
```
$ node -v
```
When installing node, npm version relevant to the node version is also installed by nvm which can be verified using the following command.
```
$ npm -v
```
Note: On OS X, you might need to update npm to latest version in order for yarn to work properly. To do that, run following command.
```
nvm install-latest-npm
```
In case another node version is already installed on your machine, you will have to explicitly select version 8.9.0 using nvm command.
```
$ nvm use 8.9.0
```
You can also set your desired node version as default using nvm so you don't have to select it everytime you want to use it. To do this, use following command
```
nvm alias default 8.9.0
```

## Development server

Run `nodemon` start application. Navigate to `http://localhost:3000/`. The angular build will be served by default.
Following are the API endpoints if anyone wants to test it through POSTMAN:

* `localhost:3000/api/temperatures (POST)`
```
{temperature: 100}]
```
* `localhost:3000/api/temperatures (GET)`
```
{limit: 10, page: 1}
```
* `localhost:3000/api/temperatures/:id (DELETE)`
* `localhost:3000/api/temperatures/statistics (GET)`