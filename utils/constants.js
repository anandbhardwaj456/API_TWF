exports.ProductWeights = {
  A: 3.0, B: 2.0, C: 8.0,
  D: 12.0, E: 25.0, F: 15.0,
  G: 0.5, H: 1.0, I: 2.0,
};

exports.ProductCenters = {
  A: 'C1', B: 'C1', C: 'C1',
  D: 'C2', E: 'C2', F: 'C2',
  G: 'C3', H: 'C3', I: 'C3',
};

exports.Distances = {
  C1: { C2: 4.0, L1: 3.0, C3: 7.0 },
  C2: { C1: 4.0, L1: 2.5, C3: 3.0 },
  C3: { C2: 3.0, L1: 2.0, C1: 7.0 },
  L1: { C1: 3.0, C2: 2.5, C3: 2.0 },
};

exports.BaseCost = 10.0;
exports.AdditionalCost = 8.0;