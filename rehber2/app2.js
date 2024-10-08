document.addEventListener('DOMContentLoaded', function (e) {
    const scene = new Scene();
})
class Ticket {
    constructor(mail, message, rfc, time) {
        this.mail = mail;
        this.message = message;
        this.rfc = rfc;
        this.time = time;
    }

}
class Scene {
    constructor() {
        //dom elemanlarını seçeceğiz.
        this.mail = document.getElementById('exampleEmailInput');

        this.message = document.getElementById('exampleMessage');

        this.rfc = document.querySelector('#exampleRecipientInput');
        this.rfc.selectecIndex = 0;

        this.form = document.getElementById('form-rehber').addEventListener("submit", this.kaydet.bind(this));

        this.ticketList = document.querySelector('.ticket-list');

        this.ticketList.addEventListener('click',this.guncelleVeyaSil.bind(this));

        this.repo = new Repo();
        this.ticketlariYazdir();
        this.secilenSatir = undefined;

    }
    ticketlariYazdir(){
        this.repo.tumTicketlar.forEach(ticket =>{
            this.ticketEkle(ticket);
        });
    }
    alanlariTemizle(){
        this.mail.value = "";
        this.message.value = "";
        document.getElementById("exampleRecipientInput").selectedIndex = 0;
    }

    kaydet(e) {
        e.preventDefault();
        const ticket = new Ticket(this.mail.value, this.message.value, this.rfc.value, this.getCurrentDateTime());
        const sonuc = Util.checkEmptyKey(ticket);
        if (sonuc.durum) {
            if (this.secilenSatir) {
                this.secilenSatir.cells[0].textContent = ticket.mail;
                this.secilenSatir.cells[1].textContent = ticket.message;
                this.secilenSatir.cells[2].textContent = this.rfc.children[ticket.rfc].textContent;
                this.repo.ticketGuncelle(ticket,this.secilenSatir.cells[3].textContent);
                this.secilenSatir.cells[3].textContent = ticket.time;

                this.alanlariTemizle();
            } else{
                this.ticketEkle(ticket);
                this.repo.ticketEkle(ticket);
            }
                
        }
        else if (!sonuc.durum) {
            bilgiOlustur(sonuc.mesaj, sonuc.durum);
        }

    }
    ticketEkle(ticket) {
        const kaydedilecekTrElementi = document.createElement('tr');
        kaydedilecekTrElementi.innerHTML = `<td>${ticket.mail}</td>
    <td>${ticket.message}</td>
    <td>${this.rfc.children[ticket.rfc].textContent}</td>
    <td>${ticket.time}</td>
    <td><button class="btn btn--edit"> <i class="fa-solid fa-edit"></i> </button>
        <button class="btn btn--delete"> <i class="fa-solid fa-trash"></i> </button>
    </td>`;
        this.ticketList.appendChild(kaydedilecekTrElementi);
        this.alanlariTemizle();
    }
    getCurrentDateTime() {
        const now = new Date();

        const year = now.getFullYear();
        const month = now.getMonth() + 1; // Months are zero-indexed, so we add 1
        const day = now.getDate();
        const hour = now.getHours();
        const minute = now.getMinutes();
        const second = now.getSeconds();
        const millisecond = now.getMilliseconds();
        return `${year}.${month}.${day}-${hour}:${minute}:${second}:${millisecond}`

    }
    guncelleVeyaSil(e){
        const tiklanmaYeri = e.target;
        
        if(tiklanmaYeri.classList.contains('btn--edit')){
            this.secilenSatir = tiklanmaYeri.parentElement.parentElement;
            console.log(this.secilenSatir);
            document.querySelector('.kaydetGuncelle').value = 'Güncelle';
            for (let i = 0; i < this.rfc.clientHeight; i++) {
                if (this.secilenSatir.cells[2].textContent == this.rfc.children[parseInt(i)].innerText) {
                    this.rfc.selectedIndex = i;
                    break;
                }
            }
            this.mail.value = this.secilenSatir.cells[0].textContent;
            this.message.value = this.secilenSatir.cells[1].textContent;

            /* const ticketOld = new Ticket(this.secilenSatir.cells[0].textContent,this.secilenSatir.cells[1].textContent,this.rfc.selectedIndex.toString(),this.secilenSatir.cells[3].textContent);
            console.log(ticketOld); */

        }else if(tiklanmaYeri.classList.contains('btn--delete')){
            this.secilenSatir = tiklanmaYeri.parentElement.parentElement;
            this.secilenSatir.remove();
            this.repo.ticketSil(this.secilenSatir.cells[3].textContent);
            
        }
        

    }
}
class Repo {
    constructor() {
        this.tumTicketlar = this.ticketlariGetir();
    }
    ticketlariGetir() {
        let tumTicketlar;
        if (localStorage.getItem('tumTicketlar') === null) {
            tumTicketlar = [];
        } else {
            tumTicketlar = JSON.parse(localStorage.getItem('tumTicketlar'));
        }
        return tumTicketlar;
    }
    ticketEkle(ticket) {
        this.tumTicketlar.push(ticket);
        localStorage.setItem('tumTicketlar', JSON.stringify(this.tumTicketlar));

    }
    ticketSil(time){
        this.tumTicketlar.forEach((ticket,index) =>{
            if(ticket.time == time){
                this.tumTicketlar.splice(index,1);
            }
        })
        localStorage.setItem('tumTicketlar', JSON.stringify(this.tumTicketlar));
        this.secilenSatir = undefined;
    }
    ticketGuncelle(newticket,time){
        this.tumTicketlar.forEach((ticket,index) =>{
            if(ticket.time == time){
                this.tumTicketlar[index] = newticket;
            }
        })
        localStorage.setItem('tumTicketlar', JSON.stringify(this.tumTicketlar));
        this.secilenSatir = undefined;
    }
}

class Util {
    static checkEmptyKey(ticket) {
        for (const deger in ticket) {
            if (ticket[deger]) {

            } else {
                return {
                    durum: false,
                    mesaj: "boş alan bırakılamaz!"
                }
            }
        }
        
        return {
            durum: true,
            mesaj: "başarılı"
        }
    }
}
