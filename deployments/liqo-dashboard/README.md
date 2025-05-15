# LIQO Dashboard Helm Chart

This Helm chart can be used to deploy the Liqo Dashboard application.

## Values

The following table lists the configurable parameters of the Liqo Dashboard chart and their default values.


| Parameter                                 | Description                                                                                                                                                       | Default                                         |
| ------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------- |
| `image.pullPolicy`                        | Image pull policy                                                                                                                                                 | `IfNotPresent`                                  |
| `image.frontend.repository`               | Frontend image repository                                                                                                                                         | `ghcr.io/arubakube/liqo-dashboard-frontend` |
| `image.frontend.tag`                      | Frontend image tag                                                                                                                                                | `.Chart.appVersion` value                       |
| `image.backend.repository`                | Backend image repository                                                                                                                                          | `ghcr.io/arubakube/liqo-dashboard-backend`  |
| `image.backend.tag`                       | Backend image tag                                                                                                                                                 | `.Chart.appVersion` value                       |
| `image.tag`                               | Image tag                                                                                                                                                         | `.Chart.appVersion` value`nil                   |
| `imagePullSecrets`                        | Image pull secrets                                                                                                                                                | `[]`                                            |
| `nameOverride`                            | Override the name of the chart                                                                                                                                    | `""`                                            |
| `fullnameOverride`                        | Override the full name of the chart                                                                                                                               | `""`                                            |
| `podAnnotations`                          | Annotations to add to the pod                                                                                                                                     | `{}`                                            |
| `podSecurityContext`                      | Pod security context                                                                                                                                              | `{}`                                            |
| `securityContext`                         | Container security context                                                                                                                                        | `{}`                                            |
| `resources`                               | Resource requests and limits                                                                                                                                      | `{}`                                            |
| `nodeSelector`                            | Node labels for pod assignment                                                                                                                                    | `{}`                                            |
| `tolerations`                             | Tolerations for pod assignment                                                                                                                                    | `[]`                                            |
| `affinity`                                | Affinity settings for pod assignment                                                                                                                              | `{}`                                            |
| `labels`                                  | Additional labels to add to resources                                                                                                                             | `{}`                                            |
| `annotations`                             | Additional annotations to add to resources                                                                                                                        | `{}`                                            |
| `backend.replicaCount`                    | Number of backend replicas                                                                                                                                        | `1`                                             |
| `backend.service.type`                    | Backend service type                                                                                                                                              | `ClusterIP`                                     |
| `backend.service.port`                    | Backend service port                                                                                                                                              | `80`                                            |
| `backend.service.nodePort`                | When the service is of type NodePort specify a NodePort to be used.                                                                                               |                                                 |
| `backend.resources`                       | Backend resource requests and limits                                                                                                                              | `{}`                                            |
| `backend.securityContext`                 | Backend container security context                                                                                                                                | `{}`                                            |
| `backend.serviceAccount.create`           | Specifies whether a ServiceAccount should be created                                                                                                              | `true`                                          |
| `backend.serviceAccount.annotations`      | Annotations to add to the service account                                                                                                                         | `{}`                                            |
| `backend.serviceAccount.name`             | The name of the service account to use if not specified the release Name is used. The roles that the backend needs to operate is assigned to this ServiceAccount. | `""`                                            |
| `frontend.replicaCount`                   | Number of frontend replicas                                                                                                                                       | `1`                                             |
| `frontend.service.type`                   | Frontend service type                                                                                                                                             | `ClusterIP`                                     |
| `frontend.service.port`                   | Frontend service port                                                                                                                                             | `80`                                            |
| `frontend.service.nodePort`               | When the service is of type NodePort specify a NodePort to be used.                                                                                               |                                                 |
| `frontend.resources`                      | Frontend resource requests and limits                                                                                                                             | `{}`                                            |
| `frontend.securityContext`                | Frontend container security context                                                                                                                               | `{}`                                            |
| `frontend.appConfig.api.url`              | API URL used by the frontend application to reach the backend                                                                                                     | `http://liqo-dashboard.local/v1/api`            |
| `frontend.appConfig.production`           | Production mode for the frontend application                                                                                                                      | `true`                                          |
| `ingress.enabled`                         | Enable ingress controller resource                                                                                                                                | `false`                                         |
| `ingress.annotations`                     | Annotations to add to the ingress                                                                                                                                 | `{}`                                            |
| `ingress.labels`                          | Labels to add to the ingress                                                                                                                                      | `{}`                                            |
| `ingress.ingressClassName`                | Ingress class name                                                                                                                                                | `nil`                                           |
| `ingress.hosts`                           | List of ingress hosts                                                                                                                                             | `[]`                                            |
| `ingress.hosts[].host`                    | The host to be exposed by the ingress                                                                                                                             |                                                 |
| `ingress.hosts[].host.backend[].path`     | The path to be exposed                                                                                                                                            |                                                 |
| `ingress.hosts[].host.backend[].pathType` | The[type of path](https://kubernetes.io/docs/concepts/services-networking/ingress/#path-types).                                                                   |                                                 |
| `ingress.tls`                             | [TLS configuration](https://kubernetes.io/docs/concepts/services-networking/ingress/#tls)                                                                         | `[]`                                            |

## Usage

To install the chart with the release name `my-release`:

```shell
helm install my-release ./liqo-dashboard
```

To uninstall the chart:

```shell
helm uninstall my-release
```
