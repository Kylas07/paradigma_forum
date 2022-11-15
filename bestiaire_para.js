const beast_info = [
    {
        name: "Araignée",
        image: "https://i.pinimg.com/564x/19/42/84/1942840e0056997c219b4594431b254f.jpg",
        rarity: "4",
        infos: [
            "Lorem Ipsum is simply dummy text of the printing",
            "Lorem Ipsum is simply dummy text of the printing",
            "Lorem Ipsum is simply dummy text of the printing",
            "Lorem Ipsum is simply dummy text of the printing"
        ],
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer eget malesuada velit",
        rang: 1
    },
    {
        name: "Dragon chelou",
        image: "https://i.pinimg.com/564x/11/16/48/111648734f7da2901946aa0b22ea43d1.jpg",
        rarity: "3",
        infos: [
            "Lorem Ipsum is simply dummy text of the printing",
            "Lorem Ipsum is simply dummy text of the printing",
            "Lorem Ipsum is simply dummy text of the printing",
            "Lorem Ipsum is simply dummy text of the printing"
        ],
        description: "Il est moche mais moins que l'araignée",
        rang: 2
    },

    {
        name: "Tigre bizarre",
        image: "https://i.pinimg.com/564x/10/60/99/106099b3e260f54f95e8e6eca257b3d2.jpg",
        rarity: "3",
        infos: [
            "Lorem Ipsum is simply dummy text of the printing",
            "Lorem Ipsum is simply dummy text of the printing",
            "Lorem Ipsum is simply dummy text of the printing",
            "Lorem Ipsum is simply dummy text of the printing"
        ],
        description: "Vraiment louche",
        rang: 0
    },
    {
        name: "Pierre",
        image: "https://i.pinimg.com/564x/ea/27/15/ea27150c760f686097df92191e148b4f.jpg",
        rarity: "1",
        infos: [
            "Lorem Ipsum is simply dummy text of the printing",
            "Lorem Ipsum is simply dummy text of the printing",
            "Lorem Ipsum is simply dummy text of the printing",
            "Lorem Ipsum is simply dummy text of the printing"
        ],
        description: "Vraiment louche et pierreux",
        rang: 0
    },
    {
        name: "Draven le fou xd",
        image: "https://static.wikia.nocookie.net/leagueoflegends/images/3/37/Draven_Render.png/revision/latest?cb=20200330081332",
        rarity: "1",
        infos: [
            "Lorem Ipsum is simply dummy text of the printing",
            "Lorem Ipsum is simply dummy text of the printing",
            "Lorem Ipsum is simply dummy text of the printing",
            "Lorem Ipsum is simply dummy text of the printing"
        ],
        description: "Vraiment louche et pierreux",
        rang: 2
    },
    {
        name: "Diego de camile",
        image: "https://img.redbull.com/images/c_crop,x_957,y_0,h_1080,w_810/c_fill,w_400,h_540/q_auto:low,f_auto/redbullcom/2021/2/25/k9jy66qhgcxbsv3lwupb/viego-champion-league-of-legends-guide",
        rarity: "1",
        infos: [
            "Lorem Ipsum is simply dummy text of the printing",
            "Lorem Ipsum is simply dummy text of the printing",
            "Lorem Ipsum is simply dummy text of the printing",
            "Lorem Ipsum is simply dummy text of the printing"
        ],
        description: "Vraiment louche et pierreux",
        rang: 0
    },
    {
        name: "Le mob de bely",
        image: "https://www.pokepedia.fr/images/thumb/7/76/Pikachu-DEPS.png/800px-Pikachu-DEPS.png",
        rarity: "4",
        infos: [
            "Salut",
            "Lorem Ipsum is simply dummy text of the printing",
            "XD",
            "Lorem Ipsum is simply dummy text of the printing"
        ],
        description: "Une description",
        rang: 1
    },
    {
        name: "La meuf à mayhem",
        image: "https://cdn.donmai.us/sample/1a/72/sample-1a72f61c9774f8b46eac2d678f2feed1.jpg",
        rarity: "4",
        infos: [
            "Trop sexy",
            "Trop forte",
            "Trop intelligente",
            "Trop sympa"
        ],
        description: "<strong>Haley</strong> est une <i>villageoise</i> qui vit à Pélican Ville.</br>C'est l'une des douze personnages avec qui il est possible de se marier.",
        rang: 3
    }


];

function rank_to_color(r) {
    return "var(--color-rank-" + r + ")";
}

const beast_ranks = [
    "RANG INOFFENSIF",
    "RANG SINISTRE",
    "RANG INCONNU",
    "RANG SUPERCOOL"
];

const panel_elements = {
    name: document.getElementById("monster-name"),
    image: document.getElementById("monster-img"),
    rarity: document.getElementById("monster-rarity"),
    infos: [
        document.getElementById("monster-1"),
        document.getElementById("monster-2"),
        document.getElementById("monster-3"),
        document.getElementById("monster-4")
    ],
    description: document.getElementById("monster-desc")
}

const makeButton = (monster) => {
    const container = document.createElement('div');
    const button = document.createElement('button');
    button.classList.add("linkClass");
    button.classList.add("monster_button");
    button.setAttribute("data-title", "introduction");
    const img = document.createElement("img");
    img.src = monster.image;
    img.classList.add("img_bestiaire");
    img.classList.add("button_img");
    button.appendChild(img);
    container.appendChild(button);
    return container;
}

const buttons_container = document.getElementById("buttons-container");
const panel_container = document.getElementsByClassName("onglet_contenu")[0];

let button_list = []

const makeButtons = async (monsters, _buttons_container) => {
    monsters.forEach(async (monster) => {
        let button = makeButton(monster);
        button.style.filter = "grayscale(1)";
        button.onclick = async () => {
            fadeAllButtons();
            unfadeButton(button);
            await updatePanel(monster, panel_elements);
        }
        buttons_container.appendChild(button);
        button_list.push(button);

    });
}

const fadeAllButtons = () => {
    button_list.forEach(b => {
        b.style.filter = "grayscale(1)";
    })
}

const unfadeButton = (button) => {
    button.style.filter = "grayscale(0)";
}

const changeBackgroundColor = (element, color_wanted) => {
    element.style.backgroundColor = color_wanted;
}


const updatePanel = async (monster, panel, swipe = true) => {
    if (swipe) {
        await fadeOutContent(panel_container);
    }

    let this_color = rank_to_color(monster.rarity);
    panel.name.innerHTML = monster.name;
    changeBackgroundColor(panel.name, this_color);

    panel.image.src = monster.image;
    changeBackgroundColor(panel.image, this_color);

    panel.image.style.backgroundColor = this_color;

    const makeInfoB = (content) => {
        const info_b = document.createElement('infob');
        info_b.innerText = content;
        info_b.classList.add("panel-infob");
        return info_b;
    }
    panel.rarity.innerHTML = "";
    const rarityInfoB = makeInfoB("rarity");
    changeBackgroundColor(rarityInfoB, this_color);

    panel.rarity.appendChild(rarityInfoB);
    panel.rarity.innerHTML += " " + monster.rarity;

    
    for (let i = 0; i < panel.infos.length; i++) {
        panel.infos[i].innerHTML = "";
        const newinfob = makeInfoB("info");
        changeBackgroundColor(newinfob, this_color);
        panel.infos[i].appendChild(newinfob);
        panel.infos[i].innerHTML += ' ' + monster.infos[i];
    }


    panel.description.innerHTML = "";
    const descInfoB = makeInfoB("Description");
    panel.description.appendChild(descInfoB);


    changeBackgroundColor(descInfoB, this_color);
    panel.description.innerHTML += " " + monster.description;

    if (swipe) {
        await fadeInContent(panel_container)
    }
}


const fadeInContent = async (elem) => {
    elem.classList.add("notransition");
    elem.style.opacity = 0;
    elem.style.marginTop = '-' + (500).toString() + "px";

    /* Waiting slightly because else it does not work? */
    const sleep = (seconds) => new Promise((resolve) => setTimeout(resolve, 1000 * seconds));
    await sleep(0.4);

    elem.classList.remove("notransition");
    elem.style.marginTop = "0px";
    elem.style.opacity = 1;
}

const fadeOutContent = async (elem) => {
    elem.style.opacity = 1;
    elem.style.marginTop = (500).toString() + "px";

    /* Waiting slightly because else it does not work? */
    const sleep = (seconds) => new Promise((resolve) => setTimeout(resolve, 1000 * seconds));
    await sleep(0.3);

    elem.style.marginTop = "0px";
    elem.style.opacity = 0;
}

const filter_input = document.getElementById("filtre");

const clearButtons = () => {
    button_list = [];
    buttons_container.innerHTML = '';
}

const beast_alpha = () => {
    return beast_info.sort((a, b) => (a.name[0] > b.name[0] ? 1 : -1));
}

const beast_rarity = () => {
    return beast_info.sort((a, b) => (parseInt(a.rarity) <= parseInt(b.rarity) ? 1 : -1));
}

const beast_rank = () => {
    return beast_info.sort((a, b) => (parseInt(a.rang) > parseInt(b.rang) ? 1 : -1));
}

const max_rank = (beasts) => {
    let max = -1;
    beasts.forEach(b => {
        if (b.rang > max) {
            max = b.rang;
        }
    })
    return max;
}

const rank_to_string = (rank) => {
    return beast_ranks[rank];
}

const makeButtonsRank = async (new_beast, buttons_container) => {
    let beast_ranked = [];
    let amnt = max_rank(new_beast);

    for (let x = 0; x < amnt + 1; x++) {
        beast_ranked.push([]);
    }

    for (let i = 0; i < new_beast.length; i++) {
        beast_ranked[parseInt(new_beast[i].rang)].push(new_beast[i]);
    }

    console.log(beast_ranked);

    for (let j = 0; j < beast_ranked.length; j++) {
        const separator = document.createElement('div');
        separator.innerText = rank_to_string(j);
        separator.classList.add("button_separator");
        separator.classList.add("dangerosite_bestiaire");
        buttons_container.appendChild(separator);
        makeButtons(beast_ranked[j]);
    }
}

filter_input.onchange = () => {
    order = parseInt(filter_input.value);
    new_beast = [];
    switch (order) {
        case (1):
            clearButtons();
            new_beast = beast_alpha();
            makeButtons(new_beast, buttons_container);
            break;

        case (2):
            clearButtons();
            new_beast = beast_rarity();
            makeButtons(new_beast, buttons_container);
            break;

        case (3):
            clearButtons();
            new_beast = beast_rank();
            makeButtonsRank(new_beast, buttons_container);
            break;
    }
}

makeButtons(beast_info, buttons_container);
updatePanel(beast_info[0], panel_elements, false);