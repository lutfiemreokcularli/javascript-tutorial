
const form = document.getElementById('form-rehber');
form.addEventListener("submit", kaydet);

const mail = document.getElementById('exampleEmailInput');

const message = document.getElementById('exampleMessage');

const rfc = document.querySelector('#exampleRecipientInput');
rfc.selectedIndex = 0;
rfc.addEventListener("change", function (e) {
    //console.log(rfc.children[parseInt(this.value)].innerText);
    rfcVal = this.value;
});
let rfcVal = "";

const ticketList = document.querySelector('.ticket-list');
ticketList.addEventListener("click", ticketIslemleriniYap);
const allTickets = [];

let secilenSatir = undefined;

function ticketIslemleriniYap(e) {
    if (e.target.classList.contains('btn--delete')) {
        const silinecekTr = e.target.parentElement.parentElement;
        const silinecekTrdekiUniqDateTime = e.target.parentElement.previousElementSibling.textContent;
        rehberdenSil(silinecekTr, silinecekTrdekiUniqDateTime);
    } else if (e.target.classList.contains('btn--edit')) {
        document.querySelector('.kaydetGuncelle').value = 'Güncelle';
        const secilenTr = e.target.parentElement.parentElement;
        const secilenTrDateTime = secilenTr.cells[3].textContent;

        for (let i = 0; i < rfc.clientHeight; i++) {
            if (secilenTr.cells[2].textContent == rfc.children[parseInt(i)].innerText) {
                rfc.selectedIndex = i;
                break;
            }
        }
        mail.value = secilenTr.cells[0].textContent;
        message.value = secilenTr.cells[1].textContent;

        secilenSatir = secilenTr;
    }
}
function rehberdenSil(silinecekTrElement, date) {
    silinecekTrElement.remove();
    allTickets.forEach((element, index) => {
        if (element.time === date) allTickets.splice(index, 1);
    })
    alanlariTemizle()
}
function kaydet(e) {
    e.preventDefault();
    const eklenecekTicket = {
        mail: mail.value,
        message: message.value,
        rfc: rfcVal,
        time: getCurrentDateTime()
    }
    //console.log(eklenecekTicket);
    const sonuc = verileriKontrolEt(eklenecekTicket);
    if (sonuc.durum) {
        if (secilenSatir) {
            ticketGuncelle(eklenecekTicket);
        } else
            ticketEkle(eklenecekTicket);
    }
    else if (!sonuc.durum) {
        bilgiOlustur(sonuc.mesaj, sonuc.durum);
    }
}
function ticketGuncelle(ticket) {
    console.log(allTickets);
    /* allTickets.forEach((element)=>{
        debugger
        if(element.time === secilenSatir.cells[3].textContent){
            element = ticket;
        }
    }); */
    for (let i = 0; i < allTickets.length; i++) {
        if (allTickets[i].time == secilenSatir.cells[3].textContent) {
            allTickets[i] = ticket;
            break;
        }
    }
    console.log(allTickets);
    secilenSatir.cells[0].textContent = ticket.mail;
    secilenSatir.cells[1].textContent = ticket.message;
    secilenSatir.cells[2].textContent = rfc.children[ticket.rfc].textContent;
    secilenSatir.cells[3].textContent = ticket.time;

    document.querySelector('.kaydetGuncelle').value = "Kaydet";
    secilenSatir = undefined;
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