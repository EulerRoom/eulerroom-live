# eulerroom-live

[Eulerroom](https://live.eulerroom.com/)'s self-hosted setup for live streaming
events.

We use [nginx-rtmp](https://github.com/arut/nginx-rtmp-module) and
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

On `muxy/`, copy the `.env.sample` file to `.env` and fill in the necessary
environment variables to configure Muxy:

```bash
cp muxy/.env.sample muxy/.env
```

Check [Muxy](https://github.com/munshkr/muxy?tab=readme-ov-file#initial-configuration)
for more information.

Do the same for the Web service at `web/`, but this time, copy `.env` as
`.env.local`:

```bash
cp web/.env web/.env.local
```

Check [eulerroom-live-web]([web/README.md](https://github.com/EulerRoom/eulerroom-live-web?tab=readme-ov-file#install))
for more information.

To initialize Muxy, run the following commands to set up the database and create
a superuser:

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

For the web app, you will need to create a Muxy API Key.  You can do this
(using the superuser credentials you created earlier) on
http://localhost:8000/admin

Set the API key and access token in the `.env.local` file in the `web/`.

## Usage

Run `docker compose up` to start all services.

## Description

### High-level services

![Services high-level block diagram](services.png)

### nginx-rtmp application flow

![nginx-rtmp application flow](rtmp.png)

## License

The source code in this repository is licensed under the GNU Affero General
Public License v3.0. See the [LICENSE](LICENSE) file for details.
