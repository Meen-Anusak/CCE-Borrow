

export interface Role {
  value: string;
  viewValue: string;
}

export interface userNav {
  fname:string,
  lname:string,
  image:any
}

export interface IUsers {
  studentID:string;
  fname:string;
  lname:string;
  image?:any;
  password:string;
  role:any
}

export const Irole = {
  admin : 'ผู้ดูแล',
  instructor:'อาจารย์',
  student:'นักศึกษา',
}

