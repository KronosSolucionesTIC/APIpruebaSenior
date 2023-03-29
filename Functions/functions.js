module.exports.validateType = function (type, value) {
    switch (type) {
        case 'int':
            if(!value || isNaN(parseInt(value))){
                return false;
            }
            return true;
        case 'varchar':
            if(typeof value === "string"){
                return true;
            }
            return false;
        default:
            return true;
    }
}

module.exports.validateLength = function (length, value) {
    if(value.length > length){
        return false;
    } 
    return true;
}