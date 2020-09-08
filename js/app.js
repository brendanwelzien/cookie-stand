'use strict';


// business property object
// ! Received help from Melissa Stock on commands 
// the new command allows to create an object from a constructor function that uses this...
// retrieved from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/new

function shops(location, min, max, averagecookie) {
    this.location = location;
    this.minimumcustomers= min;
    this.maximumcustomers=max;
    this.averagecookiepurchase=averagecookie;
    this.customers =[];
    this.saleshr=[];
    this.dailytotalsales= 0;
}

// business logistics
// use new command
var hours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm','7pm', '8pm'];

// retrieved this function from https://dev.to/shimphillip/working-with-random-numbers-in-javascript-1c0k
function getRandomIntInclusive(min,max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min +1)) + min;
}
// cookies each hour = avg cookie purchase * random customer generator
// to save time, you can use the prototype command to apply this generator across all keys and their values!!
// https://www.tutorialsteacher.com/javascript/prototype-in-javascript#:~:text=The%20prototype%20is%20an%20object,aka%20attribute)%20is%20not%20visible.

// average sale per hour function
shops.prototype.averagesales = function(index){
    var cookiespurchasedhr = Math.floor(this.customers[index] * this.averagecookiepurchase);
    console.log(cookiespurchasedhr);
    return cookiespurchasedhr;
};
// Random customer function
shops.prototype.customeramount = function()
{ var randomcustomers = getRandomIntInclusive(this.minimumcustomers, this.maximumcustomers);
    console.log(randomcustomers);
    return randomcustomers;
};


// total cookies per hour
shops.prototype.cookiesalestotal = function(){
    var finalcookieamount= 0;
    for( var c= 0; c < this.saleshr.length; c++){
        finalcookieamount = finalcookieamount + this.saleshr[c];
    }
    return finalcookieamount;
};

// wrap up sales
shops.prototype.sumofsales = function(){
    var sum = 0;
    for(var i = 0; i < hours.length; i++){
        this.customers.push(this.customeramount());
        this.saleshr.push(this.averagesales(i));
        sum = sum + this.saleshr[i];
    }
this.dailytotalsales = sum;
    return sum;
   // console.log(`${this.location}`);
   // console.log(`${hours[i]}: ${this.saleshr[i]} cookies purchased`);
 };
 var shopdata = [
    new shops('Seattle', 23, 65, 6.3),
    new shops('Tokyo', 3, 24, 1.2),
    new shops('Dubai', 11, 38, 3.7),
    new shops('Paris', 20, 38, 2.3),
    new shops('Lima', 2, 16, 4.6),
];
// make a variable for storage, this is hourly totals
var hourtotal;
function perhourtotal (){
hourtotal = [];
    for( var s = 0; s < hours.length; s++){
        var accounted = 0;
        
        for ( var c in shopdata){
            accounted = accounted + shopdata[c].cookiesalestotal;
        }
        hourtotal.push(accounted);
    }  
}

// this is total for the day between stores
 function renderAllStoreTotals() {
    var list = document.getElementById('cityData');
    for(var s = 0; s < shopdata.length; s++){
        shopdata[s].sumofsales();
        for( var hour = 0; hour < shopdata[s].saleshr.length; hour++){
            var listItemTwo = document.createElement('li');
            listItemTwo.textContent = `${hours[hour]}: ${shopdata[s].saleshr[hour]} cookies`;
            list.append(listItemTwo);
            console.log(listItemTwo);
        }
        console.log(shopdata[s].location);
        console.log(shopdata[s].saleshr);
        var listItem = document.createElement('li');
        listItem.textContent = `${shopdata[s].location} has ${shopdata[s].dailytotalsales} cookies`;
        list.appendChild(listItem);
        }
}
renderAllStoreTotals();
console.log(shopdata);