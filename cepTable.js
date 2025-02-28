let ceps = [];
       
function getZonaByCep(cep) {
    const zonas = [
        {nome:"Centro", range: [1000000,1599999] }, // 6
        {nome:"Norte", range: [2000000,2999999]},  // 10
        {nome:"Leste", range: [3000000,3499999]},  // 10
        {nome:"Leste", range: [8000000,8499999]},  // 15
        {nome:"Sul", range: [4000000,4999999]},  // 10
        {nome:"Oeste", range: [5000000,5999999]},  // 9
        {nome:"Grande São Paulo", range: [6000000,9999999]} // 36
    ];
    
    const numericCep = parseInt(cep.replace(/\D/g, ""));
     if (isNaN(numericCep)) return "CEP inválido";
     
     for (const zona of zonas) {
         if (numericCep >= zona.range[0] && numericCep <= zona.range[1]) {
             return `Zona ${zona.nome}`;
         }
     }
     
     return "Zona não encontrada";
}

function adicionarCep() {
     const input = document.getElementById("cepInput");
     const novosCeps = input.value.split(/[,\s]+/).map(cep => cep.trim()).filter(cep => cep);
     
     novosCeps.forEach(cep => {
         if (cep && !ceps.includes(cep)) {
             ceps.push(cep);
         }
     });
     input.value = "";
 }

 const resultado = ceps.map(cep => getZonaByCep(cep)).join("<br>");
 document.getElementById("resultado").innerHTML = resultado;

 function verificarZonas() {
     const tableBody = document.getElementById("resultadoBody");
     if (!tableBody) return;
     tableBody.innerHTML = "";
     
     ceps.forEach(cep => {
         const zona = getZonaByCep(cep);
         const row = document.createElement("tr");
         row.innerHTML = `<td>${cep}</td><td>${zona}</td>`;
         tableBody.appendChild(row);
     });
 }

 function exportarParaExcel() {
     let csvContent = "data:text/csv;charset=utf-8,CEP,Zona\n";
     ceps.forEach(cep => {
         const zona = getZonaByCep(cep);
         csvContent += `${cep},${zona}\n`;
     });
     
     const encodedUri = encodeURI(csvContent);
     const link = document.createElement("a");
     link.setAttribute("href", encodedUri);
     link.setAttribute("download", "ceps_zonas.csv");
     document.body.appendChild(link);
     link.click();
     document.body.removeChild(link);
 }

let coll = document.getElementsByClassName("collapsible");
let i;

for (i = 0; i < coll.length; i++) {
coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
    content.style.display = "none";
    } else {
    content.style.display = "block";
    }
});
}