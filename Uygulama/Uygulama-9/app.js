let Soru = function (soru, secenekler, dogruCevap) {
    this.soru = soru;
    this.secenekler = secenekler;
    this.dogruCevap = dogruCevap;
}
Soru.prototype.cevapGonder = function (cevap) {
    if (this.dogruCevap == cevap) return true;
    else return false;
}
const soru1 = new Soru("Bu sayfanın dosya uzantısı nedir?", [".py", ".css", ".html", ".js"], ".html");
const soru2 = new Soru("Hangisi robotik kodlamada iletişim ara kütüphanesi görevini üstlenir?", ["VSCode", "VSC", "QRCode", "ROS"], "ROS");
const soru3 = new Soru("Hangisi bir IDE değildir?", ["Notepad++", "WebStorm", "Gcc", "VSCode"], "Gcc");

const secenekler = document.querySelector("#secenekler");
const vars = [soru1, soru2, soru3];
let position = 0;
const title = document.querySelector(".card-title");
const options = document.querySelectorAll(".btn.btn-primary.d-block.mb-2");
const header = document.querySelector(".card-header");
header.innerText = "Soru - 1";
title.innerText = soru1.soru;
options[0].innerText = soru1.secenekler[0];
options[1].innerText = soru1.secenekler[1];
options[2].innerText = soru1.secenekler[2];
options[3].innerText = soru1.secenekler[3];

secenekler.addEventListener("click", function (e) {
    if (e.target.className == "btn btn-primary d-block mb-2") {
        if (vars[position].cevapGonder(e.target.innerText) && position != 3) {
            const basarisiz = document.querySelector("#basarisiz");
            basarisiz.className = "alert alert-danger d-none";
            if (++position == 3) {
                const basarili = document.querySelector("#basarili");
                basarili.className = "alert alert-success";
            } else {
                header.innerText = "Soru - " + (position + 1);
                title.innerText = vars[position].soru;
                options[0].innerText = vars[position].secenekler[0];
                options[1].innerText = vars[position].secenekler[1];
                options[2].innerText = vars[position].secenekler[2];
                options[3].innerText = vars[position].secenekler[3];

            }
        } else {
            const basarisiz = document.querySelector("#basarisiz");
            basarisiz.className = "alert alert-danger";
            position = 0;
            header.innerText = "Soru - 1";
            title.innerText = soru1.soru;
            options[0].innerText = soru1.secenekler[0];
            options[1].innerText = soru1.secenekler[1];
            options[2].innerText = soru1.secenekler[2];
            options[3].innerText = soru1.secenekler[3];

        }
    }
})

