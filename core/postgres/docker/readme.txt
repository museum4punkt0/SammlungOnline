Vor dem ersten Start muss ein Ordner "data" angelegt werden, der als Volume gemountet wird.
Siehe docker-compose.yml

ACHTUNG WINDOWS USER
=======================

Postgres und Docker verstehen sich unter Windows u.U. nicht so gut:
https://kingsor.github.io/2019/03/23/using-postgres-with-docker-on-windows/

In diesem Fall ist eine separate Konfiguration notwendig: docker-compose-win.yml

(1) docker volume create --name=data
(2) docker-compose -f docker-compose-win.yml up -d