marquei() {
    API_CONTAINER="marquei-api"
    WEB_CONTAINER="marquei-web"

    case "$1" in
        "run")
            case "$2" in
                "detached")
                    cd $MARQUEI_FOLDER_PATH && docker compose up -d
                    ;;
                "")
                    cd $MARQUEI_FOLDER_PATH && docker compose up
                    ;;
                *)
                    echo "marquei {run | run detached}"
                    ;;
            esac
            ;;
        "log")
            case "$2" in
                "web")
                    docker logs -f $WEB_CONTAINER
                    ;;
                "api")
                    docker logs -f $API_CONTAINER
                    ;;
                *)
                    echo "marquei {log web | log api}"
                    ;;
            esac
            ;;
        "access")
            case "$2" in
                "web")
                    docker container exec -it $WEB_CONTAINER /bin/sh
                    ;;
                "api")
                    docker container exec -it $API_CONTAINER /bin/sh
                    ;;
                *)
                    echo "marquei {access web | access api}"
                    ;;
            esac
            ;;
        "build")
            cd $MARQUEI_FOLDER_PATH && docker compose build
            ;;
        "stop")
            cd $MARQUEI_FOLDER_PATH && docker compose down
            ;;
        "install")
            cd $MARQUEI_FOLDER_PATH && cd web && npm install && cd ../api && npm install && npx prisma generate && cd ..
            ;;
        "prisma")
            case "$2" in
                "generate")
                    docker container exec $API_CONTAINER npx prisma generate
                    ;;
                "new")
                    case "$3" in
                        "migration")
                            case "$4" in
                                "")
                                    echo "marquei prisma new migration [MIGRATION_NAME]"
                                    ;;
                                *)
                                    docker container exec $API_CONTAINER npx prisma migrate dev --name $4
                                    ;;
                            esac
                            ;;
                        *)
                            echo "marquei prisma new {migration [MIGRATION_NAME]}"
                            ;;
                    esac
                    ;;
                "reset")
                    docker container exec $API_CONTAINER npx prisma migrate reset --force
                    ;;
                *)
                    echo "marquei prisma {generate | new migration [MIGRATION_NAME] | reset}"
                    ;;
            esac
            ;;
        *)
            echo "Usage:"
            echo "  marquei [COMMAND]"
            echo "    access api                              # Access the api container"
            echo "    access web                              # Access the web container"
            echo "    build                                   # Build the docker images"
            echo "    install                                 # Install all dependencies locally"
            echo "    log api                                 # Show the logs of the api container"
            echo "    log web                                 # Show the logs of the web container"
            echo "    prisma generate                         # Generate prisma client inside the container"
            echo "    prisma new migration [MIGRATION_NAME]   # Create a new migration"
            echo "    prisma reset                            # Reset all migrations"
            echo "    run                                     # Run the project"
            echo "    run detached                            # Run the project detached"
            echo "    stop                                    # Stop all the containers"
            ;;
    esac
}
