const hero = document.querySelector(".hero");
const btn = document.getElementById("btn");
const inputBox1 = document.getElementById("inputBox1");
const inputBox2 = document.getElementById("inputBox2");
const mainBox = document.querySelector(".container");
const pokePhoto = document.getElementById("sprites");
const title = document.getElementById("name");
const type = document.getElementById("type");
const ability = document.getElementById("ability");
const message = document.getElementById("message");
const cardshow = document.querySelector(".cardShow");
const SD = document.getElementById("SD");





btn.addEventListener("click", async () => {
  mainBox.replaceChildren("");
  let typeOf = inputBox1.value;
  let amount = inputBox2.value;
  if (amount > 0 && amount < 100) {
    SD.style.display = "block";
    cardshow.style.display = "block";
    const response = await fetch(`https://pokeapi.co/api/v2/type/${typeOf}`);
    const result = await response.json();
    console.log(result);
    type.innerText = `Displaying ${amount} Pokemons of ${result.name} type.`;
    for (let i = 0; i < amount; i++) {
      let data = result.pokemon[i].pokemon.url;
      const datas = await fetch(data);
      const res = await datas.json();
      console.log(res);
      const pokeType = result.name;
      const PokeHp = res.stats[0].base_stat;
      const pokeAttack = res.stats[1].base_stat;
      const resist1 = result.damage_relations.half_damage_from[0].name;
      const resist2 = result.damage_relations.half_damage_from[1].name;
      const weak = result.damage_relations.double_damage_from[0].name;
    //   let poke = res.sprites.front_default;
      let poke =  `https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${res.id}.svg`;
      let div = document.createElement("div");
      let pic = document.createElement("img");
      let content = document.createElement("div");
      let value = document.createElement("h2");
      let type = document.createElement("span");
      let HP = document.createElement("span");
      let Attack = document.createElement("span");
      let Damage1 = document.createElement("span");
      let Damage2 = document.createElement("span");
      let Weakness = document.createElement("span");
      type.innerHTML = pokeType +"<br>";
      HP.innerText = "HP "+ PokeHp;
      Attack.innerHTML = "Attack " + pokeAttack +"<br>";
      Damage1.innerText =resist1;
      Damage2.innerText =resist2;
      Weakness.innerText =weak;
      content.classList.add("stats");
      type.classList.add("custom");
      HP.classList.add("custom");
      Attack.classList.add("custom");
      Damage1.classList.add("custom");
      Damage2.classList.add("custom");
      Weakness.classList.add("custom");
      pic.setAttribute("src", poke);
      pic.classList.add("cardImg");
      pic.setAttribute("onerror"," this.onerror=null; this.src='./pokeball-pokemon-svgrepo-com.svg'");
      value.innerText = result.pokemon[i].pokemon.name;
      value.style.fontWeight = "600";
    
      div.append(pic);
      div.append(value);
      content.append(type,HP,Attack,Damage1,Damage2,Weakness);
      div.append(content);
      mainBox.append(div);
     
    }
  } else {
    message.style.display = "block";
    setTimeout(()=>{
      message.style.display = "none";
    },3000)
    cardshow.style.display = "none";
    SD.style.display = "none";
    console.log("Please select number between 'zero' and 'Hundred'");
  }

 
  inputBox2.value = "";
});

// const pokeImg = result.sprites.front_default;
// title.innerText = result.name;
// type.innerText = result.types[0].type.name + " ";
// ability.innerText = result.abilities[0].ability.name + " "+ result.abilities[1].ability.name ;
// pokePhoto.setAttribute("src",pokeImg);
