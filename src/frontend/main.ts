import { LoginMenu } from './loging'
import { element } from './ui'
import { WebchatMenu } from './webchat'

export class MainMenu {
  constructor(private parent: HTMLElement) {
    this.make()
  }

  private make() {
    element('div', this.parent, (div) => {
      new LoginMenu(div)
    })
    element('div', this.parent, (div) => {
      new WebchatMenu(div)
    })
  }
}
