// Permet de récupérer les monstres du bestiaire.
const GetBeasts = async () => {
    const data = await fetch(
        `https://azgard.one/paradigma/getmonster`
    );
    const json = await data.json();
    console.log(json);
    return json;
}

let beasts;
const button_container = document.getElementById("buttons-container");

const Init = async () => {
    // Récupération de la liste des monstres.
    beasts = await GetBeasts();
    console.log(beasts[0])
    Sort("nom");
    MakeButtons();
    UpdateMainPanel(beasts[0])
}

const MakeButtons = () => {
    button_container.innerHTML = "";
    beasts.forEach(beast => {
        button_container.appendChild(MakeButton(beast));
    })
}

// Retourne un bouton pour le monstre en argument.
const MakeButton = (monster) => {
    /*

        Element de Camille
        <div
            style="padding:10px; background:rgba(16 18 27 / 10%);border-radius:10px;backdrop-filter: blur(6px);">
            <button class="linkClass monster_button" data-title="introduction">
                <div style="height: 3vw;width: 100%;"><img src="https://i.imgur.com/7IdM3as.jpg"
                        class="img_bestiaire button_img"></div>

                <div class="nom_bestiaire_monstre" style="grid-row: 2/2;width: 100%;height: 4vw;">
                    <span>Elona</span></div>
            </button>
        </div>

    */
    const container = document.createElement('div');
    container.classList.add("azer");

    const button = document.createElement('button');
    button.classList.add('linkClass');
    button.classList.add('monster_button');
    button.setAttribute('data-title', "introduction");

    const smaller_div = document.createElement('div');
    smaller_div.style.height = "3vw";
    smaller_div.style.width = "100%";

    const img = document.createElement('img');
    img.src = monster.image;

    img.classList.add('img_bestiaire');
    img.classList.add('button_img');

    const last_div = document.createElement('div');
    last_div.classList.add('nom_bestiaire_monstre');

    const span_nom = document.createElement('span');
    span_nom.innerHTML = monster.nom;

    container.appendChild(button);
    smaller_div.appendChild(img);
    button.appendChild(smaller_div);
    last_div.appendChild(span_nom);
    button.appendChild(last_div);

    container.onclick = () => {
        UpdateMainPanel(monster);
    }

    return container;
}

const main_panel = {
    "image": document.getElementById('main_image'),
    "name": document.getElementById('main_name'),
    "description": document.getElementById('spoiler_descr'),
    "title": document.getElementById('main_title'),
    "stats": document.getElementById('main_stats'),
    "type": document.getElementById('main_type'),
    "rarity": document.getElementById('main_rarity'),
    "danger": document.getElementById('main_dangerosity')
}

const UpdateMainPanel = (monster) => {
    // Changement image
    main_panel.image.src = monster.image;

    // Changement nom
    main_panel.name.innerText = monster.nom;

    // Changement description
    main_panel.description.innerText = monster.description;

    main_panel.title.innerText = monster.titre ?? "[à compléter]";

    main_panel.stats.innerText = monster.caracteristique ?? "Prochainemment";

    main_panel.type.innerText = monster.type ?? "Prochainemment";

    main_panel.rarity.innerText = monster.rarete.toUpperCase() ?? "Inconnue";

    main_panel.danger.innerText = monster.dangerosite ?? "Inconnue";

}

const Sort = (key) => {
    console.log(key)
    if (key == "rarete") {
        beasts = beasts.sort((a, b) => { 
            return RarityToInt[a.rarete.toLowerCase()] - RarityToInt[b.rarete.toLowerCase()]
        })
        return;
    }
    if (key == "dangerosite") {
        console.log("Dangerous")
        beasts = beasts.sort((a, b) => { 
            return DangerousToInt[a.dangerosite.trim().toLowerCase()] - DangerousToInt[b.dangerosite.trim().toLowerCase()]
        })
        return;
    }
    beasts = beasts.sort((a, b) => a[key].localeCompare(b[key]))
    console.log(beasts);
}

const filter = document.getElementById('filtre');

filter.onchange = () => {
    console.log("Changing filter by value : " + filter.value);

    const changeFilter = (_filter) => {
        Sort(_filter);
        MakeButtons();
    }

    switch (parseInt(filter.value)) {
        case 1:
            console.log("test")
            changeFilter("nom");
            break;
        case 2:
            changeFilter("rarete");
            break;
        case 3:
            changeFilter("dangerosite");
            break;
        case 4:
            changeFilter("type");
            break;
        default:
            console.log("Not working")
            return;

    }
}

const RarityToInt = {
    "usuel" : 0,
    "basique" : 1,
    "épique" : 2,
    "mythique" : 3
}

const DangerousToInt = {
    "inoffensif" : 0,
    "inconvénient" : 1,
    "sinistre" : 2,
    "désastre" : 3
}

Init();
