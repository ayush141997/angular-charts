import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Screen1Service } from 'src/app/services/screen1.service';

interface response {
  data: any[]
}

@Component({
  selector: 'app-screen2',
  templateUrl: './screen2.component.html',
  styleUrls: ['./screen2.component.scss']
})
export class Screen2Component implements OnInit {

  data: any[]
  columnNames: string[] = []
  dataChart: any[] = []
  subscription: Subscription

  constructor(private _serv: Screen1Service) {
    this.subscription = _serv.getData().subscribe((res: response) => {
      this.data = res.data
      this.formatColumns(this.data)
      this.formatData(this.data)
    })
    let year = 2018
    setInterval(() => {
      year += 1
      let minSales = Math.min(...this.data[0].data.map(e => e.value)) 
      let maxSales = Math.max(...this.data[0].data.map(e => e.value)) 
      let sales = Math.floor(Math.random() * (maxSales - minSales)) + minSales      
      let minExpense = Math.min(...this.data[1].data.map(e => e.value)) 
      let maxExpense = Math.max(...this.data[1].data.map(e => e.value)) 
      let expense = Math.floor(Math.random() * (maxExpense - minExpense)) + minExpense      
      this.addData(year, sales, expense)
    },10000)
  }

  ngOnInit() {
  }

  title = 'Year/Sales~Expense';
  typeLine = 'LineChart';
  typeArea = 'AreaChart';
  options = {
    colors: ['#e0440e', '#e6693e', '#ec8f6e', '#f3b49f', '#f6c7b6'],
    is3D: true,
    animation: {
      duration: 1500,
      startup: true
    }
  };
  width = 550;
  height = 400;

  formatColumns(data): void {
    this.columnNames[0] = Object.keys(data[0].data[0])[0]
    data.map(e => this.columnNames.push(e.category))
  }

  formatData(data) {
    let dataTemp: any[] = []
    dataTemp = data.map(el => el.data)
    for (let i = 0; i < dataTemp[0].length; i++) {
      let temp: any[] = []
      dataTemp.forEach(el => {
        temp.push(el[i].year.toString(), el[i].value)
      })
      temp.splice(2, 1)
      this.formatChartData(temp)
    }
  }

  formatChartData(temp) {
    this.dataChart.push(temp)
    this.dataChart = [...this.dataChart]
  }

  addData(year, sales, expense) {
    let temp = [
      year.toString(),
      parseInt(sales),
      parseInt(expense)
    ]
    this.formatChartData(temp)
  }

}
