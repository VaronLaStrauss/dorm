export type Latency = {
  parsingNs: number;
  processingNs: number;
  encodingNs: number;
  assignTimestampNs: number;
  totalNs: number;
};

export type Metrics = {
  numUidsMap: Array<[string, number]>;
};
