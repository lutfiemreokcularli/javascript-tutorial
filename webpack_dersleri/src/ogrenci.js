import axios from 'axios'

export default class Ogrenci {
    constructor(ad) {
        this.ad = ad;
    }
    async adiniSoyle() {
        console.log(`benim adım ${this.ad}`);
        
        const resultum = await axios.get('https://jsonplaceholder.typicode.com/posts');
        console.log(resultum.data)
    }
}