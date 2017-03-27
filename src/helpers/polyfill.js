export function isDialogAvailable () {
    if (typeof HTMLDialogElement === 'function') {
        return true
    } else {
        return false
    }
}
