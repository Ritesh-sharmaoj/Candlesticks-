import path from 'path';
import { PatternEngine } from './engine';
import { Candle } from './types';

const patternsDir = path.join(__dirname, '..', 'patterns');
const engine = new PatternEngine(patternsDir);

const sampleCandles: Candle[] = [
  { open: 112, high: 114, low: 104, close: 106, timestamp: '2026-05-21T09:30:00Z' },
  { open: 106, high: 108, low: 98, close: 100, timestamp: '2026-05-21T10:30:00Z' },
  { open: 99, high: 116, low: 96, close: 114, timestamp: '2026-05-21T11:30:00Z' },
  { open: 114, high: 116, low: 111, close: 114.2, timestamp: '2026-05-21T12:30:00Z' }
];

const results = engine.analyze(sampleCandles);
console.log('Analysis Results:', results);
