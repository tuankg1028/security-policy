const { parseCategoryPurpose } = require("./helpers/csv")
const {
  evaluate ,
  generate
} = require('./helpers/privacy-preference')
const _ = require('lodash')
const fs = require('fs')
const faker = require('faker');
const chalk = require('chalk')
var { policies } = require('./policies')
async function main() {
    
    const NUMBER_OF_USER = 100
    const NUMBER_OF_POLICY = 20
    const data = await parseCategoryPurpose()

    
    // Array.from({length: NUMBER_OF_POLICY}, () => {
    //   const privacyPolicyApp = { denyAttributes: [], denyPurposes:  []}
    //   generate(privacyPolicyApp, "category", 5)
    //   generate(privacyPolicyApp, "purpose", 4)
      
    //   return {
    //     categories: privacyPolicyApp.denyAttributes,
    //     purposes: privacyPolicyApp.denyPurposes,
    //   }
    // })
    
    // console.log(JSON.stringify(policies))
    // console.log("====")
    const app = { 
      name: "App 1",
      policies,
      timeofRetention: 500
    }
  

    const users = [{"fullName":"Shelia Schultz","privacyPreference":{"denyAttributes":[2,3,5,6,7,8,9,10,11,12,17,18],"denyPurposes":[2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19]}},{"fullName":"Cynthia Kovacek","privacyPreference":{"denyAttributes":[2,3,5,6,7,8,9,10,11,12,13,14,17],"denyPurposes":[2,3,4,5,9,10,11,12]}},{"fullName":"Sean Sawayn IV","privacyPreference":{"denyAttributes":[2,5,6,7,8,9,10,11,12,13,14,15,17,18,19],"denyPurposes":[2,3,4,5,6,7,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24]}},{"fullName":"Katie Schuppe II","privacyPreference":{"denyAttributes":[2,5,6,7,8,9,10,11,17,18,19],"denyPurposes":[2,3,4,5,9]}},{"fullName":"Marcella Ziemann","privacyPreference":{"denyAttributes":[2,3,4,5,6,7,17],"denyPurposes":[2,9,10,11,12]}},{"fullName":"Evelyn Fisher","privacyPreference":{"denyAttributes":[2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17],"denyPurposes":[2,3,4,9,10,11,12,13,14,15,16,17,18,19,20]}},{"fullName":"Elbert Baumbach","privacyPreference":{"denyAttributes":[2,3,4,5,6,7,8,9,10,11,12,13,14,17,18],"denyPurposes":[2,3,4,9,10,11,12]}},{"fullName":"Paulette Blanda","privacyPreference":{"denyAttributes":[2,3,5,6,7,8,9,10,11,12,13,14,17,18,19],"denyPurposes":[2,3,9,10,11,12,13,14,15,16,17,18]}},{"fullName":"Elena Kuhn","privacyPreference":{"denyAttributes":[2,3,5,6,7,8,9,17],"denyPurposes":[2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22]}},{"fullName":"Gene Dickinson","privacyPreference":{"denyAttributes":[2,3,5,6,17,18],"denyPurposes":[2,3,9,10,11,12,13]}},{"fullName":"William Torp","privacyPreference":{"denyAttributes":[2,5,6,7,8,9,17,18,19],"denyPurposes":[2,3,4,5,6,7,8,9]}},{"fullName":"Calvin Rohan","privacyPreference":{"denyAttributes":[2,3,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19],"denyPurposes":[2,3,4,5,6,7,8,9]}},{"fullName":"Janis Ryan","privacyPreference":{"denyAttributes":[2,3,4,5,6,7,8,9,10,11,12,17],"denyPurposes":[2,3,4,5,6,9,10,11,12,13,14,15,16,17,18,19,20,21,22]}},{"fullName":"Dolores Buckridge","privacyPreference":{"denyAttributes":[2,3,4,5,6,7,17,18],"denyPurposes":[2,3,4,5,6,7,9,10]}},{"fullName":"Sammy Heidenreich PhD","privacyPreference":{"denyAttributes":[2,3,5,6,7,8,9,10,11,12,13,17,18],"denyPurposes":[2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26]}},{"fullName":"Lydia Jast","privacyPreference":{"denyAttributes":[2,3,4,5,6,7,8,9,10,11,12,17,18],"denyPurposes":[2,3,4,5,9,10,11,12,13,14,15,16,17,18,19,20,21,22]}},{"fullName":"Alexander McGlynn","privacyPreference":{"denyAttributes":[2,3,5,6,17,18,19],"denyPurposes":[2,9,10,11]}},{"fullName":"Todd Hettinger","privacyPreference":{"denyAttributes":[2,5,6,7,8,9,10,11,17],"denyPurposes":[2,3,4,5,6,7,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24]}},{"fullName":"Sandy Mitchell","privacyPreference":{"denyAttributes":[2,3,5,6,7,8,17,18,19],"denyPurposes":[2,3,4,5,6,9,10,11,12,13,14,15,16,17,18,19]}},{"fullName":"Ryan Doyle","privacyPreference":{"denyAttributes":[2,3,5,6,7,8,9,10,11,12,17],"denyPurposes":[2,3,4,9,10,11,12,13,14,15]}},{"fullName":"Elmer Green","privacyPreference":{"denyAttributes":[2,5,6,7,8,9,10,11,12,13,17,18],"denyPurposes":[2,3,9,10,11,12,13,14,15]}},{"fullName":"Seth Koelpin","privacyPreference":{"denyAttributes":[2,5,6,7,8,9,10,11,12,17,18,19],"denyPurposes":[2,3,9,10]}},{"fullName":"Adrian Nienow","privacyPreference":{"denyAttributes":[2,3,5,6,7,8,9,10,11,12,13,14,17,18],"denyPurposes":[2,3,4,5,9,10,11,12,13,14,15,16,17]}},{"fullName":"Tammy Klein DVM","privacyPreference":{"denyAttributes":[2,3,4,5,6,7,8,9,10,11,12,13,14,17,18,19],"denyPurposes":[2,3,9,10,11,12,13,14,15,16]}},{"fullName":"Tommie Cormier","privacyPreference":{"denyAttributes":[2,5,6,7,8,9,10,11,12,13,14,15,16,17],"denyPurposes":[2,9,10,11,12,13]}},{"fullName":"Scott Adams III","privacyPreference":{"denyAttributes":[2,3,5,6,7,8,9,10,11,12,13,14,15,16,20,17,18,19,22],"denyPurposes":[2,9,10,11]}},{"fullName":"Leland Ryan","privacyPreference":{"denyAttributes":[2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,20,21,17,18,19,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,59,60,61],"denyPurposes":[2,3,4,9,10,11]}},{"fullName":"Dennis Erdman","privacyPreference":{"denyAttributes":[2,3,5,6,7,8,9,10,11,12,13,14,15,16,17,18],"denyPurposes":[2,3,4,9,10,11,12,13,14]}},{"fullName":"Delores Funk","privacyPreference":{"denyAttributes":[2,5,6,7,8,9,10,11,12,17,18,19],"denyPurposes":[2,3,4,5,6,9,10,11,12,13,14,15,16,17,18]}},{"fullName":"Ms. Terence Orn","privacyPreference":{"denyAttributes":[2,3,5,6,7,8,9,17],"denyPurposes":[2,3,4,5,9,10,11,12]}},{"fullName":"Ginger Hills","privacyPreference":{"denyAttributes":[2,3,4,5,6,7,8,9,10,11,12,13,14,17,18,19],"denyPurposes":[2,3,9]}},{"fullName":"Elijah Romaguera IV","privacyPreference":{"denyAttributes":[2,5,6,7,8,17],"denyPurposes":[2,3,4,5,9,10,11,12,13,14,15,16,17,18,19,20,21,22]}},{"fullName":"Elaine Yost III","privacyPreference":{"denyAttributes":[2,5,17],"denyPurposes":[2,3,4,5,6,9,10,11,12,13,14,15,16,17,18,19,20,21,22,25,26]}},{"fullName":"Christopher McDermott","privacyPreference":{"denyAttributes":[2,5,6,7,8,9,10,11,17,18],"denyPurposes":[2,3,9]}},{"fullName":"Brandi Bradtke","privacyPreference":{"denyAttributes":[2,5,6,7,8,17,18],"denyPurposes":[2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]}},{"fullName":"Carole Leuschke DVM","privacyPreference":{"denyAttributes":[2,5,6,7,8,9,10,11,12,13,17,18,19],"denyPurposes":[2,9,10,11]}},{"fullName":"Adrian Ondricka","privacyPreference":{"denyAttributes":[2,5,6,7,17,18],"denyPurposes":[2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]}},{"fullName":"Jonathon Heidenreich","privacyPreference":{"denyAttributes":[2,3,5,6,7,8,9,10,11,12,13,14,15,16,20,21,17,18,19],"denyPurposes":[2,3,4,5,9,10,11]}},{"fullName":"Ronnie Beier","privacyPreference":{"denyAttributes":[2,3,5,6,7,8,9,17,18,19],"denyPurposes":[2,3,4,5,6,7,9,10,11]}},{"fullName":"Edmond Bernhard","privacyPreference":{"denyAttributes":[2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,20,21,46,17,18],"denyPurposes":[2,3,4,5,6,7,8,9,10,11]}},{"fullName":"Kristen Hauck","privacyPreference":{"denyAttributes":[2,3,4,5,6,7,8,9,10,17,18,19],"denyPurposes":[2,9,10,11]}},{"fullName":"Marlene D'Amore","privacyPreference":{"denyAttributes":[2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,20,21,17,18],"denyPurposes":[2,9,10,11,12,13,14]}},{"fullName":"Mandy Bayer","privacyPreference":{"denyAttributes":[2,3,5,6,7,8,9,10,11,12,13,14,15,16,20,21,17,18,19,22,23,24],"denyPurposes":[2,3,4,5,6,7,9,10,11,12,13,14]}},{"fullName":"Gordon Windler","privacyPreference":{"denyAttributes":[2,3,5,6,7,17,18,19],"denyPurposes":[2,3,4,5,6,9,10,11,12,13,14,15]}},{"fullName":"Seth Rowe","privacyPreference":{"denyAttributes":[2,3,5,6,17,18],"denyPurposes":[2,3,4,5,9,10,11,12,13,14,15,16]}},{"fullName":"Janice Williamson III","privacyPreference":{"denyAttributes":[2,5,6,7,8,9,10,17],"denyPurposes":[2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]}},{"fullName":"Miss Lorene Skiles","privacyPreference":{"denyAttributes":[2,5,6,7,8,17,18,19],"denyPurposes":[2,3,4,5,6,7,9,10,11,12,13,14]}},{"fullName":"Olga Barton","privacyPreference":{"denyAttributes":[2,3,4,5,6,7,8,9,10,11,12,17],"denyPurposes":[2,3,4,5,9,10,11,12,13,14,15,16,17,18,19,20,21]}},{"fullName":"Grady Kihn","privacyPreference":{"denyAttributes":[2,3,4,5,6,7,8,9,10,11,12,13,14,15,17],"denyPurposes":[2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24]}},{"fullName":"Matt Fahey","privacyPreference":{"denyAttributes":[2,5,6,7,8,9,10,11,12,13,17,18,19],"denyPurposes":[2,3,4,5,6,7,9]}},{"fullName":"Diana Pagac","privacyPreference":{"denyAttributes":[2,5,6,7,17,18],"denyPurposes":[2,3,4,5,6,9,10,11,12,13,14,15,16,17,18,19]}},{"fullName":"Dominick Rolfson","privacyPreference":{"denyAttributes":[2,3,4,5,6,7,8,9,10,11,12,13,14,17],"denyPurposes":[2,3,4,5,9,10,11]}},{"fullName":"Victor Swift","privacyPreference":{"denyAttributes":[2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,20,21,17,18,19,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,59,60],"denyPurposes":[2,9,10]}},{"fullName":"Ben Ferry","privacyPreference":{"denyAttributes":[2,5,6,17,18],"denyPurposes":[2,3,4,5,6,7,9,10,11,12,13,14,15,16]}},{"fullName":"Louis Lueilwitz","privacyPreference":{"denyAttributes":[2,5,6,17],"denyPurposes":[2,3,4,9,10,11,12,13,14]}},{"fullName":"Ms. Salvatore Ritchie","privacyPreference":{"denyAttributes":[2,3,5,6,7,8,9,10,11,12,13,14,15,16,20,17,18,19,22,23,24,25,26],"denyPurposes":[2,3,9,10,11,12,13,14,15,16,17,18]}},{"fullName":"Edward Gleason PhD","privacyPreference":{"denyAttributes":[2,3,5,6,7,8,9,17,18],"denyPurposes":[2,3,9,10]}},{"fullName":"Ora Aufderhar","privacyPreference":{"denyAttributes":[2,3,4,5,17,18,19],"denyPurposes":[2,3,9,10]}},{"fullName":"Benny Grady","privacyPreference":{"denyAttributes":[2,3,5,6,7,8,9,17],"denyPurposes":[2,3,4,5,6,9,10,11]}},{"fullName":"Yolanda Hammes","privacyPreference":{"denyAttributes":[2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,20,17,18,19,22],"denyPurposes":[2,3,9,10,11,12,13,14]}},{"fullName":"Moses Donnelly","privacyPreference":{"denyAttributes":[2,3,5,6,7,17],"denyPurposes":[2,3,4,5,6,9,10,11,12,13,14,15,16,17,18,19,20,21,22,25,26]}},{"fullName":"Nathaniel Larson","privacyPreference":{"denyAttributes":[2,5,6,7,8,9,10,11,12,13,14,15,17,18,19],"denyPurposes":[2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]}},{"fullName":"Ms. Maria Boehm","privacyPreference":{"denyAttributes":[2,3,4,5,6,7,8,17,18],"denyPurposes":[2,3,4,9]}},{"fullName":"Hugh Thompson","privacyPreference":{"denyAttributes":[2,3,5,6,17],"denyPurposes":[2,3,4,5,6,7,9,10,11,12,13,14,15,16,17,18]}},{"fullName":"Melissa Waelchi MD","privacyPreference":{"denyAttributes":[2,3,5,6,7,8,9,10,11,12,17,18,19],"denyPurposes":[2,9]}},{"fullName":"Jason Hilpert","privacyPreference":{"denyAttributes":[2,5,6,7,8,9,10,11,12,17],"denyPurposes":[2,9]}},{"fullName":"Alvin Considine","privacyPreference":{"denyAttributes":[2,3,5,6,7,17],"denyPurposes":[2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21]}},{"fullName":"Marshall Bahringer","privacyPreference":{"denyAttributes":[2,3,4,5,17],"denyPurposes":[2,3,4,5,6,9,10,11,12,13,14,15,16,17,18,19,20]}},{"fullName":"Paulette Nikolaus","privacyPreference":{"denyAttributes":[2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19],"denyPurposes":[2,3,4,5,6,9,10,11,12,13,14,15,16]}},{"fullName":"Jerome Murazik","privacyPreference":{"denyAttributes":[2,3,5,17,18,19],"denyPurposes":[2,3,4,9,10]}},{"fullName":"Noah Schoen","privacyPreference":{"denyAttributes":[2,3,4,5,6,7,8,9,10,11,12,17,18],"denyPurposes":[2,3,4,9]}},{"fullName":"Mark Kilback","privacyPreference":{"denyAttributes":[2,5,6,7,8,9,17,18],"denyPurposes":[2,3,4,5,6,9,10,11,12,13,14,15,16,17,18,19,20,21,22]}},{"fullName":"Al Muller","privacyPreference":{"denyAttributes":[2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,20,21,46,47,17,18,19,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,59,60,61,62,63,64,65,66,67,68],"denyPurposes":[2,9,10,11]}},{"fullName":"Toni Marquardt","privacyPreference":{"denyAttributes":[2,3,5,6,17,18],"denyPurposes":[2,3,9,10,11,12,13,14,15,16,17,18]}},{"fullName":"Neil Graham","privacyPreference":{"denyAttributes":[2,5,6,7,8,9,10,11,12,13,14,15,16,17],"denyPurposes":[2,3,4,9,10,11,12,13,14,15,16,17,18]}},{"fullName":"Leah Kshlerin","privacyPreference":{"denyAttributes":[2,3,4,5,6,17,18,19],"denyPurposes":[2,3,9,10,11,12,13]}},{"fullName":"Roberto Nienow","privacyPreference":{"denyAttributes":[2,5,6,7,8,9,10,11,12,13,17,18],"denyPurposes":[2,3,4,9,10,11]}},{"fullName":"Dr. Rodolfo Lockman","privacyPreference":{"denyAttributes":[2,5,6,17,18],"denyPurposes":[2,3,4,5,9,10,11,12,13,14,15,16,17,18,19,20]}},{"fullName":"Kristen Braun","privacyPreference":{"denyAttributes":[2,5,6,7,8,9,10,11,12,13,14,17,18],"denyPurposes":[2,3,4,5,6,9,10,11,12,13,14]}},{"fullName":"Darrell Waelchi","privacyPreference":{"denyAttributes":[2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19],"denyPurposes":[2,9,10,11,12]}},{"fullName":"Stacy Brekke","privacyPreference":{"denyAttributes":[2,5,6,7,8,9,17,18,19],"denyPurposes":[2,3,4,5,6,7,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]}},{"fullName":"Nadine Heathcote","privacyPreference":{"denyAttributes":[2,5,6,7,8,9,10,11,17],"denyPurposes":[2,3,4,9]}},{"fullName":"Dr. Tiffany Prohaska","privacyPreference":{"denyAttributes":[2,5,17,18,19],"denyPurposes":[2,3,4,5,6,7,9,10,11,12,13,14,15,16,17]}},{"fullName":"Elijah Treutel DVM","privacyPreference":{"denyAttributes":[2,3,5,6,7,8,9,10,11,12,13,14,17,18],"denyPurposes":[2,3,4,5,6,7,9]}},{"fullName":"Nelson Dickens","privacyPreference":{"denyAttributes":[2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,20,17,18,19,22,23,24,25],"denyPurposes":[2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24]}},{"fullName":"Lucas Denesik","privacyPreference":{"denyAttributes":[2,3,5,6,7,8,9,10,11,17],"denyPurposes":[2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]}},{"fullName":"Deanna Cronin","privacyPreference":{"denyAttributes":[2,3,4,5,6,7,8,9,10,11,12,13,14,17],"denyPurposes":[2,3,4,5,6,9,10,11,12,13,14,15,16,17,18,19,20,21,22]}},{"fullName":"Joyce Wunsch","privacyPreference":{"denyAttributes":[2,5,6,7,8,9,10,11,12,13,14,15,17,18,19],"denyPurposes":[2,3,4,5,6,9,10,11]}},{"fullName":"Casey Keeling","privacyPreference":{"denyAttributes":[2,5,6,7,8,9,10,11,17],"denyPurposes":[2,3,4,9,10,11,12,13,14,15,16,17,18,19,20]}},{"fullName":"Lula Hills","privacyPreference":{"denyAttributes":[2,3,5,6,7,8,9,10,11,12,13,17],"denyPurposes":[2,3,4,5,6,7,9,10,11,12,13,14,15,16,17,18,19,20,21]}},{"fullName":"Sue Hagenes","privacyPreference":{"denyAttributes":[2,3,4,5,6,7,8,9,10,17,18],"denyPurposes":[2,3,4,5,9,10,11,12,13,14,15,16,17,18,19]}},{"fullName":"Theodore Toy","privacyPreference":{"denyAttributes":[2,3,5,6,7,8,17,18],"denyPurposes":[2,3,4,9,10,11]}},{"fullName":"Elizabeth Flatley","privacyPreference":{"denyAttributes":[2,3,4,5,6,7,8,9,10,11,12,17,18],"denyPurposes":[2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19]}},{"fullName":"Robin Bahringer","privacyPreference":{"denyAttributes":[2,5,6,7,8,9,10,11,12,13,14,15,16,17],"denyPurposes":[2,3,4,5,6,9,10,11,12,13,14,15,16,17]}},{"fullName":"Adrienne Grant","privacyPreference":{"denyAttributes":[2,3,5,6,7,8,9,10,11,12,13,14,15,16,20,17,18,19,22,23],"denyPurposes":[2,3,4,5,6,9,10,11,12,13,14,15,16,17]}},{"fullName":"Janie Bins","privacyPreference":{"denyAttributes":[2,5,6,7,8,9,10,11,17,18],"denyPurposes":[2,3,4,5,9,10,11,12,13,14,15]}},{"fullName":"Marlene Swift","privacyPreference":{"denyAttributes":[2,3,4,5,17,18,19],"denyPurposes":[2,3,4,9,10]}},{"fullName":"Ida Goyette","privacyPreference":{"denyAttributes":[2,5,6,7,17,18],"denyPurposes":[2,9,10,11,12,13,14,15]}},{"fullName":"Fred Von","privacyPreference":{"denyAttributes":[2,3,4,5,6,7,8,17,18,19],"denyPurposes":[2,3,4,5,6,7,9,10,11,12,13,14,15,16]}},{"fullName":"Jenna Stiedemann","privacyPreference":{"denyAttributes":[2,5,6,7,17,18],"denyPurposes":[2,3,4,9,10,11,12,13]}}]
    
    // for (let i = 0; i < NUMBER_OF_USER; i++) {
    //   const user = {
    //     fullName: faker.name.findName(),
    //     privacyPreference: { denyAttributes: [], denyPurposes:  []}
    //   }
    //   generate(user.privacyPreference, "category")
    //   generate(user.privacyPreference, "purpose")

    //   user.privacyPreference.denyAttributes = _.map(user.privacyPreference.denyAttributes, "id")
    //   user.privacyPreference.denyPurposes = _.map(user.privacyPreference.denyPurposes, "id")

    //   users.push(user)
    // }
    

    
    const policies1 = policies.map(({categories, purposes}) => {
      return {
        categories: [categories[0]],
        purposes: [purposes[0]],
      }
    })

    console.time("1")
    const times1 = {hash: 0, finding: 0, evaluate: 0}
    users.forEach(user => {
      const result =  evaluate({
          policies: policies1,
        }, user, times1)
      // console.log(chalk.green(user.fullName), result)
    })
    console.timeEnd("1")
    console.log("time1", times1)

    // 2
    const times2 = {hash: 0, finding: 0, evaluate: 0}
    const extraPolicies2 = Array.from({length: 7}, () => {
      const privacyPolicyApp = { denyAttributes: [], denyPurposes:  []}
      generate(privacyPolicyApp, "category", 5)
      generate(privacyPolicyApp, "purpose", 4)
      
      return {
        categories: privacyPolicyApp.denyAttributes,
        purposes: privacyPolicyApp.denyPurposes,
      }
    })

    let policies2 = [...extraPolicies2, ...policies]
    policies2 = policies2.slice(0, 20)
    policies2 =  policies2.map(({categories, purposes}) => {
      return {
        categories: [categories[0]],
        purposes: [purposes[0]],
      }
    })
   
    console.time("2")
    users.forEach(user => {
      const result =  evaluate({
          policies: policies2,
        }, user, times2)
      // console.log(chalk.green(user.fullName), result)
    })
    console.timeEnd("2")
    console.log("time2", times2)

    const times3 = {hash: 0, finding: 0, evaluate: 0}
    console.time("3")
    users.forEach(user => {
      const result =  evaluate({
          policies: app.policies,
        }, user, times3)
      // console.log(chalk.green(user.fullName), result)
    })
    console.timeEnd("3")
    console.log("time3", times3)
}
main()