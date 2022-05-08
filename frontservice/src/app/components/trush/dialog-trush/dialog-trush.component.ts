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

  trashList = ["Small", "Medium", "Big"]
  trashForm !: FormGroup;
  submitted = false ;
  actionBtnTrash : string = "Save"
  constructor(private formBuilder : FormBuilder,
              private api : RessourcesService,
              @Inject(MAT_DIALOG_DATA) public editDataTrash : any,
              private dialogRef : MatDialogRef<DialogTrushComponent>) { }

  ngOnInit(): void {
    this.trashForm = this.formBuilder.group({
      _id : ['',Validators.required],
      longitude : ['',Validators.required],
      latitude : ['',Validators.required],
      size : ['',Validators.required],
      date : ['',Validators.required]
    })
    if (this.editDataTrash){
      this.actionBtnTrash="Update"
      this.trashForm.controls['_id'].setValue(this.editDataTrash._id);
      this.trashForm.controls['longitude'].setValue(this.editDataTrash.longitude);
      this.trashForm.controls['latitude'].setValue(this.editDataTrash.latitude);
      this.trashForm.controls['size'].setValue(this.editDataTrash.size);
      this.trashForm.controls['date'].setValue(this.editDataTrash.date);
    }
  }
  
  addTrash(){
    this.submitted = true;
    if(!this.editDataTrash){
      if(this.trashForm.valid){
        this.api.postTrush(this.trashForm.value)
          .subscribe({
            next:(res)=>{
              alert("Truck added successfully")
              this.trashForm.reset();
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
  get f() { return this.trashForm.controls; }
  updateTrush(){
    this.api.putTrush(this.trashForm.value,this.editDataTrash.id)
      .subscribe({
        next:(res)=>{
          alert("Truck updated Successfully");
          this.trashForm.reset();
          this.dialogRef.close('update');
        },
        error:()=>{
          alert("Error while updating the record!")

        }
      })

  }
  deleteTrush(){
    this.api.deleteTrush(this.editDataTrash.id)
  }






}
