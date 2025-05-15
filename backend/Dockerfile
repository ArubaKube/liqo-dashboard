FROM golang:1.24 AS builder
WORKDIR /tmp/builder

COPY go.mod ./go.mod
COPY go.sum ./go.sum
RUN  go mod download

COPY . ./
RUN CGO_ENABLED=0 GOOS=linux GOARCH=$(go env GOARCH) go build -ldflags="-s -w" -o main ./cmd


FROM alpine:3.21

RUN apk update && \
    apk add --no-cache ca-certificates && \
    update-ca-certificates && \
    rm -rf /var/cache/apk/*

ENV GIN_MODE=release

COPY --from=builder /tmp/builder/main /usr/bin/liqoui-backend

ENTRYPOINT ["/usr/bin/liqoui-backend"]
