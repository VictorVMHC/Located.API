const getCode = () => {
    const ran = Math.floor(Math.random() * 1000000);
    const code = String(ran).padStart(6, '0');
    return code
}
module.exports ={
    getCode
}