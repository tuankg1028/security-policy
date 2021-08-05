const chalk = require('chalk')
const { privacyPolicy } = require('../helpers/constants')
const _ = require('lodash')
const ramdom = require("./ramdom")
const md5 = require('md5')

const evaluateHashes = []
const evaluate =  (
  {
    policies, 
    attributes: appAttributes,
    purposes: appPurposes,
    timeofRetention: appTimeofRetention,
  },
  user,
  times
) => {
  if (!user) throw new Error("user not exist");
  const { privacyPreference } = user;
  
  for (let i = 0; i < policies.length; i++) {
    const policy = policies[i];
    const { attributes: appAttributes, purposes: appPurposes } = policy
    
    let start = Date.now();
    const hashValue = md5(
      md5(JSON.stringify(policy)) + "-" + md5(JSON.stringify(privacyPreference))
    );
    let end = Date.now();
    times.hash += parseFloat(end - start)

    // get result from hashed
    start = Date.now();
    const evaluatedHash = evaluateHashes.find(item => item.hash === hashValue);
    end = Date.now();
    times.finding += parseFloat(end - start)
    
    if(evaluatedHash && evaluatedHash.result === true) return false
      start = Date.now();
      const [
        isAcceptedAttrs,
        isAcceptedPurposes,
        isTimeofRetention,
      ] = [
        // check attributes
        evaluateAttributes(_.map(appAttributes, "id"), privacyPreference),
        // check attributes
        evaluatePurposes(_.map(appPurposes, "id"), privacyPreference),
        // check timeofRetention
        // evaluateTimeofRetention(appTimeofRetention, privacyPreference),
      ]
      end = Date.now();
      times.evaluate += parseFloat(end - start)
      
      const result = !isAcceptedAttrs || !isAcceptedPurposes
      evaluateHashes.push({hash: hashValue, result})

      if(result) return false
  }
  

  return true
};

// evaluate timeofRetention between app and upp
const evaluateTimeofRetention = (appTimeofRetention = 0, privacyPreference) => {
  return appTimeofRetention <= privacyPreference.timeofRetention;
};

// evaluate attributes between app and upp
const evaluateAttributes =  (appAttributes, privacyPreference) => {
  const [isDeny, isAllowed, isExcepted, ] = [
    evaluateAttributeType(appAttributes, privacyPreference, "deny"),

    // evaluateAttributeType(appAttributes, privacyPreference, "allow"),
    // evaluateAttributeType(appAttributes, privacyPreference, "except"),
  ];

  // console.log(
  //   isAllowed ? chalk.green("✅") : chalk.red("✖"),
  //   chalk.blue(
  //     `ATTRIBUTE - allow: APP: ${JSON.stringify(
  //       appAttributes
  //     )} - UPP ${JSON.stringify(privacyPreference.attributes)}`
  //   )
  // );

  // console.log(
  //   !isExcepted ? chalk.green("✅") : chalk.red("✖"),
  //   chalk.blue(
  //     `ATTRIBUTE - except: APP: ${JSON.stringify(
  //       appAttributes
  //     )} - UPP ${JSON.stringify(privacyPreference.exceptions)}`
  //   )
  // );

  // console.log(
  //   !isDeny ? chalk.green("✅") : chalk.red("✖"),
  //   chalk.blue(
  //     `ATTRIBUTE - deny: APP: ${JSON.stringify(
  //       appAttributes
  //     )} - UPP ${JSON.stringify(privacyPreference.exceptions)}`
  //   )
  // );

  return !isDeny;
  // return isAllowed && !isExcepted && !isDeny;
};

// evaluate attributes by type
const evaluateAttributeType =  (
  appAttributes,
  privacyPreference,
  type
) => {
  try {
    let uppAttributes;

    switch (true) {
      case type === "allow": {
        uppAttributes = privacyPreference.attributes;
        break;
      }
      case type === "except": {
        uppAttributes = privacyPreference.exceptions;
        break;
      }
      case type === "deny": {
        uppAttributes = privacyPreference.denyAttributes;
        break;
      }
      default: {
        throw new Error("type is invalid");
      }
    }

    for (let i = 0; i < appAttributes.length; i++) {
      const appAttributeId = appAttributes[i];
      let appAttribute = privacyPolicy["category"].find(item => item.id === appAttributeId)
     
      if (!appAttribute)
        throw new Error(`Attribute ${appAttributeId} not found`);

      return privacyPolicy["category"].some(item => {
        return _.includes(uppAttributes, item.id) &&  item.left <= appAttribute.left && item.right >= appAttribute.right 
      })
    }
    return false;
  } catch (err) {
    chalk.red(console.error("evaluateAttributeType: " + err.message));
    throw err;
  }
};

// evaluate attributes between app and upp
const evaluatePurposes =  (appPurposes, privacyPreference) => {
  const [isDeny, isAllowed, isExcepted] = [
    evaluatePurposesType(appPurposes, privacyPreference, "deny"),
    // evaluatePurposesType(appPurposes, privacyPreference, "allow"),
    // evaluatePurposesType(appPurposes, privacyPreference, "except"),
  ];

  // console.log(
  //   isAllowed ? chalk.green("✅") : chalk.red("✖"),
  //   chalk.blue(
  //     `PURPOSE - allow: APP: ${JSON.stringify(
  //       appPurposes
  //     )} - UPP ${JSON.stringify(privacyPreference.allowedPurposes)}`
  //   )
  // );

  // console.log(
  //   !isExcepted ? chalk.green("✅") : chalk.red("✖"),
  //   chalk.blue(
  //     `PURPOSE - except: APP: ${JSON.stringify(
  //       appPurposes
  //     )} - UPP ${JSON.stringify(privacyPreference.prohibitedPurposes)}`
  //   )
  // );

  // console.log(
  //   !isDeny ? chalk.green("✅") : chalk.red("✖"),
  //   chalk.blue(
  //     `PURPOSE - deny: APP: ${JSON.stringify(
  //       appPurposes
  //     )} - UPP ${JSON.stringify(privacyPreference.denyPurposes)}`
  //   )
  // );

  return !isDeny;
  // return isAllowed && !isExcepted && !isDeny;
};

// evaluate attributes by type
const evaluatePurposesType = (
  appPurposes,
  privacyPreference,
  type
) => {
  let uppAppPurposes;

  switch (true) {
    case type === "allow": {
      uppAppPurposes = privacyPreference.allowedPurposes;
      break;
    }
    case type === "except": {
      uppAppPurposes = privacyPreference.prohibitedPurposes;
      break;
    }
    case type === "deny": {
      uppAppPurposes = privacyPreference.denyPurposes;
      break;
    }
    default: {
      throw new Error("type is invalid");
    }
  }

  for (let i = 0; i < appPurposes.length; i++) {
    const appPurposeId = appPurposes[i];
    let appPurpose = privacyPolicy["purpose"].find(item => item.id === appPurposeId)

    if (!appPurpose)
      throw new Error(`Purpose ${appPurposeId} not found`);

      return privacyPolicy["purpose"].some(item => {
        return _.includes(uppAppPurposes, item.id) &&  item.left <= appPurpose.left && item.right >= appPurpose.right 
      })
  }

  return false;
};


const generate  = (privacyPreference, type, level = 2) => {
  let denyItems = type === "category" ? privacyPreference.denyAttributes : privacyPreference.denyPurposes

  const attributes = privacyPolicy[type].filter(item => item.level === level && (denyItems.length === 0 || _.includes(_.map(denyItems, "id"), item.parentId)))

  newDenyItems = [...denyItems, ...attributes.slice(0, ramdom.getRandomInt(1, attributes.length + 1))]
  
  if(type === "category") privacyPreference.denyAttributes = newDenyItems
  else privacyPreference.denyPurposes = newDenyItems

  const isNextLevel = privacyPolicy[type].some(item => item.level === level + 1)
  if(isNextLevel) {
    generate(privacyPreference, type, ++level)
  }
}
module.exports = {
    evaluate,
    generate
};
