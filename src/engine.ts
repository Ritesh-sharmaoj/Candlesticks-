import * as fs from 'fs';
import * as path from 'path';
import { Candle, PatternDefinition, PatternResult } from './types';

type Detection = {
  confidence: number;
  reason: string;
};

type Detector = (window: Candle[], allCandles: Candle[], index: number) => Detection | null;

type CandleStats = {
  range: number;
  body: number;
  bodyTop: number;
  bodyBottom: number;
  upperShadow: number;
  lowerShadow: number;
  bodyRatio: number;
};

export class PatternEngine {
  private patterns: PatternDefinition[] = [];

  private detectors: Record<string, Detector> = {
    doji: ([candle]) => this.detectDoji(candle),
    'dragonfly-doji': ([candle], all, index) => this.detectDragonflyDoji(candle, all, index),
    'gravestone-doji': ([candle], all, index) => this.detectGravestoneDoji(candle, all, index),
    hammer: ([candle], all, index) => this.detectHammer(candle, all, index),
    'hanging-man': ([candle], all, index) => this.detectHangingMan(candle, all, index),
    'inverted-hammer': ([candle], all, index) => this.detectInvertedHammer(candle, all, index),
    'shooting-star': ([candle], all, index) => this.detectShootingStar(candle, all, index),
    'bullish-engulfing': ([previous, current], all, index) => this.detectBullishEngulfing(previous, current, all, index),
    'bearish-engulfing': ([previous, current], all, index) => this.detectBearishEngulfing(previous, current, all, index),
    'piercing-pattern': ([previous, current], all, index) => this.detectPiercingPattern(previous, current, all, index),
    'dark-cloud-cover': ([previous, current], all, index) => this.detectDarkCloudCover(previous, current, all, index),
    'bullish-harami': ([previous, current], all, index) => this.detectBullishHarami(previous, current, all, index),
    'bearish-harami': ([previous, current], all, index) => this.detectBearishHarami(previous, current, all, index),
    'inside-bar': ([previous, current]) => this.detectInsideBar(previous, current),
    'outside-bar': ([previous, current]) => this.detectOutsideBar(previous, current),
    'morning-star': (candles, all, index) => this.detectMorningStar(candles, all, index),
    'evening-star': (candles, all, index) => this.detectEveningStar(candles, all, index),
    'three-white-soldiers': (candles) => this.detectThreeWhiteSoldiers(candles),
    'three-black-crows': (candles) => this.detectThreeBlackCrows(candles)
  };

  constructor(patternsDir: string) {
    this.loadPatterns(patternsDir);
  }

  private loadPatterns(dir: string): void {
    const files = fs.readdirSync(dir).filter((file) => file.endsWith('.json')).sort();

    for (const file of files) {
      const content = fs.readFileSync(path.join(dir, file), 'utf-8');
      const parsed = JSON.parse(content) as PatternDefinition;
      const id = parsed.id ?? this.slugify(parsed.name);
      this.patterns.push({ ...parsed, id });
    }
  }

  public analyze(candles: Candle[]): PatternResult[] {
    const results: PatternResult[] = [];

    for (let index = 0; index < candles.length; index += 1) {
      for (const pattern of this.patterns) {
        const id = pattern.id ?? this.slugify(pattern.name);
        const detector = this.detectors[id];

        if (!detector || index + 1 < pattern.requiredCandles) {
          continue;
        }

        const window = candles.slice(index - pattern.requiredCandles + 1, index + 1);
        const detection = detector(window, candles, index);

        if (detection) {
          results.push({
            id,
            name: pattern.name,
            sentiment: pattern.sentiment,
            confirmed: true,
            confidence: detection.confidence,
            index,
            timestamp: candles[index].timestamp,
            reason: detection.reason
          });
        }
      }
    }

    return results;
  }

  private detectDoji(candle: Candle): Detection | null {
    const stats = this.stats(candle);
    if (stats.bodyRatio <= 0.1) {
      return { confidence: 72, reason: 'Open and close are nearly equal compared with total range.' };
    }

    return null;
  }

  private detectDragonflyDoji(candle: Candle, all: Candle[], index: number): Detection | null {
    const stats = this.stats(candle);
    const valid = stats.bodyRatio <= 0.12 && stats.lowerShadow >= stats.range * 0.6 && stats.upperShadow <= stats.range * 0.12;

    if (!valid) return null;

    return {
      confidence: this.withTrendConfidence(78, all, index, 'down'),
      reason: 'Long lower shadow and close near the high show rejection of lower prices.'
    };
  }

  private detectGravestoneDoji(candle: Candle, all: Candle[], index: number): Detection | null {
    const stats = this.stats(candle);
    const valid = stats.bodyRatio <= 0.12 && stats.upperShadow >= stats.range * 0.6 && stats.lowerShadow <= stats.range * 0.12;

    if (!valid) return null;

    return {
      confidence: this.withTrendConfidence(78, all, index, 'up'),
      reason: 'Long upper shadow and close near the low show rejection of higher prices.'
    };
  }

  private detectHammer(candle: Candle, all: Candle[], index: number): Detection | null {
    const stats = this.stats(candle);
    const valid = stats.bodyRatio <= 0.36 && stats.lowerShadow >= stats.body * 2 && stats.upperShadow <= stats.range * 0.22;

    if (!valid) return null;

    return {
      confidence: this.withTrendConfidence(76, all, index, 'down'),
      reason: 'Small body near the high with a long lower rejection shadow.'
    };
  }

  private detectHangingMan(candle: Candle, all: Candle[], index: number): Detection | null {
    const stats = this.stats(candle);
    const valid = stats.bodyRatio <= 0.36 && stats.lowerShadow >= stats.body * 2 && stats.upperShadow <= stats.range * 0.22;

    if (!valid || !this.trendInto(all, index, 'up')) return null;

    return { confidence: 74, reason: 'Hammer-shaped candle appears after an advance, warning that sellers entered.' };
  }

  private detectInvertedHammer(candle: Candle, all: Candle[], index: number): Detection | null {
    const stats = this.stats(candle);
    const valid = stats.bodyRatio <= 0.36 && stats.upperShadow >= stats.body * 2 && stats.lowerShadow <= stats.range * 0.22;

    if (!valid || !this.trendInto(all, index, 'down')) return null;

    return { confidence: 70, reason: 'Long upper wick after a decline shows buyers tested higher prices.' };
  }

  private detectShootingStar(candle: Candle, all: Candle[], index: number): Detection | null {
    const stats = this.stats(candle);
    const valid = stats.bodyRatio <= 0.36 && stats.upperShadow >= stats.body * 2 && stats.lowerShadow <= stats.range * 0.22;

    if (!valid || !this.trendInto(all, index, 'up')) return null;

    return { confidence: 76, reason: 'Long upper rejection wick after an advance shows buyers failed to hold highs.' };
  }

  private detectBullishEngulfing(previous: Candle, current: Candle, all: Candle[], index: number): Detection | null {
    const valid = this.isBearish(previous) && this.isBullish(current) && current.open <= previous.close && current.close >= previous.open;

    if (!valid) return null;

    return {
      confidence: this.withTrendConfidence(82, all, index, 'down'),
      reason: 'Bullish candle body fully engulfs the previous bearish body.'
    };
  }

  private detectBearishEngulfing(previous: Candle, current: Candle, all: Candle[], index: number): Detection | null {
    const valid = this.isBullish(previous) && this.isBearish(current) && current.open >= previous.close && current.close <= previous.open;

    if (!valid) return null;

    return {
      confidence: this.withTrendConfidence(82, all, index, 'up'),
      reason: 'Bearish candle body fully engulfs the previous bullish body.'
    };
  }

  private detectPiercingPattern(previous: Candle, current: Candle, all: Candle[], index: number): Detection | null {
    const midpoint = (previous.open + previous.close) / 2;
    const valid = this.isBearish(previous) && this.isBullish(current) && current.open < previous.close && current.close > midpoint && current.close < previous.open;

    if (!valid) return null;

    return {
      confidence: this.withTrendConfidence(76, all, index, 'down'),
      reason: 'Bullish candle recovers more than half of the prior bearish body.'
    };
  }

  private detectDarkCloudCover(previous: Candle, current: Candle, all: Candle[], index: number): Detection | null {
    const midpoint = (previous.open + previous.close) / 2;
    const valid = this.isBullish(previous) && this.isBearish(current) && current.open > previous.close && current.close < midpoint && current.close > previous.open;

    if (!valid) return null;

    return {
      confidence: this.withTrendConfidence(76, all, index, 'up'),
      reason: 'Bearish candle closes more than halfway into the prior bullish body.'
    };
  }

  private detectBullishHarami(previous: Candle, current: Candle, all: Candle[], index: number): Detection | null {
    const valid = this.isBearish(previous) && this.isBullish(current) && current.open > previous.close && current.close < previous.open;

    if (!valid) return null;

    return {
      confidence: this.withTrendConfidence(68, all, index, 'down'),
      reason: 'Small bullish body forms inside the previous bearish body.'
    };
  }

  private detectBearishHarami(previous: Candle, current: Candle, all: Candle[], index: number): Detection | null {
    const valid = this.isBullish(previous) && this.isBearish(current) && current.open < previous.close && current.close > previous.open;

    if (!valid) return null;

    return {
      confidence: this.withTrendConfidence(68, all, index, 'up'),
      reason: 'Small bearish body forms inside the previous bullish body.'
    };
  }

  private detectInsideBar(previous: Candle, current: Candle): Detection | null {
    if (current.high < previous.high && current.low > previous.low) {
      return { confidence: 70, reason: 'Current candle range is fully inside the previous candle range.' };
    }

    return null;
  }

  private detectOutsideBar(previous: Candle, current: Candle): Detection | null {
    if (current.high > previous.high && current.low < previous.low) {
      return { confidence: 70, reason: 'Current candle expands beyond both sides of the previous candle.' };
    }

    return null;
  }

  private detectMorningStar(candles: Candle[], all: Candle[], index: number): Detection | null {
    const [first, second, third] = candles;
    const firstStats = this.stats(first);
    const secondStats = this.stats(second);
    const midpoint = (first.open + first.close) / 2;
    const valid = this.isBearish(first) && firstStats.bodyRatio >= 0.45 && secondStats.bodyRatio <= 0.35 && this.isBullish(third) && third.close > midpoint;

    if (!valid) return null;

    return {
      confidence: this.withTrendConfidence(84, all, index, 'down'),
      reason: 'Bearish control pauses, then bullish candle reclaims the midpoint of candle one.'
    };
  }

  private detectEveningStar(candles: Candle[], all: Candle[], index: number): Detection | null {
    const [first, second, third] = candles;
    const firstStats = this.stats(first);
    const secondStats = this.stats(second);
    const midpoint = (first.open + first.close) / 2;
    const valid = this.isBullish(first) && firstStats.bodyRatio >= 0.45 && secondStats.bodyRatio <= 0.35 && this.isBearish(third) && third.close < midpoint;

    if (!valid) return null;

    return {
      confidence: this.withTrendConfidence(84, all, index, 'up'),
      reason: 'Bullish control pauses, then bearish candle breaks below the midpoint of candle one.'
    };
  }

  private detectThreeWhiteSoldiers(candles: Candle[]): Detection | null {
    const valid = candles.every((candle) => this.isBullish(candle) && this.stats(candle).bodyRatio >= 0.45)
      && candles[1].close > candles[0].close
      && candles[2].close > candles[1].close;

    if (!valid) return null;

    return { confidence: 80, reason: 'Three strong bullish candles close progressively higher.' };
  }

  private detectThreeBlackCrows(candles: Candle[]): Detection | null {
    const valid = candles.every((candle) => this.isBearish(candle) && this.stats(candle).bodyRatio >= 0.45)
      && candles[1].close < candles[0].close
      && candles[2].close < candles[1].close;

    if (!valid) return null;

    return { confidence: 80, reason: 'Three strong bearish candles close progressively lower.' };
  }

  private stats(candle: Candle): CandleStats {
    const range = Math.max(candle.high - candle.low, Number.EPSILON);
    const body = Math.abs(candle.close - candle.open);
    const bodyTop = Math.max(candle.open, candle.close);
    const bodyBottom = Math.min(candle.open, candle.close);

    return {
      range,
      body,
      bodyTop,
      bodyBottom,
      upperShadow: candle.high - bodyTop,
      lowerShadow: bodyBottom - candle.low,
      bodyRatio: body / range
    };
  }

  private isBullish(candle: Candle): boolean {
    return candle.close > candle.open;
  }

  private isBearish(candle: Candle): boolean {
    return candle.close < candle.open;
  }

  private trendInto(candles: Candle[], index: number, direction: 'up' | 'down'): boolean {
    const lookback = Math.min(3, index);
    if (lookback < 2) return false;

    const start = candles[index - lookback].close;
    const end = candles[index - 1].close;
    return direction === 'up' ? end > start : end < start;
  }

  private withTrendConfidence(base: number, candles: Candle[], index: number, direction: 'up' | 'down'): number {
    return this.trendInto(candles, index, direction) ? Math.min(base + 8, 95) : base;
  }

  private slugify(value: string): string {
    return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  }
}
