
class DomainEventPublisher {
  private static _instance = new DomainEventPublisher();
  private publishing: boolean;
  private subscribers: any[] = [];

  public static instance(): DomainEventPublisher {
    return this._instance;
  }

  public publish<T>(aDomainEvent: T): void {
    if (!this.isPublishing() && this.hasSubscribers()) {
      this.setPublishing(true);
    }
  }

  private isPublishing(): boolean {
    return this.publishing;
  }

  private setPublishing(flag: boolean): void {
    this.publishing = flag;
  }

  private hasSubscribers(): boolean {
    return this.subscribers.length !== 0;
  }
}