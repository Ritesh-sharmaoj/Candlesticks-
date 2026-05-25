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

type MarketStructureDirection = 'up' | 'down' | 'neutral';

type SwingPoint = {
  index: number;
  price: number;
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
    'bullish-bos': (_window, all, index) => this.detectBreakOfStructure(all, index, 'bullish'),
    'bearish-bos': (_window, all, index) => this.detectBreakOfStructure(all, index, 'bearish'),
    'bullish-choch': (_window, all, index) => this.detectChangeOfCharacter(all, index, 'bullish'),
    'bearish-choch': (_window, all, index) => this.detectChangeOfCharacter(all, index, 'bearish'),
    'bullish-order-block': ([previous, current], all, index) => this.detectOrderBlock(previous, current, all, index, 'bullish'),
    'bearish-order-block': ([previous, current], all, index) => this.detectOrderBlock(previous, current, all, index, 'bearish'),
    'bullish-fvg': (candles) => this.detectFairValueGap(candles, 'bullish'),
    'bearish-fvg': (candles) => this.detectFairValueGap(candles, 'bearish'),
    'equal-highs': (_window, all, index) => this.detectEqualLiquidity(all, index, 'high'),
    'equal-lows': (_window, all, index) => this.detectEqualLiquidity(all, index, 'low'),
    'bullish-liquidity-sweep': (_window, all, index) => this.detectLiquiditySweep(all, index, 'bullish'),
    'bearish-liquidity-sweep': (_window, all, index) => this.detectLiquiditySweep(all, index, 'bearish'),
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

  private detectBreakOfStructure(candles: Candle[], index: number, direction: 'bullish' | 'bearish'): Detection | null {
    const previous = candles[index - 1];
    const current = candles[index];
    if (!previous || !current) return null;

    const level = direction === 'bullish'
      ? this.lastSwingHigh(candles, index)
      : this.lastSwingLow(candles, index);
    if (!level) return null;

    const brokeLevel = direction === 'bullish'
      ? previous.close <= level.price && current.close > level.price
      : previous.close >= level.price && current.close < level.price;
    if (!brokeLevel) return null;

    const structure = this.structureDirection(candles, index);
    if ((direction === 'bullish' && structure === 'down') || (direction === 'bearish' && structure === 'up')) {
      return null;
    }

    const alignedStructure = direction === 'bullish' ? structure === 'up' : structure === 'down';
    const displacement = this.hasDisplacement(candles, index, direction);
    const confidence = Math.min(72 + (alignedStructure ? 12 : 0) + (displacement ? 6 : 0), 94);
    const side = direction === 'bullish' ? 'above' : 'below';

    return {
      confidence,
      reason: `Close broke ${side} prior swing level ${this.formatPrice(level.price)}, confirming a ${direction} break of structure.`
    };
  }

  private detectChangeOfCharacter(candles: Candle[], index: number, direction: 'bullish' | 'bearish'): Detection | null {
    const previous = candles[index - 1];
    const current = candles[index];
    if (!previous || !current) return null;

    const structure = this.structureDirection(candles, index);
    const requiredStructure = direction === 'bullish' ? 'down' : 'up';
    if (structure !== requiredStructure) return null;

    const level = direction === 'bullish'
      ? this.lastSwingHigh(candles, index)
      : this.lastSwingLow(candles, index);
    if (!level) return null;

    const shifted = direction === 'bullish'
      ? previous.close <= level.price && current.close > level.price
      : previous.close >= level.price && current.close < level.price;
    if (!shifted) return null;

    const displacement = this.hasDisplacement(candles, index, direction);
    const confidence = Math.min(80 + (displacement ? 8 : 0), 94);
    const side = direction === 'bullish' ? 'above' : 'below';

    return {
      confidence,
      reason: `${direction} CHOCH: price closed ${side} ${this.formatPrice(level.price)} after a ${requiredStructure} structure phase.`
    };
  }

  private detectOrderBlock(previous: Candle, current: Candle, all: Candle[], index: number, direction: 'bullish' | 'bearish'): Detection | null {
    if (!previous || !current) return null;

    const oppositeCandleBeforeDisplacement = direction === 'bullish'
      ? this.isBearish(previous) && this.isBullish(current)
      : this.isBullish(previous) && this.isBearish(current);
    if (!oppositeCandleBeforeDisplacement) return null;

    const stats = this.stats(current);
    const averageRange = this.averageRange(all, index - 1, 5);
    const strongDisplacement = stats.bodyRatio >= 0.5 && stats.range >= averageRange * 1.05;
    if (!strongDisplacement) return null;

    const lookbackStart = Math.max(0, index - 6);
    const breaksLocalRange = direction === 'bullish'
      ? current.close > this.highestHigh(all, lookbackStart, index - 1)
      : current.close < this.lowestLow(all, lookbackStart, index - 1);
    if (!breaksLocalRange) return null;

    const zoneLow = direction === 'bullish' ? previous.low : previous.open;
    const zoneHigh = direction === 'bullish' ? previous.open : previous.high;
    const confidence = Math.min(78 + (this.hasDisplacement(all, index, direction) ? 6 : 0), 90);

    return {
      confidence,
      reason: `Last ${direction === 'bullish' ? 'bearish' : 'bullish'} candle before displacement marks a potential ${direction} order block zone ${this.formatPrice(zoneLow)}-${this.formatPrice(zoneHigh)}.`
    };
  }

  private detectFairValueGap(candles: Candle[], direction: 'bullish' | 'bearish'): Detection | null {
    if (candles.length < 3) return null;

    const [first, middle, current] = candles;
    const middleStats = this.stats(middle);
    const hasDirectionalDisplacement = direction === 'bullish'
      ? this.isBullish(middle)
      : this.isBearish(middle);
    if (!hasDirectionalDisplacement || middleStats.bodyRatio < 0.45) return null;

    const gapLow = direction === 'bullish' ? first.high : current.high;
    const gapHigh = direction === 'bullish' ? current.low : first.low;
    const hasGap = direction === 'bullish'
      ? first.high < current.low
      : first.low > current.high;
    if (!hasGap) return null;

    const gapSize = gapHigh - gapLow;
    const averageRange = candles.reduce((sum, candle) => sum + this.stats(candle).range, 0) / candles.length;
    if (gapSize < averageRange * 0.04) return null;

    const confidence = Math.min(76 + (middleStats.bodyRatio >= 0.65 ? 8 : 0), 90);

    return {
      confidence,
      reason: `${direction} fair value gap between ${this.formatPrice(gapLow)} and ${this.formatPrice(gapHigh)} after a displacement candle.`
    };
  }

  private detectEqualLiquidity(candles: Candle[], index: number, side: 'high' | 'low'): Detection | null {
    const current = candles[index];
    if (!current) return null;

    const swings = side === 'high'
      ? this.swingHighsBefore(candles, index)
      : this.swingLowsBefore(candles, index);
    const tolerance = this.priceTolerance(candles, index);
    const currentLevel = side === 'high' ? current.high : current.low;
    const matchingSwing = [...swings]
      .reverse()
      .find((swing) => index - swing.index <= 30 && Math.abs(swing.price - currentLevel) <= tolerance);

    if (!matchingSwing) return null;

    const levelName = side === 'high' ? 'Equal highs' : 'Equal lows';
    const confidence = Math.min(68 + Math.round((tolerance / Math.max(this.stats(current).range, Number.EPSILON)) * 10), 78);

    return {
      confidence,
      reason: `${levelName} near ${this.formatPrice(matchingSwing.price)} create a visible liquidity pool.`
    };
  }

  private detectLiquiditySweep(candles: Candle[], index: number, direction: 'bullish' | 'bearish'): Detection | null {
    const previous = candles[index - 1];
    const current = candles[index];
    if (!previous || !current) return null;

    const level = direction === 'bullish'
      ? this.lastSwingLow(candles, index)
      : this.lastSwingHigh(candles, index);
    if (!level) return null;

    const sweptAndRejected = direction === 'bullish'
      ? current.low < level.price && current.close > level.price && previous.close >= level.price
      : current.high > level.price && current.close < level.price && previous.close <= level.price;
    if (!sweptAndRejected) return null;

    const stats = this.stats(current);
    const rejectionWick = direction === 'bullish' ? stats.lowerShadow : stats.upperShadow;
    const confidence = Math.min(76 + (rejectionWick >= stats.range * 0.35 ? 8 : 0), 91);
    const side = direction === 'bullish' ? 'low' : 'high';

    return {
      confidence,
      reason: `Price swept prior swing ${side} ${this.formatPrice(level.price)} and closed back inside, suggesting a ${direction} liquidity sweep.`
    };
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

  private structureDirection(candles: Candle[], index: number): MarketStructureDirection {
    const highs = this.swingHighsBefore(candles, index);
    const lows = this.swingLowsBefore(candles, index);

    if (highs.length < 2 || lows.length < 2) return 'neutral';

    const latestHigh = highs[highs.length - 1];
    const previousHigh = highs[highs.length - 2];
    const latestLow = lows[lows.length - 1];
    const previousLow = lows[lows.length - 2];

    if (latestHigh.price > previousHigh.price && latestLow.price > previousLow.price) return 'up';
    if (latestHigh.price < previousHigh.price && latestLow.price < previousLow.price) return 'down';
    return 'neutral';
  }

  private lastSwingHigh(candles: Candle[], index: number): SwingPoint | null {
    const highs = this.swingHighsBefore(candles, index);
    return highs[highs.length - 1] ?? null;
  }

  private lastSwingLow(candles: Candle[], index: number): SwingPoint | null {
    const lows = this.swingLowsBefore(candles, index);
    return lows[lows.length - 1] ?? null;
  }

  private swingHighsBefore(candles: Candle[], index: number, left = 2, right = 1): SwingPoint[] {
    const swings: SwingPoint[] = [];
    const lastCandidate = index - right - 1;

    for (let i = left; i <= lastCandidate; i += 1) {
      const price = candles[i].high;
      let isSwing = true;
      for (let j = i - left; j <= i + right; j += 1) {
        if (j !== i && candles[j].high >= price) {
          isSwing = false;
          break;
        }
      }
      if (isSwing) swings.push({ index: i, price });
    }

    return swings;
  }

  private swingLowsBefore(candles: Candle[], index: number, left = 2, right = 1): SwingPoint[] {
    const swings: SwingPoint[] = [];
    const lastCandidate = index - right - 1;

    for (let i = left; i <= lastCandidate; i += 1) {
      const price = candles[i].low;
      let isSwing = true;
      for (let j = i - left; j <= i + right; j += 1) {
        if (j !== i && candles[j].low <= price) {
          isSwing = false;
          break;
        }
      }
      if (isSwing) swings.push({ index: i, price });
    }

    return swings;
  }

  private hasDisplacement(candles: Candle[], index: number, direction: 'bullish' | 'bearish'): boolean {
    const candle = candles[index];
    const stats = this.stats(candle);
    const averageRange = this.averageRange(candles, index - 1, 6);
    const directionalBody = direction === 'bullish' ? this.isBullish(candle) : this.isBearish(candle);

    return directionalBody && stats.bodyRatio >= 0.5 && stats.range >= averageRange * 1.08;
  }

  private averageRange(candles: Candle[], endIndex: number, count: number): number {
    const end = Math.min(Math.max(endIndex, 0), candles.length - 1);
    const start = Math.max(0, end - count + 1);
    const slice = candles.slice(start, end + 1);

    if (!slice.length) return Number.EPSILON;

    return slice.reduce((sum, candle) => sum + this.stats(candle).range, 0) / slice.length;
  }

  private highestHigh(candles: Candle[], startIndex: number, endIndex: number): number {
    const start = Math.max(0, startIndex);
    const end = Math.min(endIndex, candles.length - 1);
    let highest = Number.NEGATIVE_INFINITY;

    for (let i = start; i <= end; i += 1) {
      highest = Math.max(highest, candles[i].high);
    }

    return highest;
  }

  private lowestLow(candles: Candle[], startIndex: number, endIndex: number): number {
    const start = Math.max(0, startIndex);
    const end = Math.min(endIndex, candles.length - 1);
    let lowest = Number.POSITIVE_INFINITY;

    for (let i = start; i <= end; i += 1) {
      lowest = Math.min(lowest, candles[i].low);
    }

    return lowest;
  }

  private priceTolerance(candles: Candle[], index: number): number {
    const current = candles[index];
    const averageRange = this.averageRange(candles, index - 1, 8);

    return Math.max(averageRange * 0.18, Math.abs(current.close) * 0.001, Number.EPSILON);
  }

  private formatPrice(value: number): string {
    if (Number.isInteger(value)) return String(value);

    return value.toFixed(4).replace(/0+$/, '').replace(/\.$/, '');
  }

  private slugify(value: string): string {
    return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  }
}
