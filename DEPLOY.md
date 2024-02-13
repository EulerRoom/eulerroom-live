# Deployment

This instructions are for deploying the services on a remote server. We assume
you have already installed the services in your local machine. If not, please
read the [INSTALL.md](INSTALL.md) file first.

You will need to have at least a domain and a server with Docker and Docker
Compose installed. You will also need to install and configure Nginx to serve
the HTTP services.

Make sure you have at least 3 domains or subdomains for each of the following
services pointing to the IP of the remote server. For example:

* `live.eulerroom.com` - Main Owncast instance
* `test.eulerroom.com` - Test Owncast instance
* `muxy.eulerroom.com` - Muxy

### Docker Compose

The `docker-compose.yml` file is used to start all services. You can use the
following commands to manage the services:

* `docker compose up -d` - Start all services
* `docker compose down` - Stop all services
* `docker compose restart` - Restart all services
* `docker compose logs -f` - Show logs for all services
* `docker compose ps` - Show the status of all services
* `docker compose build` - Build all services

You can specify a service to manage by adding the service name at the end of the
command. For example:

* `docker compose restart nginx-rtmp` - Restart nginx-rtmp

All services have a restart policy set to `always`, so they will start on boot
and restart if they crash.  Make sure to enable the Docker service to start on
boot.

### Nginx

You will need to configure the main nginx server to serve the web app and the
Owncast instances from a single domain. You can use the `nginx.conf` file as a
base and modify it to your needs.

```bash
sudo cp nginx.conf /etc/nginx/sites-available/eulerroom-live
sudo ln -s /etc/nginx/sites-available/eulerroom-live /etc/nginx/sites-enabled/eulerroom-live
```

You will need to add this `map` declaration in your main `nginx.conf` file.
Edit `/etc/nginx/nginx.conf` and add this inside your `http` rule:

```bash
http {
    # Connection upgrade for WebSocket connections (needed by eulerroom-live)
    map $http_upgrade $connection_upgrade {
        default upgrade;
        ''      close;
    }

    ...
}
```

Check if the configuration is correct:

```bash
sudo nginx -t
```

If everything is OK, reload the nginx service:

```bash
sudo nginx -s reload
```

### SSL certificate / https

If you want to serve the services over https, you will need to obtain a
certificate from a certificate authority. You can use Let's Encrypt to obtain a
free certificate.  Follow the instructions on their
[website](https://certbot.eff.org/) to install the certbot tool.

Then, run:

```bash
sudo certbot --nginx
```

Follow the instructions to obtain the certificate. Certbot will also configure
the nginx server to use the certificate.
