var block =  document.getElementById('fas-block')
var eightCharacters = document.getElementById('eight-characters')
var specialCharacters = document.getElementById('special-character')
var zeroToNine = document.getElementById('zero-to-nine')
var lowercaseUppercase = document.getElementById('lowercase-uppercase')
let eye = document.getElementById('eye')
let loginEye = document.getElementById('login-eye')
var progressbar = document.getElementById('bar')

let numberCharacter = document.getElementById('password-strength-number')
let specialCharacter = document.getElementById('password-strength-special-character')
let lowerUpperCharacter = document.getElementById('password-strength-lower-upper')
let eighthCharacter = document.getElementById('password-strength-eight-character')


eye.addEventListener('click',showHidePassword)
loginEye.addEventListener('click',logInShowHidePassword)

var password = document.getElementById('password')
var logInPassword = document.getElementById('log-in-password')
password.addEventListener('keydown',CharacterCount)
password.addEventListener('input',passwordStrength)

var isClicked = false
/**
 * 
 */
function showHidePassword() {
    
    //toggle
    if(isClicked === false){
        isClicked = true
    }else{
        isClicked = !isClicked
    }
    console.log('isClicked ?',isClicked)

    if(isClicked){
        password.setAttribute('type','text')
        password.innerHTML = password.value
        eye.style.textDecoration = 'line-through'
    }else{
        password.setAttribute('type','password')
        eye.style.textDecoration = 'none'
    }

}
function logInShowHidePassword() {
    
    //toggle
    if(isClicked === false){
        isClicked = true
    }else{
        isClicked = !isClicked
    }
    console.log('isClicked ?',isClicked)

    if(isClicked){
        logInPassword.setAttribute('type','text')
        logInPassword.innerHTML = logInPassword.value

        loginEye.style.textDecoration = 'line-through'
    }else{
        logInPassword.setAttribute('type','password')
        loginEye.style.textDecoration = 'none'
    }

}
var count = 0
var perc = 0;
//Global count
/**
 * 
 * @param {*} e 
 */
function CharacterCount(e) {

    var keyCode = e.keyCode
    // console.log(keyCode)
    //eight characters
    if(keyCode !== 8 && keyCode !== 13 && keyCode !==32 && keyCode !==16 &&keyCode !==25 && keyCode !==9 && keyCode !==17 && keyCode !==18 && keyCode !==19 && keyCode !==37 && keyCode !==39 && keyCode !==46 && keyCode !==20){
        count++
        if(count > 7 && count < 9){
            if(count > 7 && count === 8){
                eightCharacters.style.display = 'block'
                eighthCharacter.style.color = 'white'
                perc += 25
            }
            progressbar.style.width = perc +'%'
            
        }
    }

    if(keyCode === 8){
        if(count > 0){
            count--
        }
        if(count === 7){
            if(perc > 0){
                perc -= 25
            }
            console.log('perc',perc)
            progressbar.style.width = perc +'%'
        }
        if(count < 8){
            eightCharacters.style.display = 'none' 
            eighthCharacter.style.color = 'grey'
  
        } 
    
    }
    console.log('count',count)
    console.log('keycode',keyCode)
}

var isLowercase 
var isUppercase = false
var numberWasIncluded = false
var specialCharacterWasIncluded = false
var lowerAndUpperFound = false
/**
 * 
 * @param {*} e 
 */
function passwordStrength(e) {
        //special character
        var password = document.getElementById('password')
        let ish = e.target.value
        const specialcharacter = /[^A-Za-z0-9]/;

        if (specialcharacter.test(ish)) {

            if(specialCharacterWasIncluded === false){
                perc += 25
            }
            specialCharacterWasIncluded = true
            progressbar.style.width = perc +'%'

            specialCharacters.style.display = 'block'
            specialCharacter.style.color = 'white'

        }else{
            
            if(specialcharacter.test(ish) === false && specialCharacterWasIncluded === true){
                if(perc > 0){
                    perc = perc - 25
                    specialCharacterWasIncluded = false
                }
            }
      
            progressbar.style.width = perc +'%'
            specialCharacters.style.display = 'none'
            specialCharacter.style.color = 'grey'
        }

        //number character
        var number = (/(\d+)/)
        if(number.test(password.value)){
            zeroToNine.style.display = 'block'
            if(numberWasIncluded === false){
                perc += 25
                numberWasIncluded = true
                numberCharacter.style.color = 'white'
            }
            progressbar.style.width = perc +'%'
            
            
        }else{
            
            zeroToNine.style.display = 'none'
            if (numberWasIncluded) { 
                numberWasIncluded = false
                if(perc > 0 && numberWasIncluded === false){
                    perc = perc - 25
                    numberCharacter.style.color = 'grey'
                }
            }            
            progressbar.style.width = perc +'%'
        }

        //lowercase and uppercase characters
        var truthy = []
        var arr = password.value.split('')
        console.log('arr',arr)
        for (const i in arr) {
            let letter = arr[i]
            if (letter === letter.toUpperCase() && number.test(letter) === false && specialcharacter.test(letter) === false) {
                
                isUppercase = true
                isLowercase = false  
                truthy.push(isUppercase)
            }
            if (letter === letter.toLowerCase() && number.test(letter) === false && specialcharacter.test(letter) === false) {
                isUppercase = false
                isLowercase = true  
                truthy.push(isUppercase)
            }
            
        }

        console.log('truthy',truthy)
        if(truthy.includes(false) && truthy.includes(true)){
            
            console.log('Hooray!')
            if(lowerAndUpperFound === false){
                lowercaseUppercase.style.display = 'block'
                lowerUpperCharacter.style.color = 'white'
                perc += 25
            }
            lowerAndUpperFound = true
            progressbar.style.width = perc +'%'


        }else if(truthy.includes(false) || truthy.includes(true)){
            lowercaseUppercase.style.display = 'none'
            lowerUpperCharacter.style.color = 'grey'
            if(lowerAndUpperFound === true){
                perc -= 25
                lowerAndUpperFound = false
            }
            progressbar.style.width = perc +'%'
        }

}