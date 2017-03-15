const remote = require('electron').remote
const main = remote.require('./main.js')
const {ipcRenderer} = require('electron')

window.onload = function() {
    var myButton = document.getElementById('buttonPIP')
    var myStreamer = document.getElementById('streamName')
    var link = 'http://player.twitch.tv/?volume=0.20&channel='

    myButton.addEventListener('click', () => {
        link = link + myStreamer.value
        ipcRenderer.sendSync('synchronous-message', link)
    }, false)
}
