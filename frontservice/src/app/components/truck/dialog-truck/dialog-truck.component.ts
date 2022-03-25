import {Component, Inject, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validator, Validators} from "@angular/forms";
import {RessourcesService} from "../../../services/ressources.service";
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'

@Component({
  selector: 'app-dialog-truck',
  templateUrl: './dialog-truck.component.html',
  styleUrls: ['./dialog-truck.component.css']
})
export class DialogTruckComponent implements OnInit {

  truckList = ["Brand New", "Second Hand", "Refurbished"]
  truckForm !: FormGroup;
  actionBtnTruck : string = "Save"
  constructor(private formBuilder : FormBuilder,
              private api : RessourcesService,
              @Inject(MAT_DIALOG_DATA) public editDataTruck : any,
              private dialogRef : MatDialogRef<DialogTruckComponent>) { }

  ngOnInit(): void {
    this.truckForm = this.formBuilder.group({
      regNumber : ['',Validators.required],
      truckBrand : ['',Validators.required],
      tankVolume : ['',Validators.required],
      firstDriver : ['',Validators.required],
      secondDriver : ['',Validators.required],
      date : ['',Validators.required]
    })
    if (this.editDataTruck){
      this.actionBtnTruck="Update"
      this.truckForm.controls['regNumber'].setValue(this.editDataTruck.regNumber);
      this.truckForm.controls['truckBrand'].setValue(this.editDataTruck.truckBrand);
      this.truckForm.controls['tankVolume'].setValue(this.editDataTruck.tankVolume);
      this.truckForm.controls['firstDriver'].setValue(this.editDataTruck.firstDriver);
      this.truckForm.controls['secondDriver'].setValue(this.editDataTruck.secondDriver);
      this.truckForm.controls['date'].setValue(this.editDataTruck.date);
    }
  }
  addTruck(){
    if(!this.editDataTruck){
      if(this.truckForm.valid){
        this.api.postTruck(this.truckForm.value)
          .subscribe({
            next:(res)=>{
              alert("Truck added successfully")
              this.truckForm.reset();
              this.dialogRef.close('save');
            },
            error:()=>{
              alert("Error while adding the truck")
            }
          })

      }
    }
    else {
      this.updateTruck()
    }
  }
  updateTruck(){
    this.api.putTruck(this.truckForm.value,this.editDataTruck.id)
      .subscribe({
        next:(res)=>{
          alert("Truck updated Successfully");
          this.truckForm.reset();
          this.dialogRef.close('update');
        },
        error:()=>{
          alert("Error while updating the record!")

        }
      })

  }
  deleteTruck(){
    this.api.deleteTruck(this.editDataTruck.id)
  }
}
