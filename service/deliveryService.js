const {
  ProductWeights,
  ProductCenters,
  Distances,
  BaseCost,
  AdditionalCost
} = require('../utils/constants');

const ceil = Math.ceil;
const maxInt = Number.MAX_SAFE_INTEGER;

function calculateTransportCost(weight, distance) {
  if (weight <= 5.0) {
    return BaseCost * distance;
  }
  const additionalBrackets = ceil((weight - 5.0) / 5.0);
  return (BaseCost + additionalBrackets * AdditionalCost) * distance;
}

function generatePermutations(arr) {
  if (arr.length === 0) return [[]];
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    const rest = arr.slice(0, i).concat(arr.slice(i + 1));
    for (const perm of generatePermutations(rest)) {
      result.push([arr[i], ...perm]);
    }
  }
  return result;
}

function simulateDelivery(startCenter, centerOrder, order) {
  let totalCost = 0;
  let currentLocation = startCenter;
  let currentWeight = 0;

  for (const [product, qty] of Object.entries(order)) {
    if (ProductCenters[product] === startCenter) {
      currentWeight += qty * ProductWeights[product];
    }
  }
  totalCost += calculateTransportCost(currentWeight, Distances[currentLocation]['L1']);
  currentLocation = 'L1';

  for (const center of centerOrder) {
    totalCost += calculateTransportCost(0, Distances[currentLocation][center]);
    currentLocation = center;
    let pickupWeight = 0;
    for (const [product, qty] of Object.entries(order)) {
      if (ProductCenters[product] === center) {
        pickupWeight += qty * ProductWeights[product];
      }
    }
    totalCost += calculateTransportCost(pickupWeight, Distances[currentLocation]['L1']);
    currentLocation = 'L1';
  }

  return totalCost;
}

function calculatePath(startCenter, order) {
  const centersNeeded = new Set();
  for (const product of Object.keys(order)) {
    centersNeeded.add(ProductCenters[product]);
  }
  if (!centersNeeded.has(startCenter)) return maxInt;
  centersNeeded.delete(startCenter);

  const perms = generatePermutations(Array.from(centersNeeded));
  let minCost = maxInt;
  for (const perm of perms) {
    const c = simulateDelivery(startCenter, perm, order);
    if (c < minCost) minCost = c;
  }
  return minCost;
}

exports.calculateMinimumCost = (order) => {
  let min = maxInt;
  for (const center of ['C1', 'C2', 'C3']) {
    const c = calculatePath(center, order);
    if (c < min) min = c;
  }
  return min;
};