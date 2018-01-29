import { Component, ViewChildren, QueryList } from '@angular/core';
import { NgForm } from '@angular/forms'
import { PolickoComponent } from './policko/policko.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
	@ViewChildren(PolickoComponent) 
	policko: QueryList<PolickoComponent>;
	polickoArray: Array<PolickoComponent>
	defaultRad = "trivrade";
	defaultPole = "3";
	naTahuJeX: boolean = true;
	novaHraBtn: string = "Začať hru";
	vykreslenePole:boolean = false;
	idPolicka: number;
	jeKoniecHry: boolean = false;
	vitazJe: string;
	velkostPolaPreId: number; 
	velkostPola = [];
	pocetPolicok:number;
	vsetkoPlne: number = 0;
	dlzkaVitaznehoRadu: number;
	vypocetRadu:number; 
	jeRemiza: boolean = false;
	asponJednoPolicko:boolean = false;
	pole3 = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
	pole7 = [' ', ' ', ' ', ' ', ' ', ' ',' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
	pole15 = [' ', ' ', ' ', ' ', ' ', ' ',' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
	pole20 = [' ', ' ', ' ', ' ', ' ', ' ',' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];

	constructor() {
	}

	onSubmit(form: NgForm) {
		if (this.vykreslenePole && this.asponJednoPolicko) {this.resetPola();}
		switch (form.value.dlzkaradu) {
			case "trivrade": this.dlzkaVitaznehoRadu = 3;
							 this.vypocetRadu = -2;
							 break;
			case "styrivrade": this.dlzkaVitaznehoRadu = 4;
							   this.vypocetRadu = -3; 
							   break;
			case "patvrade": this.dlzkaVitaznehoRadu = 5;
							 this.vypocetRadu = -4; 
							 break;
		}
		switch (form.value.velkostpola) {
				case "3": this.velkostPola = this.pole3; 
						  this.velkostPolaPreId = 11; 
						  this.pocetPolicok = 9;
						  break;
				case "7": this.velkostPola = this.pole7; 
						  this.velkostPolaPreId = 15; 
						  this.pocetPolicok = 49;
						  break;
				case "15": this.velkostPola = this.pole15; 
						   this.velkostPolaPreId = 23; 
						   this.pocetPolicok = 225;
						   break;
				case "20": this.velkostPola = this.pole20; 
						   this.velkostPolaPreId = 28; 
						   this.pocetPolicok = 400;
						   break;
			}
		this.novaHraBtn = "Hrať znova";
		this.vykreslenePole = true;
	}
    
	prijimamKtoJeNaTahu(event: {id:number, naTahuJe: boolean, }): void {
		this.polickoArray = this.policko.toArray();
		this.naTahuJeX = event.naTahuJe;
		this.idPolicka = this.polickoArray[event.id].uniqueId;
		this.vitaznaPodmienka();
		this.asponJednoPolicko = true;
		this.vsetkoPlne++;
		console.log(this.vsetkoPlne);
	}

	koniecHry() {
		this.jeKoniecHry = true;
		if (!this.jeRemiza) {
			if (!this.naTahuJeX) {
				this.vitazJe = "Víťaz je :  X!"
			} 	else {
					this.vitazJe = "Víťaz je :  O"
				}

		}   else{ 
				this.vitazJe = "Remiza!"
			}
	}

	resetPola() {
		let dlzkaPola: number= this.velkostPolaPreId*this.velkostPolaPreId;
		for (let i = 0; dlzkaPola > i; i++) {
		  	 this.polickoArray[i].ideHracX = false;
			}

		for (let i = 0; dlzkaPola > i; i++) {
		  	 this.polickoArray[i].ideHracO = false;
			}
		this.jeKoniecHry = false;
		this.jeRemiza = false;
		this.naTahuJeX = true;
		this.asponJednoPolicko = false;
		this.vsetkoPlne = 0;
	}
  	
	vitaznaPodmienka() {
		let j: number = 0;
		let c: number = this.dlzkaVitaznehoRadu;
		let poleSmerov = [[-1,1], [0,1], [1,1], [1,0]];
		if (this.naTahuJeX) {	
			poleSmerov.forEach(([dx,dy]) => { 
				for (let i = this.vypocetRadu; i<c; i++) {
					if (this.polickoArray[this.idPolicka + dx*i+dy*i*this.velkostPolaPreId].ideHracO) {
						j++; 
						if (j === c) {
							this.koniecHry();
						}
						
					}else {
						j = 0;
					}
				}	
			});
		} else {
			poleSmerov.forEach(([dx,dy]) => { 
				for (let i = this.vypocetRadu; i<c; i++) {
					if (this.polickoArray[this.idPolicka + dx*i+dy*i*this.velkostPolaPreId].ideHracX) {
						j++; 
						if (j === c) {
							this.koniecHry();
						}
						
					}else {
						j = 0;
					}
				}	
			});
		}
		this.remiza();
	}
	
	remiza(){
		if (!this.jeKoniecHry) {
			if (this.vsetkoPlne === this.pocetPolicok-1) {
				this.jeRemiza = true;
				this.koniecHry();
			}
		}
	}
}