import { Cluster } from "src/app/modules/cluster/models/cluster";
import { LiqoModuleStatus, PeeringStatus } from "../consts/peering";

export const getPeeringStatus = (cluster: Cluster): PeeringStatus => {
    if (cluster.outgoingPeering === LiqoModuleStatus.PENDING || cluster.incomingPeering == LiqoModuleStatus.PENDING) {
        return PeeringStatus.PENDING;
    } else if ([
        cluster.authenticationStatus,
        cluster.apiServerStatus,
        cluster.networkStatus,
        cluster.outgoingPeering,
        cluster.incomingPeering
    ].some((s) => ![LiqoModuleStatus.NONE, LiqoModuleStatus.ESTABLISHED, LiqoModuleStatus.SUCCESS].includes(s as LiqoModuleStatus))) {
        console.log(cluster);
        return PeeringStatus.ERROR;
    }
    return PeeringStatus.READY;
}