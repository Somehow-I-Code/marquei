# Project

- Install (zsh)[https://ohmyz.sh/]
- Clone the project `git clone git@github.com:Somehow-I-Code/marquei.git`
- From the root of the project run the command below to install the commands to run the project

```bash
zsh setup.sh
```

- Then you'll be able to run `marquei` commands in your terminal

## Running the project for the first time

```bash
# install everything locally
marquei install

# build docker images
marquei build

# run the project
marquei run

# populate the database
marquei prisma reset
```

## Running the project on a daily basis

```bash
# make sure all the local dependencies are up-to-date
marquei install

# run the project without blocking the terminal
marquei run detached

# when you need to stop the containers
marquei stop

# show console for each of our projects (if needed)
marquei log web
marquei log api

# if you make any updates to the schema.prisma file
marquei prisma generate
```
