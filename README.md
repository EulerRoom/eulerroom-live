# eulerroom-live

[Eulerroom](https://live.eulerroom.com/)'s self-hosted setup for live streaming
events.

We use [Owncast](https://github.com/owncast/owncast),
[nginx-rtmp](https://github.com/arut/nginx-rtmp-module) and
[Muxy](https://github.com/munshkr/muxy).

See [eulerroom-live-web](https://github.com/EulerRoom/eulerroom-live-web) for the website frontend.

## Usage

We use Git submodules for some of the modules, like the frontend and muxy, so
make sure to clone this repository like this:

```bash
git clone --recurse-submodules
```

Whenever you need to pull for changes, also make sure to run:

```bash
git pull --recurse-submodules
```

There is a Docker Compose config file to quickly set things up.

Run `docker compose up` to start all services.

## Description

![Services high-level block diagram](services.png)

## License

The source code in this repository is licensed under the GNU Affero General
Public License v3.0. See the [LICENSE](LICENSE) file for details.
