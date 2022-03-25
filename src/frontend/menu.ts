export class Menu {
  constructor(private parent: HTMLElement) {
    this.make()
    this.listen()
    void this.create()
  }

  private make() {}

  private listen() {}

  private create() {
    console.log('what')
  }
}
