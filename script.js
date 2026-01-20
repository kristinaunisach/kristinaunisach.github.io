let topic = "";
let personalElectricity = 1, personalHeating = 1;

// Country data with detailed descriptions
const countries = {
  Germany: {
    electricity: { earths: 3.0, text: "Germany has high electricity consumption (~6,300 kWh/person/year). More than half comes from renewables like solar, wind, hydro and biomass. It has an advanced electricity grid and energy transition policies.", icons:"☀️ 🌬️ 💧 🌾 ⛽" },
    water: { earths: 2.0, text: "Germany has efficient water treatment and distribution systems. Clean water is widely accessible. Households are conscious of water use. Advanced technology and regulations ensure sustainability.", icons:"💧" },
    recycling: { earths: 1.8, text: "Germany has a highly organized recycling system. Waste is sorted into multiple categories, including paper, plastic, and metals. Citizens participate actively. Recycled materials are processed efficiently, reducing environmental impact.", icons:"♻️" }
  },
  Lebanon: {
    electricity: { earths: 2.2, text: "Electricity in Lebanon is mostly from fossil fuels and is often unstable. Blackouts are common. Renewable adoption is low. The electricity grid faces infrastructure challenges.", icons:"⛽ ☀️" },
    water: { earths: 1.6, text: "Water access is limited in many areas in Lebanon. People often rely on wells or storage tanks. Awareness for water conservation is increasing but still limited.", icons:"💧" },
    recycling: { earths: 2.4, text: "Recycling in Lebanon is minimal. Waste management is inefficient. Most materials end up in landfills, affecting the environment. There are few structured recycling programs.", icons:"♻️" }
  },
  Kenya: {
    electricity: { earths: 0.6, text: "Kenya has low electricity consumption (~190 kWh/person/year). Most energy comes from renewables including hydro, solar, and geothermal 🌋. Volcanic geothermal plants provide sustainable clean energy.", icons:"☀️ 🌋" },
    water: { earths: 0.9, text: "Water usage  in Kenya is lower due to limited access. Rural areas rely on wells or rainwater. Urban infrastructure is improving. Awareness for water conservation is growing.", icons:"💧" },
    recycling: { earths: 1.2, text: "Recycling in Kenya is informal and minimal. Communities reuse some materials locally. Overall impact is moderate due to low consumption.", icons:"♻️" }
  }
};

// Personal options
const personalOptions = {
  electricity: ["☀️ Solar", "🌬️ Wind", "💧 Hydro", "⛽ Fossil", "🌾 Biomass", "Mixture"],
  heating: ["♨️ Heat pump", "🔥 Gas", "🪵 Oil/Wood"],
  taps: ["Never","Rarely","Sometimes","Often","Always"],
  waste: ["Very poor","Poor","Medium","Good","Excellent"],
  consumption: ["Very high","High","Normal","Low","Very low"],
  reuse: ["Never","Rarely","Sometimes","Often","Always"]
};

// Initialize icon buttons
createIconButtons();

// Slider values
let transport=0,vacation=1,flights=0,bathsWeekly=1;

// FUNCTIONS
function createIconButtons(){
  const el = document.getElementById('electricityButtons');
  el.innerHTML = "";
  personalOptions.electricity.forEach((icon,i)=>{
    const btn=document.createElement('button');
    btn.innerText=icon;
    btn.onclick=()=>{personalElectricity=i;highlightSelected(el,i);}
    el.appendChild(btn);
  });
  const elh=document.getElementById('heatingButtons');
  elh.innerHTML="";
  personalOptions.heating.forEach((icon,i)=>{
    const btn=document.createElement('button');
    btn.innerText=icon;
    btn.onclick=()=>{personalHeating=i;highlightSelected(elh,i);}
    elh.appendChild(btn);
  });
}

function highlightSelected(parent,index){
  Array.from(parent.children).forEach((b,i)=>b.classList.toggle('selected', i===index));
}

function setTopic(t,btn){
  topic=t;
  document.getElementById("result").innerHTML=`<p>✅ ${t.charAt(0).toUpperCase()+t.slice(1)} selected</p>`;
  // Highlight topic button
  Array.from(btn.parentNode.children).forEach(b=>b.classList.remove('selected'));
  btn.classList.add('selected');
}

function showCountry(country,btn){
  if(!topic){alert("Please select a topic first!"); return;}
  const data = countries[country][topic];
  document.getElementById("result").innerHTML=`
    <h3>${country} – ${topic.charAt(0).toUpperCase()+topic.slice(1)}</h3>
    <p style="font-size:2em">${data.icons}</p>
    <div>${renderEarths(data.earths)}</div>
    <p><strong>${data.earths} Earths</strong></p>`;
  document.getElementById("countryExplanation").innerText=data.text;
  // Highlight country button
  Array.from(btn.parentNode.children).forEach(b=>b.classList.remove('selected'));
  btn.classList.add('selected');
}

function updateSliderLabel(id,value){
  let text=value;
  switch(id){
    case 'tapsValue': text=personalOptions.taps[value]; break;
    case 'wasteValue': text=personalOptions.waste[value]; break;
    case 'consumptionValue': text=personalOptions.consumption[value]; break;
    case 'reuseValue': text=personalOptions.reuse[value]; break;
    case 'transportValue':
      const transportLabels = ["Car","Public Transport","Bicycle","Walking"];
      text=transportLabels[value]; transport=parseInt(value); break;
    case 'vacationValue': vacation=parseInt(value); text=value; break;
    case 'flightsValue': flights=parseInt(value); text=value; break;
    case 'bathsWeeklyValue': bathsWeekly=parseInt(value); text=value; break;
    case 'showerValue':
    case 'bathValue': text=value; break;
  }
  document.getElementById(id).innerText=text;
}

function renderEarths(value){
  let full=Math.floor(value);
  let half=value-full>=0.5;
  let html="";
  for(let i=0;i<full;i++) html+=`<span class="earth">🌍</span>`;
  if(half) html+=`<span class="earth">🌗</span>`;
  return html;
}

function calculatePersonal(){
  const shower=parseFloat(document.getElementById("shower").value);
  const bath=parseFloat(document.getElementById("bath").value);
  const taps=parseFloat(document.getElementById("taps").value);
  const wasteRaw=parseFloat(document.getElementById("waste").value);
  const waste=4-wasteRaw;
  const consumption=parseFloat(document.getElementById("consumption").value);
  const reuse=parseFloat(document.getElementById("reuse").value);

  const electricityEarths=(personalElectricity+personalHeating)/3*1.5;
  const waterEarths=(shower+bath+taps+bathsWeekly*0.3)/4*1.2;
  const recyclingEarths=(waste+consumption+reuse)/3*1.3;
  const mobilityEarths=transport*0.5 + vacation*0.2 + flights*0.5;

  document.getElementById("personalResult").innerHTML=`
    <h3>🌍 Your Personal Results</h3>
    <p>Electricity: ${renderEarths(electricityEarths)} (${electricityEarths.toFixed(1)})</p>
    <p>Water: ${renderEarths(waterEarths)} (${waterEarths.toFixed(1)})</p>
    <p>Recycling: ${renderEarths(recyclingEarths)} (${recyclingEarths.toFixed(1)})</p>
    <p>Mobility & Travel: ${renderEarths(mobilityEarths)} (${mobilityEarths.toFixed(1)})</p>
    <p>Each category is calculated separately. Your choices directly affect your footprint.</p>`;
    
    
    // =======================
// CALCULATE BUTTON SETUP
// =======================
const calculateBtn = document.getElementById('calculateBtn');

calculateBtn.addEventListener('click', () => {
    // Setzt die ausgewählte Farbe
    calculateBtn.classList.add('selected');

    // Führt die Berechnung aus
    calculatePersonal();
});

}

