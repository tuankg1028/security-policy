const { parseCategoryPurpose } = require("./helpers/csv")
const {
  evaluate ,
  generate
} = require('./helpers/privacy-preference')
const _ = require('lodash')
const faker = require('faker');
const chalk = require('chalk')

async function main() {
    
    const NUMBER_OF_USER = 100
    const NUMBER_OF_POLICY = 20
    const data = await parseCategoryPurpose()

    
    const policies = Array.from({length: NUMBER_OF_POLICY}, () => {
      const privacyPolicyApp = { denyAttributes: [], denyPurposes:  []}
      generate(privacyPolicyApp, "category", 5)
      generate(privacyPolicyApp, "purpose", 4)
      
      return {
        categories: privacyPolicyApp.denyAttributes,
        purposes: privacyPolicyApp.denyPurposes,
      }
    })
    
    const app = { 
      name: "App 1",
      policies,
      timeofRetention: 500
    }
  

    const users = []
    
    for (let i = 0; i < NUMBER_OF_USER; i++) {
      const user = {
        fullName: faker.name.findName(),
        privacyPreference: { denyAttributes: [], denyPurposes:  []}
      }
      generate(user.privacyPreference, "category")
      generate(user.privacyPreference, "purpose")

      user.privacyPreference.denyAttributes = _.map(user.privacyPreference.denyAttributes, "id")
      user.privacyPreference.denyPurposes = _.map(user.privacyPreference.denyPurposes, "id")

      users.push(user)
    }
    
    
    

    
    const policies1 = policies.map(({categories, purposes}) => {
      return {
        categories: [categories[0]],
        purposes: [purposes[0]],
      }
    })

    console.time("1")
    users.forEach(user => {
      const result =  evaluate({
          policies: policies1,
        }, user)
      // console.log(chalk.green(user.fullName), result)
    })
    console.timeEnd("1")


    // 2
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
        }, user)
      // console.log(chalk.green(user.fullName), result)
    })
    console.timeEnd("2")


    console.time("3")
    users.forEach(user => {
      const result =  evaluate({
          policies: app.policies,
        }, user)
      // console.log(chalk.green(user.fullName), result)
    })
    console.timeEnd("3")
}
main()