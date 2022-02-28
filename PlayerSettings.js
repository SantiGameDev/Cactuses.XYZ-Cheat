export default class PlayerSettings{
    static set team(value){localPlayer.team = value}
    static get team(){return localPlayer.team}
    static set isCactus(value){FOV = value}
    static get isCactus(){return localPlayer.isACactus}
    static set walkSpeed(value){playerSpeed = value}
    static get walkSpeed(){return playerSpeed}
    static set turnSpeed(value){rotationSpeed = value}
    static get turnSpeed(){return rotationSpeed}
    static set FOV(value){FOV = value}
    static get FOV(){return FOV}

    static printProperties(){return [
        `1) team: ${this.team}`,
        `2) isCactus: ${this.isCactus}`,
        `3) walkSpeed: ${this.walkSpeed}`,
        `4) turnSpeed: ${this.turnSpeed}`,
        `5) FOV: ${this.FOV}`
    ]}

    static numberToPropName(prop){
        switch(prop){
            case '1':
                return 'team'
            case '2':
                return 'isCactus'
            case '3':
                return 'walkSpeed'
            case '4':
                return 'turnSpeed'
            case '5':
                return 'FOV'
        }
    }

    static setProperty(prop, value){
        switch(prop){
            case '1':
                const team = value.toLowerCase()
                if(team == 'red'){
                    this.team = 1
                }else if(team == 'blue'){
                    this.team = 0
                }else{
                    return `${team} is not a valid team!`
                }
                break
            case '2':
                const isCactus = value.toLowerCase()
                if(isCactus == 'true' || isCactus == 't'){
                    this.isCactus = true
                }else if(isCactus == 'false' || isCactus == 'f'){
                    this.isCactus = false
                }else{
                    return `${isCactus} is not a boolean or bool abbreviation`
                }
                break
            case '3':
                if(isNaN(value))return `${value} is nt a number!`
                this.walkSpeed = Number.parseFloat(value)
                break
            case '4':
                if(isNaN(value))return `${value} is nt a number!`
                this.turnSpeed = Number.parseFloat(value)
                break
            case '5':
                if(isNaN(value))return `${value} is nt a number!`
                this.FOV = Number.parseFloat(value)
                break
            default:
                return 'Invalid property!'
        }

        return `${this.numberToPropName(this.prop)} was set to ${value}`
    }
}

const playersettings = new PlayerSettings()
