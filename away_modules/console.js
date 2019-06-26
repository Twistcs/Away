module.exports = {
    log: msg => {
        console.log('\x1b[36m[AWAY LOG] \x1b[0m' + msg);
    },
    warn: msg => {
        console.log('\x1b[36m[AWAY WARN] \x1b[0m' + msg);
    },
    error: msg => {
        console.log('\x1b[36m[AWAY ERROR] \x1b[0m' + msg);
    },
};