const app = Vue.createApp({
    data() {
        return {
            length: 8,
            checkboxValues: {
                lowercase: { checked: true, label: 'Lowercase', chars: 'abcdefghijklmnopqrstuvwxyz' },
                uppercase: { checked: true, label: 'Uppercase', chars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' },
                numbers: { checked: true, label: 'Numbers', chars: '0123456789' },
                symbols: { checked: true, label: 'Symbols', chars: '!@#$%^&*()-_=+{}[]|:;<>,.?/' },
            },
            password: ''
        }
    },
    methods: {
        generate() {
            let charset = '';
            for (let key in this.checkboxValues) {
                if (this.checkboxValues[key].checked) {
                    charset += this.checkboxValues[key].chars;
                }
            }
            let password = '';
            for (let i = 0; i < this.length; i++) {
                const randomIndex = Math.floor(Math.random() * charset.length);
                password += charset[randomIndex];
            }
            this.password = password;
        },
        async copyToClipboard() {
            await navigator.clipboard.writeText(this.password);
        }
    }
});

app.mount('#app');
