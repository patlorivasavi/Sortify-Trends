export interface SortStep {
  array: number[];
  comparing: number[];
  swapping: number[];
  pivot?: number;
  sorted: number[];
  description: string;
}

export interface AlgorithmResult {
  steps: SortStep[];
  comparisons: number;
  swaps: number;
  timeMs: number;
}

export function mergeSortSteps(arr: number[]): AlgorithmResult {
  const steps: SortStep[] = [];
  let comparisons = 0;
  let swaps = 0;
  const sorted: number[] = [];
  const a = [...arr];
  const start = performance.now();

  function merge(a: number[], l: number, m: number, r: number) {
    const left = a.slice(l, m + 1);
    const right = a.slice(m + 1, r + 1);
    let i = 0, j = 0, k = l;
    while (i < left.length && j < right.length) {
      comparisons++;
      steps.push({ array: [...a], comparing: [l + i, m + 1 + j], swapping: [], sorted: [...sorted], description: `Comparing ${left[i]} and ${right[j]}` });
      if (left[i] <= right[j]) {
        a[k] = left[i]; i++;
      } else {
        a[k] = right[j]; j++; swaps++;
      }
      k++;
    }
    while (i < left.length) { a[k] = left[i]; i++; k++; }
    while (j < right.length) { a[k] = right[j]; j++; k++; }
    steps.push({ array: [...a], comparing: [], swapping: [], sorted: [...sorted], description: `Merged subarray [${l}..${r}]` });
  }

  function sort(a: number[], l: number, r: number) {
    if (l < r) {
      const m = Math.floor((l + r) / 2);
      steps.push({ array: [...a], comparing: [], swapping: [], sorted: [...sorted], description: `Splitting at index ${m}` });
      sort(a, l, m);
      sort(a, m + 1, r);
      merge(a, l, m, r);
    }
  }

  sort(a, 0, a.length - 1);
  const timeMs = performance.now() - start;
  steps.push({ array: [...a], comparing: [], swapping: [], sorted: a.map((_, i) => i), description: "Sorted!" });
  return { steps, comparisons, swaps, timeMs };
}

export function quickSortSteps(arr: number[]): AlgorithmResult {
  const steps: SortStep[] = [];
  let comparisons = 0;
  let swaps = 0;
  const sorted: number[] = [];
  const a = [...arr];
  const start = performance.now();

  function partition(l: number, r: number): number {
    const pivot = a[r];
    steps.push({ array: [...a], comparing: [], swapping: [], pivot: r, sorted: [...sorted], description: `Pivot: ${pivot}` });
    let i = l - 1;
    for (let j = l; j < r; j++) {
      comparisons++;
      steps.push({ array: [...a], comparing: [j, r], swapping: [], pivot: r, sorted: [...sorted], description: `Comparing ${a[j]} with pivot ${pivot}` });
      if (a[j] < pivot) {
        i++;
        [a[i], a[j]] = [a[j], a[i]];
        swaps++;
        steps.push({ array: [...a], comparing: [], swapping: [i, j], pivot: r, sorted: [...sorted], description: `Swapped ${a[j]} and ${a[i]}` });
      }
    }
    [a[i + 1], a[r]] = [a[r], a[i + 1]];
    swaps++;
    sorted.push(i + 1);
    steps.push({ array: [...a], comparing: [], swapping: [i + 1, r], pivot: i + 1, sorted: [...sorted], description: `Pivot placed at index ${i + 1}` });
    return i + 1;
  }

  function sort(l: number, r: number) {
    if (l < r) {
      const p = partition(l, r);
      sort(l, p - 1);
      sort(p + 1, r);
    } else if (l === r) {
      sorted.push(l);
    }
  }

  sort(0, a.length - 1);
  const timeMs = performance.now() - start;
  steps.push({ array: [...a], comparing: [], swapping: [], sorted: a.map((_, i) => i), description: "Sorted!" });
  return { steps, comparisons, swaps, timeMs };
}

export function heapSortSteps(arr: number[]): AlgorithmResult {
  const steps: SortStep[] = [];
  let comparisons = 0;
  let swaps = 0;
  const sorted: number[] = [];
  const a = [...arr];
  const start = performance.now();

  function heapify(n: number, i: number) {
    let largest = i;
    const l = 2 * i + 1;
    const r = 2 * i + 2;
    if (l < n) { comparisons++; if (a[l] > a[largest]) largest = l; }
    if (r < n) { comparisons++; if (a[r] > a[largest]) largest = r; }
    if (largest !== i) {
      steps.push({ array: [...a], comparing: [i, largest], swapping: [], sorted: [...sorted], description: `Heapify: comparing ${a[i]} and ${a[largest]}` });
      [a[i], a[largest]] = [a[largest], a[i]];
      swaps++;
      steps.push({ array: [...a], comparing: [], swapping: [i, largest], sorted: [...sorted], description: `Swapped ${a[largest]} and ${a[i]}` });
      heapify(n, largest);
    }
  }

  const n = a.length;
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) heapify(n, i);
  steps.push({ array: [...a], comparing: [], swapping: [], sorted: [...sorted], description: "Max heap built" });

  for (let i = n - 1; i > 0; i--) {
    [a[0], a[i]] = [a[i], a[0]];
    swaps++;
    sorted.push(i);
    steps.push({ array: [...a], comparing: [], swapping: [0, i], sorted: [...sorted], description: `Extracted max ${a[i]}` });
    heapify(i, 0);
  }
  sorted.push(0);
  const timeMs = performance.now() - start;
  steps.push({ array: [...a], comparing: [], swapping: [], sorted: a.map((_, i) => i), description: "Sorted!" });
  return { steps, comparisons, swaps, timeMs };
}

export function binarySearchSteps(arr: number[], target: number): { steps: { low: number; high: number; mid: number; found: boolean; description: string }[]; found: boolean; index: number } {
  const sorted = [...arr].sort((a, b) => a - b);
  const steps: { low: number; high: number; mid: number; found: boolean; description: string }[] = [];
  let low = 0, high = sorted.length - 1, foundIdx = -1;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (sorted[mid] === target) {
      steps.push({ low, high, mid, found: true, description: `Found ${target} at index ${mid}!` });
      foundIdx = mid;
      break;
    } else if (sorted[mid] < target) {
      steps.push({ low, high, mid, found: false, description: `${sorted[mid]} < ${target}, search right half` });
      low = mid + 1;
    } else {
      steps.push({ low, high, mid, found: false, description: `${sorted[mid]} > ${target}, search left half` });
      high = mid - 1;
    }
  }

  if (foundIdx === -1) {
    steps.push({ low, high, mid: -1, found: false, description: `${target} not found` });
  }

  return { steps, found: foundIdx !== -1, index: foundIdx };
}
