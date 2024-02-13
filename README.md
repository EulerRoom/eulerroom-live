# eulerroom-live

[Eulerroom](https://live.eulerroom.com/)'s self-hosted setup for live streaming
events.

We use [Owncast](https://owncast.online/),
[nginx-rtmp](https://github.com/arut/nginx-rtmp-module) and
[Muxy](https://github.com/munshkr/muxy).

See [eulerroom-live-web](https://github.com/EulerRoom/eulerroom-live-web) for
the website frontend.

## Description

This repository contains the configuration for the Eulerroom live streaming
services. It uses Docker Compose to manage the services, and it's expected to
run on a single remote server.

The services are:

* [nginx-rtmp](https://github.com/arut/nginx-rtmp-module): RTMP server for
  receiving streams from the users and forwarding them to the Owncast instances.
* [Owncast](https://owncast.online/): Main and test instances for the live
* [Muxy](https://github.com/munshkr/muxy): RTMP-based streaming muxer for online
  events. Provides an API for the website frontend.

### High-level services

![High-level services](services.png)

### nginx-rtmp application flow

![nginx-rtmp application flow](rtmp.png)

## Installation

Read the [INSTALL.md](INSTALL.md) file for instructions on how to install and
configure the services in your machine. 

To install and deploy on a remote server, make sure to follow the instructions
for Deployment (see below).

## Deployment

Read the [DEPLOY.md](DEPLOY.md) file for instructions on how to deploy the
services on a remote server.

## Ops / Maintainance

Check out [OPS.md](OPS.md) for more information on how to maintain the services.

## License

The source code in this repository is licensed under the GNU Affero General
Public License v3.0. See the [LICENSE](LICENSE) file for details.
