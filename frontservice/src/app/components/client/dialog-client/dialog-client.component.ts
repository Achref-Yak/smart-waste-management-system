import {Component, Inject, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validator, Validators} from "@angular/forms";
import {RessourcesService} from "../../../services/ressources.service"
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'

@Component({
  selector: 'app-dialog-client',
  templateUrl: './dialog-client.component.html',
  styleUrls: ['./dialog-client.component.css']
})
export class DialogClientComponent implements OnInit {

  trushSize = ["Small", "Meduim", "Big"]
  clientForm !: FormGroup;
  actionBtn : string = "Save"
  constructor(private formBuilder : FormBuilder,
              private api : RessourcesService,
              @Inject(MAT_DIALOG_DATA) public editData : any,
              private dialogRef : MatDialogRef<DialogClientComponent>) { }

  ngOnInit(): void {
    this.clientForm = this.formBuilder.group({
      clientName : ['',Validators.required],
      clientEmail : ['',Validators.required],
      clientAddress : ['',Validators.required],
      clientType : ['',Validators.required],
      clientCIN : ['',Validators.required],
      client_trushSize : ['',Validators.required]
    })
    if (this.editData){
      this.actionBtn="Update"
      this.clientForm.controls['clientName'].setValue(this.editData.clientName);
      this.clientForm.controls['clientEmail'].setValue(this.editData.clientEmail);
      this.clientForm.controls['clientAddress'].setValue(this.editData.clientAddress);
      this.clientForm.controls['clientType'].setValue(this.editData.clientType);
      this.clientForm.controls['clientCIN'].setValue(this.editData.clientCIN);
      this.clientForm.controls['client_trushSize'].setValue(this.editData.client_trushSize);
    }
  }
  addClient(){
    if(!this.editData){
      if(this.clientForm.valid){
        this.api.postClient(this.clientForm.value)

          .subscribe({
            next:(res)=>{
              alert("Client added successfully")
              this.clientForm.reset();
              this.dialogRef.close('save');
            },
            error:()=>{
              alert("Error while adding the client")
            }
          })

      }
    }
    else {
      this.updateClient()
    }
  }
  updateClient(){
    console.log(this.editData._id);
    this.api.putClient(this.clientForm.value,this.editData._id)
      .subscribe({
        next:(res)=>{
          alert("client updated Successfully");
          this.clientForm.reset();
          this.dialogRef.close('update');
        },
        error:()=>{
          alert("Error while updating the record!")

        }
      })

  }
  deleteClientt(){
    this.api.deleteClient(this.editData._id)
    console.log(this.editData)
  }
}