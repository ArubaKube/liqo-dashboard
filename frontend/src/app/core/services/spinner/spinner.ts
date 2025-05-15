export interface SpinnerConfig{

}
export interface Spinner {
  show(config?: SpinnerConfig): Promise<unknown>;
  hide(): Promise<unknown>;
}
