# Liqo UI Frontend

This project is a UI for Liqo made by ArubaKube.

## Features

- Show a graph with the topology of the federation created by liqo
- Show the status of the active peerings with other clusters
- Show the status of the offloaded namespaces in the local liqo node
- Show the status of the pods running in the offloaded namespaces

![A screenshot of the UI](./docs/screenshot.png)

## Installation

You can install this UI via the [provided Helm Chart](./deployments/).

1. Clone this repository:

    ```bash
    https://github.com/ArubaKube/liqo-dashboard.git
    cd liqo-dashboard
    ```

2. Prerequisites

    - A running cluster with Liqo installed
    - [Metrics server](https://github.com/kubernetes-sigs/metrics-server) installed on the cluster
    - [Helm](https://helm.sh/docs/intro/install/) utility installed on your machine

3. Install the chart

    ```bash
    helm install my-release ./deployments/liqo-dashboard
    ```

## Quick test

The Liqo UI has been designed to work on a production-ready cluster, e.g., equipped with an external load balancer and an ingress controller.
However, if you would like to make a quick test of this software on a 'toy' cluster, we can suggest the following setup:

- Install K3s (default install)
- Update the following parameters in the Liqo UI Helm chart:
  - backend.service.type: NodePort
  - frontend.service.type: NodePort
- Install the Liqo UI with the above values
- Check which TCP ports have been assigned to the two NodePort services you have created (for the backend and the frontend) (e.g., `kubectl get svc --all-namespaces |grep NodePort`)
- Update the following parameters in the Liqo UI Helm chart:
  - frontend.service.port: use the TCP port assigned to the NodePort of the frontend
  - backend.service.port: use the TCP port assigned to the NodePort of the backend
  - frontend.appConfig.api.url: use the following URL: `http://liqo-dashboard.local:TCP_FRONTEND_PORT/v1/api` where the `TCP_FRONTEND_PORT` is the TCP port assigned to the NodePort frontend service
- Update the current install of the Liqo UI helm chart with the new values (e.g. `helm upgrade my-release ./deployments/liqo-dashboard`)
- Modify the /etc/hosts file the computer where you will run the browser that connects to the LiqoUI and add an entry that maps the `liqo-dashboard.local` host with the IP address of the machine that hosts the kubernetes cluster
- Start a browser and connect to the Liqo UI using the following URL: `http://liqo-dashboard.local:TCP_FRONTEND_PORT`
