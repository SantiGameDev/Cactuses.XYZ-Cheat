import PlayerSettings from './PlayerSettings.js'

const context = canvas.getContext('2d')
const styles = document.createElement('style')
document.head.appendChild(styles)
const normalTransform = context.getTransform()
let poll = false, rapidfire = false, firing = false, depixelate = false, useFullscreen = false;

function resizeCanvas() {
	if (!useFullscreen) return;
	canvas.width = innerWidth;
	canvas.height = innerHeight;
	if(!context)return
	context.setTransform(normalTransform)
	context.scale(innerWidth / screen.width, innerHeight / screen.height)
}

export default function cheat() {
	
	if (window.__cheatsON){
		alert('You already turned on cheats!')
		return 'You already turned on cheats!'
	}
	window.__cheatsON = true
	
	/*
	const scopeLeaker = '<script>window.__NAMESPACE = window;</script>'
	document.body.append(styles, scopeLeaker)

	const scope = new Promise((resolve) => {
		function check() {
			if (__NAMESPACE) {
				resolve(__NAMESPACE)
				return;
			}
			setTimeout(check, 100)
		}
	})
	*/

	addEventListener('keyup', (event) => { if (event.key.toLowerCase() == 'c') firing = false })
	addEventListener('keydown', (event) => { if (event.key.toLowerCase() == 'c') firing = true })

	addEventListener('keyup', (event) => {
		if (event.key.toLowerCase() != 'z') return;
		const message = [
			'Select which cheat to select:',
			'0) Cancel',
			`1) Fast Polling: ${poll}`,
			`2) Rapid Fire: ${rapidfire}`,
			`3) Kill All Players`,
			`4) Depixelate: ${depixelate}`,
			'5) Clear Map Data (DANGEROUS!) (removes 99% of walls)',
			`6) True Fullscreen: ${useFullscreen} (uses pro HTML settings)`,
			`7) Player Settings`
		].join('\n');

		const setting = prompt(message, '0')

		switch (setting) {
			case '0': return
			case '1':
				poll = !poll;
				alert(`Fast Polling was set to ${poll ? 'ON' : 'OFF'}`)
				break;
			case '2':
				rapidfire = !rapidfire;
				alert(`Rapid Fire was set to ${rapidfire ? 'ON' : 'OFF'}`)
				break;
			case '3':
				const localP = localPlayer;
				let kills = 0;
				alert(`${remotePlayers.length} Players Detected!`)
				for (const player of remotePlayers) {
					const exists = (player != null)
					if (exists) break;
					const notMe = (player.playerNum != localP.playerNum)
					const oppositeTeam = (player.team != localP.team)
					if (exists & notMe & oppositeTeam) {
						for (let i = 0; i < 6; i++)socket.emit('playerShot', player.playerNum);
						kills++;
					}
				}
				alert(`Killed ${kills} Enemy Cops!`)
				break;
			case '4':
				depixelate = !depixelate
				canvas.style.imageRendering = depixelate ? 'auto' : 'pixelated'
				alert(`Depixelate was set to ${depixelate}`)
				break;
			case '5':
				const confirmation = confirm('Are you sure you want to do this? The map WILL NOT reload until next visit!')
				if (confirmation) {
					levelBuilt = [];
					alert('Wow! I really thought you didn\'t have the guts to do that!')
				} else {
					alert('BALLIN\n\n\nBUT AT WHAT COST')
				}
				break;
			case '6':
				useFullscreen = !useFullscreen
				styles.innerHTML = (!useFullscreen) ? '' : 'html, body, #gameCanvas {overflow: hidden;margin: 0 !important;padding: 0 !important;width:100%;height:100%;display:block;background-color: #000045;position: fixed;left:0;top:0;}'
				canvas.style = (useFullscreen ? '' : 'height: 480px; width: 640px; margin-left: auto;margin-right: auto;display: block;') + `image-rendering: ${depixelate ? 'auto' : 'pixelated'};`
				resizeCanvas();
				alert(`True Fullscreen was set to ${useFullscreen ? 'ON' : 'OFF'}`)
				break;
			case '7':
				const prop = prompt(['Player Settings:', ...PlayerSettings.printProperties()].join('\n'), '0')
				if((prop == '0') || (prop == null))return;
				const value = prompt(`Input new value for ${PlayerSettings.numberToPropName(prop)}`)
				alert(PlayerSettings.setProperty(prop, value))
				break;
			default:
				alert(`Are you stupid? '${setting}' is not on the list!`)
		}
	});
	canvas.addEventListener('resize', resizeCanvas)
	resizeCanvas();
	setInterval(() => {
		if (rapidfire && firing) { cKeyPressed(); lastShot = 0; }
		if (poll) { lastUpload = 0; }
	}, 1)
	alert('Press "z" to open up cheat menu')
	return 'Press "z" to open up cheat menu'
}
