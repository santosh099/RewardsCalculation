import React from 'react';
import './App.css';
import { dataSet } from './utils/dataSet';

function App() {


  const totalRewardPoints = (updatedTransactions) => {
    const rewardPoints = updatedTransactions.reduce((value,transaction) => {
      if (transaction.transactionAmount > 100) {
        return value + (transaction.transactionAmount - 100 ) * 2 + 50; 
      } else if(transaction.transactionAmount > 50 && transaction.transactionAmount <= 100) {
        return value + (transaction.transactionAmount - 50);
      } 
      return value;
    }, 0)
    return rewardPoints;
  }

  const rewardPointsByMonth = (accountId, month) => {
    const filteredTransactions = dataSet.filter((transaction) => {
      const date = new Date(transaction.date);
      if(transaction.accountId === accountId && date.getMonth() + 1 === month) {
        return transaction;
      }
    });
    return totalRewardPoints(filteredTransactions);
  }

  const renderTableRows = () => {
    let uniqueAccounts = [...new Set(dataSet.map(transaction => transaction.accountId))];
    return uniqueAccounts.map((accountId, index)  => {
      return  (<tr key = {index}>
              <td>{accountId}</td>
              <td>{rewardPointsByMonth(accountId, 1)}</td>
              <td>{rewardPointsByMonth(accountId, 2)}</td>
              <td>{rewardPointsByMonth(accountId, 3)}</td>
              <td>{rewardPointsByMonth(accountId , 1) + rewardPointsByMonth(accountId, 2) + rewardPointsByMonth(accountId, 3)}</td>
           </tr>);
    });

  }


  return (
    <div>
      <h1 style = {{textAlign:"center"}}>Rewards Application</h1>
      <table className="container">
        <thead>
          <tr>
            <th>AccountId</th>
            <th>Jan</th>
            <th>Feb</th>
            <th>March</th>
            <th>Total Reward Points</th>
          </tr>
        </thead>
        <tbody>
          {renderTableRows()}
        </tbody>
      </table>
    </div>
  );
}

export default App;
