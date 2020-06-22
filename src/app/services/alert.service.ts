import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private snackBar : MatSnackBar) { }

  ontify_Info(message ,time?:number){
    this.snackBar.open("SYSTEM : "+ message,"",{
      duration:time,
      verticalPosition: 'top',
      horizontalPosition:'end',
      panelClass:['alert-info']
    })
  }

  ontify_Success(message ,time?:number){
    this.snackBar.open("SYSTEM : "+ message,"",{
      duration:time,
      verticalPosition: 'top',
      horizontalPosition: 'end',
      panelClass:['alert-success']
    })
  }

  ontify_Success_center(message ,time?:number){
    this.snackBar.open("SYSTEM : "+ message,"",{
      duration:time,
      verticalPosition: 'top',
      horizontalPosition: 'center',
      panelClass:['alert-success-center']
    })
  }

  ontify_Danger(message ,time?:number){
    this.snackBar.open("SYSTEM : "+ message,"",{
      duration:time,
      verticalPosition: 'top',
      horizontalPosition:'end',
      panelClass:['alert-danger']
    })
  }
  ontify_Danger_center(message ,time?:number){
    this.snackBar.open("SYSTEM : "+ message,"",{
      duration:time,
      verticalPosition: 'top',
      horizontalPosition:'center',
      panelClass:['alert-danger-center']
    })
  }

  ontify_Warning(message ,time?:number){
    this.snackBar.open("SYSTEM : "+ message,"",{
      duration:time,
      verticalPosition: 'top',
      horizontalPosition:'end',
      panelClass:['alert-warning']
    })
  }

}
