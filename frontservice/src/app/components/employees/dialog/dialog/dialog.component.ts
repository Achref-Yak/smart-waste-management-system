import {Component, Inject, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validator, Validators} from "@angular/forms";
import {RessourcesService} from "../../../../services/ressources.service"
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  jobList = ["Brand New", "Second Hand", "Refurbished"]
  productForm !: FormGroup;
  actionBtn : string = "Save"
  constructor(private formBuilder : FormBuilder,
              private api : RessourcesService,
              @Inject(MAT_DIALOG_DATA) public editData : any,
              private dialogRef : MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      employeeName : ['',Validators.required],
      employeeEmail : ['',Validators.required],
      employeeJob : ['',Validators.required],
      employeeSalary : ['',Validators.required],
      employeeCIN : ['',Validators.required],
      date : ['',Validators.required]
    })
    if (this.editData){
      this.actionBtn="Update"
      this.productForm.controls['employeeName'].setValue(this.editData.employeeName);
      this.productForm.controls['employeeEmail'].setValue(this.editData.employeeEmail);
      this.productForm.controls['employeeJob'].setValue(this.editData.employeeJob);
      this.productForm.controls['employeeSalary'].setValue(this.editData.employeeSalary);
      this.productForm.controls['employeeCIN'].setValue(this.editData.employeeCIN);
      this.productForm.controls['date'].setValue(this.editData.date);
    }
  }
  addProduct(){
    if(!this.editData){
      if(this.productForm.valid){
        this.api.postProduct(this.productForm.value)
          .subscribe({
            next:(res)=>{
              alert("Product added successfully")
              this.productForm.reset();
              this.dialogRef.close('save');
            },
            error:()=>{
              alert("Error while adding the product")
            }
          })

      }
    }
    else {
      this.updateProduct()
    }
  }
  updateProduct(){
    this.api.putProduct(this.productForm.value,this.editData.id)
      .subscribe({
        next:(res)=>{
          alert("Product updated Successfully");
          this.productForm.reset();
          this.dialogRef.close('update');
        },
        error:()=>{
          alert("Error while updating the record!")

        }
      })

  }
  deleteProduct(){
    this.api.deleteProduct(this.editData.id)
  }
}