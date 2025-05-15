export interface Pod {
  name?: string;
  namespace?: string;
  status?: string;
  nodeName?: string;
  labels?: {[key: string]: string};
  restartPolicy?: string;
  image?: string;
  creationTime?: string;
}
