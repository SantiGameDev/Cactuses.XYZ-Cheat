export default function cheat(ns){
	if(window.__cheatsON)return 'You already turned on cheats!'
	window.__cheatsON = true
	const canvas = document.getElementById('gameCanvas')
	const CSSViewModes = ["auto", "crisp-edges", "pixelated", "smooth", "high-quality"];
	let poll = false, rapidfire = false, firing = false, cssviewmode = 2;
	
	addEventListener('keyup',(event) => {if(event.key.toLowerCase() == 'c')firing = false})
	addEventListener('keydown',(event) => {if(event.key.toLowerCase() == 'c')firing = true})
	
	addEventListener('keyup',(event) => {
		if(event.key.toLowerCase() != 'z')return;
		const message = [
			'Select which cheat to select:',
			'0) Cancel',
			`1) Fast Polling: ${poll}`,
			`2) Rapid Fire: ${rapidfire}`,
			`3) Graphics Mode: ${CSSViewModes[cssviewmode]}`,
			'4) Clear Map Data (DANGEROUS!) (removes 99% of walls)'
		].join('\n');
	
		switch(prompt(message, '0')){
			case '0': return
			case '1':
				poll=!poll;
				alert(`Fast Polling was set to ${poll?'ON':'OFF'}`)
				break;
			case '2':
				rapidfire=!rapidfire;
				alert(`Rapid Fire was set to ${rapidfire?'ON':'OFF'}`)
				break;
			case '3':
				const selection = prompt([
				'Select which mode to use:',
				'0) Cancel',
				'1) Auto (default for web pages)',
				'2) Crisp Edges',
				'3) Pixelated (default for Cactuses.xyz)',
				'4) Smooth (not supported on all browsers)',
				'5) High Quality (not supported on all browsers)'
				].join('\n'))
				if(0<selection<6){
				cssviewmode = selection - 1
				canvas.style.imageRendering = CSSViewModes[cssviewmode]
				alert(`Graphics Mode was set to &{CSSViewModes[cssviewmode]}`)
				}
				break;
			case '4':
				const confirmation = confirm('Are you sure you want to do this? The map WILL NOT reload until next visit!')
				if(confirmation){
					ns.levelBuilt=[];
					alert('Wow! I really thought you didn\'t have the guts to do that!')
				}else{
					alert('100 SELF RESTRAINT')
				}
				break;
			default:
				alert('Are you stupid? That\'s not even on the list!')
			}
	});
	setInterval(()=>{
		if(rapidfire && firing){ns.cKeyPressed();ns.lastShot=0;}
		if(poll){ns.lastUpload=0;}
	},1)
	return 'Press "z" to open up cheat menu'
}
