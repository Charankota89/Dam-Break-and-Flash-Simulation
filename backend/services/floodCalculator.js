function calculatePeakFlow(damHeightM, reservoirVolMcm) {
  const volumeM3 = reservoirVolMcm * 1e6;
  const qp = Math.round(0.607 * Math.pow(volumeM3, 0.295) * Math.pow(damHeightM, 1.24));
  const breachWidth = Math.round(0.27 * 1.3 * Math.pow(volumeM3, 0.32) * Math.pow(damHeightM, 0.04));
  const breakTimeSec = Math.round(63.2 * Math.sqrt(volumeM3 / (9.81 * Math.pow(damHeightM, 2))));

  return { peakFlowCumes: qp, breachWidthM: breachWidth, breakTimeSec };
}

function generateTimelineFrames(peakFlowCumes) {
  const frames = [];
  const hydrograph = [];
  const totalSteps = 20;

  for (let i = 0; i < totalSteps; i++) {
    const timeSec = (i / (totalSteps - 1)) * 7200;
    const ratio = Math.sin((i / (totalSteps - 1)) * Math.PI);
    const discharge = Math.max(10, Math.round(peakFlowCumes * ratio));
    hydrograph.push({ timeSeconds: timeSec, dischargeCumecs: discharge });

    const radius = 0.005 + (i * 0.003);
    const centerLat = 30.535;
    const centerLon = 79.732;

    const coordinates = [
      [centerLon - radius, centerLat - radius],
      [centerLon + radius, centerLat - radius],
      [centerLon + radius, centerLat + radius],
      [centerLon - radius, centerLat + radius],
      [centerLon - radius, centerLat - radius]
    ];

    const geoJson = JSON.stringify({
      type: 'FeatureCollection',
      features: [{
        type: 'Feature',
        geometry: { type: 'Polygon', coordinates: [coordinates] },
        properties: { depth: Math.min(5.0, (i + 1) * 0.25) }
      }]
    });

    frames.push({
      stepIndex: i,
      timeSeconds: timeSec,
      floodedCellCount: Math.round((i + 1) * 8.5),
      geoJson
    });
  }

  return { frames, hydrograph };
}

function getVillageEvacuationTimes() {
  return [
    { name: 'Reni Village', latitude: 30.50, longitude: 79.70, population: 1450, distanceKm: 4.5, arrivalTimeSeconds: 1080, maxDepthM: 3.8, velocityMs: 4.2, hazardLevel: 'EXTREME', recommendedAction: 'IMMEDIATE EVACUATION TO HIGH GROUND' },
    { name: 'Tapovan Hydel Site', latitude: 30.49, longitude: 79.63, population: 3200, distanceKm: 12.0, arrivalTimeSeconds: 2400, maxDepthM: 5.2, velocityMs: 3.5, hazardLevel: 'EXTREME', recommendedAction: 'IMMEDIATE EVACUATION TO HIGH GROUND' },
    { name: 'Ringi Village', latitude: 30.48, longitude: 79.58, population: 1800, distanceKm: 18.5, arrivalTimeSeconds: 3960, maxDepthM: 2.1, velocityMs: 2.1, hazardLevel: 'HIGH', recommendedAction: 'PREPARE EVACUATION ORDER' },
    { name: 'Lata Village', latitude: 30.47, longitude: 79.52, population: 2100, distanceKm: 24.2, arrivalTimeSeconds: 5280, maxDepthM: 1.4, velocityMs: 1.4, hazardLevel: 'MODERATE', recommendedAction: 'MONITOR WATER LEVELS' }
  ];
}

module.exports = {
  calculatePeakFlow,
  generateTimelineFrames,
  getVillageEvacuationTimes
};
