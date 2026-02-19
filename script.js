const githubBtn = document.getElementById('github');
const githubLink = "https://github.com/Lolo280374/fuckCustoms";
const flavortownBtn = document.getElementById('flavortown');
const flavortownLink = "https://flavortown.hackclub.com/projects/13644";
const destinationCountryEl = document.getElementById('dest-co');
let countryRates = {};
let exchangeRates = {};
let countries = [];
let destChoice;

const valueInput = document.getElementById('value-ship');
const estValueDisplay = document.getElementById('estValue');
const currencyDisplay = document.querySelector('.estCurrency');
const superscriptThree = document.querySelector('.estCurrency #dutyDisclaimer');
const bottomDutyDisclaimer = document.querySelector('.priceDisclaimers #dutyDisclaimer');
const noDataDisclaimer = document.getElementById('noDataDisclaimer');
const estimateBtn = document.getElementById('estimateBtn');
const calcBreakdown = document.getElementById('calcBreakdown');

valueInput.addEventListener('input', calculateEstimate);
lucide.createIcons();

if (githubBtn){
    githubBtn.addEventListener('click', (e) => {
        githubBtn.blur();
        window.open(githubLink, '_blank', "noopener");
    });
}

if (flavortownBtn){
    flavortownBtn.addEventListener('click', (e) => {
        flavortownBtn.blur();
        window.open(flavortownLink, "_blank", "noopener");
    });
}

estimateBtn.addEventListener('click', () => {
    if (estValueDisplay.innerText !== "N/A"){
        calcBreakdown.style.display = calcBreakdown.style.display === 'block' ? 'none' : 'block';
    }
});

Promise.all([
    fetch('countries.json').then(res => res.json()),
    fetch('countryRates.json').then(res => res.json()),
    fetch('https://open.er-api.com/v6/latest/USD').then(res => res.json())
])
.then(([fetchedCountries, fetchedRates, fetchedExchange]) => {
    countries = fetchedCountries;
    countryRates = fetchedRates;
    exchangeRates = fetchedExchange.rates;

    destChoice = new Choices(destinationCountryEl, {
        choices: countries,
        searchEnabled: true,
        itemSelectText: '',
        shouldSort: false
    });
    
    destChoice.passedElement.element.addEventListener('change', calculateEstimate);
    calculateEstimate();
})

function calculateEstimate(){
    const value = parseFloat(valueInput.value) || 0;
    const destCode = destChoice.getValue(true);
    const rules = countryRates[destCode];

    if (!rules){
        estValueDisplay.innerText = "N/A";
        currencyDisplay.firstChild.textContent = "???";
        if (superscriptThree) superscriptThree.style.display = '';
        if (bottomDutyDisclaimer) bottomDutyDisclaimer.style.display = 'none';
        if (noDataDisclaimer) noDataDisclaimer.style.display = '';
        if (calcBreakdown) calcBreakdown.style.display = 'none';
        return;
    }

    if (noDataDisclaimer) noDataDisclaimer.style.display = 'none';
    let calculatedVAT = 0;
    let calculatedDutyFees = 0;
    let appliedHandlingFees = 0;

    if (value > rules.vatThreshold){
        calculatedVAT = value * rules.vatRate;
        appliedHandlingFees = rules.handlingFee;
    }

    if (value > rules.dutyThreshold && rules.avgDutyRate > 0){
        calculatedDutyFees = value * rules.avgDutyRate;
        if (superscriptThree) superscriptThree.style.display = '';
        if (bottomDutyDisclaimer) bottomDutyDisclaimer.style.display = '';
    } else {
        if (superscriptThree) superscriptThree.style.display = 'none';
        if (bottomDutyDisclaimer) bottomDutyDisclaimer.style.display = 'none';
    }

    const totalUSD = calculatedVAT + calculatedDutyFees + appliedHandlingFees;
    const conversionRate = exchangeRates[rules.currency] || 1;
    const totalConverted = totalUSD * conversionRate;

    const convertedVAT = (calculatedVAT * conversionRate).toFixed(2);
    const convertedDuties = (calculatedDutyFees * conversionRate).toFixed(2);
    const convertedHandling = (appliedHandlingFees * conversionRate).toFixed(2);

    if (totalConverted === 0 && value > 0){
        estValueDisplay.innerText = "0.00";
        currencyDisplay.firstChild.textContent = rules.currency + " (no tax!) ";
    } else{
        estValueDisplay.innerText = totalConverted.toFixed(2);
        currencyDisplay.firstChild.textContent = rules.currency;
    }

    if (calcBreakdown){
        calcBreakdown.innerText = `(includes ${convertedVAT} VAT + ${convertedDuties} duty fees + ${convertedHandling} handling)`;
    }
};