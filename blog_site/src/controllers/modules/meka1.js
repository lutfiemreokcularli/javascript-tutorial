const { base } = require("./base_meka");
function testfnc(){
    const sonuc = base();
    return sonuc + " ve ben meka1'den geldim.";

}

module.exports = {
    testfnc
}