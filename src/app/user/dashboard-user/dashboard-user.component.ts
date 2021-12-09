import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {ChartType, Row} from "angular-google-charts";
import {Folder} from "../../models/Folder.model";
import {Document} from "../../models/Document.model";
import {CheckingService} from "../../services/checking.service";
import {AuthService} from "../../services/auth.service";
import {MonthChecks} from "../../models/MonthChecks.model";

@Component({
  selector: 'app-dashboard-user',
  templateUrl: './dashboard-user.component.html',
  styleUrls: ['./dashboard-user.component.css']
})
export class DashboardUserComponent implements OnInit {
  constructor(private checkingService: CheckingService, private authService: AuthService) {

  }
  @ViewChild('mychart ', {static: false}) mychart;
  loadedFolders: Folder[] = [];
  loadedDocuments: Document[] = [];
  loadedMonths: MonthChecks[] = [];
  errorMessage: string = "";

  ngOnInit(): void {
    this.checkingService.foldersTopChecking(this.authService.curentUser.username).subscribe(
      (resData: any) => {
        this.loadedFolders = resData;
      },
      (error) => {
        this.errorMessage = error.error.message;
      }
    )

    this.checkingService.documentsTopChecking(this.authService.curentUser.username).subscribe(
      (resData: any) => {
        this.loadedDocuments = resData;
      },
      (error) => {
        this.errorMessage = error.error.message;
      }


    )

    this.checkingService.getChecksMonth(this.authService.curentUser.username).subscribe(
      (resData: any) => {
        this.loadedMonths = resData;
        this.fillChartData()
      },
      (error) => {
        this.errorMessage = error.error.message;
      }
    )
    console.log()
    this.chartData.width = window.innerWidth * 0,8
    this.chartData.height = window.innerHeight * 0,8
}
private fillChartData(){
    this.chartData.data=[];
    this.loadedMonths.forEach(el=>{
      this.chartData.data.push([el.month+"/"+el.year,el.checks])
    })
}

chartData = {
  type: ChartType.ComboChart,
  data: [
  ],
  chartColumns: ['Months', 'Visits'],

  width: 80,
  height: 100
};

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
    this.chartData.width = window.innerWidth * 0,8
    this.chartData.height = window.innerHeight * 0,8
    this.mychart.draw();
  }
}
