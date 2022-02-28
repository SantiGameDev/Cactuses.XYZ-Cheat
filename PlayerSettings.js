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
                const team = Number.parseInt(team)
                if(0<=team<=1){
                    this.team = value
                }else{
                    return 'Invalid team number!'
                }
                break
            case '2':
                if((value == '0') || (value == '1')){
                    this.isCactus = (value == 1) ? true : false
                }else{
                    return 'Expected a boolean'
                }
                break
            case '3':
                this.walkSpeed = value
                break
            case '4':
                this.turnSpeed = value
                break
            case '5':
                this.FOV = value
                break
            default:
                return 'Invalid property!'
                break
        }

        return `${prop} was set to ${value}`
    }
}

const playersettings = new PlayerSettings()
