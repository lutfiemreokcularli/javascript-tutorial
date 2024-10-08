class JokeApi{
    constructor(){
        this.baseURL = "https://api.chucknorris.io";
        this.axiosObj = axios.create(
            {
                baseURL : this.baseURL,
            }
        )
    }
    async randomSakaGetir() {
        try {
            const sakaResponse = await this.axiosObj.get('/jokes/random');
            console.log(sakaResponse);
            return sakaResponse.data.value;
        } catch (error) {
            console.log(error);
        }
    }
}