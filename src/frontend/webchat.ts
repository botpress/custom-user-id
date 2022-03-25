import { element, text } from './ui'

export class WebchatMenu {
  private inputHost!: HTMLInputElement
  private inputClientId!: HTMLInputElement
  private inputUserId!: HTMLInputElement
  private inputUserToken!: HTMLInputElement
  private inputConversationId!: HTMLInputElement

  constructor(private parent: HTMLElement) {
    this.make()
    this.listen()
    void this.create()
  }

  private make() {
    element('h3', this.parent, (title) => {
      text('Webchat', title)
    })
    element('form', this.parent, (form) => {
      form.autocomplete = 'off'

      element('label', form, (label) => {
        label.htmlFor = 'bp-host-input'
        text('host', label)
      })
      element('br', form)
      this.inputHost = element('input', form, (input) => {
        input.type = 'text'
        input.name = 'bp-host-input'
      })
      element('br', form)
      element('label', form, (label) => {
        label.htmlFor = 'bp-clientId-input'
        text('clientId', label)
      })
      element('br', form)
      this.inputClientId = element('input', form, (input) => {
        input.type = 'text'
        input.name = 'bp-clientId-input'
      })
      element('br', form)
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
      element('label', form, (label) => {
        label.htmlFor = 'bp-conversationId-input'
        text('conversationId', label)
      })
      element('br', form)
      this.inputConversationId = element('input', form, (input) => {
        input.type = 'text'
        input.name = 'bp-conversationId-input'
      })
      element('br', form)
      element('button', form, (button) => {
        text('Apply', button)
      })

      form.onsubmit = (e) => {
        e.preventDefault()
        void this.create()
        return false
      }
    })
  }

  private listen() {}

  private create() {}
}
