export interface Cluster {
  id: string;
  role: string;
  apiServerUrl: string;
  apiServerStatus?: string;
  networkStatus?: string;
  authenticationStatus?: string;
  offloadingStatus?: string;
  networkLatency?: string;
  resourcesOffered?: { cpu: string, memory: string, pods: string, "ephemeralStorage": string };
  resourcesAcquired?: { cpu: string, memory: string, pods: string, "ephemeralStorage": string };
}
