export enum LiqoModuleStatus {
    PENDING = 'Pending',
    ESTABLISHED = 'Established',
    ERROR = 'Error',
    NONE = 'None',
    READY = 'Ready',
    NOT_READY = 'NotReady',
    SOME_NOT_READY = 'SomeNotReady',
}

export enum Role {
    CONSUMER = 'Consumer',
    PROVIDER = 'Provider',
    CONSUMER_AND_PROVIDER = 'ConsumerAndProvider',
    UNKNOWN = 'Unknown'
}

export enum PeeringStatus {
    READY = 'Ready',
    PENDING = 'Pending',
    ERROR = 'Error'
}

export const PEER_SUCCESS_ICON = 'image:///assets/icons/liqo/node-success.svg';
export const PEER_ERROR_ICON = 'image:///assets/icons/liqo/node-error.svg';
export const PEER_WARNING_ICON = 'image:///assets/icons/liqo/node-warning.svg';