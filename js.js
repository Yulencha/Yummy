class CardComponent {
  constructor(obj) {
    this.html = document.createElement("div");
    this.html.className = "card";
    this.obj = obj;

    this.html.innerHTML = `
        <div class="card-background">
          <div class="card-white">
            <img src="./img/cat.svg" class="cat" alt="Кот" />
            <div class="card-preview">${obj.params.preview}</div>
            <div class="card-title">${obj.title}</div>
            <div class="card-taste">${obj.params.taste}</div>
            <div class="card-info">${obj.params.portion} порций</div>
            <div class="card-info">${obj.params.present}</div>
            <div class="card-info">${obj.params.info}</div>
            <div class="circle">
              <div class="weight">${obj.params.weight}</div>
              <div class="kg">кг</div>
            </div>
          </div>
        </div>
        <div class="card-offer">
          Чего сидишь? Порадуй котэ, <span class="card-buy">купи.</span>
        </div>
    `;

    this.updateCardBuyButton();

    let currentElem = null;

    this.html.children[0].onmouseover = (event) => {
      if (this.html.className.includes("state_selected")) {
        if (currentElem) return;
        let target = event.target.closest(".card-background");
        if (!target) return;
        if (!this.html.children[0].contains(target)) return;

        let relatedTarget = event.relatedTarget;
        if (
          this.html.children[0].contains(target) &&
          this.html.children[0].contains(relatedTarget)
        )
          return;
        currentElem = target;

        this.html.querySelector(".card-preview").textContent =
          "Котэ не одобряет?";
        this.html.querySelector(".card-preview").style.color = "#e62e7a";
      }
    };

    this.html.children[0].onmouseout = (event) => {
      if (!currentElem) return;
      let relatedTarget = event.relatedTarget;

      while (relatedTarget) {
        if (relatedTarget == currentElem) return;
        relatedTarget = relatedTarget.parentNode;
      }

      this.html.querySelector(".card-preview").textContent =
        "Сказочное заморское яство";
      this.html.querySelector(".card-preview").style.color = "#666666";

      currentElem = null;
    };

    this.html.children[0].onclick = () => {
      if (!this.isDisabled) {
        if (!this.html.className.includes("state_selected")) {
          this.html.classList.add("state_selected");
          this.html.querySelector(".card-offer").textContent =
            obj.params.description;
        } else {
          this.html.classList.remove("state_selected");
          this.html.querySelector(".card-preview").textContent =
            "Сказочное заморское яство";
          this.html.querySelector(".card-preview").style.color = "#666666";
          this.html.querySelector(".card-offer").innerHTML =
            'Чего сидишь? Порадуй котэ, <span class="card-buy">купи.</span>';
          this.updateCardBuyButton();
        }
      }
    };
  }

  setDisabled(isDisabled) {
    if (isDisabled === true) {
      this.html.classList.remove("state_selected", "state_hovered");
      this.html.classList.add("state_disabled");
      this.html.querySelector(".card-offer").innerHTML =
        "Печалька, с курой закончился.";
    } else if (isDisabled === false) {
      this.html.classList.remove("state_disabled");
      this.html.querySelector(".card-offer").innerHTML =
        'Чего сидишь? Порадуй котэ, <span class="card-buy">купи.</span>';
      this.updateCardBuyButton();
    }

    this.isDisabled = isDisabled;
  }

  updateCardBuyButton() {
    this.html.querySelector(".card-buy").onclick = () => {
      if (!this.isDisabled) {
        this.html.classList.add("state_selected");
        this.html.querySelector(".card-offer").textContent =
          this.obj.params.description;
      }
    };
  }
}

let arr = [
  {
    title: "Нямушка",
    type: "Корм для кошек",
    isAvailable: true,
    params: {
      preview: "Сказочное заморское яство",
      taste: "с фуа-гра",
      portion: "10",
      present: "мышь в подарок",
      info: "",
      weight: "0,5",
      description: "Печень утки разварная с артишоками.",
    },
  },
  {
    title: "Нямушка",
    type: "Корм для кошек",
    isAvailable: true,
    params: {
      preview: "Сказочное заморское яство",
      taste: "с рыбой",
      portion: "40",
      present: "2 мыши в подарок",
      info: "",
      weight: "2",
      description: "Головы щучьи с чесноком да свежайшая сёмгушка.",
    },
  },
  {
    title: "Нямушка",
    type: "Корм для кошек",
    isAvailable: false,
    params: {
      preview: "Сказочное заморское яство",
      taste: "с курой",
      portion: "100",
      present: "5 мышей в подарок",
      info: "заказчик доволен",
      weight: "5",
      description: "Филе из цыплят с трюфелями в бульоне.",
    },
  },
];

function checkCard() {}

const cards = document.querySelector(".cards");

function createCard(arr) {
  arr.forEach((element) => {
    let card = new CardComponent(element);
    card.setDisabled(!element.isAvailable);
    cards.appendChild(card.html);
  });
}

createCard(arr);
