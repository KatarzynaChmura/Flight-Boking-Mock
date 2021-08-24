import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-search-flights',
  templateUrl: './search-flights.component.html',
  styleUrls: ['./search-flights.component.scss']
})
export class SearchFlightsComponent implements OnInit {

  range = new FormGroup({
    start: new FormControl(null, Validators.required),
    end: new FormControl(null, Validators.required)
  });

   today = new Date(); // This date will be used for the min date  
  // myFilter = (date: Date)=> ![0,6].includes(date.getDay());   

  filterValues : {
    [key: string ]: unknown
  } = {} ;

  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'departure', 'arrival', 'outlet', 'outlethour', 'return', 'returnhour', 'action'];

  filterSelectObj: {
    name: string,
    columnProp: string,
    options: unknown[],
    modelValue?: string
  } [] = [];

  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  // }

  constructor() {

    // const currentYear = new Date().getFullYear();
    // this.minDate = new Date(currentYear);

    // Object to create Filter for
    this.filterSelectObj = 
      [
        {
          name: 'ID',
          columnProp: 'id',
          options: []
        }, {
          name: 'Wylot',
          columnProp: 'departure',
          options: []
        }, {
          name: 'Przylot',
          columnProp: 'arrival',
          options: []
        }, {
          name: 'Data wylotu',
          columnProp: 'outlet',
          options: []
        }, {
          name: 'Data powrotuu',
          columnProp: 'return',
          options: []
        }
      ]    
   }

   ngOnInit() {
    this.getRemoteData();

    // Overrride default filter behaviour of Material Datatable
    this.dataSource.filterPredicate = this.createFilter();
  }

  // Get Uniqu values from columns to build filter
  getFilterObject(fullObj: any[], key: string) {
    const uniqChk: any[] = [];
    fullObj.filter((obj: { [x: string]: any; }) => {
      if (!uniqChk.includes(obj[key])) {
        uniqChk.push(obj[key]);
      }
      return obj;
    });
    return uniqChk;
  }

  // Get remote serve data using HTTP call
  getRemoteData() {

    const remoteDummyData = [
      {
        "id": 1,
        "departure": "Warszawa Okęcie (WAW)",
        "arrival": "Rzeszów Jasionka (RZE)",
        "outlet": "25.08.2021",
        "outlethour": "16:05",
        "return": "28.08.2021",
        "returnhour": "17:05"
      },
      {
        "id": 2,
        "departure": "Rzeszów Jasionka (RZE)",
        "arrival": "Lublin Świdnik (LUB)",
        "outlet": "30.09.2021",
        "outlethour": "15:00",
        "return": "03.10.2021",
        "returnhour": "16:00"
      },
      {
        "id": 3,
        "departure": "Moskwa Rosja",
        "arrival": "Katowice Pyrzowice (KTW)",
        "outlet": "04.09.2021",
        "outlethour": "14:25",
        "return": "07.09.2021",
        "returnhour": "15:25"
      },
      {
        "id": 4,
        "departure": "Rejkiawik Islandia (RKV)",
        "arrival": "Warszawa Okęcie (WAW)",
        "outlet": "18.09.2021",
        "outlethour": "13:15",
        "return": "21.09.2021",
        "returnhour": "14:15"
      },
      {
        "id": 5,
        "departure": "Katowice Pyrzowice (KTW)",
        "arrival": "Warszawa Modlin (WMI)",
        "outlet": "18.09.2021",
        "outlethour": "12:35",
        "return": "21.09.2021",
        "returnhour": "13:35"
      },
      {
        "id": 6,
        "departure": "Kraków Balice (KRK)",
        "arrival": "Warszawa Okęcie (WAW)",
        "outlet": "22.09.2021",
        "outlethour": "11:55",
        "return": "25.09.2021",
        "returnhour": "15:55"
      },
      {
        "id": 7,
        "departure": "Warszawa Modlin (WMI)",
        "arrival": "Moskwa Rosja",
        "outlet": "28.08.2021",
        "outlethour": "10:05",
        "return": "02.10.2021",
        "returnhour": "11:05"
      },
      {
        "id": 8,
        "departure": "Lublin Świdnik (LUB)",
        "arrival": "Warszawa Okęcie (WAW)",
        "outlet": "30.09.2021",
        "outlethour": "09:45",
        "return": "04.10.2021",
        "returnhour": "10:45"
      },
      {
        "id": 9,
        "departure": "Lublin Świdnik (LUB)",
        "arrival": "Rejkiawik Islandia (RKV)",
        "outlet": "10.09.2021",
        "outlethour": "08:30",
        "return": "19.09.2021",
        "returnhour": "09:30"
      },
      {
        "id": 10,
        "departure": "Warszawa Okęcie (WAW)",
        "arrival": "Kraków Balice (KRK)",
        "outlet": "28.09.2021",
        "outlethour": "07:50",
        "return": "05.10.2021",
        "returnhour": "08:50"
      }
    ];
    this.dataSource.data = remoteDummyData;

    this.filterSelectObj.filter((o) => {
      o.options = this.getFilterObject(remoteDummyData, o.columnProp);
    });

  }

  // Called on Filter change
  filterChange(filter: { columnProp: string | number; }, event:Event) {
    // let filterValues = {}
    // let filterValues: string = (<any>this.filterSelectObj);
    const ev = event as unknown as { target: { value: string}}
    
    this.filterValues[filter.columnProp] = ev.target.value.trim().toLowerCase()
    this.dataSource.filter = JSON.stringify(this.filterValues)
  }

    // Custom filter method fot Angular Material Datatable
    createFilter() {
      let filterFunction = function (data: any, filter: string): boolean {
        let searchTerms = JSON.parse(filter);
        let isFilterSet = false;
        for (const col in searchTerms) {
          if (searchTerms[col].toString() !== '') {
            isFilterSet = true;
          } else {
            delete searchTerms[col];
          }
        }
  
        console.log(searchTerms);
  
        let nameSearch = () => {
          let found = false;
          if (isFilterSet) {
            for (const col in searchTerms) {
              searchTerms[col].trim().toLowerCase().split(' ').forEach((word: any) => {
                if (data[col].toString().toLowerCase().indexOf(word) != -1 && isFilterSet) {
                  found = true
                }
              });
            }
            return found
          } else {
            return true;
          }
        }
        return nameSearch()
      }
      return filterFunction
    }
  
  
    // Reset table filters
    resetFilters() {
      this.filterValues = {}
      this.filterSelectObj.forEach((value, key) => {
        value.modelValue = undefined;
      })
      this.dataSource.filter = "";
    }

}
