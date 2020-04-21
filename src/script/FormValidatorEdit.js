class FormValidatorEdit extends FormValidator {
    constructor(form,usernameForm,dutyForm) {
        super(form);
        this.usernameForm = usernameForm;
        this.dutyForm = dutyForm;
        this.form
            .addEventListener('keyup', this.setSubmitButtonState.bind(this));
        this.form
            .addEventListener('keyup', this.checkInputValidityEditUsername.bind(this));
        this.form
            .addEventListener('keyup', this.checkInputValidityEditDuty.bind(this));

    }

    checkInputValidityEditUsername() {
        const errorUsername = this.form.querySelector('#errorUsername');

        if (this.usernameForm.validity.valueMissing) {
            errorUsername.textContent = "Это обязательное поле";
        }
        else if (this.usernameForm.validity.tooShort && !this.usernameForm.validity.valueMissing || this.usernameForm.validity.tooLong) {
            errorUsername.textContent = "Должно быть от 2 до 30 символов";
        }
        else {
            errorUsername.textContent = "";
        }
    }

    checkInputValidityEditDuty() {
        const errorJob = this.form.querySelector('#errorJob');
        if (this.dutyForm.validity.valueMissing) {
            errorJob.textContent = "Это обязательное поле";
        }
        else if (this.dutyForm.validity.tooShort && !this.dutyForm.validity.valueMissing || this.dutyForm.validity.tooLong) {
            errorJob.textContent = "Должно быть от 2 до 30 символов";
        }
        else {
            errorJob.textContent = "";
        }

    }

}