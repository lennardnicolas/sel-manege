# sel-manege

sel-manege is a web app allowing to manage communication, economy, member, offer and demand of the sel-manege association

## Prerequisite

Docker should be in the path

## Setup

- Copy the [docker env settings](./sample.env) and rename it to `.env` and adapt the settings

### Windows extra setup

Use this command in an admin powersell to allow powershell script execution :

```
Set-ExecutionPolicy Unrestricted -Force
```

### Linux extra setup

Use these commands in a shell to allow your user to execute docker command without sudo permission (Use it only if user is not root and and adapt the username to your username) :

```
sudo usermod -aG docker your-username && newgrp docker
```

## Usage

If running on linux, change the .ps1 extention in the command by .sh and use a shell insted of powershell

### Prod

To start the app use this command in powershell from the project dir :

```
.\sel-manege.ps1 start
```

You can now visit http://localhost:1025 (Adapt the link you if changed the settings file)

To stop the app use this command in powershell from the project dir :

```
.\sel-manege.ps1 stop
```

To restart use this command in powershell from the project dir :

```
.\sel-manege.ps1 restart
```

To remove all app data use this command in powershell from the project dir :

```
.\sel-manege.ps1 remove
```

### Dev (Hot reload and source code sync between docker and host)

To start the app use this command in powershell from the project dir :

```
.\sel-manege.ps1 devstart
```

You can now visit http://localhost:1025 (Adapt the link you changed the settings file)

To stop the app use this command in powershell from the project dir :

```
.\sel-manege.ps1 devstop
```

To restart use this command in powershell from the project dir :

```
.\sel-manege.ps1 devrestart
```

To remove all app data use this command in powershell from the project dir :

```
.\sel-manege.ps1 devremove
```

For your code editor to understand the code correctly, to lint and format the code run this command from the [sel-manege-express](./sel-manege-express) and the [sel-manege-angular](./sel-manege-angular) dir :

```
npm install
```

Also run this command to have access to the angular cli :

```
npm install -g @angular/cli
```

You can now install the vscode extention `ESLint` from Microsoft to have the warnings or error displayed in your ide.

You can also get the lint information with the terminal with this command from the [sel-manege-express](./sel-manege-express) or the [sel-manege-angular](./sel-manege-angular) dir :

```
npm run lint
```

You can now install the vscode extention `Prettier - Code formatter` from Prettier to format your code with `ALT` + `SHIFT` + `F`.

You can also format your code with the terminal with this command from the [sel-manege-express](./sel-manege-express) or the [sel-manege-angular](./sel-manege-angular) dir :

```
npm run format
```

You can also create a new migration file with this command from the [sel-manege-express](./sel-manege-express) dir :

```
node --import './ts-loader.js' ./node_modules/typeorm/cli.js migration:generate -d src/data-source-dev.ts src/migrations/migration-name
```
