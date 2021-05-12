export default {
    data: () => ({
        currentUid: undefined
    }),
    methods: {
        uid() {
            var length = 10
            var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            var result = '';
            for ( var i = 0; i < length; i++ ) {
                result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
            }
            return result;
        }
    },
    created() {
        this.currentUid = this.uid()
    }
}