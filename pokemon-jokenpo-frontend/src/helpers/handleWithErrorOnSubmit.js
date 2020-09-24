
export default function handleWithErrorOnSubmit() {
    const input = document.getElementsByClassName('login-container__inner-input')

    for (let index = 0; index < input.length; index++) {
        const element = input[index];

        element.classList.add('error-input-border')
    }
}