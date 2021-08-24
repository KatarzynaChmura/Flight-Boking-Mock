import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-your-reservations',
  templateUrl: './your-reservations.component.html',
  styleUrls: ['./your-reservations.component.scss']
})
export class YourReservationsComponent implements OnInit {
  profileForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    passangers: ['', Validators.required], 
    class: ['', Validators.required],
    departure: ['', Validators.required],
    arrival: ['', Validators.required],
    // address: this.fb.group({
    //   street: [''],
    //   city: [''],
    //   state: [''],
    //   zip: ['']
    // }),
  });

  
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['departure', 'arrival', 'outlet', 'outlethour', 'action'];
  
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.getRemoteData();
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.profileForm.value);
  }

  getRemoteData() {

    const remoteDummyData = [
      {
        "departure": "Warszawa Okęcie (WAW)",
        "arrival": "Rzeszów Jasionka (RZE)",
        "outlet": "25.08.2021",
        "outlethour": "16:05"
      },
      {
        "departure": "Rzeszów Jasionka (RZE)",
        "arrival": "Lublin Świdnik (LUB)",
        "outlet": "30.09.2021",
        "outlethour": "15:00"
      },
      {
        "departure": "Moskwa Rosja",
        "arrival": "Katowice Pyrzowice (KTW)",
        "outlet": "04.09.2021",
        "outlethour": "14:25"
      },
      {
        "departure": "Rejkiawik Islandia (RKV)",
        "arrival": "Warszawa Okęcie (WAW)",
        "outlet": "18.09.2021",
        "outlethour": "13:15"
      },
      {
        "departure": "Katowice Pyrzowice (KTW)",
        "arrival": "Warszawa Modlin (WMI)",
        "outlet": "18.09.2021",
        "outlethour": "12:35"
      },
      {
        "departure": "Kraków Balice (KRK)",
        "arrival": "Warszawa Okęcie (WAW)",
        "outlet": "22.09.2021",
        "outlethour": "11:55"
      },
      {
        "departure": "Warszawa Modlin (WMI)",
        "arrival": "Moskwa Rosja",
        "outlet": "28.08.2021",
        "outlethour": "10:05"
      },
      {
        "departure": "Lublin Świdnik (LUB)",
        "arrival": "Warszawa Okęcie (WAW)",
        "outlet": "30.09.2021",
        "outlethour": "09:45"
      },
      {
        "departure": "Lublin Świdnik (LUB)",
        "arrival": "Rejkiawik Islandia (RKV)",
        "outlet": "10.09.2021",
        "outlethour": "08:30"
      },
      {
        "departure": "Warszawa Okęcie (WAW)",
        "arrival": "Kraków Balice (KRK)",
        "outlet": "28.09.2021",
        "outlethour": "07:50"
      }
    ];
    this.dataSource.data = remoteDummyData;
  }

}
