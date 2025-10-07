const messages = document.getElementById("messages");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");

// Variable pour suivre l'état d'une conversation spéciale
let conversationState = null;

// Base de connaissances
const knowledgeBase = [
  {
    keywords: ["imprimante", "printer", "impression"],
    response: "Si vous ne voyez pas l’imprimante :<br>1️ Redémarrez votre session.<br>2️ Débranchez et rebranchez le câble jaune (réseau).<br>3️ Si cela ne fonctionne pas, appelez le support IT au 2100."
  },
  {
    keywords: ["wifi", "wifi public", "SSID public", "mot de passe wifi"],
    response: "Le code du Wi-Fi public est : <b>RfdX2133%m</b>"
  },
  {
    keywords: ["écran", "dupliqué", "double écran", "souris"],
    response: "Pour résoudre un écran dupliqué ou une souris discontinue :<br>1️⃣ Fermez votre session.<br>2️⃣ Faites <b>Windows + O</b> jusqu’à ce que la souris circule correctement."
  },
  {
    keywords: ["raccourcis", "raccourci"],
    response: "Pour ajouter un raccourci à votre bureau :<br>1️⃣ Allez dans l'icône 'banque de raccourcis' située sur votre bureau.<br>2️⃣ Copiez-collez le raccourci voulu sur votre bureau.<br>➡️ Si le raccourci n'est pas disponible, faites un bon SPOC."
  },
  {
    keywords: ["visio", "son", "caméra", "visioconférence"],
    response: "Pour résoudre votre problème, suivez la procédure suivante :<br><i>Lien vers la procédure</i>."
  },
  {
    keywords: ["internet", "connexion"],
    response: "Êtes-vous sur un PC portable ou fixe ?<br>" +
              "👉 Tapez <b>1</b> pour PC portable<br>" +
              "👉 Tapez <b>2</b> pour PC fixe"
  },
  {
    keywords: ["outlook"],
    response: "Quel est votre problème avec Outlook ?<br>" +
              "👉 Tapez <b>1</b> si Outlook ne démarre pas<br>" +
              "👉 Tapez <b>2</b> si vous avez une erreur de connexion<br>" +
              "👉 Tapez <b>3</b> si Outlook est ralenti"
  }
];

// Fonction pour ajouter un message à l'interface
function addMessage(text, sender) {
  const div = document.createElement("div");
  div.classList.add("msg", sender);
  div.innerHTML = text;
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
}

// Fonction pour générer la réponse du bot
function getBotResponse(input) {
  input = input.toLowerCase().trim();

  // Réponses spéciales : Outlook
  if (conversationState === "outlook") {
    conversationState = null;
    if (input === "1") {
      return "Solution : Fermez et redémarrez Outlook. Si cela ne fonctionne pas, redémarrez votre PC.";
    }
    if (input === "2") {
      return "Solution : Vérifiez votre mot de passe. Si le problème persiste, contactez le support IT (2100) pour une réinitialisation.";
    }
    if (input === "3") {
      return "Solution : Effacez les cookies en suivant la procédure dédiée.";
    }
  }

  // Réponses spéciales : Internet
  if (conversationState === "internet") {
    conversationState = null;
    if (input === "1") {
      return "Solution : Vérifiez votre connexion Wi-Fi et le mot de passe.";
    }
    if (input === "2") {
      return "Solution : Débranchez et rebranchez le câble réseau noir ou gris.";
    }
  }

  // Recherche dans la base de connaissances
  for (let item of knowledgeBase) {
    for (let keyword of item.keywords) {
      if (input.includes(keyword.toLowerCase())) {
        if (keyword === "outlook") conversationState = "outlook";
        if (keyword === "internet") conversationState = "internet";
        return item.response;
      }
    }
  }

  // Si aucun mot-clé ne correspond
  return "Désolé, je n'ai pas compris. Veuillez contacter le support IT au 2100.";
}

// Envoie le message de l'utilisateur et obtient la réponse du bot
function sendMessage() {
  const text = userInput.value.trim();
  if (text === "") return;
  addMessage(text, "user");

  const response = getBotResponse(text);
  setTimeout(() => {
    addMessage(response, "bot");
  }, 500);

  userInput.value = "";
}

// Gestion des événements : clic sur bouton ou touche Entrée
sendBtn.addEventListener("click", sendMessage);
userInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") sendMessage();
});
