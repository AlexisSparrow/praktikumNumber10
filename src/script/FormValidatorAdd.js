class FormValidatorAdd extends FormValidator {
    constructor(form,nameForm,linkForm) {
        super(form);
        this.nameForm = nameForm;
        this.linkForm = linkForm;
        this.form
            .addEventListener('keyup', this.setSubmitButtonState.bind(this));
        this.form
            .addEventListener('keyup', this.checkInputValidityAddName.bind(this));
        this.form
            .addEventListener('keyup', this.checkInputValidityAddLink.bind(this));
    }

    checkInputValidityAddName() {
        const errorName = this.form.querySelector('#errorName');
        if (this.nameForm.validity.valueMissing) {
            errorName.textContent = "Это обязательное поле";
        } else if (this.nameForm.validity.tooShort && !this.nameForm.validity.valueMissing || this.nameForm.validity.tooLong) {
            errorName.textContent = "Должно быть от 2 до 30 символов";
        } else {
            errorName.textContent = "";
        };

    }

    checkInputValidityAddLink() {
        const errorLink = this.form.querySelector('#errorLink');
        if (this.linkForm.validity.typeMismatch || this.linkForm.validity.valueMissing) {
            errorLink.textContent = "Здесь должна быть ссылка";
        } else {
            errorLink.textContent = "";
        };

    }
}