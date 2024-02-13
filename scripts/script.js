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
    // Initialisation des propriétés avec des sélecteurs HTML
    this.#afficherMot = document.querySelector(".afficher-mot");
    this.#erreurs = document.querySelector(".erreurs b");
    this.#clavier = document.querySelector(".clavier");
    this.#imagePendu = document.querySelector(".boite-pendu img");
    this.#modalJeu = document.querySelector(".modal-jeu");
    this.#btnRejouer = this.#modalJeu.querySelector(".rejouer");
    // Initialisation des propriétés du jeu
    this.#motActuel = "";
    this.#lettresCorrect;
    this.#nbErreurs = 0;
    this.#erreursMax = 6;
    // Initialisation des boutons du clavier et du jeu
    this.initialiserBoutons();
    this.rejouer();
    this.motAleatoire();

    this.#btnRejouer.addEventListener("click", () => this.motAleatoire());
  }
  // Méthodes getters et setters
  get afficherMot() {
    return this.#afficherMot;
  }
  set afficherMot(afficherMot){
    this.#afficherMot = afficherMot;
  }

  get erreurs() {
    return this.#erreurs;
  }
  set erreurs(erreurs){
    this.#afficherMot = erreurs;
  }

  get clavier() {
    return this.#clavier;
  }
  set clavier(clavier){
    this.#clavier = clavier;
  }

  get imagePendu() {
    return this.#imagePendu;
  }
  set imagePendu(imagePendu){
    this.#imagePendu = imagePendu;
  }

  get modalJeu() {
    return this.#modalJeu;
  }
  set modalJeu(modalJeu){
    this.#modalJeu = modalJeu;
  }

  get btnRejouer() {
    return this.#btnRejouer;
  }
  set btnRejouer(btnRejouer){
    this.#btnRejouer = btnRejouer;
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

  // Initialisation des boutons du clavier
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

  // Réinitialisation du jeu pour une nouvelle partie
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

  // Sélection d'un mot aléatoire pour la nouvelle partie
  motAleatoire() {
    const { mot, indice } =
      listeMots[Math.floor(Math.random() * listeMots.length)];
    this.motActuel = mot;
    document.querySelector(".indice b").innerText = indice;
    this.rejouer();
  }

  // Affichage du modal de fin de jeu (victoire ou défaite)
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

  // Logique du jeu lorsqu'une lettre est choisie
  debutJeu(button, lettreChoisie) {
    if (this.motActuel.includes(lettreChoisie)) {
      // La lettre choisie est présente dans le mot
      [...this.motActuel].forEach((lettre, index) => {
        if (lettre === lettreChoisie) {
          // Mise à jour des lettres correctement devinées
          this.lettresCorrect.push(lettre);
          this.afficherMot.querySelectorAll("li")[index].innerText = lettre;
          this.afficherMot
            .querySelectorAll("li")
            [index].classList.add("devine");
        }
      });
    } else {
      // La lettre choisie n'est pas dans le mot
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

// Création d'une instance de la classe JeuDuPendu
const nouvellePartie = new JeuDuPendu();
