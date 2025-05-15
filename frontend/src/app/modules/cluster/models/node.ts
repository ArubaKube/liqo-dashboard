export interface Resources {
    cpu: string;
    memory: string;
    pods: string;
    ephemeralStorage: string;
}
export interface Node {
  name: string;
  capacity: Resources;
  used: Resources;
}
