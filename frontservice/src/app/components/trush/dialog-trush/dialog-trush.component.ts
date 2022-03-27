import {Component, Inject, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validator, Validators} from "@angular/forms";
import {RessourcesService} from "../../../services/ressources.service";
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'

@Component({
  selector: 'app-dialog-trush',
  templateUrl: './dialog-trush.component.html',
  styleUrls: ['./dialog-trush.component.css']
})
export class DialogTrushComponent implements OnInit {

  trushList = ["Small", "Meduim", "Big"]
  trushForm !: FormGroup;
  actionBtnTrush : string = "Save"
  constructor(private formBuilder : FormBuilder,
              private api : RessourcesService,
              @Inject(MAT_DIALOG_DATA) public editDataTrush : any,
              private dialogRef : MatDialogRef<DialogTrushComponent>) { }

  ngOnInit(): void {
    this.trushForm = this.formBuilder.group({
      lontitude : ['',Validators.required],
      latitude : ['',Validators.required],
      Size : ['',Validators.required],
      date : ['',Validators.required]
    })
    if (this.editDataTrush){
      this.actionBtnTrush="Update"
      this.trushForm.controls['lontitude'].setValue(this.editDataTrush.lontitude);
      this.trushForm.controls['latitude'].setValue(this.editDataTrush.latitude);
      this.trushForm.controls['Size'].setValue(this.editDataTrush.Size);
      this.trushForm.controls['date'].setValue(this.editDataTrush.date);
    }
  }
  addTrush(){
    if(!this.editDataTrush){
      if(this.trushForm.valid){
        this.api.postTrush(this.trushForm.value)
          .subscribe({
            next:(res)=>{
              alert("Truck added successfully")
              this.trushForm.reset();
              this.dialogRef.close('save');
            },
            error:()=>{
              alert("Error while adding the truck")
            }
          })

      }
    }
    else {
      this.updateTrush()
    }
  }
  updateTrush(){
    this.api.putTrush(this.trushForm.value,this.editDataTrush.id)
      .subscribe({
        next:(res)=>{
          alert("Truck updated Successfully");
          this.trushForm.reset();
          this.dialogRef.close('update');
        },
        error:()=>{
          alert("Error while updating the record!")

        }
      })

  }
  deleteTrush(){
    this.api.deleteTrush(this.editDataTrush.id)
  }





  
}