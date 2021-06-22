startup-banner() {
echo "     _______..___  ___. .______             ___       _______  .___  ___.  __  .__   __. "
echo "    /       ||   \/   | |   _  \           /   \     |       \ |   \/   | |  | |  \ |  | "
echo "   |   (---- |  \  /  | |  |_)  |  ______ /  ^  \    |  .--.  ||  \  /  | |  | |   \|  | "
echo "    \   \    |  |\/|  | |   _  <  |______/  /_\  \   |  |  |  ||  |\/|  | |  | |  .    | "
echo ".----)   |   |  |  |  | |  |_)  |       /  _____  \  |  '--'  ||  |  |  | |  | |  |\   | "
echo "|_______/    |__|  |__| |______/       /__/     \__\ |_______/ |__|  |__| |__| |__| \__| "
}

banner-message() {
  echo "+------------------------------------------+"
  printf "| %-40s |\n" "$(date)"
  echo "|                                          |"
  printf "|$(tput bold) %-40s $(tput sgr0)|\n" "$@"
  echo "+------------------------------------------+"
}

startup-banner

if [ "$1" = "down" ]; then
  banner-message "Stopping Containers"
  docker-compose -f ../../core/image-provider/docker/docker-compose.yml down
  docker-compose -f ../../core/postgres/docker/docker-compose.yml down
  docker-compose -f ../../core/hasura/docker/docker-compose.yml down
  banner-message "Containers stopped"
else
  banner-message "Starting Containers"
  docker-compose -f ../../core/image-provider/docker/docker-compose.yml up -d
  docker-compose -f ../../core/postgres/docker/docker-compose.yml up -d
  docker-compose -f ../../core/hasura/docker/docker-compose.yml up -d
  banner-message "Containers started"
fi
