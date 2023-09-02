# Personal website + one page application for shortening long URLs.

>This is my first project that is on the web and has a practical use.


### Technologies used

```Front End:```
- Typescript
- NextJs

```Back End:```
- Javascript > NodeJs > Fastify
- Nginx (both as proxy and as a static files server)
- Postgres
- Docker
- pm2

Actually there was no need to use NextJs, but I wanted to get to know it better, so here we are.

I also connected CloudFlare for several reasons:
 - I don't have to set letsencrypt, even though it's not hard, so https out of the box.
 - CloudFlare hides my real IP.
 - There is a good free analytics on traffic, number of requests, etc.
