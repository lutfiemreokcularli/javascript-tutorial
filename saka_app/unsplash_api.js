class UnsplashApi {
    constructor() {
        this.baseURL = "https://api.unsplash.com";
        this.clientID = 'Client-ID NmQWmHBWOsBpB_6EEPAIKiA2jRKhXe3SmqUSQkf0hAo';
        this.axiosObj = axios.create(
            {
                baseURL: this.baseURL,
                headers:{
                    Authorization: this.clientID

                },
                params: {
                    query: "animal",
                    count : 1
                }
            }
        )
    }
    async randomResimGetir() {
        try {
            const resimResponse = await this.axiosObj.get('/photos/random');
            console.log(resimResponse);
            return resimResponse.data[0].urls.regular;
        } catch (error) {
            console.log(error);
        }
    }
}