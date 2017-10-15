import mapper from './mapper'

const raw = [
  '1:Perc|Tumba Thump',
  '2:Perc|Tumba Open',
  '3:Perc|Quinto Slap',
  '4:Perc|Quinto Open Trio *',
  '5:Perc|Cajon 10 Open',
  '6:Perc|Cajon 10 Open-Slap *',
  '7:Perc|Cajon 12 Open',
  '8:Perc|Cajon 12 Open-Slap *',
  '9:Perc|Clave',
  '10:Perc|Djembe 1 Open',
  '11:Perc|Djembe 2 Mute',
  '12:Perc|Djembe Slap',
  '13:Perc|Bongo High Open-Slap *',
  '14:Perc|Bongo Low Open-Rim *',
  '15:Perc|Darbuka Center',
  '16:Perc|Darbuka Rim',
  '17:Perc|DS Tambourine',
  '18:Perc|Udu Strike',
  '19:Perc|Udu Scoop',
  '20:Perc|Doumbek Center',
  '21:Perc|Doumbek Rim',
  '22:Kicks|Bop Kick',
  '23:Kicks|General Kick',
  '24:Kicks|Sleishman 20',
  '25:Kicks|Tonal 1',
  '26:Kicks|Ti BD 26 (Amped)',
  '27:Kicks|Remo 18 Djembe (Beater)',
  '28:Snares|Sleishman Maple Snare Hit',
  '29:Snares|Sleishman Maple Snare Alt',
  '30:Snares|Sleishman Maple Snare Drag',
  '31:Snares|Sleishman Maple Snare RimSHot',
  '32:Snares|Sleishman Maple Snare XStick',
  '33:Snares|Sleishman Acrylic Snare Hit',
  '34:Snares|Sleishman Acrylic Snare Alt',
  '35:Snares|Sleishman Acrylic Snare RimShot',
  '36:Snares|Sleishman Acrylic Snare Drag',
  '37:Snares|Sleishman Acrylic Snare XStick',
  '38:Snares|Yamaha Bamboo (Sn Off) Hit',
  '39:Snares|Yamaha Bamboo (Sn Off) XStick',
  '40:Snares|Yamaha Bamboo (Sn Off) RimShot',
  '41:Snares|Ti Snare (Amped) Hit',
  '42:Snares|Ti Snare (Amped) Alt',
  '43:Snares|Ti Snare (Amped) Drag',
  '44:Snares|Ti Snare (Amped) RimShot',
  '45:Snares|Ti Snare (Amped) XStick',
  '46:Snares|Armstrong Concert Snare RimClick',
  '47:Snares|Armstrong Concert Snare Hit',
  '48:Snares|Armstrong Concert Snare Drag',
  '49:Snares|Armstrong Concert Snare RimShot',
  '50:Snares|Armstrong Concert Snare XStick',
  '51:Snares|Haynes Sig. Snare Brush Hit',
  '52:Snares|Haynes Sig. Snare Bush XStick',
  '53:Snares|Haynes Sig. Snare RimShot',
  '54:Snares|Haynes Sig. Snare Hit',
  '55:Snares|Haynes Sig. Snare Alt',
  '56:Snares|Haynes Sig. Snare RimShot',
  '57:Snares|Haynes Sig. Snare XStick',
  '58:Snares|Haynes Sig. Snare (Sn Off) Hit',
  '59:Snares|Haynes Sig. Snare (Sn Off) RimShot',
  '60:Snares|Haynes Sig. Snare Drag',
  '61:Toms|Birch 10 Tom Hit',
  '62:Toms|Birch 10 Tom RimShot',
  '63:Toms|Birch 10 Tom RimClick',
  '64:Toms|Birch 12 Tom Hit',
  '65:Toms|Birch 12 Tom RimShot',
  '66:Toms|Birch 12 Tom RimClick',
  '67:Toms|Birch 16 Tom Hit',
  '68:Toms|Birch 16 Tom RimShot',
  '69:Toms|Birch 16 Tom RimClick',
  '70:Toms|Maple 10 Tom Hit',
  '71:Toms|Maple 10 Tom RimShot',
  '72:Toms|Maple 10 Tom RimClick',
  '73:Toms|Maple 12 Tom Hit',
  '74:Toms|Maple 12 Tom RimShot',
  '75:Toms|Maple 12 Tom RimClick',
  '76:Toms|Maple 14 Tom Hit',
  '77:Toms|Maple 14 Tom RimShot',
  '78:Toms|Maple 14 Tom RimClick',
  '79:Toms|Maple 16 Tom Hit',
  '80:Toms|Maple 16 Tom RimShot',
  '81:Toms|Maple 16 Tom RimClick',
  '82:Hats|Dark Jazz HH Pedal',
  '83:Hats|Dark Jazz HH Closed Tip',
  '84:Hats|Dark Jazz HH Quarter Shoulder',
  '85:Hats|Dark Jazz HH Half Shoulder',
  '86:Hats|Dark Jazz HH 3Quarter Shoulder',
  '87:Hats|Dark Jazz HH Open Shoulder',
  '88:Hats|Bright HH Pedal',
  '89:Hats|Bright HH Closed Tip',
  '90:Hats|Bright HH Quarter Shoulder',
  '91:Hats|Bright HH Half Shoulder',
  '92:Hats|Bright HH 3Quarter Shoulder',
  '93:Hats|Bright HH Open Shoulder',
  '94:Rides|TurkishJazz Ride 22 Sizzle Bell',
  '95:Rides|TurkishJazz Ride 22 Sizzle Bow',
  '96:Rides|TurkishJazz Ride 22 Sizzle Edge',
  '97:Rides|TurkishWide Ride 20 Bell',
  '98:Rides|TurkishWide Ride 20 Bow',
  '99:Rides|TurkishWide Ride 20 Edge',
  '100:Rides|TurkishMaster Vintage Ride 22 Bell',
  '101:Rides|TurkishMaster Vintage Ride 22 Bow',
  '102:Rides|TurkishMaster Vintage Ride 22 Edge',
  '103:Cymbals|TurkishTraditional Crash Ride 18 Bell',
  '104:Cymbals|TurkishTraditional Crash Ride 18 Bow',
  '105:Cymbals|TurkishTraditional Crash Ride 18 Edge',
  '106:Cymbals|TurkishClassic Crash 16 Bow',
  '107:Cymbals|TurkishClassic Crash 16 Edge',
  '108:Cymbals|TurkishSplash 10 Edge',
  '109:Cymbals|Orchestral 20 Sus',
  '110:Cymbals|Old Wuhan 20 Bell',
  '111:Cymbals|Old Wuhan 20 Bow',
  '112:Cymbals|Old Wuhan 20 Edge',
  '113:Perc|Timbale High Head-Rim *',
  '114:Perc|Timbale Low Head-Rim *',
  '115:Perc|Wood Block_1 High',
  '116:Perc|Wood Block_2 Low',
  '117:Perc|Egg Shaker',
  '118:Perc|Can Shaker',
  '119:Perc|LP Cowbell Tip',
  '120:Perc|LP Cowbell Shoulder',
  '121:Perc|Agogo High',
  '122:Perc|Agogo Low',
  '123:Perc|Finger Snap',
  '124:Perc|Finger Snaps',
  '125:Perc|Finger Cymbal',
  '126:Perc|Gong',
]

export default mapper(raw)
