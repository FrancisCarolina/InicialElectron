const { app, BrowserWindow, Notification } = require("electron");
const path = require("path");
var axios = require('axios');

/*const botao = document.getElementById("botao");

botao.addEventListener("click", ()=>{
  novaNotificacao();
})*/

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.loadFile("index.html");
}

function novaNotificacao(){
  if(!Notification.isSupported()){
    console.log("Notificações nao suportadas nesse ambiente");
  }
  const novaNotic = new Notification({
    title: "titulo da notificacao",
    subtitle: "subtitulo da notificação",
    body: "body da notificação", 
    silent: true, 
    timeoutType: "default"
  })
  console.log("Exibindo notificacao");
  novaNotic.show();
}

function notificacaoAxios(){
  if(!Notification.isSupported()){
    console.log("Notificações nao suportadas nesse ambiente");
  }
  
  let notificacoes;

  axios.get('http://localhost:3000/mostrarNotificacao')
  .then(response => {
    notificacoes =  response.data.notificacao[0];
    const novaNotic = new Notification({
      title: notificacoes.title,
      //subtitle: "",
      body: notificacoes.corpo, 
      silent: true, 
      timeoutType: "default"
    })
    console.log("Exibindo notificacao");
    novaNotic.show();
  })
  .catch(error => {
      // Em caso de erro, exibe uma mensagem de erro no console.
      console.error('Error fetching character data:', error);
  });
  
}

app.whenReady().then(() => {
  createWindow();
  notificacaoAxios()

  /*app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });*/
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
