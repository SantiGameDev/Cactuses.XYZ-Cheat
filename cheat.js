(function(ns){
	const CSSViewModes = ["auto", "crisp-edges", "pixelated", "smooth", "high-quality"];
	let poll=false, rapidfire=false, cssviewmode=0;
	addEventListener('keyup',(event) => {
		if(event.key=='z'){
			poll=!poll;
			console.log(`Fast Polling is ${poll?'ON':'OFF'}`)
		}else if(event.key=='x'){
			rapidfire=!rapidfire;
			console.log(`Rapid Fire is ${rapidfire?'ON':'OFF'}`)
		}else if(event.key=='c'){
			cssviewmode=(cssviewmode>3)?0:(cssviewmode+1)
			ns.canvas.style.imageRendering = CSSViewModes[cssviewmode]
			console.log(`Graphics Mode is ${CSSViewModes[cssviewmode]}`)
		}else if(event.key=='v'){
			ns.levelBuilt=[];
			console.log('Level Cleared!')
		}
	});
	setInterval(()=>{
		if(rapidfire){ns.cKeyPressed();ns.lastShot=0;}
		if(poll){ns.lastUpload=0;}
	},1)
	return 'Cheats:\n\nx-FasterPolling\nx-Rapid Fire\nCycle View Modes\nClear Map (only works once)'
})()
