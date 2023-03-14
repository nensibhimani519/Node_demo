const csv = require("csv-parser");
const fs = require("fs");

async function validate(rules, investment) {
  let id = investment["ID"];
  let sector = investment["Sector"];
  let amount = investment["Amount"];

  if (sector != "" && rules.sector[sector] != null) {
    let sectorRules = rules.sector[sector];
    if (sectorRules.year != null) {
      sectorRules.year = sectorRules.year - amount;
      if (sectorRules.year <= 0) {
        console.log(id);
        sectorRules.year = null;
      }
    } else if (sectorRules.quarter != null) {
      sectorRules.quarter = sectorRules.quarter - amount;
      if (sectorRules.quarter <= 0) {
        console.log(id);
        sectorRules.quarter = null;
      }
    } else if (sectorRules.month != null) {
      sectorRules.month = sectorRules.month - amount;
      if (sectorRules.month <= 0) {
        console.log(id);
        sectorRules.month = null;
      }
    } else if (sectorRules.total != null) {
      sectorRules.total = sectorRules.total - amount;
      if (sectorRules.total <= 0) {
        console.log(id);
        sectorRules.total = null;
      }
    }
    rules.sector[sector] = sectorRules;
  }

  if (rules.year != null) {
    rules.year = rules.year - amount;
    if (rules.year <= 0) {
      console.log(id);
      rules.year = null;
    }
  } else if (rules.quarter != null) {
    rules.quarter = rules.quarter - amount;
    if (rules.quarter <= 0) {
      console.log(id);
      rules.quarter = null;
    }
  } else if (rules.month != null) {
    rules.month = rules.month - amount;
    if (rules.month <= 0) {
      console.log(id);
      rules.month = null;
    }
  } else if (rules.total != null) {
    rules.total = rules.total - amount;
    if (rules.total <= 0) {
      console.log(id);
      rules.total = null;
    }
  }
  return rules;
}

async function getRuleData() {
  return new Promise((resolve, reject) => {
    const data = [];
    fs.createReadStream("./files/budget.csv")
      .pipe(csv())
      .on("data", (rule) => data.push(rule))
      .on("end", () => resolve(data));
  });
}

async function getInvestmentData() {
  return new Promise((resolve, reject) => {
    const data = [];
    fs.createReadStream("./files/investments.csv")
      .pipe(csv())
      .on("data", (investment) => data.push(investment))
      .on("end", () => {
        resolve(data);
      });
  });
}

async function formateRule(data) {
  let totalBuget = null;
  let yearBudget = null;
  let quarterBudget = null;
  let monthBudget = null;
  let sector = {};

  data.forEach((el) => {
    if (el["Sector"] != "") {
      let key = el["Sector"];
      if (sector[key] == null)
        sector[key] = { total: null, year: null, quarter: null, month: null };

      if (el["Time Period"] == "Year") sector[key].year = el["Amount"];
      else if (el["Time Period"] == "Quarter")
        sector[key].quarter = el["Amount"];
      else if (el["Time Period"] == "Month") sector[key].month = el["Amount"];
      else sector[key].total = el["Amount"];
    } else {
      if (el["Time Period"] == "Year") yearBudget = el["Amount"];
      else if (el["Time Period"] == "Quarter") quarterBudget = el["Amount"];
      else if (el["Time Period"] == "Month") monthBudget = el["Amount"];
      else totalBuget = el["Amount"];
    }
  });

  return {
    total: totalBuget,
    year: yearBudget,
    quarter: quarterBudget,
    month: monthBudget,
    sector: sector,
  };
}

async function init() {
  const rulesData = await getRuleData();
  const investmentData = await getInvestmentData();

  let orinalRules = await formateRule(rulesData);

  let rules = Object.assign({}, orinalRules);
  let currentYear = 0;
  let currentQuarter = 0;
  let currentMonth = 0;

  for (let i = 0; i < investmentData.length; i++) {
    let el = investmentData[i];

    let dateArray = el["Date"].split("/");
    console.log(dateArray, "dateArray");
    let date = new Date(dateArray[2], dateArray[1] - 1, dateArray[0]);
    console.log(date, "date", dateArray[2], "dateArray[2]", dateArray[1] - 1);

    let year = date.getFullYear();
    let quarter = Math.floor((date.getMonth() + 3) / 3);
    console.log(quarter, "quarter", date.getMonth());
    let month = date.getMonth();

    if (currentYear == 0 || year != currentYear) {
      rules = Object.assign({}, orinalRules);
      currentYear = year;
    } else if (currentQuarter == 0 || quarter != currentQuarter) {
      rules = Object.assign({}, orinalRules);
      currentQuarter = quarter;
    } else if (currentMonth == 0 || month != currentMonth) {
      rules = Object.assign({}, orinalRules);
      currentMonth = month;
    }

    rules = await validate(rules, el);
  }
}

init();
