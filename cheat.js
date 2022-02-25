export default function cheat() {
	if (window.__cheatsON) return 'You already turned on cheats!'
	window.__cheatsON = true
	const canvas = document.getElementById('gameCanvas')
	const styles = document.createElement('style')
	let poll = false, rapidfire = false, firing = false, depixelate = false, useFullscreen = false;
	alert(remotePlayers | 'nonexistent')
/*
	const scopeLeaker = document.createElement('script')
	scopeLeaker.innerHTML = ''
	document.body.appendChild (styles, scopeLeaker)
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
			`6) True Fullscreen: ${useFullscreen} (uses pro HTML settings)`
		].join('\n');

		switch (prompt(message, '0')) {
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
				let targets = []
				for (const player of remotePlayers) {
					const exists = (player != null)
					if (exists){
						const notMe = (player.playerNum != localP.playerNum)
						const oppositeTeam = (player.team != localP.team)
						if(notMe & oppositeTeam){
							targets.push(player.playerNum)
						}
					}
				}
				const confirmKill = confirm(`${targets.length} targets found. Eliminate them?`)
				if(confirmKill){
					targets.forEach(player => {
						for(let i=0;i<6;i++)socket.emit('playerShot', player)
					})
					alert(`Killed ${targets.length} Enemy Cops!`)
				}
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
				useFullscreen = !useFullscreen;
				styles.innerHTML = (!useFullscreen) ? '' : 'html, body, canvas {overflow: hidden;margin: 0 !important;padding: 0 !important;width:100%;height:100%;display:block;background-color: #000045;position: fixed;left:0;top:0;}'
				canvas.style = (useFullscreen) ? '' : 'height: 480px; width: 640px; image-rendering: pixelated; margin-left: auto;margin-right: auto;display: block;'
				alert(`True Fullscreen was set to ${useFullscreen ? 'ON' : 'OFF'}`)
				break;
			default:
				alert('Are you stupid? That\'s not even on the list!')
		}
	});
	canvas.onresize = resizeCanvas
	function resizeCanvas() {
		if (!useFullscreen) return;
		canvas.width = innerWidth;
		canvas.height = innerHeight;
	}
	resizeCanvas();
	setInterval(() => {
		if (rapidfire && firing) { lastShot = 0; cKeyPressed(); }
		if (poll) { lastUpload = 0; }
	}, 1)
	return 'Press "z" to open up cheat menu'
}
