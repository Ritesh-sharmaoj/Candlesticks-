const patterns = [
    { id: "marubozu", name: "Marubozu", category: "Single Candlestick", sentiment: "Bullish/Bearish", difficulty: "Beginner", reliability: 3, timeframe: "H4, D1", meaning: "A long body with almost no shadows that shows decisive pressure from one side.", beginnerExplanation: "Price moved strongly in one direction without much pullback.", psychology: "One side controlled the entire session. The next candle decides whether this is continuation or exhaustion.", rules: "Body should be at least 80% of the total range with tiny or absent wicks.", useCase: "Breakout strength, trend continuation, or a final exhaustion candle at extremes.", entry: "Use the break of the Marubozu high or low only if it aligns with structure.", stopLoss: "Beyond the opposite end of the candle or beyond the nearest structure.", target: "Next support or resistance, or minimum 1:2 risk reward.", confirmation: "Volume expansion, clean close outside range, and no immediate rejection.", mistakes: "Buying a giant candle late into resistance with poor reward potential.", scenario: "A bullish Marubozu closes above a multi-day resistance after rising volume.", viz: "marubozu" },
    { id: "doji", name: "Doji", category: "Indecision", sentiment: "Neutral", difficulty: "Beginner", reliability: 2, timeframe: "All, stronger on H4 and D1", meaning: "Open and close are nearly equal, showing indecision.", beginnerExplanation: "Looks like a cross. Buyers and sellers ended in a draw.", psychology: "Both sides attempted control but neither side kept it by the close.", rules: "Body should be very small compared with the total candle range.", useCase: "Pause signal, reversal warning, or a breakout trigger after compression.", entry: "Wait for a close above the high or below the low.", stopLoss: "Opposite side of the Doji range.", target: "Nearest clean structure or volatility-based target.", confirmation: "Strong follow-through candle after the Doji.", mistakes: "Treating every Doji as a reversal without trend and location.", scenario: "A Doji appears after a strong rally directly into resistance.", viz: "doji" },
    { id: "long-legged-doji", name: "Long-Legged Doji", category: "Indecision", sentiment: "Neutral", difficulty: "Intermediate", reliability: 2, timeframe: "H1, H4, D1", meaning: "Large upper and lower shadows show volatility without commitment.", beginnerExplanation: "Price moved far both ways and closed near where it opened.", psychology: "Aggressive buyers and sellers both failed to hold control.", rules: "Tiny body near the middle with long shadows on both sides.", useCase: "News exhaustion, range expansion, or possible trend change.", entry: "Trade only after price breaks and closes outside the range.", stopLoss: "Inside the range for aggressive traders or opposite extreme for conservative traders.", target: "ATR target or next major liquidity area.", confirmation: "Breakout with volume and a close outside the candle.", mistakes: "Entering inside the range before the market chooses a side.", scenario: "A volatile session rejects both support and resistance before closing flat.", viz: "long-doji" },
    { id: "dragonfly-doji", name: "Dragonfly Doji", category: "Bullish Reversal", sentiment: "Bullish", difficulty: "Intermediate", reliability: 4, timeframe: "H4, D1", meaning: "A long lower shadow with close near the high, showing rejection of lower prices.", beginnerExplanation: "Sellers pushed down, but buyers brought price back up.", psychology: "Selling pressure was absorbed and buyers defended the low.", rules: "Tiny body near the high with little or no upper wick and a long lower shadow.", useCase: "Bottom reversal at support or demand.", entry: "Above the candle high after confirmation.", stopLoss: "Below the lower shadow.", target: "Next resistance or at least 1:2 risk reward.", confirmation: "Bullish candle closing above the Dragonfly high.", mistakes: "Using it in the middle of a range with no support context.", scenario: "Price sweeps a prior low and closes back above support.", viz: "dragonfly" },
    { id: "gravestone-doji", name: "Gravestone Doji", category: "Bearish Reversal", sentiment: "Bearish", difficulty: "Intermediate", reliability: 4, timeframe: "H4, D1", meaning: "A long upper shadow with close near the low, showing rejection of higher prices.", beginnerExplanation: "Buyers pushed up, but sellers forced price back down.", psychology: "Buyers failed above resistance and sellers regained control.", rules: "Tiny body near the low with little or no lower wick and a long upper shadow.", useCase: "Top reversal at resistance or supply.", entry: "Below the candle low after confirmation.", stopLoss: "Above the upper shadow.", target: "Next support or liquidity pocket.", confirmation: "Bearish candle closing below the Gravestone low.", mistakes: "Shorting without nearby resistance or trend exhaustion.", scenario: "Price breaks above resistance, traps buyers, and closes back below it.", viz: "gravestone" },
    { id: "spinning-top", name: "Spinning Top", category: "Indecision", sentiment: "Neutral", difficulty: "Beginner", reliability: 2, timeframe: "All", meaning: "Small body and visible shadows show balance after movement.", beginnerExplanation: "The market is slowing down and thinking.", psychology: "Momentum is cooling, but there is not enough proof of reversal yet.", rules: "Small real body near the middle with upper and lower shadows.", useCase: "Trend exhaustion warning or consolidation marker.", entry: "Wait for the next candle to break the high or low.", stopLoss: "Opposite side of the setup range.", target: "Nearest structure with positive reward.", confirmation: "Follow-through candle and structure alignment.", mistakes: "Assuming a spinning top alone is a trade signal.", scenario: "A rally produces several spinning tops near resistance.", viz: "spinning-top" },
    { id: "hammer", name: "Hammer", category: "Bullish Reversal", sentiment: "Bullish", difficulty: "Beginner", reliability: 4, timeframe: "H4, D1, W1", meaning: "A bullish reversal candle after a downtrend, with a long lower shadow.", beginnerExplanation: "The market tried to fall, but buyers pushed it back up.", psychology: "Sellers lost control near support and buyers created a rejection tail.", rules: "Lower shadow at least two times the body, small upper wick, appears after decline.", useCase: "Bottom formation, demand test, and trend reversal setup.", entry: "Above the Hammer high or after a bullish confirmation close.", stopLoss: "Below the Hammer low.", target: "Next resistance, swing high, or 1:2 risk reward.", confirmation: "Support zone, rising volume, and bullish follow-through.", mistakes: "Calling it a Hammer in an uptrend; that context is Hanging Man.", scenario: "Price sells into the 200 EMA and forms a Hammer at support.", viz: "hammer" },
    { id: "hanging-man", name: "Hanging Man", category: "Bearish Reversal", sentiment: "Bearish", difficulty: "Intermediate", reliability: 3, timeframe: "H4, D1", meaning: "Hammer-shaped candle at the top of an uptrend that warns of weakness.", beginnerExplanation: "Same shape as a Hammer, but at the top it can warn of a fall.", psychology: "A large sell-off appeared during the session even though bulls recovered part of it.", rules: "Small body near the high with long lower shadow after an uptrend.", useCase: "Top warning near resistance or after extended rallies.", entry: "Below the Hanging Man low after bearish confirmation.", stopLoss: "Above the candle high.", target: "Nearest support or prior breakout level.", confirmation: "Bearish close below the body or low.", mistakes: "Shorting immediately before confirmation.", scenario: "A long rally prints a Hanging Man below a supply zone.", viz: "hanging-man" },
    { id: "inverted-hammer", name: "Inverted Hammer", category: "Bullish Reversal", sentiment: "Bullish", difficulty: "Intermediate", reliability: 3, timeframe: "H4, D1", meaning: "Potential bottom signal with a small body and long upper shadow after a downtrend.", beginnerExplanation: "Buyers tried to push up. Confirmation decides if they are strong enough.", psychology: "Bulls tested supply and sellers pushed back, but selling momentum weakened.", rules: "Small body near the low, long upper wick, appears after decline.", useCase: "Early bottom warning before a reversal breakout.", entry: "Above the upper wick after confirmation.", stopLoss: "Below the candle low.", target: "Nearest resistance or 1:2 risk reward.", confirmation: "Gap up, bullish close, or reclaim of structure.", mistakes: "Confusing it with Shooting Star in an uptrend.", scenario: "A falling market forms an Inverted Hammer at a weekly demand level.", viz: "inverted-hammer" },
    { id: "shooting-star", name: "Shooting Star", category: "Bearish Reversal", sentiment: "Bearish", difficulty: "Beginner", reliability: 4, timeframe: "H1, H4, D1", meaning: "Bearish reversal candle with long upper wick after an uptrend.", beginnerExplanation: "Price shot up and got rejected hard.", psychology: "Buyers tried to continue the rally, but sellers overwhelmed them by close.", rules: "Small body near the low, upper shadow at least two times the body, appears after rally.", useCase: "Short setup at resistance or after liquidity sweep.", entry: "Below the Shooting Star low after confirmation.", stopLoss: "Above the upper wick.", target: "Nearest support or prior breakout zone.", confirmation: "Bearish follow-through candle or failed breakout.", mistakes: "Shorting when price still has strong trend support below.", scenario: "Price sweeps a previous high and closes back below resistance.", viz: "shooting-star" },
    { id: "bullish-engulfing", name: "Bullish Engulfing", category: "Double Candlestick", sentiment: "Bullish", difficulty: "Beginner", reliability: 5, timeframe: "All, best on H4 and D1", meaning: "A strong bullish candle fully covers the previous bearish body.", beginnerExplanation: "A big green candle eats the previous red candle.", psychology: "Sellers were in control, then buyers took control decisively.", rules: "First candle bearish, second bullish, second body engulfs first body.", useCase: "Reversal at support, pullback completion, or breakout confirmation.", entry: "Above the engulfing candle high or on retest of its midpoint.", stopLoss: "Below the engulfing candle low.", target: "Recent swing high or 1:2 risk reward.", confirmation: "Support confluence, volume expansion, and market structure shift.", mistakes: "Buying a candle so large that stop distance destroys reward.", scenario: "Price retests demand and prints a bullish engulfing candle with volume.", viz: "bull-engulf" },
    { id: "bearish-engulfing", name: "Bearish Engulfing", category: "Double Candlestick", sentiment: "Bearish", difficulty: "Beginner", reliability: 5, timeframe: "All, best on H4 and D1", meaning: "A strong bearish candle fully covers the previous bullish body.", beginnerExplanation: "A big red candle eats the previous green candle.", psychology: "Buyers were in control, then sellers reversed the session completely.", rules: "First candle bullish, second bearish, second body engulfs first body.", useCase: "Reversal at resistance, failed breakout, or lower-high confirmation.", entry: "Below the engulfing candle low or on retest of its midpoint.", stopLoss: "Above the engulfing candle high.", target: "Recent swing low or 1:2 risk reward.", confirmation: "Resistance confluence, volume expansion, and loss of support.", mistakes: "Shorting into major support without room to target.", scenario: "Price rejects a supply zone and closes as a bearish engulfing candle.", viz: "bear-engulf" },
    { id: "piercing-pattern", name: "Piercing Pattern", category: "Double Candlestick", sentiment: "Bullish", difficulty: "Intermediate", reliability: 4, timeframe: "D1", meaning: "Bullish reversal where the second candle closes above the midpoint of the first bearish candle.", beginnerExplanation: "Green candle recovers more than half of the previous red candle.", psychology: "Bears started strong, but buyers reclaimed an important part of the range.", rules: "Bearish candle, then bullish candle opening lower and closing above 50% of candle one.", useCase: "Downtrend reversal warning at support.", entry: "Above the second candle high.", stopLoss: "Below the second candle low.", target: "Nearest resistance or 1:2 risk reward.", confirmation: "Bullish follow-through and support hold.", mistakes: "Accepting a close below the midpoint.", scenario: "A gap down reverses and closes deep inside the prior bearish candle.", viz: "piercing" },
    { id: "dark-cloud-cover", name: "Dark Cloud Cover", category: "Double Candlestick", sentiment: "Bearish", difficulty: "Intermediate", reliability: 4, timeframe: "D1", meaning: "Bearish reversal where the second candle closes below the midpoint of the prior bullish candle.", beginnerExplanation: "Red candle pushes more than halfway into the previous green candle.", psychology: "Bulls opened strong, but sellers took back control.", rules: "Bullish candle, then bearish candle opening higher and closing below 50% of candle one.", useCase: "Top reversal at resistance or after an overextended rally.", entry: "Below the second candle low.", stopLoss: "Above the second candle high.", target: "Nearest support or measured move.", confirmation: "Bearish follow-through and failed reclaim.", mistakes: "Ignoring the 50% penetration rule.", scenario: "Price gaps up on news, then sells off into the previous green candle.", viz: "dark-cloud" },
    { id: "tweezer-bottom", name: "Tweezer Bottom", category: "Double Candlestick", sentiment: "Bullish", difficulty: "Intermediate", reliability: 3, timeframe: "H1, H4, D1", meaning: "Two candles reject nearly the same low, showing support.", beginnerExplanation: "Price tested the same floor twice and bounced.", psychology: "Sellers attempted to break support twice and failed.", rules: "Adjacent candles with nearly equal lows, ideally after a decline.", useCase: "Support confirmation and reversal trigger.", entry: "Above the pair high after confirmation.", stopLoss: "Below the shared low.", target: "Next resistance.", confirmation: "Bullish close above the pair range.", mistakes: "Using random equal lows inside noise.", scenario: "Two candles reject a demand zone at the same price.", viz: "tweezer-bottom" },
    { id: "tweezer-top", name: "Tweezer Top", category: "Double Candlestick", sentiment: "Bearish", difficulty: "Intermediate", reliability: 3, timeframe: "H1, H4, D1", meaning: "Two candles reject nearly the same high, showing resistance.", beginnerExplanation: "Price touched the same ceiling twice and fell.", psychology: "Buyers attempted to break resistance twice and failed.", rules: "Adjacent candles with nearly equal highs, ideally after a rally.", useCase: "Resistance confirmation and reversal trigger.", entry: "Below the pair low after confirmation.", stopLoss: "Above the shared high.", target: "Next support.", confirmation: "Bearish close below the pair range.", mistakes: "Forcing the pattern when highs are not close.", scenario: "Price taps a supply zone twice and rejects both attempts.", viz: "tweezer-top" },
    { id: "morning-star", name: "Morning Star", category: "Triple Candlestick", sentiment: "Bullish", difficulty: "Intermediate", reliability: 5, timeframe: "H4, D1", meaning: "Three-candle bullish reversal: strong bearish candle, pause, strong bullish recovery.", beginnerExplanation: "Red candle, small pause, then strong green candle.", psychology: "Bearish control fades into indecision, then buyers take control.", rules: "Large bearish candle, small middle candle, bullish candle closing above midpoint of candle one.", useCase: "Major bottom reversal at demand.", entry: "Above the third candle high.", stopLoss: "Below the pattern low.", target: "Previous swing high or major resistance.", confirmation: "The third candle is confirmation when it closes strongly.", mistakes: "Accepting a weak third candle that does not reclaim the midpoint.", scenario: "A downtrend forms a Morning Star after sweeping a support low.", viz: "morning-star" },
    { id: "evening-star", name: "Evening Star", category: "Triple Candlestick", sentiment: "Bearish", difficulty: "Intermediate", reliability: 5, timeframe: "H4, D1", meaning: "Three-candle bearish reversal: strong bullish candle, pause, strong bearish breakdown.", beginnerExplanation: "Green candle, small pause, then strong red candle.", psychology: "Bullish control fades into indecision, then sellers take control.", rules: "Large bullish candle, small middle candle, bearish candle closing below midpoint of candle one.", useCase: "Major top reversal at supply.", entry: "Below the third candle low.", stopLoss: "Above the pattern high.", target: "Previous swing low or major support.", confirmation: "The third candle confirms when it closes strongly.", mistakes: "Trading it without a preceding uptrend.", scenario: "A parabolic rally ends with an Evening Star below resistance.", viz: "evening-star" },
    { id: "three-white-soldiers", name: "Three White Soldiers", category: "Triple Candlestick", sentiment: "Bullish", difficulty: "Intermediate", reliability: 4, timeframe: "D1", meaning: "Three strong bullish candles showing aggressive demand.", beginnerExplanation: "Three green candles in a row show strong buying.", psychology: "Buyers are willing to pay higher prices for several sessions.", rules: "Three bullish candles with higher closes and small wicks.", useCase: "Trend reversal confirmation or continuation after consolidation.", entry: "On controlled pullback or above the third candle high.", stopLoss: "Below the first soldier low or below pullback structure.", target: "Next major resistance.", confirmation: "Volume support and not overly extended from moving averages.", mistakes: "Buying after the move is already stretched.", scenario: "A range breaks upward with three strong bullish closes.", viz: "soldiers" },
    { id: "three-black-crows", name: "Three Black Crows", category: "Triple Candlestick", sentiment: "Bearish", difficulty: "Intermediate", reliability: 4, timeframe: "D1", meaning: "Three strong bearish candles showing aggressive supply.", beginnerExplanation: "Three red candles in a row show strong selling.", psychology: "Sellers are willing to accept lower prices for several sessions.", rules: "Three bearish candles with lower closes and small wicks.", useCase: "Bearish reversal confirmation or continuation after failed rally.", entry: "On controlled bounce or below the third candle low.", stopLoss: "Above the first crow high or above pullback structure.", target: "Next major support.", confirmation: "Volume support and not too far extended from moving averages.", mistakes: "Shorting after the sell-off is already exhausted.", scenario: "A failed breakout turns into three strong bearish closes.", viz: "crows" },
    { id: "inside-bar", name: "Inside Bar", category: "Continuation", sentiment: "Neutral", difficulty: "Beginner", reliability: 3, timeframe: "H4, D1", meaning: "A smaller candle contained within the range of the previous candle.", beginnerExplanation: "A small candle sits inside a bigger candle and waits for a breakout.", psychology: "Volatility contracts while traders wait for direction.", rules: "Current high is below previous high and current low is above previous low.", useCase: "Trend continuation, breakout, and compression plays.", entry: "Break of the mother bar high or low.", stopLoss: "Opposite side of mother bar or inside bar.", target: "Measured range or next structure.", confirmation: "Close outside the mother bar range.", mistakes: "Trading inside bars in choppy, low-quality ranges.", scenario: "An inside bar forms after a strong trend candle before continuation.", viz: "inside-bar" },
    { id: "outside-bar", name: "Outside Bar", category: "Indecision", sentiment: "Neutral", difficulty: "Intermediate", reliability: 3, timeframe: "H1, H4, D1", meaning: "A candle that expands beyond the previous candle high and low.", beginnerExplanation: "One candle covers the entire previous candle range.", psychology: "Volatility expands and traps can form on both sides.", rules: "Current high is above previous high and current low is below previous low.", useCase: "Volatility breakout or reversal after a failed move.", entry: "Break of outside bar high or low with direction bias.", stopLoss: "Opposite side of outside bar.", target: "ATR target or nearby liquidity.", confirmation: "Strong close near one extreme.", mistakes: "Using oversized outside bars with huge stop distance.", scenario: "News creates an outside bar that closes near the low.", viz: "outside-bar" },
    { id: "harami-bullish", name: "Bullish Harami", category: "Double Candlestick", sentiment: "Bullish", difficulty: "Intermediate", reliability: 3, timeframe: "D1", meaning: "A small bullish candle inside a prior bearish body, signaling seller fatigue.", beginnerExplanation: "A small green candle forms inside a big red candle.", psychology: "Selling pressure pauses and buyers begin absorbing supply.", rules: "Large bearish candle followed by small bullish candle inside its body.", useCase: "Early reversal warning after a pullback.", entry: "Above the mother candle high or after confirmation.", stopLoss: "Below the mother candle low.", target: "Next resistance or 1:1.5 risk reward.", confirmation: "Bullish close above the small candle.", mistakes: "Entering before confirmation in a strong downtrend.", scenario: "A bearish pullback stalls with a Bullish Harami at demand.", viz: "harami-bull" },
    { id: "harami-bearish", name: "Bearish Harami", category: "Double Candlestick", sentiment: "Bearish", difficulty: "Intermediate", reliability: 3, timeframe: "D1", meaning: "A small bearish candle inside a prior bullish body, signaling buyer fatigue.", beginnerExplanation: "A small red candle forms inside a big green candle.", psychology: "Buying pressure pauses and sellers begin absorbing demand.", rules: "Large bullish candle followed by small bearish candle inside its body.", useCase: "Early reversal warning after a rally.", entry: "Below the mother candle low or after confirmation.", stopLoss: "Above the mother candle high.", target: "Next support or 1:1.5 risk reward.", confirmation: "Bearish close below the small candle.", mistakes: "Entering before confirmation in a strong uptrend.", scenario: "A rally stalls with a Bearish Harami at supply.", viz: "harami-bear" },
    { id: "pin-bar", name: "Pin Bar", category: "Single Candlestick", sentiment: "Bullish/Bearish", difficulty: "Intermediate", reliability: 5, timeframe: "H4, D1", meaning: "A long tail shows rejection of a level and possible reversal.", beginnerExplanation: "Price pokes beyond a level and snaps back.", psychology: "One side gets trapped beyond a key level, then the opposite side takes control.", rules: "Tail should be at least two-thirds of candle range, body near the opposite end.", useCase: "Reversal from support or resistance, especially after liquidity sweep.", entry: "Break of the candle nose or 50% retracement entry.", stopLoss: "Beyond the tail.", target: "Recent swing point or clean liquidity area.", confirmation: "Location at structure and tail rejection with volume.", mistakes: "Trading pin bars in the middle of nowhere.", scenario: "A bullish pin bar sweeps a prior low and closes above support.", viz: "pin-bar" },
    { id: "railway-track", name: "Railway Track", category: "Double Candlestick", sentiment: "Bullish/Bearish", difficulty: "Advanced", reliability: 4, timeframe: "M15, H1, H4", meaning: "Two similar-sized opposite candles show a fast sentiment flip.", beginnerExplanation: "A strong candle is immediately reversed by a similar candle.", psychology: "The first side overcommits, then the opposite side takes back the move.", rules: "Two long opposite-colored candles with similar body size.", useCase: "Fast reversals at clear support or resistance.", entry: "Break of the second candle in the reversal direction.", stopLoss: "Beyond the two-candle extreme.", target: "Fixed reward or nearest liquidity.", confirmation: "Close of the second candle with structure confluence.", mistakes: "Using small candles that do not show true rejection.", scenario: "A bearish candle into support is fully answered by a bullish candle.", viz: "railway" },
    { id: "three-inside-up", name: "Three Inside Up", category: "Triple Candlestick", sentiment: "Bullish", difficulty: "Advanced", reliability: 5, timeframe: "H4, D1", meaning: "Confirmed Bullish Harami with a third candle breakout.", beginnerExplanation: "Red, small green inside, then a green breakout.", psychology: "Sellers pause, buyers enter, then buyers prove control.", rules: "Bearish candle, bullish Harami, third bullish candle closes above candle one high.", useCase: "Safer bullish reversal entry.", entry: "Close of third candle or retest of breakout.", stopLoss: "Below pattern low.", target: "Next resistance or 1:2 risk reward.", confirmation: "Already confirmed by candle three.", mistakes: "Entering before candle three closes.", scenario: "Three Inside Up completes at the end of a pullback.", viz: "inside-up" },
    { id: "three-inside-down", name: "Three Inside Down", category: "Triple Candlestick", sentiment: "Bearish", difficulty: "Advanced", reliability: 5, timeframe: "H4, D1", meaning: "Confirmed Bearish Harami with a third candle breakdown.", beginnerExplanation: "Green, small red inside, then a red breakdown.", psychology: "Buyers pause, sellers enter, then sellers prove control.", rules: "Bullish candle, bearish Harami, third bearish candle closes below candle one low.", useCase: "Safer bearish reversal entry.", entry: "Close of third candle or retest of breakdown.", stopLoss: "Above pattern high.", target: "Next support or 1:2 risk reward.", confirmation: "Already confirmed by candle three.", mistakes: "Entering before candle three closes.", scenario: "Three Inside Down completes below a double top.", viz: "inside-down" },
    { id: "rising-three-methods", name: "Rising Three Methods", category: "Continuation", sentiment: "Bullish", difficulty: "Advanced", reliability: 5, timeframe: "H4, D1", meaning: "Bullish continuation pattern with brief pullback inside a strong candle range.", beginnerExplanation: "Big green, small pullback candles, then another green breakout.", psychology: "Bears attempt a pause but cannot break the prior bullish range.", rules: "Long bullish candle, three small bearish candles inside it, then bullish breakout.", useCase: "Add-on setup in strong uptrends.", entry: "Above the fifth candle high.", stopLoss: "Below the pattern low.", target: "Trend extension or next resistance.", confirmation: "Fifth candle closes strongly.", mistakes: "Accepting middle candles that break below the first candle low.", scenario: "A strong uptrend rests for three candles before continuing.", viz: "rising-three" },
    { id: "falling-three-methods", name: "Falling Three Methods", category: "Continuation", sentiment: "Bearish", difficulty: "Advanced", reliability: 5, timeframe: "H4, D1", meaning: "Bearish continuation pattern with brief bounce inside a strong bearish candle range.", beginnerExplanation: "Big red, small bounce candles, then another red breakdown.", psychology: "Bulls attempt a pause but cannot break the prior bearish range.", rules: "Long bearish candle, three small bullish candles inside it, then bearish breakdown.", useCase: "Add-on setup in strong downtrends.", entry: "Below the fifth candle low.", stopLoss: "Above the pattern high.", target: "Trend extension or next support.", confirmation: "Fifth candle closes strongly.", mistakes: "Accepting middle candles that break above the first candle high.", scenario: "A strong downtrend rests for three candles before continuing.", viz: "falling-three" },
    { id: "abandoned-baby-bullish", name: "Abandoned Baby Bullish", category: "Triple Candlestick", sentiment: "Bullish", difficulty: "Advanced", reliability: 5, timeframe: "D1", meaning: "Rare bottom reversal with gaps around a Doji after a decline.", beginnerExplanation: "A falling market gaps to a Doji, then gaps up and reverses.", psychology: "Sellers exhaust themselves and buyers regain control with urgency.", rules: "Bearish candle, gap down Doji, gap up bullish candle.", useCase: "Major reversal in markets where gaps are meaningful.", entry: "Above the bullish confirmation candle.", stopLoss: "Below the Doji low.", target: "Prior supply or measured range.", confirmation: "Gaps remain open and volume supports the reversal.", mistakes: "Forcing this pattern in 24-hour markets where gaps are rare.", scenario: "A stock gaps down into panic and gaps up the next session.", viz: "abandoned-baby-bull" },
    { id: "abandoned-baby-bearish", name: "Abandoned Baby Bearish", category: "Triple Candlestick", sentiment: "Bearish", difficulty: "Advanced", reliability: 5, timeframe: "D1", meaning: "Rare top reversal with gaps around a Doji after a rally.", beginnerExplanation: "A rally gaps to a Doji, then gaps down and reverses.", psychology: "Buyers exhaust themselves and sellers regain control with urgency.", rules: "Bullish candle, gap up Doji, gap down bearish candle.", useCase: "Major reversal in markets where gaps are meaningful.", entry: "Below the bearish confirmation candle.", stopLoss: "Above the Doji high.", target: "Prior demand or measured range.", confirmation: "Gaps remain open and volume supports the reversal.", mistakes: "Forcing this pattern in continuous crypto or forex sessions.", scenario: "A stock gaps up into euphoria and gaps down the next session.", viz: "abandoned-baby-bear" },
    { id: "kicker-bullish", name: "Bullish Kicker", category: "Double Candlestick", sentiment: "Bullish", difficulty: "Advanced", reliability: 5, timeframe: "D1, W1", meaning: "A sudden gap and opposite candle that marks a sharp bullish sentiment shift.", beginnerExplanation: "The market flips from red to strong green immediately.", psychology: "A major catalyst changes positioning and traps sellers.", rules: "Bearish candle followed by bullish candle opening above the prior open with a gap.", useCase: "News-driven trend shift and institutional repricing.", entry: "After the bullish Kicker closes or on controlled retest.", stopLoss: "Below the Kicker candle low.", target: "Measured gap extension or next resistance.", confirmation: "High volume and no immediate gap fill.", mistakes: "Chasing far above the gap with poor reward.", scenario: "Earnings gap creates a bullish Kicker above resistance.", viz: "kicker-bull" },
    { id: "kicker-bearish", name: "Bearish Kicker", category: "Double Candlestick", sentiment: "Bearish", difficulty: "Advanced", reliability: 5, timeframe: "D1, W1", meaning: "A sudden gap and opposite candle that marks a sharp bearish sentiment shift.", beginnerExplanation: "The market flips from green to strong red immediately.", psychology: "A major catalyst changes positioning and traps buyers.", rules: "Bullish candle followed by bearish candle opening below the prior open with a gap.", useCase: "News-driven trend shift and institutional repricing.", entry: "After the bearish Kicker closes or on controlled retest.", stopLoss: "Above the Kicker candle high.", target: "Measured gap extension or next support.", confirmation: "High volume and no immediate gap fill.", mistakes: "Shorting after the move has already traveled too far.", scenario: "Bad guidance creates a bearish Kicker below support.", viz: "kicker-bear" }
];

const chartPatterns = [
    { id: "head-shoulders", name: "Head and Shoulders", type: "reversal", sentiment: "Bearish", reliability: 5, timeframe: "H4, D1, W1", structure: "Left shoulder, higher head, weaker right shoulder, and neckline support.", description: "A distribution pattern where buyers fail to sustain the final rally.", psychology: "Buyers create one last higher high, but the right shoulder shows demand has weakened.", entry: "Close below neckline or failed retest of neckline.", stopLoss: "Above the right shoulder or above the failed retest high.", target: "Head-to-neckline distance projected below the breakdown.", confirmation: "Rising volume on breakdown and lower high before neckline loss.", invalidation: "Clean close back above the neckline.", mistake: "Shorting before the neckline breaks." },
    { id: "inverse-head-shoulders", name: "Inverse Head and Shoulders", type: "reversal", sentiment: "Bullish", reliability: 5, timeframe: "H4, D1, W1", structure: "Left shoulder, deeper head, higher right shoulder, and neckline resistance.", description: "An accumulation pattern where sellers fail to continue the downtrend.", psychology: "Sellers push to a new low, then fail to repeat that pressure on the right shoulder.", entry: "Close above neckline or retest hold after breakout.", stopLoss: "Below the right shoulder or below the retest low.", target: "Head-to-neckline distance projected above breakout.", confirmation: "Strong close through neckline and volume expansion.", invalidation: "Clean close back below the neckline.", mistake: "Buying while the neckline is still resistance." },
    { id: "double-top", name: "Double Top", type: "reversal", sentiment: "Bearish", reliability: 4, timeframe: "H1, H4, D1", structure: "Two similar highs with a valley between them.", description: "Two failed attempts at the same resistance followed by breakdown.", psychology: "Buyers cannot accept price above resistance twice, so trapped longs exit below the valley.", entry: "Break and close below the valley low.", stopLoss: "Above the second top.", target: "Top-to-valley height projected down.", confirmation: "Second top rejects quickly and breakdown has momentum.", invalidation: "Close above both tops.", mistake: "Calling it a double top before the valley breaks." },
    { id: "double-bottom", name: "Double Bottom", type: "reversal", sentiment: "Bullish", reliability: 4, timeframe: "H1, H4, D1", structure: "Two similar lows with a middle peak neckline.", description: "Two failed attempts to break support followed by bullish breakout.", psychology: "Sellers fail twice at the same floor; breakout forces shorts to cover.", entry: "Break and close above the middle peak.", stopLoss: "Below the second bottom.", target: "Bottom-to-neckline height projected up.", confirmation: "Second bottom rejects with stronger buying pressure.", invalidation: "Close below both bottoms.", mistake: "Buying the second low before neckline confirmation." },
    { id: "triple-top", name: "Triple Top", type: "reversal", sentiment: "Bearish", reliability: 4, timeframe: "H4, D1", structure: "Three rejections from a similar resistance shelf.", description: "A larger topping pattern that becomes active only after support breaks.", psychology: "Distribution builds because every rally into resistance meets supply.", entry: "Close below the range support.", stopLoss: "Above the third top.", target: "Range height projected below support.", confirmation: "Third rejection is weaker and breakdown closes near low.", invalidation: "Close above resistance shelf.", mistake: "Shorting inside the range without breakdown." },
    { id: "triple-bottom", name: "Triple Bottom", type: "reversal", sentiment: "Bullish", reliability: 4, timeframe: "H4, D1", structure: "Three rejections from a similar support shelf.", description: "A larger bottoming pattern that becomes active after resistance breaks.", psychology: "Accumulation builds because sellers repeatedly fail to push below support.", entry: "Close above the range resistance.", stopLoss: "Below the third bottom.", target: "Range height projected above resistance.", confirmation: "Third test holds quickly and breakout has volume.", invalidation: "Close below support shelf.", mistake: "Buying before the range resistance breaks." },
    { id: "bull-flag", name: "Bull Flag", type: "continuation", sentiment: "Bullish", reliability: 4, timeframe: "M15, H1, H4", structure: "Sharp impulse pole followed by a small downward or sideways channel.", description: "Trend pauses through controlled profit-taking before continuation.", psychology: "Early buyers take profits, but sellers cannot reverse the impulse.", entry: "Break and close above flag resistance.", stopLoss: "Below flag low or below the last higher low.", target: "Pole length projected from breakout.", confirmation: "Flag stays shallow and breakout volume expands.", invalidation: "Close below flag base.", mistake: "Buying a flag that retraced too deeply." },
    { id: "bear-flag", name: "Bear Flag", type: "continuation", sentiment: "Bearish", reliability: 4, timeframe: "M15, H1, H4", structure: "Sharp impulse drop followed by a small upward or sideways channel.", description: "Downtrend pauses through short covering before continuation.", psychology: "Short covering lifts price, but buyers cannot reclaim the impulse breakdown.", entry: "Break and close below flag support.", stopLoss: "Above flag high or above the last lower high.", target: "Pole length projected from breakdown.", confirmation: "Flag stays shallow and breakdown volume expands.", invalidation: "Close above flag base.", mistake: "Shorting a flag after price already hit major support." },
    { id: "ascending-triangle", name: "Ascending Triangle", type: "continuation", sentiment: "Bullish", reliability: 4, timeframe: "H1, H4, D1", structure: "Flat resistance with rising lows pressing into supply.", description: "Compression pattern where buyers become more aggressive under resistance.", psychology: "Sellers defend one level, but buyers keep accepting higher prices.", entry: "Close above flat resistance or retest hold.", stopLoss: "Below last higher low.", target: "Triangle height projected upward.", confirmation: "Breakout candle closes above resistance with volume.", invalidation: "Break below rising trendline.", mistake: "Buying before price actually clears resistance." },
    { id: "descending-triangle", name: "Descending Triangle", type: "continuation", sentiment: "Bearish", reliability: 4, timeframe: "H1, H4, D1", structure: "Flat support with lower highs pressing into demand.", description: "Compression pattern where sellers become more aggressive above support.", psychology: "Buyers defend one level, but sellers keep accepting lower prices.", entry: "Close below flat support or retest failure.", stopLoss: "Above last lower high.", target: "Triangle height projected downward.", confirmation: "Breakdown candle closes below support with volume.", invalidation: "Break above falling trendline.", mistake: "Shorting before support is actually lost." },
    { id: "symmetrical-triangle", name: "Symmetrical Triangle", type: "bilateral", sentiment: "Neutral", reliability: 3, timeframe: "H1, H4, D1", structure: "Lower highs and higher lows compress into an apex.", description: "A volatility compression pattern that can break in either direction.", psychology: "Both sides reduce commitment until a breakout forces the next move.", entry: "Close outside either trendline, ideally before the final apex.", stopLoss: "Inside the opposite side of the triangle.", target: "Widest triangle height projected from breakout.", confirmation: "Expansion candle with range and volume.", invalidation: "Breakout closes back inside the triangle.", mistake: "Predicting direction instead of waiting for break." },
    { id: "cup-handle", name: "Cup and Handle", type: "continuation", sentiment: "Bullish", reliability: 4, timeframe: "D1, W1", structure: "Rounded base, return to resistance, then a smaller handle pullback.", description: "Long accumulation structure followed by a controlled shakeout.", psychology: "Supply dries up through the cup, then the handle removes late buyers before breakout.", entry: "Break above handle resistance.", stopLoss: "Below handle low.", target: "Cup depth projected upward.", confirmation: "Rounded cup, shallow handle, and breakout volume.", invalidation: "Handle breaks below midpoint of the cup.", mistake: "Using a V-shaped bounce as a cup." },
    { id: "rising-wedge", name: "Rising Wedge", type: "reversal", sentiment: "Bearish", reliability: 4, timeframe: "H1, H4, D1", structure: "Higher highs and higher lows inside a narrowing upward channel.", description: "Price rises, but each push has less momentum.", psychology: "Buyers still lift price, yet demand weakens and late longs become vulnerable.", entry: "Break and close below wedge support.", stopLoss: "Above last wedge high.", target: "Wedge base or measured height.", confirmation: "Bearish divergence or strong support loss.", invalidation: "Close back above wedge resistance.", mistake: "Shorting the wedge while support still holds." },
    { id: "falling-wedge", name: "Falling Wedge", type: "reversal", sentiment: "Bullish", reliability: 4, timeframe: "H1, H4, D1", structure: "Lower highs and lower lows inside a narrowing downward channel.", description: "Price falls, but each sell-off has less momentum.", psychology: "Sellers still push lower, yet supply weakens and shorts become vulnerable.", entry: "Break and close above wedge resistance.", stopLoss: "Below last wedge low.", target: "Wedge base or measured height.", confirmation: "Bullish divergence or strong resistance reclaim.", invalidation: "Close back below wedge support.", mistake: "Buying before the wedge resistance breaks." },
    { id: "rectangle", name: "Rectangle Range", type: "bilateral", sentiment: "Neutral", reliability: 3, timeframe: "M15, H1, H4", structure: "Horizontal support and resistance contain price.", description: "Balanced auction that becomes useful when one side finally accepts price outside the range.", psychology: "Both sides defend known levels until breakout changes inventory.", entry: "Breakout close and retest, or fade extremes while range holds.", stopLoss: "Opposite side of breakout or beyond range extreme.", target: "Range height projected from breakout.", confirmation: "Close outside range with follow-through.", invalidation: "Failed breakout back inside range.", mistake: "Trading the middle of the range." },
    { id: "pennant", name: "Pennant", type: "continuation", sentiment: "Neutral", reliability: 3, timeframe: "M5, M15, H1", structure: "Small symmetrical compression after a fast impulse pole.", description: "A compact continuation pattern that should not drift sideways for too long.", psychology: "The impulse pauses briefly, then trend traders look for continuation.", entry: "Break in the direction of the pole.", stopLoss: "Opposite side of pennant.", target: "Pole projected from breakout.", confirmation: "Pennant is tight, short-lived, and breaks with momentum.", invalidation: "Break against the pole direction.", mistake: "Calling every tiny triangle a pennant without a strong pole." }
];

const indicators = [
    { id: "rsi", name: "RSI", category: "Momentum Oscillator", sentiment: "Neutral", description: "Measures speed of recent gains versus losses.", useCase: "Overbought or oversold context, divergence, and momentum regime.", settings: "14 period; 70/30 classic, 80/20 for strong trends.", confirmation: "Best with structure, trendline breaks, and divergence.", mistake: "Shorting every RSI above 70 during strong uptrends." },
    { id: "ema", name: "Exponential Moving Averages", category: "Trend", sentiment: "Neutral", description: "Weighted moving average that reacts faster to recent price.", useCase: "Trend direction, dynamic support or resistance, pullback zones.", settings: "20 EMA for short trend, 50 EMA for swing, 200 EMA for macro filter.", confirmation: "Slope, candle reaction, and higher timeframe alignment.", mistake: "Taking every touch as support without price action confirmation." },
    { id: "sma", name: "Simple Moving Average", category: "Trend", sentiment: "Neutral", description: "Average price over a fixed number of candles.", useCase: "Long-term trend filter and mean reversion context.", settings: "50 SMA, 100 SMA, 200 SMA.", confirmation: "Works best on liquid markets and higher timeframes.", mistake: "Using too many averages until the chart becomes noisy." },
    { id: "macd", name: "MACD", category: "Momentum", sentiment: "Neutral", description: "Shows relationship between two moving averages.", useCase: "Momentum shifts, crossovers, and histogram expansion.", settings: "12, 26, 9 standard.", confirmation: "Histogram crossing zero with structure breakout.", mistake: "Using late crossovers as entries after the move is extended." },
    { id: "bollinger", name: "Bollinger Bands", category: "Volatility", sentiment: "Neutral", description: "Bands around a moving average based on standard deviation.", useCase: "Volatility expansion, squeeze, mean reversion, and trend riding.", settings: "20 period, 2 standard deviations.", confirmation: "Band squeeze breakout with volume.", mistake: "Fading the upper band during strong trend expansion." },
    { id: "atr", name: "ATR", category: "Volatility", sentiment: "Neutral", description: "Average True Range measures normal price movement.", useCase: "Stop distance, target planning, and volatility regime.", settings: "14 period standard.", confirmation: "Use with structure to avoid stops that are too tight.", mistake: "Using ATR as direction signal; it measures movement, not bias." },
    { id: "vwap", name: "VWAP", category: "Institutional Benchmark", sentiment: "Neutral", description: "Volume-weighted average price for the session.", useCase: "Intraday fair value, mean reversion, and trend validation.", settings: "Session VWAP; anchored VWAP for events or swing lows.", confirmation: "Price holding above VWAP supports bullish intraday bias.", mistake: "Using regular VWAP on higher timeframe swing trades without context." },
    { id: "volume", name: "Volume", category: "Participation", sentiment: "Neutral", description: "Shows how much trading activity happens during a candle.", useCase: "Confirm breakouts, exhaustion, absorption, and accumulation.", settings: "Raw volume plus 20-period volume average.", confirmation: "Breakouts are stronger when volume expands above average.", mistake: "Ignoring market-specific volume quality and session timing." },
    { id: "stochastic", name: "Stochastic", category: "Momentum Oscillator", sentiment: "Neutral", description: "Compares close to recent high-low range.", useCase: "Pullback timing inside ranges or slower trends.", settings: "14, 3, 3 standard.", confirmation: "Use crossovers near range extremes with support or resistance.", mistake: "Treating every overbought reading as a sell signal." },
    { id: "adx", name: "ADX", category: "Trend Strength", sentiment: "Neutral", description: "Measures trend strength without telling direction.", useCase: "Filter trend strategies from range strategies.", settings: "14 period; above 25 often means stronger trend.", confirmation: "Pair with moving averages or structure for direction.", mistake: "Forgetting ADX can rise in both uptrends and downtrends." },
    { id: "fibonacci", name: "Fibonacci Retracement", category: "Structure Tool", sentiment: "Neutral", description: "Maps common pullback zones between swing high and swing low.", useCase: "Confluence with support, resistance, trendlines, and candles.", settings: "38.2%, 50%, 61.8%, 78.6%.", confirmation: "Candle rejection at a fib level near structure.", mistake: "Drawing fibs on unclear or tiny swings." },
    { id: "ichimoku", name: "Ichimoku Cloud", category: "Trend System", sentiment: "Neutral", description: "Multi-line system for trend, momentum, and support or resistance.", useCase: "Trend qualification, cloud support, and momentum confirmation.", settings: "9, 26, 52 standard.", confirmation: "Price above cloud, Tenkan above Kijun, and Chikou confirmation.", mistake: "Using it mechanically without higher timeframe context." }
];

const strategies = [
    { id: "trend-pullback", name: "Trend Pullback", category: "Continuation", description: "Trade in the direction of a confirmed trend after a controlled pullback.", setup: "Higher highs and higher lows for longs, or lower highs and lower lows for shorts.", trigger: "Engulfing candle, pin bar, or inside bar breakout at moving average or structure.", risk: "Stop beyond pullback swing, target next impulse leg.", avoid: "Avoid when pullback breaks market structure." },
    { id: "breakout-retest", name: "Breakout Retest", category: "Structure", description: "Wait for price to break a level, retest it, and continue.", setup: "Clear horizontal support or resistance with multiple touches.", trigger: "Retest rejection candle or bullish or bearish engulfing.", risk: "Stop beyond retest extreme, target measured range.", avoid: "Avoid if breakout candle is too large and retest is far away." },
    { id: "failed-breakout", name: "Failed Breakout", category: "Reversal", description: "Trade against a breakout that quickly returns inside the old range.", setup: "Price sweeps prior high or low and closes back inside the range.", trigger: "Pin bar, engulfing candle, or strong close back through level.", risk: "Stop beyond sweep extreme, target opposite side of range.", avoid: "Avoid against strong news-driven trend days." },
    { id: "opening-range", name: "Opening Range Break", category: "Intraday", description: "Use the first session range as a decision zone.", setup: "Define the high and low of the first 15 to 60 minutes.", trigger: "Close outside range with volume and VWAP alignment.", risk: "Stop inside range or beyond retest.", avoid: "Avoid low-volume sessions and fakeouts without confirmation." },
    { id: "mean-reversion", name: "Mean Reversion", category: "Range", description: "Fade extremes when price is stretched and structure supports a return to mean.", setup: "Range-bound market with price at support or resistance.", trigger: "Rejection candle plus RSI divergence or Bollinger Band rejection.", risk: "Stop beyond range extreme, target midpoint first.", avoid: "Avoid when trend strength is high or ADX is rising sharply." },
    { id: "multi-timeframe", name: "Multi-Timeframe Alignment", category: "Process", description: "Use higher timeframe bias and lower timeframe trigger.", setup: "Weekly or daily defines direction, H4 or H1 defines zone, M15 or M5 defines entry.", trigger: "Market structure shift at the higher timeframe zone.", risk: "Stop beyond entry timeframe invalidation, target higher timeframe level.", avoid: "Avoid when lower timeframe signal fights higher timeframe trend." },
    { id: "liquidity-sweep", name: "Liquidity Sweep", category: "Advanced", description: "Trade after price takes obvious highs or lows and rejects.", setup: "Visible equal highs, equal lows, prior day high or low, or range extreme.", trigger: "Sweep plus close back inside and follow-through candle.", risk: "Stop beyond sweep wick, target internal liquidity or opposite range.", avoid: "Avoid when sweep turns into accepted breakout." },
    { id: "risk-first", name: "Risk-First Execution", category: "Discipline", description: "Build every trade from invalidation and reward before thinking about profit.", setup: "Clear entry, stop, target, and maximum loss defined before order.", trigger: "Only execute if reward is at least 1.5 to 2 times risk.", risk: "Risk 0.25% to 1% per trade until consistent.", avoid: "Avoid revenge trades, moving stops wider, and adding to losers." }
];

const roadmapSteps = [
    { title: "Level 1: Market Basics", items: ["Candlestick anatomy", "Bid, ask, spread, liquidity", "Trend, range, and volatility", "Timeframe selection"] },
    { title: "Level 2: Price Action", items: ["Support and resistance", "Market structure", "Candlestick psychology", "Breakout and retest logic"] },
    { title: "Level 3: Pattern Mastery", items: ["Single, double, and triple candles", "Chart pattern measurement", "Confirmation and invalidation", "Pattern failure analysis"] },
    { title: "Level 4: Risk Management", items: ["Position sizing", "Risk reward planning", "Max daily loss", "Correlation and exposure control"] },
    { title: "Level 5: Strategy Building", items: ["Trend pullbacks", "Range reversions", "Breakout playbooks", "Multi-timeframe execution"] },
    { title: "Level 6: Professional Process", items: ["Trading journal", "Psychology review", "Weekly playbook audit", "Data-driven improvement"] }
];

const glossary = [
    { term: "Support", definition: "A price area where demand has previously been strong enough to pause or reverse selling." },
    { term: "Resistance", definition: "A price area where supply has previously been strong enough to pause or reverse buying." },
    { term: "Liquidity", definition: "The availability of orders at a price. Obvious highs and lows often attract liquidity." },
    { term: "Market Structure", definition: "The sequence of swing highs and lows that defines trend or range behavior." },
    { term: "Higher High", definition: "A swing high that forms above the previous swing high, often part of an uptrend." },
    { term: "Lower Low", definition: "A swing low that forms below the previous swing low, often part of a downtrend." },
    { term: "Break of Structure", definition: "A decisive move through a prior swing level that changes the market map." },
    { term: "Retest", definition: "Price returns to a broken level to test whether it has flipped role." },
    { term: "Invalidation", definition: "The price level where your trade idea is proven wrong." },
    { term: "Risk Reward", definition: "The relationship between possible loss and possible gain on a trade." },
    { term: "R Multiple", definition: "A result measured in units of risk. A 2R win earns twice the amount risked." },
    { term: "ATR", definition: "Average True Range, a tool that estimates normal candle movement." },
    { term: "Divergence", definition: "When price makes a new extreme but an oscillator does not confirm it." },
    { term: "Confluence", definition: "Multiple independent reasons supporting the same trade idea." },
    { term: "Absorption", definition: "Large buying or selling pressure is taken by the opposite side without much price progress." },
    { term: "Distribution", definition: "A phase where stronger hands may sell into demand near highs." },
    { term: "Accumulation", definition: "A phase where stronger hands may buy into supply near lows." },
    { term: "VWAP", definition: "Volume Weighted Average Price, often used as intraday fair value." },
    { term: "Stop Hunt", definition: "A move through obvious stops that quickly reverses if breakout is not accepted." },
    { term: "Drawdown", definition: "The decline from an account peak to a later low." },
    { term: "Win Rate", definition: "The percentage of trades that close profitably." },
    { term: "Expectancy", definition: "Average outcome per trade after considering win rate and average win or loss." },
    { term: "Slippage", definition: "The difference between expected execution price and actual execution price." },
    { term: "Position Size", definition: "The number of units, shares, or contracts chosen based on risk and stop distance." }
];

const checklistItems = [
    "Higher timeframe bias is clear",
    "Setup is at support, resistance, trendline, VWAP, or demand/supply",
    "Entry trigger is visible and closed",
    "Invalidation level is defined before entry",
    "Reward is at least 1.5R",
    "Position size matches risk limit",
    "No major emotional impulse is driving the trade",
    "Trade note is ready before execution"
];

const appState = {
    activeSection: "candlesticksSection",
    activeChartFilter: "all",
    advanced: false,
    favoritesOnly: false,
    favorites: new Set(JSON.parse(localStorage.getItem("candleFavs") || "[]")),
    quiz: null
};

const moneyFormatter = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });
const numberFormatter = new Intl.NumberFormat("en-US", { maximumFractionDigits: 4 });

const dom = {};

document.addEventListener("DOMContentLoaded", init);

function init() {
    cacheDom();
    setupEvents();
    document.body.dataset.section = appState.activeSection;
    renderAll();
    setupCalculators();
    drawMarketCanvas();
    loadJournal();
    updateFavCount();
    updateMetrics();
}

function cacheDom() {
    dom.tabs = document.querySelectorAll(".nav-tab");
    dom.tabContents = document.querySelectorAll(".tab-content");
    dom.searchInput = document.getElementById("searchBar");
    dom.categoryFilter = document.getElementById("categoryFilter");
    dom.sentimentFilter = document.getElementById("sentimentFilter");
    dom.difficultyFilter = document.getElementById("difficultyFilter");
    dom.modeToggle = document.getElementById("modeToggle");
    dom.patternGrid = document.getElementById("patternGrid");
    dom.chartPatternGrid = document.getElementById("chartPatternGrid");
    dom.indicatorGrid = document.getElementById("indicatorGrid");
    dom.strategyGrid = document.getElementById("strategyGrid");
    dom.glossaryGrid = document.getElementById("glossaryGrid");
    dom.roadmapList = document.getElementById("roadmapList");
    dom.patternModal = document.getElementById("patternModal");
    dom.quizModal = document.getElementById("quizModal");
    dom.modalBody = document.getElementById("modalBody");
    dom.quizBody = document.getElementById("quizBody");
}

function setupEvents() {
    dom.tabs.forEach((tab) => {
        tab.addEventListener("click", () => switchSection(tab.dataset.section));
    });

    [dom.searchInput, dom.categoryFilter, dom.sentimentFilter, dom.difficultyFilter].forEach((control) => {
        control.addEventListener("input", renderAll);
        control.addEventListener("change", renderAll);
    });

    dom.modeToggle.addEventListener("change", (event) => {
        appState.advanced = event.target.checked;
        renderAll();
        if (dom.patternModal.classList.contains("open") && dom.modalBody.dataset.currentPattern) {
            showPatternModal(patterns.find((pattern) => pattern.id === dom.modalBody.dataset.currentPattern));
        }
    });

    document.querySelectorAll(".filter-btn").forEach((button) => {
        button.addEventListener("click", () => {
            document.querySelectorAll(".filter-btn").forEach((item) => item.classList.remove("active"));
            button.classList.add("active");
            appState.activeChartFilter = button.dataset.filter;
            renderChartPatterns();
        });
    });

    document.getElementById("quizBtn").addEventListener("click", startQuiz);
    document.getElementById("favsBtn").addEventListener("click", toggleFavoritesView);

    document.querySelector(".close").addEventListener("click", () => closeModal(dom.patternModal));
    document.querySelector(".close-quiz").addEventListener("click", () => closeModal(dom.quizModal));

    [dom.patternModal, dom.quizModal].forEach((modal) => {
        modal.addEventListener("click", (event) => {
            if (event.target === modal) closeModal(modal);
        });
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeModal(dom.patternModal);
            closeModal(dom.quizModal);
        }
    });

    renderChecklist();
    document.getElementById("saveJournalBtn").addEventListener("click", saveJournal);
    window.addEventListener("resize", throttle(drawMarketCanvas, 120));
}

function renderAll() {
    renderCandlesticks();
    renderChartPatterns();
    renderIndicators();
    renderStrategies();
    renderRoadmap();
    renderGlossary();
}

function switchSection(sectionId) {
    appState.activeSection = sectionId;
    document.body.dataset.section = sectionId;
    dom.tabs.forEach((tab) => tab.classList.toggle("active", tab.dataset.section === sectionId));
    dom.tabContents.forEach((section) => section.classList.toggle("active", section.id === sectionId));
    drawMarketCanvas();
}

function renderCandlesticks() {
    const query = getQuery();
    const category = dom.categoryFilter.value;
    const sentiment = dom.sentimentFilter.value;
    const difficulty = dom.difficultyFilter.value;

    const filtered = patterns.filter((pattern) => {
        const matchesCategory = category === "all" || pattern.category === category;
        const matchesSentiment = sentiment === "all" || pattern.sentiment.includes(sentiment);
        const matchesDifficulty = difficulty === "all" || pattern.difficulty === difficulty;
        const matchesFavorites = !appState.favoritesOnly || appState.favorites.has(pattern.id);
        return matchesCategory && matchesSentiment && matchesDifficulty && matchesFavorites && matchesSearch(pattern, query);
    });

    dom.patternGrid.innerHTML = "";
    if (!filtered.length) {
        dom.patternGrid.appendChild(emptyState("No candlestick patterns match the current filters."));
    } else {
        filtered.forEach((pattern) => dom.patternGrid.appendChild(createPatternCard(pattern)));
    }

    const resultCount = document.getElementById("patternResultCount");
    resultCount.textContent = `${filtered.length} visible`;
}

function renderChartPatterns() {
    const query = getQuery();
    const filtered = chartPatterns.filter((pattern) => {
        const matchesType = appState.activeChartFilter === "all" || pattern.type === appState.activeChartFilter;
        return matchesType && matchesSearch(pattern, query);
    });

    dom.chartPatternGrid.innerHTML = "";
    if (!filtered.length) {
        dom.chartPatternGrid.appendChild(emptyState("No chart patterns match the current filters."));
    } else {
        filtered.forEach((pattern) => dom.chartPatternGrid.appendChild(createChartPatternCard(pattern)));
    }

    const resultCount = document.getElementById("chartPatternResultCount");
    resultCount.textContent = `${filtered.length} visual setups`;
}

function renderIndicators() {
    const query = getQuery();
    const filtered = indicators.filter((indicator) => matchesSearch(indicator, query));

    dom.indicatorGrid.innerHTML = "";
    if (!filtered.length) {
        dom.indicatorGrid.appendChild(emptyState("No indicators match the current search."));
    } else {
        filtered.forEach((indicator) => dom.indicatorGrid.appendChild(createKnowledgeCard(indicator, "indicator")));
    }
}

function renderStrategies() {
    const query = getQuery();
    const filtered = strategies.filter((strategy) => matchesSearch(strategy, query));

    dom.strategyGrid.innerHTML = "";
    if (!filtered.length) {
        dom.strategyGrid.appendChild(emptyState("No playbooks match the current search."));
    } else {
        filtered.forEach((strategy) => dom.strategyGrid.appendChild(createKnowledgeCard(strategy, "strategy")));
    }
}

function renderRoadmap() {
    dom.roadmapList.innerHTML = "";
    roadmapSteps.forEach((step, index) => {
        const item = document.createElement("article");
        item.className = "roadmap-item";
        item.innerHTML = `
            <div class="roadmap-index">${index + 1}</div>
            <div>
                <h3>${step.title}</h3>
                <ul>${step.items.map((entry) => `<li>${entry}</li>`).join("")}</ul>
            </div>
        `;
        dom.roadmapList.appendChild(item);
    });
}

function renderGlossary() {
    const query = getQuery();
    const filtered = glossary.filter((item) => matchesSearch(item, query));

    dom.glossaryGrid.innerHTML = "";
    if (!filtered.length) {
        dom.glossaryGrid.appendChild(emptyState("No glossary terms match the current search."));
    } else {
        filtered.forEach((item) => {
            const card = document.createElement("article");
            card.className = "card";
            card.innerHTML = `
                <span class="tag">Glossary</span>
                <h3>${item.term}</h3>
                <p>${item.definition}</p>
            `;
            card.addEventListener("click", () => showGenericModal({
                name: item.term,
                description: item.definition,
                category: "Glossary"
            }));
            dom.glossaryGrid.appendChild(card);
        });
    }
}

function createPatternCard(pattern) {
    const card = document.createElement("article");
    const sentiment = sentimentClass(pattern.sentiment);
    card.className = `card pattern-card ${sentiment}`;
    card.innerHTML = `
        <button class="favorite-btn ${appState.favorites.has(pattern.id) ? "active" : ""}" aria-label="Toggle favorite" title="Toggle favorite">${appState.favorites.has(pattern.id) ? "Saved" : "Save"}</button>
        <div class="mini-viz">${generateSVG(pattern.viz, sentiment, 118)}</div>
        <h3>${pattern.name}</h3>
        <div class="tag-row">
            <span class="tag">${pattern.category}</span>
            <span class="sentiment-pill ${sentiment}">${pattern.sentiment}</span>
            <span class="level-pill">${pattern.difficulty}</span>
        </div>
        <p>${appState.advanced ? pattern.meaning : pattern.beginnerExplanation}</p>
        <div class="card-footer">
            ${reliabilityBars(pattern.reliability)}
            <span class="tag">${pattern.timeframe}</span>
        </div>
    `;

    card.addEventListener("click", () => showPatternModal(pattern));
    const favoriteButton = card.querySelector(".favorite-btn");
    favoriteButton.addEventListener("click", (event) => {
        event.stopPropagation();
        toggleFavorite(pattern.id);
    });

    return card;
}

function createKnowledgeCard(item, kind) {
    const card = document.createElement("article");
    const sentiment = sentimentClass(item.sentiment || "Neutral");
    const title = item.name;
    const label = item.category || item.type || "Knowledge";
    const description = item.description || item.setup || item.definition;
    card.className = "card";
    card.innerHTML = `
        <span class="tag">${label}</span>
        <h3>${title}</h3>
        <p>${description}</p>
        <div class="card-footer">
            <span class="sentiment-pill ${sentiment}">${item.sentiment || kind}</span>
            <span class="tag">${kind}</span>
        </div>
    `;
    card.addEventListener("click", () => showGenericModal(item));
    return card;
}

function createChartPatternCard(pattern) {
    const card = document.createElement("article");
    const sentiment = sentimentClass(pattern.sentiment || "Neutral");
    card.className = `card chart-pattern-card ${sentiment}`;
    card.innerHTML = `
        <div class="chart-pattern-viz">${generateChartPatternSVG(pattern.id, 320, 178)}</div>
        <h3>${pattern.name}</h3>
        <div class="tag-row">
            <span class="tag">${pattern.type}</span>
            <span class="sentiment-pill ${sentiment}">${pattern.sentiment}</span>
            <span class="level-pill">${pattern.timeframe}</span>
        </div>
        <p>${pattern.description}</p>
        <div class="chart-analysis">
            <div class="chart-analysis-row"><strong>Structure</strong><span>${pattern.structure}</span></div>
            <div class="chart-analysis-row"><strong>Entry</strong><span>${pattern.entry}</span></div>
            <div class="chart-analysis-row"><strong>Target</strong><span>${pattern.target}</span></div>
        </div>
    `;
    card.addEventListener("click", () => showGenericModal(pattern));
    return card;
}

function showPatternModal(pattern) {
    if (!pattern) return;
    const sentiment = sentimentClass(pattern.sentiment);
    dom.modalBody.dataset.currentPattern = pattern.id;
    dom.modalBody.innerHTML = `
        <div class="detail-grid">
            <div class="visual-panel">
                <div class="candle-viz">${generateSVG(pattern.viz, sentiment, 210)}</div>
                <div>
                    <div class="tag-row">
                        <span class="tag">${pattern.category}</span>
                        <span class="sentiment-pill ${sentiment}">${pattern.sentiment}</span>
                        <span class="level-pill">${pattern.difficulty}</span>
                    </div>
                </div>
                <div class="info-section">
                    <h4>Reliability</h4>
                    ${reliabilityBars(pattern.reliability)}
                </div>
            </div>
            <div>
                <span class="eyebrow">${pattern.timeframe}</span>
                <h2>${pattern.name}</h2>
                ${infoBlock("Meaning", appState.advanced ? pattern.meaning : pattern.beginnerExplanation)}
                ${infoBlock("Market Psychology", pattern.psychology)}
                ${infoBlock("Rules", pattern.rules)}
                ${infoBlock("Best Use", pattern.useCase)}
                ${appState.advanced ? infoBlock("Entry", pattern.entry) + infoBlock("Stop Loss", pattern.stopLoss) + infoBlock("Target", pattern.target) : ""}
                ${infoBlock("Confirmation", pattern.confirmation)}
                ${appState.advanced ? infoBlock("Common Mistake", pattern.mistakes) : ""}
                ${infoBlock("Example Scenario", pattern.scenario)}
            </div>
        </div>
    `;
    openModal(dom.patternModal);
}

function showGenericModal(item) {
    const blocks = [
        ["Description", item.description || item.definition],
        ["Structure", item.structure],
        ["Psychology", item.psychology],
        ["Setup", item.setup],
        ["Trigger", item.trigger],
        ["Entry", item.entry],
        ["Stop Loss", item.stopLoss],
        ["Target", item.target],
        ["Settings", item.settings],
        ["Use Case", item.useCase],
        ["Confirmation", item.confirmation],
        ["Risk", item.risk],
        ["Avoid", item.avoid || item.mistake],
        ["Invalidation", item.invalidation]
    ].filter(([, value]) => Boolean(value));

    const chartVisual = item.type ? `<div class="chart-pattern-viz modal-chart-viz">${generateChartPatternSVG(item.id, 560, 260)}</div>` : "";

    dom.modalBody.dataset.currentPattern = "";
    dom.modalBody.innerHTML = `
        <div>
            <span class="eyebrow">${item.category || item.type || "Knowledge"}</span>
            <h2>${item.name || item.term}</h2>
            ${chartVisual}
            ${blocks.map(([title, value]) => infoBlock(title, value)).join("")}
        </div>
    `;
    openModal(dom.patternModal);
}

function infoBlock(title, value) {
    if (!value) return "";
    return `<div class="info-section"><h4>${title}</h4><p>${value}</p></div>`;
}

function reliabilityBars(score) {
    return `<div class="reliability-bars" aria-label="Reliability ${score} out of 5">${Array.from({ length: 5 }, (_, index) => `<span class="${index < score ? "on" : ""}"></span>`).join("")}</div>`;
}

function sentimentClass(sentiment) {
    const value = sentiment.toLowerCase();
    if (value.includes("bullish") && value.includes("bearish")) return "neutral";
    if (value.includes("bullish")) return "bullish";
    if (value.includes("bearish")) return "bearish";
    return "neutral";
}

function matchesSearch(item, query) {
    if (!query) return true;
    const text = Object.values(item).join(" ").toLowerCase();
    return text.includes(query);
}

function getQuery() {
    return dom.searchInput.value.trim().toLowerCase();
}

function emptyState(message) {
    const div = document.createElement("div");
    div.className = "empty-state";
    div.textContent = message;
    return div;
}

function toggleFavorite(id) {
    if (appState.favorites.has(id)) {
        appState.favorites.delete(id);
    } else {
        appState.favorites.add(id);
    }
    localStorage.setItem("candleFavs", JSON.stringify([...appState.favorites]));
    updateFavCount();
    renderCandlesticks();
}

function toggleFavoritesView() {
    appState.favoritesOnly = !appState.favoritesOnly;
    document.getElementById("favsBtn").classList.toggle("active", appState.favoritesOnly);
    switchSection("candlesticksSection");
    renderCandlesticks();
}

function updateFavCount() {
    document.getElementById("favCount").textContent = appState.favorites.size;
}

function updateMetrics() {
    document.getElementById("patternCount").textContent = patterns.length;
    document.getElementById("chartPatternCount").textContent = chartPatterns.length;
    document.getElementById("indicatorCount").textContent = indicators.length;
}

function openModal(modal) {
    modal.classList.add("open");
    document.body.classList.add("modal-open");
}

function closeModal(modal) {
    modal.classList.remove("open");
    if (!dom.patternModal.classList.contains("open") && !dom.quizModal.classList.contains("open")) {
        document.body.classList.remove("modal-open");
    }
}

function setupCalculators() {
    document.getElementById("calcPositionBtn").addEventListener("click", calculatePosition);
    document.getElementById("calcRrBtn").addEventListener("click", calculateRiskReward);
    document.getElementById("calcCompoundBtn").addEventListener("click", calculateCompound);
    calculatePosition();
    calculateRiskReward();
    calculateCompound();
}

function calculatePosition() {
    const balance = readNumber("accBalance");
    const riskPct = readNumber("riskPct");
    const entry = readNumber("entryPrice");
    const stop = readNumber("stopLossInput");
    const output = document.getElementById("calcResults");

    if (balance <= 0 || riskPct <= 0 || entry <= 0 || stop <= 0 || entry === stop) {
        output.innerHTML = `<p class="result-item">Enter valid balance, risk, entry, and stop.</p>`;
        return;
    }

    const riskAmount = balance * (riskPct / 100);
    const stopDistance = Math.abs(entry - stop);
    const quantity = riskAmount / stopDistance;
    const notional = quantity * entry;

    output.innerHTML = resultRows([
        ["Risk amount", moneyFormatter.format(riskAmount)],
        ["Stop distance", numberFormatter.format(stopDistance)],
        ["Position size", `${numberFormatter.format(quantity)} units`],
        ["Notional value", moneyFormatter.format(notional)]
    ]);
}

function calculateRiskReward() {
    const direction = document.getElementById("rrDirection").value;
    const entry = readNumber("rrEntry");
    const stop = readNumber("rrStop");
    const target = readNumber("rrTarget");
    const output = document.getElementById("rrResults");
    const risk = direction === "long" ? entry - stop : stop - entry;
    const reward = direction === "long" ? target - entry : entry - target;

    if (entry <= 0 || stop <= 0 || target <= 0 || risk <= 0 || reward <= 0) {
        output.innerHTML = `<p class="result-item">Enter valid entry, stop, target, and direction.</p>`;
        return;
    }

    const ratio = reward / risk;
    const breakevenWinRate = risk / (risk + reward) * 100;

    output.innerHTML = resultRows([
        ["Risk per unit", numberFormatter.format(risk)],
        ["Reward per unit", numberFormatter.format(reward)],
        ["Reward ratio", `1:${ratio.toFixed(2)}`],
        ["Break-even win rate", `${breakevenWinRate.toFixed(1)}%`]
    ]);
}

function calculateCompound() {
    const capital = readNumber("compoundCapital");
    const monthlyReturn = readNumber("monthlyReturn");
    const months = readNumber("compoundMonths");
    const output = document.getElementById("compoundResults");

    if (capital <= 0 || months <= 0) {
        output.innerHTML = `<p class="result-item">Enter valid capital and months.</p>`;
        return;
    }

    const ending = capital * Math.pow(1 + monthlyReturn / 100, months);
    const gain = ending - capital;

    output.innerHTML = resultRows([
        ["Ending capital", moneyFormatter.format(ending)],
        ["Net change", moneyFormatter.format(gain)],
        ["Total return", `${((ending / capital - 1) * 100).toFixed(2)}%`]
    ]);
}

function readNumber(id) {
    return Number.parseFloat(document.getElementById(id).value);
}

function resultRows(rows) {
    return rows.map(([label, value]) => `<div class="result-item"><span>${label}</span><span class="result-val">${value}</span></div>`).join("");
}

function renderChecklist() {
    const checklist = document.getElementById("checklistItems");
    const saved = JSON.parse(localStorage.getItem("tradeChecklist") || "[]");
    checklist.innerHTML = "";
    checklistItems.forEach((item, index) => {
        const label = document.createElement("label");
        label.className = "check-item";
        label.innerHTML = `<input type="checkbox" data-index="${index}" ${saved.includes(index) ? "checked" : ""}> <span>${item}</span>`;
        label.querySelector("input").addEventListener("change", updateReadiness);
        checklist.appendChild(label);
    });
    updateReadiness();
}

function updateReadiness() {
    const checks = [...document.querySelectorAll("#checklistItems input")];
    const checked = checks.filter((input) => input.checked).map((input) => Number(input.dataset.index));
    localStorage.setItem("tradeChecklist", JSON.stringify(checked));
    const score = checks.length ? Math.round((checked.length / checks.length) * 100) : 0;
    document.getElementById("readinessScore").textContent = `Readiness: ${score}%`;
}

function saveJournal() {
    const note = document.getElementById("journalNote").value.trim();
    localStorage.setItem("tradeJournalNote", note);
    const status = document.getElementById("journalStatus");
    status.textContent = "Saved locally.";
    setTimeout(() => {
        status.textContent = "";
    }, 1600);
}

function loadJournal() {
    const note = localStorage.getItem("tradeJournalNote") || "";
    document.getElementById("journalNote").value = note;
}

function startQuiz() {
    appState.quiz = { score: 0, asked: 0, total: 5, current: null };
    renderQuizQuestion();
    openModal(dom.quizModal);
}

function renderQuizQuestion() {
    const quiz = appState.quiz;
    if (!quiz) return;

    if (quiz.asked >= quiz.total) {
        dom.quizBody.innerHTML = `
            <span class="eyebrow">Pattern quiz</span>
            <h2>Score: ${quiz.score}/${quiz.total}</h2>
            <p class="info-section">Review the patterns you missed and repeat the quiz after studying confirmation rules.</p>
            <button class="primary-btn" id="restartQuizBtn">Restart Quiz</button>
        `;
        document.getElementById("restartQuizBtn").addEventListener("click", startQuiz);
        return;
    }

    const correct = randomItem(patterns);
    const options = shuffle([correct, ...shuffle(patterns.filter((pattern) => pattern.id !== correct.id)).slice(0, 3)]);
    quiz.current = correct;
    quiz.asked += 1;

    dom.quizBody.innerHTML = `
        <span class="eyebrow">Question ${quiz.asked} of ${quiz.total}</span>
        <h2>Identify this pattern</h2>
        <div class="candle-viz">${generateSVG(correct.viz, sentimentClass(correct.sentiment), 190)}</div>
        <div id="quizOptions">
            ${options.map((option) => `<button class="quiz-option" data-id="${option.id}">${option.name}</button>`).join("")}
        </div>
        <div id="quizFeedback" class="info-section"></div>
    `;

    document.querySelectorAll(".quiz-option").forEach((button) => {
        button.addEventListener("click", () => answerQuiz(button));
    });
}

function answerQuiz(button) {
    const selectedId = button.dataset.id;
    const quiz = appState.quiz;
    const isCorrect = selectedId === quiz.current.id;
    if (isCorrect) quiz.score += 1;

    document.querySelectorAll(".quiz-option").forEach((option) => {
        option.disabled = true;
        if (option.dataset.id === quiz.current.id) option.classList.add("correct");
        if (option === button && !isCorrect) option.classList.add("wrong");
    });

    const feedback = document.getElementById("quizFeedback");
    feedback.innerHTML = `
        <h4>${isCorrect ? "Correct" : "Review"}</h4>
        <p>${quiz.current.name}: ${quiz.current.beginnerExplanation}</p>
        <button class="primary-btn" id="nextQuizBtn">Next</button>
    `;
    document.getElementById("nextQuizBtn").addEventListener("click", renderQuizQuestion);
}

function randomItem(items) {
    return items[Math.floor(Math.random() * items.length)];
}

function shuffle(items) {
    return [...items].sort(() => Math.random() - 0.5);
}

function drawMarketCanvas() {
    const canvas = document.getElementById("marketCanvas");
    const context = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const width = Math.max(320, rect.width);
    const height = Math.max(280, rect.height);

    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
    context.clearRect(0, 0, width, height);

    const candles = [
        [78, 86, 73, 84], [84, 89, 80, 87], [87, 91, 82, 83], [83, 86, 78, 80],
        [80, 85, 76, 84], [84, 92, 82, 91], [91, 96, 88, 95], [95, 98, 90, 92],
        [92, 94, 86, 88], [88, 90, 83, 85], [85, 89, 82, 88], [88, 96, 86, 95],
        [95, 101, 93, 100], [100, 104, 96, 98], [98, 103, 97, 102], [102, 111, 101, 109],
        [109, 114, 105, 107], [107, 112, 103, 110], [110, 119, 109, 118], [118, 123, 115, 121]
    ];

    const padding = 32;
    const values = candles.flat();
    const min = Math.min(...values) - 3;
    const max = Math.max(...values) + 3;
    const scaleY = (value) => height - padding - ((value - min) / (max - min)) * (height - padding * 2);
    const spacing = (width - padding * 2) / candles.length;

    context.strokeStyle = "rgba(29,29,31,0.08)";
    context.lineWidth = 1;
    for (let i = 0; i < 5; i += 1) {
        const y = padding + i * ((height - padding * 2) / 4);
        context.beginPath();
        context.moveTo(padding, y);
        context.lineTo(width - padding, y);
        context.stroke();
    }

    context.strokeStyle = "rgba(0,113,227,0.34)";
    context.lineWidth = 2;
    context.beginPath();
    context.moveTo(padding, scaleY(82));
    context.lineTo(width - padding, scaleY(116));
    context.stroke();

    candles.forEach(([open, high, low, close], index) => {
        const x = padding + index * spacing + spacing / 2;
        const bullish = close >= open;
        const color = bullish ? "#00a878" : "#ff3b30";
        const yOpen = scaleY(open);
        const yClose = scaleY(close);
        const yHigh = scaleY(high);
        const yLow = scaleY(low);
        const bodyTop = Math.min(yOpen, yClose);
        const bodyHeight = Math.max(Math.abs(yClose - yOpen), 3);
        const bodyWidth = Math.max(8, Math.min(18, spacing * 0.52));

        context.strokeStyle = color;
        context.fillStyle = color;
        context.lineWidth = 2;
        context.beginPath();
        context.moveTo(x, yHigh);
        context.lineTo(x, yLow);
        context.stroke();
        context.fillRect(x - bodyWidth / 2, bodyTop, bodyWidth, bodyHeight);
    });

    context.fillStyle = "rgba(0,113,227,0.96)";
    context.font = "700 13px system-ui, sans-serif";
    context.fillText("Breakout zone", padding, scaleY(109) - 10);
}

function generateChartPatternSVG(id, width = 320, height = 178) {
    const blue = "#0071e3";
    const green = "#00a878";
    const red = "#ff3b30";
    const ink = "#2f3642";
    const muted = "#8a8f98";
    const grid = "rgba(29,29,31,0.08)";
    const bullish = ["inverse-head-shoulders", "double-bottom", "triple-bottom", "bull-flag", "ascending-triangle", "cup-handle", "falling-wedge"].includes(id);
    const bearish = ["head-shoulders", "double-top", "triple-top", "bear-flag", "descending-triangle", "rising-wedge"].includes(id);
    const accent = bullish ? green : bearish ? red : blue;
    const line = (x1, y1, x2, y2, color = ink, dash = "") => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="2.6" stroke-linecap="round" ${dash ? `stroke-dasharray="${dash}"` : ""}/>`;
    const poly = (points, color = ink) => `<polyline points="${points}" fill="none" stroke="${color}" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/>`;
    const label = (x, y, text, color = muted) => `<text x="${x}" y="${y}" fill="${color}" font-size="10" font-weight="700" font-family="system-ui, sans-serif">${text}</text>`;
    const arrow = (x, y, direction, color = accent) => {
        const points = direction === "up" ? `${x},${y - 14} ${x - 7},${y} ${x + 7},${y}` : `${x},${y + 14} ${x - 7},${y} ${x + 7},${y}`;
        const lineEnd = direction === "up" ? y + 28 : y - 28;
        return `${line(x, lineEnd, x, y, color)}<polygon points="${points}" fill="${color}"/>`;
    };

    let drawing = "";
    switch (id) {
        case "head-shoulders":
            drawing = `${poly("25,128 70,82 108,128 156,44 204,128 244,88 292,134")}${line(28,128,292,128,blue,"7 6")}${arrow(260,136,"down",red)}${label(135,36,"Head",red)}${label(40,76,"LS")}${label(230,82,"RS")}${label(36,143,"Neckline",blue)}`;
            break;
        case "inverse-head-shoulders":
            drawing = `${poly("25,54 70,100 108,54 156,138 204,54 244,96 292,50")}${line(28,54,292,54,blue,"7 6")}${arrow(260,48,"up",green)}${label(136,150,"Head",green)}${label(42,112,"LS")}${label(231,108,"RS")}${label(36,46,"Neckline",blue)}`;
            break;
        case "double-top":
            drawing = `${poly("28,130 78,58 126,126 190,60 254,130 292,146")}${line(62,59,205,59,red,"7 6")}${line(112,126,268,126,blue,"7 6")}${arrow(260,134,"down",red)}${label(71,49,"Top 1",red)}${label(179,50,"Top 2",red)}${label(119,141,"Trigger",blue)}`;
            break;
        case "double-bottom":
            drawing = `${poly("28,48 78,122 126,54 190,120 254,50 292,36")}${line(62,121,205,121,green,"7 6")}${line(112,54,268,54,blue,"7 6")}${arrow(260,48,"up",green)}${label(67,136,"Low 1",green)}${label(176,136,"Low 2",green)}${label(119,46,"Neckline",blue)}`;
            break;
        case "triple-top":
            drawing = `${poly("24,130 62,62 100,122 142,62 182,124 224,62 276,132 298,146")}${line(50,62,238,62,red,"7 6")}${line(93,124,282,124,blue,"7 6")}${arrow(282,132,"down",red)}${label(68,52,"Resistance",red)}${label(102,139,"Breakdown",blue)}`;
            break;
        case "triple-bottom":
            drawing = `${poly("24,48 62,120 100,58 142,120 182,56 224,120 276,48 298,34")}${line(50,120,238,120,green,"7 6")}${line(93,56,282,56,blue,"7 6")}${arrow(282,50,"up",green)}${label(68,136,"Support",green)}${label(102,48,"Breakout",blue)}`;
            break;
        case "bull-flag":
            drawing = `${line(38,138,94,40,green)}${poly("94,40 136,54 178,48 220,62 268,52",green)}${line(112,32,266,46,blue)}${line(104,72,258,86,blue)}${arrow(270,48,"up",green)}${label(38,151,"Pole",green)}${label(150,30,"Flag")}`;
            break;
        case "bear-flag":
            drawing = `${line(38,40,94,138,red)}${poly("94,138 136,122 178,130 220,114 268,124",red)}${line(110,112,265,98,blue)}${line(104,152,258,138,blue)}${arrow(270,132,"down",red)}${label(38,32,"Pole",red)}${label(150,106,"Flag")}`;
            break;
        case "ascending-triangle":
            drawing = `${poly("28,138 75,104 118,122 164,84 208,102 256,64 292,62")}${line(48,64,292,64,red,"7 6")}${line(52,140,262,76,blue)}${arrow(284,58,"up",green)}${label(59,55,"Flat resistance",red)}${label(71,143,"Rising lows",blue)}`;
            break;
        case "descending-triangle":
            drawing = `${poly("28,42 75,78 118,58 164,96 208,78 256,116 292,118")}${line(48,118,292,118,green,"7 6")}${line(52,40,262,104,blue)}${arrow(284,124,"down",red)}${label(59,134,"Flat support",green)}${label(70,35,"Lower highs",blue)}`;
            break;
        case "symmetrical-triangle":
            drawing = `${poly("28,128 72,60 112,116 154,74 196,104 238,88 284,92")}${line(54,54,282,91,blue)}${line(54,136,282,91,blue)}${arrow(292,90,"up",blue)}${label(84,47,"Compression",blue)}${label(223,82,"Apex")}`;
            break;
        case "cup-handle":
            drawing = `${pathCurve("M34,68 C64,142 156,150 202,68 S252,74 272,62",green)}${line(34,68,276,68,blue,"7 6")}${pathCurve("M204,68 C220,92 246,92 262,74",ink)}${arrow(282,62,"up",green)}${label(108,146,"Rounded cup",green)}${label(218,99,"Handle")}`;
            break;
        case "rising-wedge":
            drawing = `${poly("32,132 76,100 112,114 152,80 190,94 232,66 276,78")}${line(54,132,286,77,blue)}${line(54,98,286,63,blue)}${arrow(250,106,"down",red)}${label(84,145,"Narrowing support",blue)}${label(170,58,"Weak highs")}`;
            break;
        case "falling-wedge":
            drawing = `${poly("32,44 76,78 112,64 152,100 190,86 232,118 276,104")}${line(54,44,286,103,blue)}${line(54,80,286,122,blue)}${arrow(250,74,"up",green)}${label(86,37,"Narrowing resistance",blue)}${label(168,136,"Weak lows")}`;
            break;
        case "rectangle":
            drawing = `${poly("26,116 68,62 110,112 154,62 198,114 242,62 286,116")}${line(42,62,288,62,red,"7 6")}${line(42,116,288,116,green,"7 6")}${arrow(292,58,"up",blue)}${label(58,52,"Resistance",red)}${label(58,132,"Support",green)}`;
            break;
        case "pennant":
            drawing = `${line(34,138,86,42,accent)}${poly("86,42 124,74 162,58 198,74 232,66",ink)}${line(100,42,236,66,blue)}${line(100,92,236,66,blue)}${arrow(244,62,"up",accent)}${label(34,151,"Pole",accent)}${label(132,38,"Pennant")}`;
            break;
        default:
            drawing = `${poly("28,124 76,80 116,104 162,66 214,92 286,48",accent)}${line(42,126,286,50,blue,"7 6")}`;
    }

    const gridLines = `${line(18,44,302,44,grid)}${line(18,90,302,90,grid)}${line(18,136,302,136,grid)}`;
    return `<svg viewBox="0 0 320 178" width="${width}" height="${height}" role="img" aria-label="${id} chart pattern diagram">${gridLines}${drawing}</svg>`;
}

function pathCurve(d, color) {
    return `<path d="${d}" fill="none" stroke="${color}" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/>`;
}

function generateSVG(type, sentiment, size = 150) {
    const color = sentiment === "bullish" ? "#00a878" : sentiment === "bearish" ? "#ff3b30" : "#7b8492";
    const green = "#00a878";
    const red = "#ff3b30";
    const gray = "#7b8492";
    const wick = (x, y1, y2, stroke = "#30343b") => `<line x1="${x}" y1="${y1}" x2="${x}" y2="${y2}" stroke="${stroke}" stroke-width="3" stroke-linecap="round"/>`;
    const body = (x, y, h, fill, w = 22) => `<rect x="${x}" y="${y}" width="${w}" height="${Math.max(h, 4)}" rx="3" fill="${fill}"/>`;
    const candle = (x, top, bottom, bodyTop, bodyHeight, fill) => `${wick(x + 11, top, bottom)}${body(x, bodyTop, bodyHeight, fill)}`;
    let svg = "";

    switch (type) {
        case "marubozu":
            svg = body(79, 24, 72, color);
            break;
        case "doji":
            svg = `${wick(90, 12, 108)}${body(73, 58, 4, gray, 34)}`;
            break;
        case "long-doji":
            svg = `${wick(90, 8, 112)}${body(72, 58, 4, gray, 36)}`;
            break;
        case "dragonfly":
            svg = `${wick(90, 30, 112)}${body(72, 28, 4, green, 36)}`;
            break;
        case "gravestone":
            svg = `${wick(90, 8, 90)}${body(72, 88, 4, red, 36)}`;
            break;
        case "spinning-top":
            svg = candle(79, 18, 104, 48, 26, color);
            break;
        case "hammer":
        case "hanging-man":
            svg = `${wick(90, 37, 112)}${body(76, 28, 24, color, 28)}`;
            break;
        case "inverted-hammer":
        case "shooting-star":
            svg = `${wick(90, 8, 82)}${body(76, 74, 24, color, 28)}`;
            break;
        case "bull-engulf":
            svg = `${candle(55, 42, 95, 58, 24, red)}${candle(96, 18, 105, 30, 60, green)}`;
            break;
        case "bear-engulf":
            svg = `${candle(55, 26, 78, 36, 24, green)}${candle(96, 18, 105, 30, 60, red)}`;
            break;
        case "piercing":
            svg = `${candle(55, 18, 105, 28, 62, red)}${candle(96, 42, 110, 56, 35, green)}`;
            break;
        case "dark-cloud":
            svg = `${candle(55, 18, 104, 30, 60, green)}${candle(96, 18, 94, 42, 42, red)}`;
            break;
        case "tweezer-bottom":
            svg = `${candle(58, 22, 104, 34, 44, red)}${candle(98, 36, 104, 54, 28, green)}`;
            break;
        case "tweezer-top":
            svg = `${candle(58, 18, 92, 38, 28, green)}${candle(98, 18, 104, 30, 48, red)}`;
            break;
        case "morning-star":
        case "abandoned-baby-bull":
            svg = `${candle(38, 18, 104, 30, 58, red)}${wick(90, 72, 104)}${body(78, 82, 6, gray, 24)}${candle(122, 35, 102, 45, 45, green)}`;
            break;
        case "evening-star":
        case "abandoned-baby-bear":
            svg = `${candle(38, 34, 104, 48, 44, green)}${wick(90, 16, 48)}${body(78, 30, 6, gray, 24)}${candle(122, 18, 96, 34, 50, red)}`;
            break;
        case "soldiers":
            svg = `${candle(35, 70, 112, 80, 22, green)}${candle(78, 48, 96, 58, 25, green)}${candle(121, 25, 80, 36, 30, green)}`;
            break;
        case "crows":
            svg = `${candle(35, 18, 62, 28, 24, red)}${candle(78, 38, 84, 48, 24, red)}${candle(121, 58, 106, 68, 26, red)}`;
            break;
        case "inside-bar":
            svg = `${candle(58, 14, 108, 28, 66, color)}${candle(101, 42, 86, 52, 22, gray)}`;
            break;
        case "outside-bar":
            svg = `${candle(58, 42, 82, 52, 20, gray)}${candle(101, 14, 110, 28, 66, color)}`;
            break;
        case "harami-bull":
            svg = `${candle(58, 18, 108, 30, 62, red)}${candle(102, 50, 84, 58, 18, green)}`;
            break;
        case "harami-bear":
            svg = `${candle(58, 18, 108, 30, 62, green)}${candle(102, 50, 84, 58, 18, red)}`;
            break;
        case "pin-bar":
            svg = `${wick(90, 14, 112)}${body(76, 26, 18, color, 28)}`;
            break;
        case "railway":
            svg = `${candle(58, 18, 108, 28, 62, red)}${candle(102, 18, 108, 28, 62, green)}`;
            break;
        case "inside-up":
            svg = `${candle(38, 18, 104, 30, 58, red)}${candle(80, 54, 86, 61, 16, green)}${candle(122, 18, 96, 30, 52, green)}`;
            break;
        case "inside-down":
            svg = `${candle(38, 18, 104, 30, 58, green)}${candle(80, 54, 86, 61, 16, red)}${candle(122, 18, 96, 30, 52, red)}`;
            break;
        case "rising-three":
            svg = `${candle(24, 22, 104, 34, 58, green)}${candle(58, 45, 86, 52, 16, red)}${candle(84, 48, 88, 54, 16, red)}${candle(110, 50, 90, 58, 16, red)}${candle(138, 12, 92, 24, 58, green)}`;
            break;
        case "falling-three":
            svg = `${candle(24, 18, 100, 30, 58, red)}${candle(58, 36, 78, 48, 16, green)}${candle(84, 34, 76, 46, 16, green)}${candle(110, 32, 74, 44, 16, green)}${candle(138, 32, 112, 44, 58, red)}`;
            break;
        case "kicker-bull":
            svg = `${candle(58, 22, 102, 34, 54, red)}${candle(106, 12, 82, 20, 50, green)}`;
            break;
        case "kicker-bear":
            svg = `${candle(58, 22, 102, 34, 54, green)}${candle(106, 38, 112, 50, 50, red)}`;
            break;
        default:
            svg = candle(79, 18, 104, 38, 42, color);
    }

    return `<svg viewBox="0 0 180 120" width="${size}" height="${Math.round(size * 0.67)}" role="img" aria-label="Candlestick pattern diagram">${svg}</svg>`;
}

function throttle(fn, delay) {
    let waiting = false;
    return function throttled() {
        if (waiting) return;
        waiting = true;
        setTimeout(() => {
            fn();
            waiting = false;
        }, delay);
    };
}
