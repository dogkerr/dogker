include .env
export

LOCAL_BIN:=$(CURDIR)/bin
PATH:=$(LOCAL_BIN):$(PATH)

# HELP =================================================================================================================
# This will output the help for each task
# thanks to https://marmelab.com/blog/2016/02/29/auto-documented-makefile.html
.PHONY: help

help: ## Display this help screen
	@awk 'BEGIN {FS = ":.*##"; printf "\nUsage:\n  make \033[36m<target>\033[0m\n"} /^[a-zA-Z_-]+:.*?##/ { printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2 } /^##@/ { printf "\n\033[1m%s\033[0m\n", substr($$0, 5) } ' $(MAKEFILE_LIST)

compose-up: ### Run docker-compose
	docker-compose up --build -d postgres rabbitmq && docker-compose logs -f
.PHONY: compose-up

compose-up-integration-test: ### Run docker-compose with integration test
	docker-compose up --build --abort-on-container-exit --exit-code-from integration
.PHONY: compose-up-integration-test

compose-down: ### Down docker-compose
	docker-compose down --remove-orphans
.PHONY: compose-down

swag: ### swag init
	swag init -g router.go  -d internal/rest --parseDependency
.PHONY: swag

run: swag ### swag run
	go mod tidy && go mod download && \
	DISABLE_SWAGGER_HTTP_HANDLER='' GIN_MODE=debug CGO_ENABLED=0 go run -tags migrate ./cmd/app
.PHONY: run

docker-rm-volume: ### remove docker volume
	docker volume rm go-clean-template_pg-data
.PHONY: docker-rm-volume


test: ### run test
	go test -v -cover -race ./internal/...
.PHONY: test

integration-test: ### run integration-test
	go clean -testcache && go test -v ./integration-test/...
.PHONY: integration-test

mock: ### run mockgen
	mockgen -source ./internal/usecase/interfaces.go -package usecase_test > ./internal/usecase/mocks_test.go
.PHONY: mock

migrate-create:  ### create new migration
	migrate create -ext sql -dir migrations  $(name)
.PHONY: migrate-create

migrate-up: ### migration up
	migrate -path migrations -database '$(PG_MIGRATE_URL)?sslmode=disable' up
.PHONY: migrate-up


migrate-down: ### migration down
	migrate -path migrations -database '$(PG_MIGRATE_URL)?sslmode=disable' down
.PHONY: migrate-down

migrate-version:
	migrate -path migrations -database '$(PG_MIGRATE_URL)?sslmode=disable' version
.PHONY: migrate-version

migrate-goto:
	migrate -path migrations -database '$(PG_MIGRATE_URL)?sslmode=disable' goto $(v)
.PHONY: migrate-goto

migrate-force:
	migrate -path migrations -database '$(PG_MIGRATE_URL)?sslmode=disable' force $(v)
.PHONY: migrate-force

proto:
	rm -f pb/*.go
	protoc --proto_path=proto --go_out=pb --go_opt=paths=source_relative \
	--go-grpc_out=pb --go-grpc_opt=paths=source_relative \
	proto/*.proto
.PHONY: proto

lint:
	golangci-lint run 
.PHONY: lint

wire:
	wire ./cmd/di/
.PHONY: wire

#protoc --proto_path=proto --go_out=pb --go_opt=paths=source_relative \
#	--go-grpc_out=pb --go-grpc_opt=paths=source_relative \
#	proto/*.proto

bin-deps:
	GOBIN=$(LOCAL_BIN) go install -tags 'postgres' github.com/golang-migrate/migrate/v4/cmd/migrate@latest
	GOBIN=$(LOCAL_BIN) go install github.com/golang/mock/mockgen@latest
