import { element, text } from './ui'

export class LoginMenu {
  private inputUserName!: HTMLInputElement
  private inputPassword!: HTMLInputElement

  constructor(private parent: HTMLElement) {
    this.make()
  }

  private make() {
    element('h3', this.parent, (title) => {
      text('Login', title)
    })
    element('form', this.parent, (form) => {
      form.autocomplete = 'off'

      element('label', form, (label) => {
        label.htmlFor = 'bp-user-name-input'
        text('username', label)
      })
      element('br', form)
      this.inputUserName = element('input', form, (input) => {
        input.type = 'text'
        input.name = 'bp-user-name-input'
      })
      element('br', form)
      element('label', form, (label) => {
        label.htmlFor = 'bp-password-input'
        text('password', label)
      })
      element('br', form)
      this.inputPassword = element('input', form, (input) => {
        input.type = 'text'
        input.name = 'bp-password-input'
      })
      element('br', form)
      element('button', form, (button) => {
        text('Login', button)
      })

      form.onsubmit = (e) => {
        e.preventDefault()
        // void this.create()
        return false
      }
    })
  }
}
