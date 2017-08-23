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
  // '_id': '599bb7422db4af0727a90e1b',
  +serial: string,
  +lastSeen: Date,
  +product: Product,
  // '__v': 0,
  +registrations: Array<Registration>,
}
