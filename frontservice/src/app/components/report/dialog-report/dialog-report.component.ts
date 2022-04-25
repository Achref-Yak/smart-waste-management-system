import {Component, Inject, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validator, Validators} from "@angular/forms";
import {RessourcesService} from "../../../services/ressources.service"
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'


@Component({
  selector: 'app-dialog-report',
  templateUrl: './dialog-report.component.html',
  styleUrls: ['./dialog-report.component.css']
})
export class DialogReportComponent implements OnInit {

  reportForm !: FormGroup;
  actionBtn : string = "Save"
  constructor(private formBuilder : FormBuilder,
              private api : RessourcesService,
              @Inject(MAT_DIALOG_DATA) public editData : any,
              private dialogRef : MatDialogRef<DialogReportComponent>) { }

  ngOnInit(): void {

    this.reportForm = this.formBuilder.group({
      Name : ['',Validators.required],
      Email : ['',Validators.required],
      Subject : ['',Validators.required],
      Content : ['',Validators.required],
      Location : ['',Validators.required],
      
    })
  }
  addReport(){
      if(this.reportForm.valid){
        
        this.api.postReport(this.reportForm.value)
            
            .subscribe({
              
              next:(res)=>{
                console.log(res);
                alert("Report added successfully")
                this.reportForm.reset();
                this.dialogRef.close('save');
              },
              error:()=>{
                
                alert("Error while adding the Report")
              }
            })
            
      }  
  }     
}
