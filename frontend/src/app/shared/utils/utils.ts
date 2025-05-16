import { Cluster } from "src/app/modules/cluster/models/cluster";
import { LiqoModuleStatus, PeeringStatus } from "../consts/peering";

export const getPeeringStatus = (cluster: Cluster): PeeringStatus => {
    if ([
        cluster.apiServerStatus,
        cluster.networkStatus,
        cluster.authenticationStatus,
        cluster.offloadingStatus,
    ].some((s) => s === LiqoModuleStatus.PENDING)) {
        return PeeringStatus.PENDING;
    } else if ([
        cluster.apiServerStatus,
        cluster.networkStatus,
        cluster.authenticationStatus,
        cluster.offloadingStatus,
    ].some((s) => ![LiqoModuleStatus.NONE, LiqoModuleStatus.ESTABLISHED, LiqoModuleStatus.READY].includes(s as LiqoModuleStatus))) {
        console.log(cluster);
        return PeeringStatus.ERROR;
    }
    return PeeringStatus.READY;
}