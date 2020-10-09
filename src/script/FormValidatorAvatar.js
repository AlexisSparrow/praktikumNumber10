import FormValidator from './FormValidator'
export default class FormValidatorAvatar extends FormValidator {
    constructor(form, linkForm) {
        super(form);
        this.linkForm = linkForm;
        this.form
            .addEventListener('keyup', this.setSubmitButtonState.bind(this));
        this.form
            .addEventListener('keyup', this.checkInputValidityAvatarLink.bind(this));
    }

    checkInputValidityAvatarLink() {
        const errorLink = this.form.querySelector('#errorLink');
        if (this.linkForm.validity.typeMismatch || this.linkForm.validity.valueMissing) {
            errorLink.textContent = "Здесь должна быть ссылка";
        } else {
            errorLink.textContent = "";
        };
    }
}
