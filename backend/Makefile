WORKDIR := $(shell pwd)

# Build the REST server
build:
	CGO_ENABLED=0 GOOS=linux GOARCH=$(go env GOARCH) go build -ldflags="-s -w" -o liqoui-backend $(WORKDIR)/cmd

# Generate the interface boilerplate based on the openapi.yaml file
generate:
	go generate $(WORKDIR)/...

# Run linting on the project
lint:
	golangci-lint run $(WORKDIR)/...

# Run and debug the RUN server
run:
	go run $(WORKDIR)/cmd/main.go