class JeuDuPendu {
  #afficherMot;
  #erreurs;
  #clavier;
  #imagePendu;
  #modalJeu;
  #btnRejouer;
  #motActuel;
  #lettresCorrect;
  #nbErreurs;
  #erreursMax;
  constructor() {
    this.#afficherMot = document.querySelector(".afficher-mot");
    this.#erreurs = document.querySelector(".erreurs b");
    this.#clavier = document.querySelector(".clavier");
    this.#imagePendu = document.querySelector(".boite-pendu img");
    this.#modalJeu = document.querySelector(".modal-jeu");
    this.#btnRejouer = this.#modalJeu.querySelector(".rejouer");

    this.#motActuel = "";
    this.#lettresCorrect = [];
    this.#nbErreurs = 0;
    this.#erreursMax = 6;

    this.initialiserBoutons();
    this.rejouer();
    this.motAleatoire();

    this.#btnRejouer.addEventListener("click", () => this.motAleatoire());
  }

  get afficherMot() {
    return this.#afficherMot;
  }

  get erreurs() {
    return this.#erreurs;
  }

  get clavier() {
    return this.#clavier;
  }

  get imagePendu() {
    return this.#imagePendu;
  }

  get modalJeu() {
    return this.#modalJeu;
  }

  get btnRejouer() {
    return this.#btnRejouer;
  }

  get motActuel() {
    return this.#motActuel;
  }

  set motActuel(value) {
    this.#motActuel = value;
  }

  get lettresCorrect() {
    return this.#lettresCorrect;
  }

  set lettresCorrect(value) {
    this.#lettresCorrect = value;
  }

  get nbErreurs() {
    return this.#nbErreurs;
  }

  set nbErreurs(value) {
    this.#nbErreurs = value;
  }

  get erreursMax() {
    return this.#erreursMax;
  }
  set erreursMax(erreursMax) {
    this.#erreursMax = erreursMax;
  }

  initialiserBoutons() {
    for (let i = 97; i <= 122; i++) {
      const button = document.createElement("button");
      button.innerText = String.fromCharCode(i);
      this.clavier.appendChild(button);
      button.addEventListener("click", (e) =>
        this.debutJeu(e.target, String.fromCharCode(i))
      );
    }
  }

  rejouer() {
    this.lettresCorrect = [];
    this.nbErreurs = 0;
    this.imagePendu.src = "images/pendu-0.png";
    this.erreurs.innerText = `${this.nbErreurs} / ${this.erreursMax}`;
    this.afficherMot.innerHTML = this.motActuel
      .split("")
      .map(() => `<li class="lettre"></li>`)
      .join("");
    this.clavier
      .querySelectorAll("button")
      .forEach((btn) => (btn.disabled = false));
    this.modalJeu.classList.remove("afficher");
  }

  motAleatoire() {
    const { mot, indice } =
      listeMots[Math.floor(Math.random() * listeMots.length)];
    this.motActuel = mot;
    document.querySelector(".indice b").innerText = indice;
    this.rejouer();
  }

  gameOver(victoire) {
    const texteModal = victoire
      ? `Tu as trouvé le mot secret:`
      : "Le mot était:";
    document.querySelector(".win").src = `./images/${
      victoire ? "victoire" : "perte"
    }.gif`;
    this.modalJeu.querySelector("h4").innerText = victoire
      ? "Bravo !"
      : "Game Over!";
    this.modalJeu.querySelector(
      "p"
    ).innerHTML = `${texteModal} <b>${this.motActuel}</b>`;
    this.modalJeu.classList.add("afficher");
  }

  debutJeu(button, lettreChoisie) {
    if (this.motActuel.includes(lettreChoisie)) {
      [...this.motActuel].forEach((lettre, index) => {
        if (lettre === lettreChoisie) {
          this.lettresCorrect.push(lettre);
          this.afficherMot.querySelectorAll("li")[index].innerText = lettre;
          this.afficherMot
            .querySelectorAll("li")
            [index].classList.add("devine");
        }
      });
    } else {
      this.nbErreurs++;
      this.imagePendu.src = `images/pendu-${this.nbErreurs}.png`;
      if (this.nbErreurs === this.erreursMax) return this.gameOver(false);
    }
    button.disabled = true;
    this.erreurs.innerText = `${this.nbErreurs} / ${this.erreursMax}`;
    if (
      this.lettresCorrect.length === this.motActuel.length &&
      this.nbErreurs < this.erreursMax
    )
      return this.gameOver(true);
  }
}

const jeu = new JeuDuPendu();


