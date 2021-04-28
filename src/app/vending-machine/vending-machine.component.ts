import { Component, OnInit } from '@angular/core';

type Candy = {
  name: string
  price: number
  url: string
  selected: boolean;
  canBuy: boolean;
};

type Coin = {
  value: number,
  url: string
};

type Alert = {
  type: string;
  message: string;
};

@Component({
  selector: 'app-vending-machine',
  templateUrl: './vending-machine.component.html',
  styleUrls: ['./vending-machine.component.scss']
})
export class VendingMachineComponent implements OnInit {
  candys: Candy[];
  coins: Coin[];
  coinsReturn: Coin[];
  history: any[] = [0];
  totalCoin = 0;
  coinReturned: Coin | null = null;
  cannotProcessCoin = false;
  alert?: Alert | null;
  purchased = false;
  candyPurchased: Candy | null = null;

  constructor() {
    this.candys = [
      {
        name: 'A',
        price: 6,
        url: '../assets/images/a.png',
        selected: false,
        canBuy: false
      },
      {
        name: 'B',
        price: 7,
        url: '../assets/images/b.png',
        selected: false,
        canBuy: false
      },
      {
        name: 'C',
        price: 8,
        url: '../assets/images/c.png',
        selected: false,
        canBuy: false
      }
    ];
    this.coins = [
      {
        value: 1,
        url: '../assets/images/1.png'
      },
      {
        value: 2,
        url: '../assets/images/2.png'
      },
      {
        value: 5, url: '../assets/images/5.png'
      }
    ];
    this.coinsReturn = [
      {
        value: 0,
        url: ''
      },
      {
        value: 1,
        url: '../assets/images/1-return.png'
      },
      {
        value: 2,
        url: '../assets/images/2-return.png'
      },
      {
        value: 3,
        url: '../assets/images/3-return.png'
      },
      {
        value: 4,
        url: '../assets/images/4-return.png'
      },
      {
        value: 5,
        url: '../assets/images/5-return.png'
      },
      {
        value: 6,
        url: '../assets/images/6-return.png'
      }
    ];
  }

  ngOnInit(): void { }

  selectCandy(candy: Candy): void {
    if (!this.canByCandy(candy)) {
      return;
    }
    this.candys.forEach(c => c.selected = false);
    candy.selected = true;
  }

  buy(): void {
    if (this.purchased) {
      return;
    }
    if (!this.canByAnyCandy()) {
      this.alert = this.generateAlert('Insira um valor mínimo de um doce para efetuar uma compra!');
      this.closeAlertAfterNSeconds(5);
      return;
    }
    if (this.candys.every(c => !c.selected)) {
      this.alert = this.generateAlert('Selecione algum doce');
      this.closeAlertAfterNSeconds(5);
      return;
    }
    this.candyPurchased = this.candys.filter(c => c.selected)[0];
    this.candys.splice(this.candys.indexOf(this.candyPurchased), 1, this.getNullCandy());
    this.coinReturned = this.coinsReturn[this.totalCoin - this.candyPurchased.price];
    this.totalCoin = 0;
    this.clearCandys();
    this.history = [...this.history, this.candyPurchased.name, this.coinReturned.value];
    this.purchased = true;
    console.log(this.history);
  }

  insertCoin(value: number): void {
    if (this.cannotProcessCoin || this.purchased) {
      return;
    }
    this.totalCoin += value;
    this.history = [...this.history, this.totalCoin];
    this.checkIfCandysAreAvailable();
    if (this.candys.every(c => c.price <= this.totalCoin)) {
      this.cannotProcessCoin = true;
    }
  }

  getCoinFormatted(coin: number): string {
    return `R$ ${coin},00`;
  }

  getNullCandy(): Candy {
    return { name: '', price: 0, url: '', selected: false, canBuy: false };
  }

  closeAlert(): void { this.alert = null; }

  canByAnyCandy(): boolean {
    return this.candys.some(candy => this.totalCoin >= candy.price);
  }

  canByCandy(candy: Candy): boolean {
    return this.totalCoin >= candy.price;
  }

  generateAlert(message: string = ''): Alert {
    return { type: 'dark', message };
  }

  closeAlertAfterNSeconds(seconds: number): void {
    setTimeout(() => {
      if (!this.alert) {
        return;
      }
      this.alert = null;
    }, seconds * 1000);
  }

  checkIfCandysAreAvailable(): void {
    this.candys.forEach(candy => candy.canBuy = this.canByCandy(candy));
  }

  clearCandys(): void {
    this.candys.forEach(candy => {
      candy.canBuy = false;
      candy.selected = false;
    });
  }

}
