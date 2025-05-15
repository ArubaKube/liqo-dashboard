export interface Cluster {
  id: string;
  name: string;
  authenticationStatus?: string;
  peeringType?: string;
  networkLatency?: string;
  networkStatus?: string;
  apiServerStatus?: string;
  outgoingPeering?: string;
  resources?: { cpu: string, memory: string, pods: string, "ephemeralStorage": string };
  incomingPeering?: string;
}
