/* var aa = (function test(){
    var sayi = 10;
    function ekle(s1,s2){
        return s1 +s2;
    }
    return {
        sayi,
        ekle

    }
})()

console.log(aa.ekle(1,2)); */

var aa = (function test(){
    function ekle(s1,s2){
        console.log(s1 + s2)
    }
    return {
        ekle
    };
})();

aa.ekle(1,2);