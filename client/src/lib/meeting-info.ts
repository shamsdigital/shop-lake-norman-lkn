export const meetingVenue = {
  name: 'H2 Public House',
  streetAddress: '19906 N. Cove Rd.',
  cityStateZip: 'Cornelius, NC 28031',
  phoneDisplay: '980 231 5936',
  phoneHref: 'tel:9802315936',
} as const;

export const meetingVenueLine = `${meetingVenue.name}, ${meetingVenue.streetAddress} ${meetingVenue.cityStateZip}`;

export const chairContact = {
  name: 'Jim Vogel',
  role: 'Chair',
  email: 'lknsbn@yahoo.com',
  phoneDisplay: '704 800 6252',
  phoneHref: 'tel:7048006252',
} as const;
