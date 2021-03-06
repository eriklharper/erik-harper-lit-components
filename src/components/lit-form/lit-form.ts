import { html, LitElement, customElement } from 'lit-element';

@customElement('erik-form')
export class LitForm extends LitElement {

  createRenderRoot() {
    return this;
  }

  firstUpdated() {
    this.addEventListener("submit", this.onFormSubmit);
    this.addEventListener("formdata", this.onFormData);
  }

  onFormSubmit(event: Event) {
    event.preventDefault();
    const form = this.querySelector("form");
    new FormData(form);
  }

  onFormData(event: any) {
    let data = {};
    for (var pair of event.formData.entries()) {
      data[pair[0]] = pair[1];
    }
    alert(JSON.stringify(data, null, 2))
  }
}