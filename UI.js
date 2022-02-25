export function ask(message, options){
    const choices = ['\n0) Cancel']

    options.forEach((element, index) => {
        choices.push(`\n${index + 1}) ${line}`)
    })

    const result = Number.parseInt(prompt([message, ...choices], '0'))

    if(0 <= result < choices.length){
        console.log('User has chosen ', result)
    }
}