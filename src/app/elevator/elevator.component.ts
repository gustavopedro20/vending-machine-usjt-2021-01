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
    { key: 'T', value: 0 },
    { key: '1', value: 1 },
    { key: '2', value: 2 },
    { key: '3', value: 3 },
  ];
  currentFloor = 0;
  doorIsOpen = true;
  elevatorTransition = '';
  elevatorBottom = '0%';
  elevatorVelocity = 1100;
  isTransition = false;
  symbolTransition = '';

  constructor() { }

  ngOnInit(): void { }

  onFloorClick(floor: number): void {
    if (this.isTransition) {
      return;
    }
    if (this.isSameFloor(floor)) {
      return;
    }
    const height = floor * 26.6;
    const animate = Math.abs(this.currentFloor - floor) * 2000;
    this.changeElavateState(floor, height, animate);
  }

  decodeHTMLCode(code: string): string {
    const tempElement = document.createElement('div');
    tempElement.innerHTML = code;
    return tempElement.innerText;
  }

  private changeElavateState(floor: number, height: number, animate: number): void {
    this.setArrowSense(floor);
    this.doorIsOpen = false;

    setTimeout(() => {
      this.isTransition = true;
      this.elevatorTransition = `all ${animate}ms linear`;
      this.elevatorBottom = `${height}%`;
      this.currentFloor = floor;

      setTimeout(() => {
        this.doorIsOpen = true;

        setTimeout(() => this.isTransition = false, 600);

      }, animate);

    }, this.elevatorVelocity);
  }

  private isSameFloor(floor: number): boolean {
    return floor === this.currentFloor;
  }

  private setArrowSense(floor: number): void {
    if (floor > this.currentFloor) {
      this.symbolTransition = '&#8673;';
    } else {
      this.symbolTransition = '&#8675;';
    }
  }
}
