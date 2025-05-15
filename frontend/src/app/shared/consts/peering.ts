export enum LiqoModuleStatus {
    PENDING = 'Pending',
    ESTABLISHED = 'Established',
    ERROR = 'Error',
    NONE = 'None',
    SUCCESS = 'Success'
}

export enum PeeringType {
    IN_BAND = 'InBand',
    OUT_OF_BAND = 'OutOfBand'
}

export enum PeeringStatus {
    READY = 'Ready',
    PENDING = 'Pending',
    ERROR = 'Error'
}

export const PEER_SUCCESS_ICON = 'image:///assets/icons/liqo/node-success.svg';
export const PEER_ERROR_ICON = 'image:///assets/icons/liqo/node-error.svg';
export const PEER_WARNING_ICON = 'image:///assets/icons/liqo/node-warning.svg';