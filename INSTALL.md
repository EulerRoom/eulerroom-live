# Installation

## Cloning the repository

We use Git submodules for some of the modules, like the frontend and muxy, so
make sure to clone this repository like this:

```bash
git clone --recurse-submodules https://github.com/EulerRoom/eulerroom-live.git
```

Whenever you need to pull for changes, also make sure to run:

```bash
git pull --recurse-submodules
```

*Note*: You can modify and push changes from withing the cloned submodules in
this repo.  In that case, you may want to add this settings in your
`~/.gitconfig` to replace the `https` URLs for `ssh`, so it uses your SSH key
(provided you have the proper access to these repos):

```
[url "ssh://git@github.com/"]
    insteadOf = https://github.com/
```

Read more about this option [here](https://git-scm.com/docs/git-config#Documentation/git-config.txt-urlltbasegtinsteadOf).

## Docker Compose

There is a Docker Compose config file to quickly set things up. You will need to
have Docker and Docker Compose installed.

First, build and pull images:

```bash
docker compose build
```

Run the following lines to create custom env files for customizing settings on
each service:

```bash
cp env.sample .env
cp muxy/env.sample muxy/.env
```

Use this command twice, to generate 2 random stream keys for the Owncast
instances:

```bash
openssl rand -hex 16
```

Copy these keys into the `.env` file at the root. You need different keys for
each Owncast instance (main and test).  You can skip configuring the other
`.env` files for now (see Configuratio section below).

To initialize Muxy, run the following commands to set up the database:

```bash
docker compose run --rm muxy ./manage.py migrate
docker compose run --rm muxy ./manage.py collectstatic
```

Finally, start the services:

```bash
docker compose up -d
```

Check the logs to see if everything is running:

```bash
docker compose logs -f
```

In case you're installing this already on a remote server, you may want to run
an SSH tunnel on your local machine, to access the administration panels first:

```bash
ssh -L 8000:localhost:8000 -L 8081:localhost:8081 -L 8082:localhost:8082 eulerroom.com
```

Once you have configured the main public nginx server on your remote host, you
can close the tunnel and access directly through your host domain.

By default, all data will be stored in the `data/` directory on the cloned repo.
If you want to change the location, you should modify the Docker compose file,
in particular the `volumes` settings on each service.

## Configure Muxy

You will need to create a superuser to access the admin panel. Run the following
command and follow the instructions:

```bash
docker compose run --rm muxy ./manage.py createsuperuser
```

You can access the admin panel on http://localhost:8000/admin

You will also need to create a Muxy API key for the web frontend, which you can
do on the admin panel. Make sure to create a "Web" API key, which has less
permissions than the standard API key.  Take note of the key, as you will need
it to configure the web app.

In case you also modified something in your `.env` file, to take effect, restart
the service:

```bash
docker compose restart muxy
```

## Configure Owncast

You must configure both instances of Owncast: main and test.

* Main: http://localhost:8081/admin
* Test: http://localhost:8082/admin

To login, use `admin` as username, and for the password the corresponding
stream key you set in previous steps.

**NOTE: Do not change the RTMP port and Owncast port in the Server
Configuration section.**.  The Docker Compose file maps the ports to the host
machine.
