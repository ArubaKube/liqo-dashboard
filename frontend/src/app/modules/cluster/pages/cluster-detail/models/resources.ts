export interface ResourcesUsage {
    total: number;
    used: number
}

export interface ClusterResources {
    cpu: ResourcesUsage
    memory: ResourcesUsage
}