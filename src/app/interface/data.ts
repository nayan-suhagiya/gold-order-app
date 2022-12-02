export class Data {
  id: string;
  oid: number = Math.floor(Math.random() * 100000);
  jtype!: string;
  price!: number;
  quantity!: number;
  weight!: string;
  cname!: string;
  cmobile!: number;
  caddress!: string;
  city!: string;
  status!: string;
}
