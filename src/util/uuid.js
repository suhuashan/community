/**
 * @description: 生成唯一key
 * @param {string} key
 * @return: {string}
 */
function uuid (key) {
    let randomNum = String(Math.random()).split('.')[1],
        dateTime = new Date().getTime(),
        newRandomNum = Number(randomNum) + dateTime;

    return `uuid-${newRandomNum}-${key}`;
}

export default uuid;