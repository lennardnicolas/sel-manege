param (
    [Parameter(Position=0, Mandatory=$true)]
    [string]$command
)

switch ($command.ToLower()) {
    'start' {
        echo "Starting service..."
        
        docker compose -p sel-manege --file ./docker-compose-prod.yml up -d
    }
    'devstart' {
        echo "Starting service(dev)..."
        
        docker compose -p dev-sel-manege --file ./docker-compose-dev.yml up -d
    }
    'restart' {
        echo "Restarting service..."
        
        docker compose -p sel-manege --file ./docker-compose-prod.yml down --rmi all

        docker compose -p sel-manege --file ./docker-compose-prod.yml up -d
    }
    'devrestart' {
        echo "Restarting service(dev)..."
        
        docker compose -p dev-sel-manege --file ./docker-compose-dev.yml down --rmi all

        docker volume rm dev-sel-manege_express_node_modules dev-sel-manege_angular_node_modules dev-sel-manege_angular_environment

        docker compose -p dev-sel-manege --file ./docker-compose-dev.yml up -d
    }
    'stop' {
        echo "Stopping service..."
        docker compose -p sel-manege --file ./docker-compose-prod.yml down
    }
    'devstop' {
        echo "Stopping service(dev)..."
        docker compose -p dev-sel-manege --file ./docker-compose-dev.yml down
    }
    'remove' {
        echo "Removing service..."
        docker compose -p sel-manege --file ./docker-compose-prod.yml down --rmi all --volumes
    }
    'devremove' {
        echo "Removing service(dev)..."
        docker compose -p dev-sel-manege --file ./docker-compose-dev.yml down --rmi all --volumes
    }
    default {
        echo "Invalid command."
    }
}
