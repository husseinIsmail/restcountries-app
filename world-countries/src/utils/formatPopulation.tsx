export const formatPopulation = (population: number): string => {
  return new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(population);
};
