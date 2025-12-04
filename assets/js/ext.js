/**
 * @param {Date} date
 */
function getDays(date) {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
}

Date.prototype.format = function () {
    const year = this.getFullYear()
    const month = String(this.getMonth() + 1).padStart(2, '0')
    const day = String(this.getDate()).padStart(2, '0')

    return `${year}.${month}.${day}`
}