# Ops / Maintainance

These are common tasks you may need to perform to maintain the services.

When logging into the server, you will need to navigate to the directory where
the the repository is located:

```bash
cd /opt/eulerroom-live
```

Data for the services is stored in the `data` directory.

* `recordings/`: Recordings of live sessions
* `muxy/`: Contains muxy database
* `main-owncast/`: Main Owncast data directory
* `test-owncast/`: Test Owncast data directory

## Check if services are running

You can check if the services are running with the following command:

```bash
docker compose ps
```

## Watch logs

You can check the logs for a specific service with the following command:

```bash
docker compose logs -f $SERVICE_NAME
```

You can also see the logs for all services with:

```bash
docker compose logs -f
```

## Deploy changes

You can deploy changes by pulling the latest changes from the repository and
restarting the services. You can do this with the following commands:

```bash
git pull --recurse-submodules
docker compose up -d --force-recreate --build
```

## Restart a service

If you make a change related to one of the services, you may need to rebuild the
image, recreate the container and restart the service. You can do all this with
a single command:

```bash
docker compose up -d --force-recreate --build $SERVICE_NAME
```

You can also do it for all services:

```bash
docker compose up -d --force-recreate --build
```

## Nginx config

The Nginx configuration for eulerroom-live is at
`/etc/nginx/sites-available/eulerroom-live`.

If you make changes to this file, you will need to reload the nginx service.
First check if the configuration is correct:

```bash
sudo nginx -t
```

If everything is OK, reload the nginx service:

```bash
sudo nginx -s reload
```
