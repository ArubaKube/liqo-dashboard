# Liqo UI Backend

This component is the backend for the liqo UI.
It exposes a REST interface, described in the [OpenAPI specifications](./openapi.yaml), allowing to interact with the cluster.

The backend server should have the permissions of access the cluster. To make it possible, the backend server can:

- run in the cluster itself with a [ServiceAccount](https://kubernetes.io/docs/concepts/security/service-accounts/) with the proper permissions,
- run elsewhere by providing the `kubeconfig` via the `--kubeconfig` argument.

## Usage

Usage of `liqoui-backend`:

- **kubeconfig** *string*  Paths to a kubeconfig. Only required if out-of-cluster.
- **port** *uint* - The port where the rest API will be exposed (default 8080)

## Contributing

### Running build and debug

The backend server can be launched via the following command:

```shell
make run
```

once you perform the changes on the code, you can check whether there are linting issues, by running:

```shell
make lint
```

Once you are done with the changes, you can build the binary via:

```shell
make build
```

or the Docker image via:

```shell
docker build -t liqoui-backend .
```

### Generating API server boilerplate

The API server boilderplate is automatically generate according to the [OpenAPI specifications](./openapi.yaml).

Whenever you do a change on the OpenAPI specification file, it is possible to update the boilerplate by running the following command:

```shell
make generate
```

**Note that models are not automatically generated**, you will need to manually change them whenever changes on the OpenAPI specifications are done.

