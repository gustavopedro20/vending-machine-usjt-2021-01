import { Component, OnInit } from '@angular/core';

type Floor = {
  key: string,
  value: number,
};

@Component({
  selector: 'app-elevator',
  templateUrl: './elevator.component.html',
  styleUrls: ['./elevator.component.scss']
})
export class ElevatorComponent implements OnInit {
  floors: Floor[] = [
    { key: 'GL', value: 0 },
    { key: '1', value: 1 },
    { key: '2', value: 2 },
    { key: '3', value: 3 },
    { key: '4', value: 4 }
  ];
  currentFloor = 0;
  doorIsActivated = true;
  elevatorTransition = '';
  elevatorBottom = '0%';

  constructor() { }

  ngOnInit(): void { }

  onFloorClick(floor: number): void {
    const height = floor * 20;
    const animate = Math.abs(this.currentFloor - floor) * 1000;

    if (floor === this.currentFloor) {
      return;
    }

    this.doorIsActivated = false;

    setTimeout(() => {
      this.elevatorTransition = `all ${animate}ms linear`;
      this.elevatorBottom = `${height}%`;
      this.currentFloor = floor;

      setTimeout(() => {
        this.doorIsActivated = true;
      }, animate);

    }, 300);
  }
}
