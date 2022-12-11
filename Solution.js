(function main() {

function balanceSheetFunction(data) {
  //here i am creating an object to store the balance of every month
  let balanceSheet = {};
  
  let minDate = new Date(data.revenueData[0].startDate);
  let maxDate = new Date(data.revenueData[0].startDate);
  
 //findig min and max dates
  for (let x of data.revenueData) {
      let date = new Date(x.startDate);
      if(date < minDate) minDate = date;
      if(date > maxDate) maxDate = date;
  }
  for (let y of data.expenseData) {
      let date = new Date(y.startDate);
      if(date < minDate) minDate = date;
      if(date > maxDate)  maxDate = date;
  }
  
  
  var months = 0;
  months += (maxDate.getFullYear()-minDate.getFullYear())*12;
  months += maxDate.getMonth() - minDate.getMonth() + 1;
  
     for(let i=0; i<months; i++)
      {
          const month = minDate.getMonth();
          const year = minDate.getFullYear();
          const key = `${month}@${year}`;
          let temp = new Date(minDate)
          balanceSheet[key] = {timestamp: temp,  balance: 0};
          minDate.setMonth(minDate.getMonth() + 1); 
      }

  for (let r of data.revenueData) {
    let date = new Date(r.startDate);
    let month = date.getMonth();
    let year = date.getFullYear();
    let key = `${month}@${year}`;
    let entry = balanceSheet[key];
    entry.balance += r.amount;
    balanceSheet[key] =  entry;
  }
  
    
  for (let e of data.expenseData) {
    let date = new Date(e.startDate);
    let month = date.getMonth();
    let year = date.getFullYear();
    let key = `${month}@${year}`;

    let entry = balanceSheet[key];
    entry.balance -= e.amount;
    balanceSheet[key] = entry;
  }

  //Sorting the map in increasing order of timestamp 
  const sorted = Object.entries(balanceSheet).sort((a, b) => {a.timestamp - b.timestamp});

  output
    var output = {
    balance: []
    };
    
  for (let [month, data] of sorted) {
    const date = new Date(data.timestamp);
    var b = date.toISOString();
    output.balance.push({
          "amount": data.balance, 
          "startDate": b
        });
  }
    for(let a of output.balance)
    {
        console.log(a);
    }
}

//input 1
const inputData1 = {
  "expenseData": [
    {
      "amount": 20,
      "startDate": "2020-05-01T00:00:00.000Z"
    },
    {
      "amount": 30,
      "startDate": "2020-03-01T00:00:00.000Z"
    }
  ],
  "revenueData": [
    {
      "amount": 60,
      "startDate": "2020-03-01T00:00:00.000Z"
    },
     {
      "amount": 0,
      "startDate": "2020-02-01T00:00:00.000Z"
    },
    {
      "amount": 10,
      "startDate": "2020-03-01T00:00:00.000Z"
    },
    {
      "amount": 40,
      "startDate": "2020-01-01T00:00:00.000Z"
    }
  ]
};

//input 2
const inputData2 = {
  "expenseData": [
    {
      "amount": 50,
      "startDate": "2021-01-01T00:00:00.000Z"
    },
    {
      "amount": 20,
      "startDate": "2021-02-01T00:00:00.000Z"
    },
    {
      "amount": 30,
      "startDate": "2021-03-01T00:00:00.000Z"
    }
  ],
  "revenueData": [
    {
      "amount": 60,
      "startDate": "2021-02-01T00:00:00.000Z"
    }
  ]
};

console.log("BalanceSheet of inputData1 is :-- ");
balanceSheetFunction(inputData1);

console.log("BalanceSheet of inputData2 is :-- ");
balanceSheetFunction(inputData2);
    
}());
