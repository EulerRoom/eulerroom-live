# eulerroom-live

[Eulerroom](https://live.eulerroom.com/)'s self-hosted setup for live streaming
events.

We use [Owncast](https://github.com/owncast/owncast),
[nginx-rtmp](https://github.com/arut/nginx-rtmp-module) and
[Muxy](https://github.com/munshkr/muxy).

See [eulerroom-live-web](https://github.com/EulerRoom/eulerroom-live-web) for the website frontend.

## Installation

We use Git submodules for some of the modules, like the frontend and muxy, so
make sure to clone this repository like this:

```bash
git clone --recurse-submodules
```

Whenever you need to pull for changes, also make sure to run:

```bash
git pull --recurse-submodules
```

There is a Docker Compose config file to quickly set things up. You will need to
have Docker and Docker Compose installed.

First, build and pull images:

```bash
docker compose build
```

Then, run the following commands to set up the database and create a superuser
for Muxy:

```
docker compose run --rm muxy ./manage.py migrate
docker compose run --rm muxy ./manage.py collectstatic
docker compose run --rm muxy ./manage.py createsuperuser
```

Finally, start the services:

```
docker compose up -d
```

Check the logs to see if everything is running:

```
docker compose logs -f
```

## Usage

Run `docker compose up` to start all services.

## Description

![Services high-level block diagram](services.png)

## License

The source code in this repository is licensed under the GNU Affero General
Public License v3.0. See the [LICENSE](LICENSE) file for details.
