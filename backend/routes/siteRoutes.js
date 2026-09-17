const express = require('express');
const router = express.Router();

const sites = [
  {
    id: 'rishi-ganga',
    name: 'Rishi Ganga Glacier Dam (Uttarakhand)',
    river: 'Rishi Ganga / Dhauliganga',
    latitude: 30.535,
    longitude: 79.732,
    defaultDamHeight: 30.0,
    defaultReservoirVol: 26.4,
    description: 'Debris dam breach following rock-ice avalanche in Chamoli district.'
  },
  {
    id: 'kosi',
    name: 'Kosi River Embankment (Bihar)',
    river: 'Kosi River',
    latitude: 30.540,
    longitude: 79.725,
    defaultDamHeight: 15.0,
    defaultReservoirVol: 50.0,
    description: 'Kushahe embankment breach causing massive avulsion.'
  },
  {
    id: 'kedarnath',
    name: 'Chorabari Glacial Lake (Kedarnath)',
    river: 'Mandakini River',
    latitude: 30.734,
    longitude: 79.066,
    defaultDamHeight: 45.0,
    defaultReservoirVol: 35.0,
    description: 'Moraine-dammed glacial lake outburst flood causing severe flash floods.'
  }
];

router.get('/', (req, res) => {
  res.json(sites);
});

module.exports = router;
