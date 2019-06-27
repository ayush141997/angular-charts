import { Component, OnInit } from '@angular/core';
import { Screen1Service } from '../../services/screen1.service'
import { Subscription } from 'rxjs';

interface response {
  data: any[]
}

@Component({
  selector: 'app-screen1',
  templateUrl: './screen1.component.html',
  styleUrls: ['./screen1.component.scss']
})
export class Screen1Component implements OnInit {

  data: any[]
  columnNames: string[] = []
  columnNamesPie: string[] = []
  columnNamesDonut: string[] = []
  dataDonut: any[] = []
  dataChart: any[] = []
  dataPie: any[] = []
  subscription: Subscription

  constructor(private _serv: Screen1Service) {
    this.subscription = _serv.getData().subscribe((res: response) => {
      this.data = res.data
      this.formatColumns(this.data)
      this.formatData(this.data)
    })
  }

  ngOnInit() {
  }

  titlePie = 'Year/Sales';
  typePie = 'PieChart';
  titleColumn = 'Year/Sales~Expense';
  typeColumn = 'ColumnChart';
  titleDonut = 'Year/Expense'
  titleBar = 'Year/Sales~Expense';
  typeBar = 'BarChart';
  options = {
    colors: ['#e0440e', '#e6693e', '#ec8f6e', '#f3b49f', '#f6c7b6'],
    is3D: true,
    pieHole: 0.5,
    animation: {
      duration: 1500,
      startup: true
    }
  };
  optionsDonut = {
    colors: ['#e0440e', '#e6693e', '#ec8f6e', '#f3b49f', '#f6c7b6'],
    pieHole: 0.5,
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
    const columnPieTemp = Object.assign([], this.columnNames)
    columnPieTemp.splice(2, 1)
    this.columnNamesPie = Object.assign([], columnPieTemp)
    const columnDonutTemp = Object.assign([], this.columnNames)
    columnDonutTemp.splice(1, 1)
    this.columnNamesDonut = Object.assign([], columnDonutTemp)
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
    const temp1 = Object.assign([], temp)
    temp1.splice(2, 1)
    this.dataPie.push(temp1)
    const temp2 = Object.assign([], temp)
    temp2.splice(1, 1)
    this.dataDonut.push(temp2)
    this.dataChart = [...this.dataChart]
    this.dataPie = [...this.dataPie]
    this.dataDonut = [...this.dataDonut]
  }

  addData(e) {
    e.preventDefault()
    const target = e.target
    const year = target.querySelector('input[name=year]').value
    const sales = target.querySelector('input[name=sales]').value
    const expense = target.querySelector('input[name=expense]').value
    let temp = [
      year.toString(),
      parseInt(sales),
      parseInt(expense)
    ]
    this.formatChartData(temp)
    target.reset()
  }
}
