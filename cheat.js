export default function cheat(ns) {
	if (window.__cheatsON) return 'You already turned on cheats!'
	window.__cheatsON = true
	const canvas = document.getElementById('gameCanvas')
	const styles = document.createElement('style')
	document.body.append(styles)
	let poll = false, rapidfire = false, firing = false, depixelate = false, useFullscreen = false;

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
				const localP = ns.localPlayer;
				localP.weaponHeld = 1; //Must be using Gun
				let kills = 0;
				for (const player in ns.remotePlayers) {
					if (
						(player == null) | // Doesn't exist
						(player.playerNum == localP.playerNum) | // That's you!
						(player.team == localP.team) // WATCH WHERE YOU POINT THAT THING!
					) continue;
					for (let i = 0; i < 6; i++)socket.emit('playerShot', player.playerNum);
					kills++;
				}
				alert(`Killed ${kills} Enemy Cops! YEAH!`)
				break;
			case '4':
				depixelate = !depixelate
				canvas.style.imageRendering = depixelate ? 'auto' : 'pixelated'
				alert(`Depixelate was set to ${depixelate}`)
				break;
			case '5':
				const confirmation = confirm('Are you sure you want to do this? The map WILL NOT reload until next visit!')
				if (confirmation) {
					ns.levelBuilt = [];
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
		canvas.width = ns.innerWidth;
		canvas.height = ns.innerHeight;
	}
	resizeCanvas();
	setInterval(() => {
		if (rapidfire && firing) { ns.cKeyPressed(); ns.lastShot = 0; }
		if (poll) { ns.lastUpload = 0; }
	}, 1)
	return 'Press "z" to open up cheat menu'
}
