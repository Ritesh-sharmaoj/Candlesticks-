export interface Candle {
  open: number;
  high: number;
  low: number;
  close: number;
  timestamp: string;
}

export type Trend = 'bullish' | 'bearish' | 'neutral';

export interface PatternDefinition {
  id?: string;
  name: string;
  type: 'reversal' | 'continuation' | 'indecision';
  sentiment: Trend;
  requiredCandles: number;
  description: string;
}

export interface PatternResult {
  id: string;
  name: string;
  sentiment: Trend;
  confirmed: boolean;
  confidence: number;
  index: number;
  timestamp: string;
  reason: string;
}
