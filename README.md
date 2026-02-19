<p align=center><br>
<a href="https://github.com/Lolo280374/fuckCustoms/"><img src="https://hackatime-badge.hackclub.com/U09CBF0DS4F/fuckCustoms"></a>
<a href="http://makeapullrequest.com"><img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg"></a>
<a href="https://devrant.com/rants/4149950/i-fucking-hate-mobile-development-i-already-manage-the-data-devops-infra-and-mos"><img src="https://img.shields.io/badge/not_optimized-for_mobile-red"></a>
<br></p>

<h3 align="center">
no one likes customs, and predicting their amount is even harder. With fuckCustoms, estimate how many customs will be due to pay, depending of your country and the item you’re getting!</a>
</h3>

<h1 align="center">
    showcases
</h1>

<img width="857" height="546" alt="zen_F5zQRmFAka" src="https://github.com/user-attachments/assets/e25cc5c3-17fc-436e-ba0b-093cb9be1024" />

<img width="1563" height="971" alt="zen_KiKeIRwuF1" src="https://github.com/user-attachments/assets/03d6ef99-9912-46a3-8b72-7f3af337e348" />

## table of contents

- [about](#about)
- [features](#features)
- [contributing](#contributing)
- [reporting issues](#reporting-issues)
- [APIs used](#apis-used)
- [license](#license)

## about
this project has been made in an attempt to get more clearer data and more insights about paying custom fees when you order stuff from HackClub or recieve mailpieces! i'm always wondering and kind of afraid at the idea of having to pay customs, especially because it changes so much due to national service fees, and the different rules. thanks to this tool tho, hopefully this nightmare might be way easier starting now!
<br>please note however that this project only gives an ESTIMATION, and should not be used as a reliable source, but only as a suggestion!!

## features
well this project is quite single-headed. yeah. it calculates custom fees! but it does have some extra stuff under the hood that still deserve recognition.
- customs database: i was required to build a global worldwide database of each country's regulations for customs, so if any open source dev wants it well here it is
- calculation breakdown: you can actually see what is charging you more, and if you're getting fucked by national courier fees!
- contributions in mind: anyone can go ahead and contribute to their own country's (or others!) if the stat is wrong...

## contributing
your contribution is insanely welcome as i'm able to give a baseline for every single country of the world, but the data can quite obviously be quite off! 
<br>if you notice a huge gap in the actual estimate, it's very most likely because the service fee of your national courier i entered is false, or the VAT percentages are false aswell! if so, it would be very appreciable if you could go to the database [here](https://raw.githubusercontent.com/Lolo280374/fuckCustoms/refs/heads/main/countryRates.json), and edit your country's data, with the correct ones! 
<br>after that's done, make a simple pull request, and i'll merge it, and thank you for your contrib! :D
<br>as an example, here's a more in depth analysis of a line in the JSON:

```json
"FR": { 
  "name": "France",          // name of the country
  "vatRate": 0.20,           // vat percentage to be charged. e.g: 20%
  "dutyThreshold": 160,      // amount when exceeded where duties will start being charged
  "avgDutyRate": 0.04,       // duties rate, as to put in the form of an average as it varies alot
  "handlingFee": 8.50,       // national courier fee (check the country's national courier)
  "vatThreshold": 0,         // amount when exceeded where VAT will start being charged
  "currency": "EUR"          // local currency of the country for the frontend
}
```

## reporting issues
this is a community project, and your help is very much appreciated! if you notice anything wrong during your usage of this project, please report it on the [GitHub issues tracker](https://github.com/Lolo280374/fuckCustoms/issues)!

## APIs used
this project uses only two actual APIs! first, it uses the [ExchangeRate API](https://open.er-api.com/v6/latest/USD) to calculate conversion rates, but it most importantly uses a JSON database of all the countries's custom's policies, with their VAT rules, duty fees, thresholds, and service fees by the national local couriers. this database has been tailored by me and Gemini to go a bit faster on the research, and is publicly avalaible on github [here](https://raw.githubusercontent.com/Lolo280374/fuckCustoms/refs/heads/main/countryRates.json)!!

## license

this project is licensed under the MIT license. you can check it [here](https://github.com/Lolo280374/fuckCustoms/blob/master/LICENSE/).
<br>if you have any questions about this project, please reach me [at lolodotzip@proton.me](mailto:lolodotzip@proton.me).