let rfcVal = "";
const form = document.getElementById('form-rehber');
const mail = document.getElementById('exampleEmailInput');
const message = document.getElementById('exampleMessage');
const rfc = document.querySelector('#exampleRecipientInput');
const ticketList = document.querySelector('.ticket-list');
const allTickets = [];
rfc.selectedIndex = 0;

ticketList.addEventListener("click", ticketIslemleriniYap);
rfc.addEventListener("change", function (e) {
    //console.log(rfc.children[parseInt(this.value)].innerText);
    rfcVal = this.value;
});

form.addEventListener("submit", kaydet);

function ticketIslemleriniYap(e) {
    if (e.target.classList.contains('btn--delete')) {
        const silinecekTr = e.target.parentElement.parentElement;
        const silinecekTrdekiUniqDateTime = e.target.parentElement.previousElementSibling.textContent;
        rehberdenSil(silinecekTr,silinecekTrdekiUniqDateTime);
    } else if (e.target.classList.contains('btn--edit')) {
        //console.log('güncelleme işlemi');
    }
}
function rehberdenSil(silinecekTrElement,date){
    silinecekTrElement.remove();
    allTickets.forEach((element,index) => {
        if(element.time === date) allTickets.splice(index,1);
    })
    console.log(allTickets);
}
function kaydet(e) {
    e.preventDefault();
    const eklenecekTicket = {
        mail: mail.value,
        message: message.value,
        rfc: rfcVal,
        time:getCurrentDateTime()
    }
    //console.log(eklenecekTicket);
    const sonuc = verileriKontrolEt(eklenecekTicket);
    if (sonuc.durum) {
        ticketEkle(eklenecekTicket);
    }
    else if (!sonuc.durum) {
        bilgiOlustur(sonuc.mesaj, sonuc.durum);
    }
}
function ticketEkle(ticket) {
    const kaydedilecekTrElementi = document.createElement('tr');
    kaydedilecekTrElementi.innerHTML = `<td>${ticket.mail}</td>
    <td>${ticket.message}</td>
    <td>${rfc.children[ticket.rfc].textContent}</td>
    <td>${ticket.time}</td>
    <td><button class="btn btn--edit"> <i class="fa-solid fa-edit"></i> </button>
        <button class="btn btn--delete"> <i class="fa-solid fa-trash"></i> </button>
    </td>`;
    ticketList.appendChild(kaydedilecekTrElementi);
    allTickets.push(ticket);
    bilgiOlustur("kişi eklendi", true);
    

}
function verileriKontrolEt(ticket) {
    for (const deger in ticket) {
        if (ticket[deger]) {

        } else {
            return {
                durum: false,
                mesaj: "boş alan bırakılamaz!"
            }
        }
    }
    alanlariTemizle();
    return {
        durum: true,
        mesaj: "başarılı"
    }
}
function bilgiOlustur(mesaj, durum) {
    const olusturulanBilgi = document.createElement('div');
    olusturulanBilgi.textContent = mesaj;
    olusturulanBilgi.className = 'bilgi';
    olusturulanBilgi.classList.add(durum ? 'bilgi--success' : 'bilgi--error');
    /* if(durum) olusturulanBilgi.classList.add('bilgi--success');
    else olusturulanBilgi.classList.add('bilgi--error'); */
    document.querySelector('.container').insertBefore(olusturulanBilgi, form);

    setTimeout(function () {
        const silinecekDiv = document.querySelector('.bilgi');
        if (silinecekDiv) silinecekDiv.remove();
    }, 2000);
}
function alanlariTemizle() {
    mail.value = "";
    message.value = "";
    rfcVal = "";
    selectElementReset();
}
function selectElementReset() {
    document.getElementById("exampleRecipientInput").selectedIndex = 0;
}

function getCurrentDateTime() {
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