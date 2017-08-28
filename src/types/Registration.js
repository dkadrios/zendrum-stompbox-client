/* @flow */

type Product = 'STOMPBLOCK'

export type Registration = {
  +registered: Date,
  +firstName: string,
  +lastName: string,
  +email: string,
  +active: boolean,
}

export type ProductInstance = {
  +serial: string,
  +lastSeen: Date,
  +product: Product,
  +registrations: Array<Registration>,
}
