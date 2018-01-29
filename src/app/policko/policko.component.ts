import { Component, OnInit, Output, EventEmitter, Input} from '@angular/core';

@Component({
  selector: 'app-policko',
  templateUrl: './policko.component.html',
  styleUrls: ['./policko.component.css']
})
export class PolickoComponent {
	@Output() odosielamKtoJeNaTahu: EventEmitter<{ id:number, naTahuJe: boolean, }> = new EventEmitter();
	ideHracO: boolean = false;
  	ideHracX: boolean = false;
 	@Input() naTahuJeO: boolean;
 	@Input() uniqueId: number;
 	@Input() rad: number;
 	@Input() stlpec: number;
 	@Input() velkostPola: number;
	skrytPolicko:boolean = false;
	constructor() {
	}

	oznacPolicko() {
		if (!this.ideHracO && !this.ideHracX) {
			//volam klikom output pre zmenu tahu a davam policku klasu
			if (this.naTahuJeO) {
				this.ideHracX = true;
				this.odosielamKtoJeNaTahu.emit({
					id: this.uniqueId,
					naTahuJe: !this.naTahuJeO});	
			} else {
				this.ideHracO = true;
				this.odosielamKtoJeNaTahu.emit({
					id: this.uniqueId,
					naTahuJe: !this.naTahuJeO});
			} 
		}
	}

	ngOnChanges() {
		this.skrytPolicko = false;
		if (this.rad < 4 || this.rad > this.velkostPola - 5) {this.skrytPolicko = true;}
		if (this.stlpec < 4 || this.stlpec > this.velkostPola - 5) {this.skrytPolicko = true;}
		
	}
}