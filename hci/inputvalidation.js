const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const region = document.getElementById('region');
const dob = document.getElementById('dob');

form.addEventListener('submit', e => {
	e.preventDefault();
	checkInputs();
});

function checkInputs() {
	// trim to remove the whitespaces
	const usernameValue = username.value.trim();
	const emailValue = email.value.trim();
	const passwordValue = password.value.trim();
    const regionValue = region.value.trim();
    const dobValue = dob.value.trim();
	
	if(usernameValue === '') {
		setErrorFor(username, 'Username cannot be blank');
	} else {
		setSuccessFor(username);
	}
	
	if(emailValue === '') {
		setErrorFor(email, 'Email cannot be blank');
	} else if (!ValidateEmailAddress(emailValue)) {
		setErrorFor(email, 'Not a valid email');
	} else {
		setSuccessFor(email);
	}
	
	if(passwordValue === '') {
		setErrorFor(password, 'Password cannot be blank');
	} else {
		setSuccessFor(password);
	}

    if(passwordValue.length<=8 || passwordValue.length>=16) {
		setErrorFor(password, 'Password must be between 8-16 digit!');
	} else {
		setSuccessFor(password);
	}

	if(dobValue === '') {
		setErrorFor(dob, 'Day of birth cannot be blank');
	} else {
        var flag = ValidateDoB(dobValue);
        console.log(flag);
        if(flag === 1){
            setErrorFor(dob, 'Not a valid day of birth. DD/MM/YYYY');
        }else if(flag === 2){
            setErrorFor(dob, 'You must be 18 years old or order to register');
        }else{
            setSuccessFor(dob);
        }
    }

	if(regionValue.toLowerCase() !== 'na' && regionValue.toLowerCase() !== 'sea' && regionValue.toLowerCase() !== 'eu') {
		setErrorFor(region, 'Region must either be NA, EU or SEA');
	} else {
		setSuccessFor(region);
	}
}

function ValidateDoB(dobstr){
    
    console.log(dobstr[2]);
    if(dobstr.length>10) return 1;
    
    // console.log(isNaN(parseInt(dobstr[0])));
    if(isNaN(parseInt(dobstr[0]))) return 1;
    if(isNaN(parseInt(dobstr[1]))) return 1;
    if(dobstr[2]!=='/') return 1;
    if(isNaN(parseInt(dobstr[3]))) return 1;
    if(isNaN(parseInt(dobstr[4]))) return 1;
    if(dobstr[5]!=='/') return 1;
    if(isNaN(parseInt(dobstr[6]))) return 1;
    if(isNaN(parseInt(dobstr[7]))) return 1;
    if(isNaN(parseInt(dobstr[8]))) return 1;
    if(isNaN(parseInt(dobstr[9]))) return 1;
    
    // console.log(isValidDate(dobstr));
    var ss = isValidDate(dobstr);
    console.log("Test");
    console.log(ss);
    return ss;
}

//https://stackoverflow.com/questions/6177975/how-to-validate-date-with-format-mm-dd-yyyy-in-javascript/49178339
function isValidDate(dateString)
{
    console.log(dateString);
    var parts = dateString.split("/");
    var month = parseInt(parts[1], 10);
    var day = parseInt(parts[0], 10);
    var year = parseInt(parts[2], 10);
    
    console.log(day);
    console.log(month);
    console.log(year);
    
    if(year < 1000 || year > 3000 || month == 0 || month > 12)
    return 1;
    
    var monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];
    
    if(year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
    monthLength[1] = 29;
    console.log("rest");
    if(day > 0 && day <= monthLength[month - 1]){
        console.log("rest");
        var d = new Date();
        var n = d.getFullYear();
        console.log(n);
        if( n-18 < year){
            return 2;
        }else{
            return 0;
        }
    }else{
        return 1;
    }
};

//https://qawithexperts.com/article/javascript/email-validation-using-javascript-with-or-without-regex/317
function ValidateEmailAddress(emailString) {
    console.log(emailString);
    // check for @ sign
    var atSymbol = emailString.indexOf("@");
    if(atSymbol < 1) return false;
    
    var dot = emailString.indexOf(".");
    if(dot <= atSymbol + 2) return false;
    
    // check that the dot is not at the end
    if (dot === emailString.length - 1) return false;
    
    return true;
}

function setErrorFor(input, message) {
	const formControl = input.parentElement;
	const small = formControl.querySelector('small');
	formControl.className = 'form-control error';
	small.innerText = message;
}

function setSuccessFor(input) {
	const formControl = input.parentElement;
	formControl.className = 'form-control success';
}
	
function isEmail(email) {
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}