# Liqo UI Frontend

This component is the frontend application written using [Angular](https://angular.dev/) and [Tailwind](https://tailwindcss.com/).

![A screenshot of the UI](../docs/screenshot.png)

## Configuring

The [config.json](./src/assets/config/config.json) is the configuration file of the frontend application.
The config file should be placed under the `/assets` directory of the webserver where the application is hosted.

## Contributing

After cloning the repository, you can install the dependencies via:

```shell
npm install
```

### Running build and debug

To start the frontend with a mock backend server, you can run:

```shell
npm run dev
```

The frontend application will be exposed on `localhost:4200`. All requests to `localhost:4200/v1` will be redirected to the mock server running on `localhost:8080`. You can change the [proxy.conf.json](./src/proxy.conf.json) file.

### Build a container

A [Dockerfile](./Dockerfile) to build the application is provided.
To build the container with the frontend, you can run:

```shell
docker build -t liqoui-frontend .
```