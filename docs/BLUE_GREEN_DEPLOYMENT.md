# Blue-Green Deployment Strategy

This document outlines the blue-green deployment strategy implemented in this project, which no longer relies on environment variables for Nginx routing. Instead, it uses separate Nginx configurations for blue and green deployments, managed via Docker Compose profiles.

## Overview

The blue-green deployment strategy allows for zero-downtime deployments by running two identical production environments, "Blue" and "Green." At any time, only one of these environments is live, serving all production traffic.

-   **Blue Environment:** Represents the currently live production version.
-   **Green Environment:** Represents the new version of the application, deployed and tested in isolation.

Once the Green environment is fully tested and verified, traffic is switched from Blue to Green. If any issues arise with the Green environment, traffic can be instantly rolled back to the stable Blue environment.

## Implementation Details

### Nginx Configuration

Instead of using an `$ACTIVE_COLOR` environment variable, Nginx now uses dedicated configuration files for each environment:

-   `nginx/nginx.blue.conf`: Configured to proxy requests to the `_blue` services (e.g., `public_blue`, `admin_blue`, `backend_blue`).
-   `nginx/nginx.green.conf`: Configured to proxy requests to the `_green` services (e.g., `public_green`, `admin_green`, `backend_green`).

These configuration files are directly mounted into the respective Nginx containers, eliminating the need for `envsubst` or dynamic variable substitution at runtime.

### Docker Compose Configuration (`prod.docker-compose.yml`)

The `prod.docker-compose.yml` file has been updated to define separate Nginx services for each profile:

-   `nginx_blue`: This service is part of the `blue` profile and uses `nginx/nginx.blue.conf`. It depends on the `_blue` application services.
-   `nginx_green`: This service is part of the `green` profile and uses `nginx/nginx.green.conf`. It depends on the `_green` application services.

## Deployment Workflow

To deploy and manage your blue-green environments, use the `docker compose` command with the `--profile` flag.

### 1. Deploy the Blue Environment (Initial Deployment or Rollback Target)

To deploy or ensure the blue environment is running:

```bash
docker compose -f prod.docker-compose.yml --profile blue up -d --build
```

This command will:
-   Build (if necessary) and start all services defined under the `blue` profile, including `nginx_blue`, `backend_blue`, `frontend-public_blue`, and `frontend-admin_blue`.
-   The `nginx_blue` container will use `nginx/nginx.blue.conf` to route traffic to the blue application services.

### 2. Deploy the Green Environment (New Version Deployment)

To deploy a new version of your application to the green environment:

```bash
docker compose -f prod.docker-compose.yml --profile green up -d --build
```

This command will:
-   Build (if necessary) and start all services defined under the `green` profile, including `nginx_green`, `backend_green`, `frontend-public_green`, and `frontend-admin_green`.
-   The `nginx_green` container will use `nginx/nginx.green.conf`.
-   At this point, both blue and green environments will be running, but only the environment associated with the currently active Nginx (e.g., `nginx_blue`) will be serving external traffic.

### 3. Switch Traffic from Blue to Green

Once the green environment is thoroughly tested and ready to receive live traffic, you need to stop the blue Nginx service and start the green Nginx service.

First, stop the blue Nginx:

```bash
docker compose -f prod.docker-compose.yml --profile blue stop nginx_blue
```

Then, start the green Nginx:

```bash
docker compose -f prod.docker-compose.yml --profile green up -d nginx_green
```

Traffic will now be routed to the green environment.

### 4. Rollback to Blue (if necessary)

If you encounter any issues with the green deployment, you can quickly roll back to the stable blue environment:

First, stop the green Nginx:

```bash
docker compose -f prod.docker-compose.yml --profile green stop nginx_green
```

Then, start the blue Nginx:

```bash
docker compose -f prod.docker-compose.yml --profile blue up -d nginx_blue
```

Traffic will now be routed back to the blue environment.

## Important Considerations

-   **DNS/Load Balancer:** Ensure your external DNS records or load balancer configuration points to the IP address of your Docker host where Nginx is running. The Nginx services (`nginx_blue` and `nginx_green`) both listen on ports 80 and 443, so your external traffic routing mechanism should direct traffic to the currently active Nginx container.
-   **Database Migrations:** Handle database migrations carefully. Typically, backward-compatible migrations are applied before deploying the new version, allowing both old and new application versions to work with the updated schema.
-   **Session Persistence:** If your application relies on session persistence, ensure your load balancer or Nginx configuration handles this appropriately during traffic switching to avoid disrupting active user sessions.
