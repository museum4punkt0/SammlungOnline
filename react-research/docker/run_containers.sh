startup-banner() {
  echo "     _______..___  ___. .______                 .______       _______     _______. _______     ___      .______        ______  __    __  "
  echo "    /       ||   \/   | |   _  \                |   _  \     |   ____|   /       ||   ____|   /   \     |   _  \      /      ||  |  |  | "
  echo "   |   (----\`|  \  /  | |  |_)  |     ______    |  |_)  |    |  |__     |   (----\`|  |__     /  ^  \    |  |_)  |    |  ,----'|  |__|  | "
  echo "    \   \    |  |\/|  | |   _  <     |______|   |      /     |   __|     \   \    |   __|   /  /_\  \   |      /     |  |     |   __   | "
  echo ".----)   |   |  |  |  | |  |_)  |               |  |\  \----.|  |____.----)   |   |  |____ /  _____  \  |  |\  \----.|  \`----.|  |  |  | "
  echo "|_______/    |__|  |__| |______/                | _| \`._____||_______|_______/    |_______/__/     \__\ | _| \`._____| \______||__|  |__| "
  echo "                                                                                                            "
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
  docker-compose -f ../../core/elasticsearch/docker/docker-compose.yml down
  banner-message "Containers stopped"
else
  banner-message "Starting Containers"
  docker-compose -f ../../core/image-provider/docker/docker-compose.yml up -d
  docker-compose -f ../../core/postgres/docker/docker-compose.yml up -d
  docker-compose -f ../../core/hasura/docker/docker-compose.yml up -d
  docker-compose -f ../../core/elasticsearch/docker/docker-compose.yml up -d
  banner-message "Containers started"
fi
