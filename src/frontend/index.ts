import axios from 'axios'
import { element, text } from './ui'

export class MainMenu {
  private inputUserName!: HTMLInputElement
  private inputPassword!: HTMLInputElement
  private inputUserId!: HTMLInputElement
  private inputUserToken!: HTMLInputElement

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
      element('br', form)

      form.onsubmit = (e) => {
        e.preventDefault()
        void this.submit()
        return false
      }
    })

    element('button', this.parent, (button) => {
      text('Test', button)
      button.onclick = (e) => {
        void this.test()
      }
    })

    element('h3', this.parent, (title) => {
      text('Webchat', title)
    })
    element('form', this.parent, (form) => {
      form.autocomplete = 'off'

      element('label', form, (label) => {
        label.htmlFor = 'bp-userId-input'
        text('userId', label)
      })
      element('br', form)
      this.inputUserId = element('input', form, (input) => {
        input.type = 'text'
        input.name = 'bp-userId-input'
      })
      element('br', form)
      element('label', form, (label) => {
        label.htmlFor = 'bp-userToken-input'
        text('userToken', label)
      })
      element('br', form)
      this.inputUserToken = element('input', form, (input) => {
        input.type = 'text'
        input.name = 'bp-userToken-input'
      })
      element('br', form)
      element('button', form, (button) => {
        text('Apply', button)
      })

      form.onsubmit = (e) => {
        e.preventDefault()
        return false
      }
    })
  }

  private async submit() {
    const { sessionId } = (
      await axios.post('http://localhost:3125/login', {
        username: this.inputUserName.value,
        password: this.inputPassword.value
      })
    ).data

    localStorage.setItem('sid', sessionId)
  }

  private async test() {
    const res = await axios.post('http://localhost:3125/start', undefined, {
      headers: { sid: localStorage.getItem('sid')! }
    })
  }
}

new MainMenu(document.getElementById('menu')!)
