let topic = "";
let language = "en";
let personalElectricity = 1; // 0-2
let personalHeating = 1;     // 0-2

// COUNTRY DATA
const countries = {
  Germany: {
    electricity: { earths: 3.0, text: {en:"Germany has high electricity consumption (~6,300 kWh/person/year). More than half comes from renewables like solar, wind, hydro and biomass.", de:"Deutschland hat einen hohen Stromverbrauch (~6.300 kWh/Person/Jahr). Mehr als die Hälfte kommt aus erneuerbaren Energien wie Solar, Wind, Wasser und Biomasse."}, icons:"☀️ 🌬️ 💧 🌾 ⛽" },
    water: { earths: 2.0, text: {en:"Water use is high for showers, baths, and households.", de:"Der Wasserverbrauch ist hoch für Duschen, Bäder und Haushalte."}, icons:"💧" },
    recycling: { earths: 1.8, text: {en:"Germany has excellent recycling systems but high consumption increases impact.", de:"Deutschland hat sehr gute Recycling-Systeme, aber hoher Konsum erhöht den Impact."}, icons:"♻️"}
  },
  Lebanon: {
    electricity: { earths: 2.2, text:{en:"Electricity relies mostly on fossil fuels and is often unstable.", de:"Strom wird hauptsächlich aus fossilen Brennstoffen gewonnen und ist oft instabil."}, icons:"⛽ ☀️" },
    water: { earths:1.6, text:{en:"Water infrastructure is limited, leading to higher stress.", de:"Die Wasserinfrastruktur ist begrenzt, was zu höherem Stress führt."}, icons:"💧"},
    recycling: { earths:2.4, text:{en:"Recycling is minimal and waste management inefficient.", de:"Recycling ist minimal und Abfallmanagement ineffizient."}, icons:"♻️"}
  },
  Kenya: {
    electricity: { earths:0.6, text:{en:"Low electricity consumption (~190 kWh/person/year), mostly renewable.", de:"Niedriger Stromverbrauch (~190 kWh/Person/Jahr), hauptsächlich erneuerbar."}, icons:"☀️ 🌋"},
    water: { earths:0.9, text:{en:"Water usage is lower due to limited access.", de:"Wasserverbrauch ist niedriger wegen begrenztem Zugang."}, icons:"💧"},
    recycling: { earths:1.2, text:{en:"Recycling is informal and minimal.", de:"Recycling ist informell und minimal."}, icons:"♻️"}
  }
};

// TRANSLATIONS
const translations = {
  en:{
    mainTitle:"🌍 How Many Earths Would We Need?",
    mainDesc:"Compare countries – or calculate your own resource use.",
    topicTitle:"1️⃣ Choose a topic",
    countryTitle:"2️⃣ Choose a country",
    personalBtn:"🧑‍🎓 Your Personal Sustainability Check",
    calculateBtn:"🌍 Calculate My Earths",
    topics:{ electricity:"⚡ Electricity", water:"💧 Water", recycling:"♻️ Recycling"},
    countries:{Germany:"🇩🇪 Germany", Lebanon:"🇱🇧 Lebanon", Kenya:"🇰🇪 Kenya"},
    personalOptions:{
      electricity:["☀️ Solar","🌬️ Wind","💧 Hydro","⛽ Fossil","🌾 Biomass"],
      heating:["♨️ Heat pump","🔥 Gas","🪵 Oil/Wood"],
      devices:["Yes","Sometimes","No"],
      taps:["Yes","Sometimes","No"],
      waste:["Very good","Medium","Poor"],
      consumption:["Low / second-hand","Normal","High / new items"],
      reuse:["Yes, often","Sometimes","No"]
    }
  },
  de:{
    mainTitle:"🌍 Wie viele Erden bräuchten wir?",
    mainDesc:"Vergleiche Länder – oder berechne deinen eigenen Verbrauch.",
    topicTitle:"1️⃣ Wähle ein Thema",
    countryTitle:"2️⃣ Wähle ein Land",
    personalBtn:"🧑‍🎓 Dein Nachhaltigkeits-Check",
    calculateBtn:"🌍 Meine Erden berechnen",
    topics:{ electricity:"⚡ Strom", water:"💧 Wasser", recycling:"♻️ Recycling"},
    countries:{Germany:"🇩🇪 Deutschland", Lebanon:"🇱🇧 Libanon", Kenya:"🇰🇪 Kenia"},
    personalOptions:{
      electricity:["☀️ Solar","🌬️ Wind","💧 Wasser","⛽ Fossil","🌾 Biomasse"],
      heating:["♨️ Wärmepumpe","🔥 Gas","🪵 Öl/Holz"],
      devices:["Ja","Manchmal","Nein"],
      taps:["Ja","Manchmal","Nein"],
      waste:["Sehr gut","Mittel","Schlecht"],
      consumption:["Wenig / Second-Hand","Normal","Viel / Neukauf"],
      reuse:["Ja, oft","Manchmal","Nein"]
    }
  }
};

// INITIALIZATION
function changeLanguage(lang){
  language = translations[lang]?lang:"en";
  const t=translations[language];

  document.getElementById("mainTitle").innerText=t.mainTitle;
  document.getElementById("mainDesc").innerText=t.mainDesc;
  document.getElementById("topicTitle").innerText=t.topicTitle;
  document.getElementById("countryTitle").innerText=t.countryTitle;
  document.getElementById("personalTitle").innerText=t.personalBtn;
  document.getElementById("calculateBtn").innerText=t.calculateBtn;
  document.getElementById("btnElectricity").innerText=t.topics.electricity;
  document.getElementById("btnWater").innerText=t.topics.water;
  document.getElementById("btnRecycling").innerText=t.topics.recycling;
  document.getElementById("btnGermany").innerText=t.countries.Germany;
  document.getElementById("btnLebanon").innerText=t.countries.Lebanon;
  document.getElementById("btnKenya").innerText=t.countries.Kenya;

  createIconButtons();
  updateSliderLabel('showerValue', document.getElementById('shower').value);
  updateSliderLabel('bathValue', document.getElementById('bath').value);
  updateSliderLabel('tapsValue', document.getElementById('taps').value);
  updateSliderLabel('wasteValue', document.getElementById('waste').value);
  updateSliderLabel('consumptionValue', document.getElementById('consumption').value);
  updateSliderLabel('reuseValue', document.getElementById('reuse').value);
}

// CREATE ICON BUTTONS
function createIconButtons(){
  const t = translations[language].personalOptions;
  const el = document.getElementById('electricityButtons');
  el.innerHTML = "";
  t.electricity.forEach((icon,i)=>{
    const btn=document.createElement('button');
    btn.innerText=icon;
    btn.onclick=()=>{personalElectricity=i; highlightSelected(btn.parentNode,i);}
    el.appendChild(btn);
  });
  const elh=document.getElementById('heatingButtons');
  elh.innerHTML="";
  t.heating.forEach((icon,i)=>{
    const btn=document.createElement('button');
    btn.innerText=icon;
    btn.onclick=()=>{personalHeating=i; highlightSelected(btn.parentNode,i);}
    elh.appendChild(btn);
  });
}

// HIGHLIGHT SELECTED ICON
function highlightSelected(parent,index){
  Array.from(parent.children).forEach((b,i)=>b.style.border=i===index?"3px solid #ff5722":"none");
}

// UPDATE SLIDER LABELS
function updateSliderLabel(id,value){
  const t=translations[language].personalOptions;
  let text="";
  switch(id){
    case 'showerValue': case 'bathValue': text=value; break;
    case 'electricitySourceValue': text=t.electricity[value]; break;
    case 'heatingValue': text=t.heating[value]; break;
    case 'devicesValue': text=t.devices[value]; break;
    case 'tapsValue': text=t.taps[value]; break;
    case 'wasteValue': text=t.waste[value]; break;
    case 'consumptionValue': text=t.consumption[value]; break;
    case 'reuseValue': text=t.reuse[value]; break;
  }
  document.getElementById(id).innerText=text;
}

// TOPIC SELECTION
function setTopic(t){topic=t;document.getElementById("result").innerHTML=`<p>✅ ${translations[language].topics[t]} selected</p>`;}

// RENDER EARTHS
function renderEarths(value){let full=Math.floor(value),half=value-full>=0.5;let html="";for(let i=0;i<full;i++)html+=`<span class="earth">🌍</span>`;if(half)html+=`<span class="earth">🌗</span>`;return html;}

// SHOW COUNTRY
function showCountry(country){
  if(!topic){alert(language==='de'?"Bitte wähle zuerst ein Thema!":"Please select a topic first!"); return;}
  const data=countries[country][topic];
  const text=data.text[language]||data.text.en;
  const title=translations[language].topics[topic];
  document.getElementById("result").innerHTML=`<h3>${country} – ${title}</h3>
    <p style="font-size:2em">${data.icons}</p>
    <div>${renderEarths(data.earths)}</div>
    <p><strong>${data.earths} Earths</strong></p>
    <p>${text}</p>`;
}

// PERSONAL CALCULATION
function calculatePersonal(){
  const shower=parseFloat(document.getElementById("shower").value);
  const bath=parseFloat(document.getElementById("bath").value);
  const taps=parseFloat(document.getElementById("taps").value);
  const waste=parseFloat(document.getElementById("waste").value);
  const consumption=parseFloat(document.getElementById("consumption").value);
  const reuse=parseFloat(document.getElementById("reuse").value);
  const devices=parseFloat(document.getElementById("devices").value);

  const electricityEarths=(personalElectricity+personalHeating+devices)/3*1.5;
  const waterEarths=(shower+bath+taps)/3*1.2;
  const recyclingEarths=(waste+consumption+reuse)/3*1.3;

  const t=translations[language].topics;
  document.getElementById("personalResult").innerHTML=`<h3>${language==='de'?"🌍 Deine Ergebnisse":"🌍 Your Personal Results"}</h3>
    <p>${t.electricity}: ${renderEarths(electricityEarths)} (${electricityEarths.toFixed(1)})</p>
    <p>${t.water}: ${renderEarths(waterEarths)} (${waterEarths.toFixed(1)})</p>
    <p>${t.recycling}: ${renderEarths(recyclingEarths)} (${recyclingEarths.toFixed(1)})</p>
    <p>${language==='de'?"Jede Kategorie wird separat berechnet. Deine Auswahl beeinflusst direkt deinen Ressourcenverbrauch.":"Each category is calculated separately. Your choices directly affect your resource footprint."}</p>`;
}

// INIT
changeLanguage('en');

