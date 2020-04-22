class FormValidator {
    constructor(form) {
        this.form = form;
        this.isValid = null;
    }

    setSubmitButtonState() {
        const submitButton = this.form.querySelector('button');
        const elements = Array.from(this.form);
        this.isValid = true;
        elements.forEach((item) => {
            if (!item.classList.contains('button')) {
                if (item.validity.valueMissing || item.validity.tooLong || item.validity.tooShort || item.validity.typeMismatch) {
                    this.isValid = false
                }
            }
            return this.isValid
        });

        if (this.isValid) {
            submitButton.removeAttribute('disabled');
            submitButton.classList.add('button__type_active');
        }
        else {
            submitButton.setAttribute('disabled', true);
            submitButton.classList.remove('button__type_active');
        }
    }

}

module.exports = FormValidator