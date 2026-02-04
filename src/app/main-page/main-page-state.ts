interface MainPageState {
  onEnter(): Promise<void>;
  onExit(): Promise<void>;
}
