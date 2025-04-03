## How to install SSL certificate to Cryptic Activist domains

1 - Run the **nginx container from prod.docker-compose.yml** in the remote server (Digital Ocean)

2 - Enter the ngnix docker container
```
docker exec -it ngnix
```

3 - Run certbot command:
```
certbot --nginx -d crypticactivist.com -d www.crypticactivist.com -d admin.crypticactivist.com -d api.crypticactivist.com
```