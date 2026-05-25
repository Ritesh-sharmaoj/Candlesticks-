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

const hinglishCopy = {
    patterns: {
        "marubozu": { meaning: "Long body aur almost no shadows dikhate hain ki ek side ka pressure decisive tha.", beginnerExplanation: "Price ek direction me strongly chala, pullback bahut kam tha.", psychology: "Ek side ne poora session control kiya. Next candle batati hai move continue hoga ya exhaust.", rules: "Body total range ka kam se kam 80% ho, wicks tiny ya absent hon.", useCase: "Breakout strength, trend continuation, ya extremes par final exhaustion candle.", entry: "Marubozu high ya low ka break tab use karo jab woh structure ke saath align ho.", stopLoss: "Candle ke opposite end ke beyond ya nearest structure ke beyond.", target: "Next support/resistance, ya minimum 1:2 risk reward.", confirmation: "Volume expansion, range ke bahar clean close, aur immediate rejection na ho.", mistakes: "Resistance ke late stage par giant candle buy karna jab reward potential poor ho.", scenario: "Bullish Marubozu rising volume ke saath multi-day resistance ke upar close hota hai." },
        "doji": { meaning: "Open aur close almost equal hote hain, yani market undecided hai.", beginnerExplanation: "Ye cross jaisa dikhta hai. Buyers aur sellers ka draw ho gaya.", psychology: "Dono sides ne control lene ki koshish ki, par close tak koi side control hold nahi kar payi.", rules: "Body total candle range ke comparison me bahut small honi chahiye.", useCase: "Pause signal, reversal warning, ya compression ke baad breakout trigger.", entry: "High ke upar ya low ke neeche close ka wait karo.", stopLoss: "Doji range ki opposite side.", target: "Nearest clean structure ya volatility-based target.", confirmation: "Doji ke baad strong follow-through candle.", mistakes: "Har Doji ko trend aur location ke bina reversal samajhna.", scenario: "Strong rally ke baad resistance par Doji appear hota hai." },
        "long-legged-doji": { meaning: "Large upper aur lower shadows volatility dikhate hain, par commitment clear nahi hota.", beginnerExplanation: "Price dono directions me kaafi chala aur open ke paas close hua.", psychology: "Aggressive buyers aur sellers dono control hold karne me fail hue.", rules: "Tiny body middle ke paas ho, aur dono sides par long shadows hon.", useCase: "News exhaustion, range expansion, ya possible trend change.", entry: "Price range ke bahar break aur close kare tabhi trade karo.", stopLoss: "Aggressive traders ke liye range ke andar, conservative traders ke liye opposite extreme.", target: "ATR target ya next major liquidity area.", confirmation: "Volume ke saath breakout aur candle ke bahar close.", mistakes: "Market side choose karne se pehle range ke andar enter karna.", scenario: "Volatile session support aur resistance dono reject karke flat close karta hai." },
        "dragonfly-doji": { meaning: "Long lower shadow aur high ke paas close lower prices ki rejection dikhate hain.", beginnerExplanation: "Sellers ne price niche push kiya, par buyers wapas upar le aaye.", psychology: "Selling pressure absorb hua aur buyers ne low defend kiya.", rules: "Tiny body high ke paas ho, upper wick little/no ho, aur lower shadow long ho.", useCase: "Support ya demand par bottom reversal.", entry: "Confirmation ke baad candle high ke upar.", stopLoss: "Lower shadow ke neeche.", target: "Next resistance ya at least 1:2 risk reward.", confirmation: "Bullish candle Dragonfly high ke upar close kare.", mistakes: "Support context ke bina range ke middle me use karna.", scenario: "Price prior low sweep karta hai aur support ke upar wapas close hota hai." },
        "gravestone-doji": { meaning: "Long upper shadow aur low ke paas close higher prices ki rejection dikhate hain.", beginnerExplanation: "Buyers ne price upar push kiya, par sellers ne wapas niche la diya.", psychology: "Buyers resistance ke upar fail hue aur sellers ne control wapas le liya.", rules: "Tiny body low ke paas ho, lower wick little/no ho, aur upper shadow long ho.", useCase: "Resistance ya supply par top reversal.", entry: "Confirmation ke baad candle low ke neeche.", stopLoss: "Upper shadow ke upar.", target: "Next support ya liquidity pocket.", confirmation: "Bearish candle Gravestone low ke neeche close kare.", mistakes: "Nearby resistance ya trend exhaustion ke bina short karna.", scenario: "Price resistance ke upar break karke buyers trap karta hai aur wapas neeche close hota hai." },
        "spinning-top": { meaning: "Small body aur visible shadows movement ke baad balance dikhate hain.", beginnerExplanation: "Market slow ho raha hai aur direction decide kar raha hai.", psychology: "Momentum cool ho raha hai, par reversal ka proof abhi enough nahi hai.", rules: "Small real body middle ke paas ho, upper aur lower shadows ke saath.", useCase: "Trend exhaustion warning ya consolidation marker.", entry: "Next candle high ya low break kare iska wait karo.", stopLoss: "Setup range ki opposite side.", target: "Nearest structure jahan reward positive ho.", confirmation: "Follow-through candle aur structure alignment.", mistakes: "Spinning top ko akela trade signal maan lena.", scenario: "Rally resistance ke paas several spinning tops banati hai." },
        "hammer": { meaning: "Downtrend ke baad long lower shadow wali bullish reversal candle.", beginnerExplanation: "Market girne ki koshish karta hai, par buyers price wapas upar push karte hain.", psychology: "Support ke paas sellers control lose karte hain aur buyers rejection tail banate hain.", rules: "Lower shadow body se kam se kam two times ho, upper wick small ho, aur decline ke baad appear ho.", useCase: "Bottom formation, demand test, aur trend reversal setup.", entry: "Hammer high ke upar ya bullish confirmation close ke baad.", stopLoss: "Hammer low ke neeche.", target: "Next resistance, swing high, ya 1:2 risk reward.", confirmation: "Support zone, rising volume, aur bullish follow-through.", mistakes: "Uptrend me ise Hammer bolna; wahan context Hanging Man hota hai.", scenario: "Price 200 EMA me sell hota hai aur support par Hammer banata hai." },
        "hanging-man": { meaning: "Uptrend ke top par Hammer-shaped candle weakness ki warning deti hai.", beginnerExplanation: "Shape Hammer jaisi hai, par top par ye fall ki warning de sakti hai.", psychology: "Session me large sell-off aaya, chahe bulls ne part recover kar liya.", rules: "Uptrend ke baad small body high ke paas ho aur lower shadow long ho.", useCase: "Resistance ke paas ya extended rallies ke baad top warning.", entry: "Bearish confirmation ke baad Hanging Man low ke neeche.", stopLoss: "Candle high ke upar.", target: "Nearest support ya prior breakout level.", confirmation: "Body ya low ke neeche bearish close.", mistakes: "Confirmation se pehle immediately short karna.", scenario: "Long rally supply zone ke neeche Hanging Man print karti hai." },
        "inverted-hammer": { meaning: "Downtrend ke baad small body aur long upper shadow possible bottom signal dete hain.", beginnerExplanation: "Buyers ne upar push karne ki koshish ki. Confirmation batayegi ki woh strong hain ya nahi.", psychology: "Bulls ne supply test ki, sellers ne push back kiya, par selling momentum weak hua.", rules: "Small body low ke paas, long upper wick, aur decline ke baad appear ho.", useCase: "Reversal breakout se pehle early bottom warning.", entry: "Confirmation ke baad upper wick ke upar.", stopLoss: "Candle low ke neeche.", target: "Nearest resistance ya 1:2 risk reward.", confirmation: "Gap up, bullish close, ya structure reclaim.", mistakes: "Uptrend me ise Shooting Star se confuse karna.", scenario: "Falling market weekly demand level par Inverted Hammer banata hai." },
        "shooting-star": { meaning: "Uptrend ke baad long upper wick wali bearish reversal candle.", beginnerExplanation: "Price upar shoot hua aur hard reject ho gaya.", psychology: "Buyers rally continue karna chahte the, par close tak sellers overpower kar gaye.", rules: "Small body low ke paas, upper shadow body se kam se kam two times, aur rally ke baad appear ho.", useCase: "Resistance par short setup ya liquidity sweep ke baad reversal.", entry: "Confirmation ke baad Shooting Star low ke neeche.", stopLoss: "Upper wick ke upar.", target: "Nearest support ya prior breakout zone.", confirmation: "Bearish follow-through candle ya failed breakout.", mistakes: "Jab neeche strong trend support ho tab short karna.", scenario: "Price previous high sweep karke resistance ke neeche close hota hai." },
        "bullish-engulfing": { meaning: "Strong bullish candle previous bearish body ko fully cover karti hai.", beginnerExplanation: "Badi green candle previous red candle ko engulf kar leti hai.", psychology: "Sellers control me the, phir buyers ne decisively control le liya.", rules: "First candle bearish, second bullish, aur second body first body ko engulf kare.", useCase: "Support par reversal, pullback completion, ya breakout confirmation.", entry: "Engulfing candle high ke upar ya midpoint retest par.", stopLoss: "Engulfing candle low ke neeche.", target: "Recent swing high ya 1:2 risk reward.", confirmation: "Support confluence, volume expansion, aur market structure shift.", mistakes: "Itni large candle buy karna ki stop distance reward destroy kar de.", scenario: "Price demand retest karta hai aur volume ke saath bullish engulfing print hoti hai." },
        "bearish-engulfing": { meaning: "Strong bearish candle previous bullish body ko fully cover karti hai.", beginnerExplanation: "Badi red candle previous green candle ko engulf kar leti hai.", psychology: "Buyers control me the, phir sellers ne session completely reverse kar diya.", rules: "First candle bullish, second bearish, aur second body first body ko engulf kare.", useCase: "Resistance par reversal, failed breakout, ya lower-high confirmation.", entry: "Engulfing candle low ke neeche ya midpoint retest par.", stopLoss: "Engulfing candle high ke upar.", target: "Recent swing low ya 1:2 risk reward.", confirmation: "Resistance confluence, volume expansion, aur support loss.", mistakes: "Major support me short karna jab target ke liye room na ho.", scenario: "Price supply zone reject karta hai aur bearish engulfing candle ke roop me close hota hai." },
        "piercing-pattern": { meaning: "Bullish reversal jahan second candle first bearish candle ke midpoint ke upar close karti hai.", beginnerExplanation: "Green candle previous red candle ka half se zyada recover karti hai.", psychology: "Bears strong start karte hain, par buyers range ka important part reclaim kar lete hain.", rules: "Bearish candle ke baad bullish candle lower open kare aur candle one ke 50% ke upar close kare.", useCase: "Support par downtrend reversal warning.", entry: "Second candle high ke upar.", stopLoss: "Second candle low ke neeche.", target: "Nearest resistance ya 1:2 risk reward.", confirmation: "Bullish follow-through aur support hold.", mistakes: "Midpoint ke neeche close accept karna.", scenario: "Gap down reverse hota hai aur prior bearish candle ke andar deep close karta hai." },
        "dark-cloud-cover": { meaning: "Bearish reversal jahan second candle prior bullish candle ke midpoint ke neeche close karti hai.", beginnerExplanation: "Red candle previous green candle ke half se zyada andar push karti hai.", psychology: "Bulls strong open karte hain, par sellers control wapas le lete hain.", rules: "Bullish candle ke baad bearish candle higher open kare aur candle one ke 50% ke neeche close kare.", useCase: "Resistance par ya overextended rally ke baad top reversal.", entry: "Second candle low ke neeche.", stopLoss: "Second candle high ke upar.", target: "Nearest support ya measured move.", confirmation: "Bearish follow-through aur failed reclaim.", mistakes: "50% penetration rule ignore karna.", scenario: "News par price gap up karta hai, phir previous green candle me sell off hota hai." },
        "tweezer-bottom": { meaning: "Do candles almost same low reject karti hain, support dikhata hai.", beginnerExplanation: "Price same floor ko do baar test karta hai aur bounce hota hai.", psychology: "Sellers support todne ki do baar koshish karte hain aur fail hote hain.", rules: "Adjacent candles ke lows nearly equal hon, ideally decline ke baad.", useCase: "Support confirmation aur reversal trigger.", entry: "Confirmation ke baad pair high ke upar.", stopLoss: "Shared low ke neeche.", target: "Next resistance.", confirmation: "Pair range ke upar bullish close.", mistakes: "Noise ke andar random equal lows use karna.", scenario: "Do candles demand zone ko same price par reject karti hain." },
        "tweezer-top": { meaning: "Do candles almost same high reject karti hain, resistance dikhata hai.", beginnerExplanation: "Price same ceiling ko do baar touch karta hai aur girta hai.", psychology: "Buyers resistance todne ki do baar koshish karte hain aur fail hote hain.", rules: "Adjacent candles ke highs nearly equal hon, ideally rally ke baad.", useCase: "Resistance confirmation aur reversal trigger.", entry: "Confirmation ke baad pair low ke neeche.", stopLoss: "Shared high ke upar.", target: "Next support.", confirmation: "Pair range ke neeche bearish close.", mistakes: "Jab highs close na hon tab pattern force karna.", scenario: "Price supply zone ko do baar tap karta hai aur dono attempts reject hote hain." },
        "morning-star": { meaning: "Three-candle bullish reversal: strong bearish candle, pause, phir strong bullish recovery.", beginnerExplanation: "Red candle, small pause, phir strong green candle.", psychology: "Bearish control indecision me fade hota hai, phir buyers control lete hain.", rules: "Large bearish candle, small middle candle, aur bullish candle candle one ke midpoint ke upar close kare.", useCase: "Demand par major bottom reversal.", entry: "Third candle high ke upar.", stopLoss: "Pattern low ke neeche.", target: "Previous swing high ya major resistance.", confirmation: "Third candle strong close kare to confirmation milti hai.", mistakes: "Weak third candle accept karna jo midpoint reclaim nahi karti.", scenario: "Downtrend support low sweep karne ke baad Morning Star banata hai." },
        "evening-star": { meaning: "Three-candle bearish reversal: strong bullish candle, pause, phir strong bearish breakdown.", beginnerExplanation: "Green candle, small pause, phir strong red candle.", psychology: "Bullish control indecision me fade hota hai, phir sellers control lete hain.", rules: "Large bullish candle, small middle candle, aur bearish candle candle one ke midpoint ke neeche close kare.", useCase: "Supply par major top reversal.", entry: "Third candle low ke neeche.", stopLoss: "Pattern high ke upar.", target: "Previous swing low ya major support.", confirmation: "Third candle strong close kare to pattern confirm hota hai.", mistakes: "Preceding uptrend ke bina trade karna.", scenario: "Parabolic rally resistance ke neeche Evening Star ke saath end hoti hai." },
        "three-white-soldiers": { meaning: "Teen strong bullish candles aggressive demand dikhati hain.", beginnerExplanation: "Teen green candles in a row strong buying dikhati hain.", psychology: "Buyers several sessions tak higher prices pay karne ko ready hain.", rules: "Teen bullish candles higher closes aur small wicks ke saath.", useCase: "Trend reversal confirmation ya consolidation ke baad continuation.", entry: "Controlled pullback par ya third candle high ke upar.", stopLoss: "First soldier low ke neeche ya pullback structure ke neeche.", target: "Next major resistance.", confirmation: "Volume support aur moving averages se overly extended na ho.", mistakes: "Move already stretched hone ke baad buy karna.", scenario: "Range teen strong bullish closes ke saath upward break hoti hai." },
        "three-black-crows": { meaning: "Teen strong bearish candles aggressive supply dikhati hain.", beginnerExplanation: "Teen red candles in a row strong selling dikhati hain.", psychology: "Sellers several sessions tak lower prices accept karne ko ready hain.", rules: "Teen bearish candles lower closes aur small wicks ke saath.", useCase: "Bearish reversal confirmation ya failed rally ke baad continuation.", entry: "Controlled bounce par ya third candle low ke neeche.", stopLoss: "First crow high ke upar ya pullback structure ke upar.", target: "Next major support.", confirmation: "Volume support aur moving averages se bahut zyada extended na ho.", mistakes: "Sell-off already exhausted hone ke baad short karna.", scenario: "Failed breakout teen strong bearish closes me turn hota hai." },
        "inside-bar": { meaning: "Smaller candle previous candle range ke andar contained hoti hai.", beginnerExplanation: "Small candle badi candle ke andar baithi hai aur breakout ka wait karti hai.", psychology: "Volatility contract hoti hai jab traders direction ka wait karte hain.", rules: "Current high previous high se neeche aur current low previous low se upar ho.", useCase: "Trend continuation, breakout, aur compression plays.", entry: "Mother bar high ya low ka break.", stopLoss: "Mother bar ya inside bar ki opposite side.", target: "Measured range ya next structure.", confirmation: "Mother bar range ke bahar close.", mistakes: "Choppy, low-quality ranges me inside bars trade karna.", scenario: "Strong trend candle ke baad continuation se pehle inside bar form hota hai." },
        "outside-bar": { meaning: "Candle previous candle high aur low ke beyond expand karti hai.", beginnerExplanation: "Ek candle previous candle ki poori range cover kar leti hai.", psychology: "Volatility expand hoti hai aur dono sides par traps ban sakte hain.", rules: "Current high previous high se upar aur current low previous low se neeche ho.", useCase: "Volatility breakout ya failed move ke baad reversal.", entry: "Direction bias ke saath outside bar high ya low ka break.", stopLoss: "Outside bar ki opposite side.", target: "ATR target ya nearby liquidity.", confirmation: "Ek extreme ke paas strong close.", mistakes: "Oversized outside bars use karna jahan stop distance huge ho.", scenario: "News outside bar create karti hai jo low ke paas close hota hai." },
        "harami-bullish": { meaning: "Prior bearish body ke andar small bullish candle seller fatigue signal karti hai.", beginnerExplanation: "Badi red candle ke andar small green candle form hoti hai.", psychology: "Selling pressure pause hota hai aur buyers supply absorb karna start karte hain.", rules: "Large bearish candle ke baad small bullish candle uski body ke andar ho.", useCase: "Pullback ke baad early reversal warning.", entry: "Mother candle high ke upar ya confirmation ke baad.", stopLoss: "Mother candle low ke neeche.", target: "Next resistance ya 1:1.5 risk reward.", confirmation: "Small candle ke upar bullish close.", mistakes: "Strong downtrend me confirmation se pehle entry lena.", scenario: "Bearish pullback demand par Bullish Harami ke saath stall hota hai." },
        "harami-bearish": { meaning: "Prior bullish body ke andar small bearish candle buyer fatigue signal karti hai.", beginnerExplanation: "Badi green candle ke andar small red candle form hoti hai.", psychology: "Buying pressure pause hota hai aur sellers demand absorb karna start karte hain.", rules: "Large bullish candle ke baad small bearish candle uski body ke andar ho.", useCase: "Rally ke baad early reversal warning.", entry: "Mother candle low ke neeche ya confirmation ke baad.", stopLoss: "Mother candle high ke upar.", target: "Next support ya 1:1.5 risk reward.", confirmation: "Small candle ke neeche bearish close.", mistakes: "Strong uptrend me confirmation se pehle entry lena.", scenario: "Rally supply par Bearish Harami ke saath stall hoti hai." },
        "pin-bar": { meaning: "Long tail level rejection aur possible reversal dikhati hai.", beginnerExplanation: "Price level ke beyond poke karta hai aur snap back hota hai.", psychology: "Key level ke beyond ek side trap hoti hai, phir opposite side control leti hai.", rules: "Tail candle range ki kam se kam two-thirds ho, body opposite end ke paas ho.", useCase: "Support/resistance se reversal, especially liquidity sweep ke baad.", entry: "Candle nose ka break ya 50% retracement entry.", stopLoss: "Tail ke beyond.", target: "Recent swing point ya clean liquidity area.", confirmation: "Structure location aur volume ke saath tail rejection.", mistakes: "Pin bars ko beech market me trade karna.", scenario: "Bullish pin bar prior low sweep karta hai aur support ke upar close hota hai." },
        "railway-track": { meaning: "Similar-sized opposite candles fast sentiment flip dikhati hain.", beginnerExplanation: "Strong candle ko immediately similar opposite candle reverse kar deti hai.", psychology: "First side overcommit karti hai, phir opposite side move wapas le leti hai.", rules: "Do long opposite-colored candles similar body size ke saath.", useCase: "Clear support ya resistance par fast reversals.", entry: "Second candle ka break reversal direction me.", stopLoss: "Two-candle extreme ke beyond.", target: "Fixed reward ya nearest liquidity.", confirmation: "Second candle close aur structure confluence.", mistakes: "Small candles use karna jo true rejection nahi dikhati.", scenario: "Support me bearish candle ko bullish candle fully answer karti hai." },
        "three-inside-up": { meaning: "Confirmed Bullish Harami jisme third candle breakout deti hai.", beginnerExplanation: "Red, small green inside, phir green breakout.", psychology: "Sellers pause karte hain, buyers enter karte hain, phir control prove karte hain.", rules: "Bearish candle, bullish Harami, aur third bullish candle candle one high ke upar close kare.", useCase: "Safer bullish reversal entry.", entry: "Third candle close par ya breakout retest par.", stopLoss: "Pattern low ke neeche.", target: "Next resistance ya 1:2 risk reward.", confirmation: "Candle three se already confirmed.", mistakes: "Candle three close hone se pehle entry lena.", scenario: "Pullback ke end par Three Inside Up complete hota hai." },
        "three-inside-down": { meaning: "Confirmed Bearish Harami jisme third candle breakdown deti hai.", beginnerExplanation: "Green, small red inside, phir red breakdown.", psychology: "Buyers pause karte hain, sellers enter karte hain, phir control prove karte hain.", rules: "Bullish candle, bearish Harami, aur third bearish candle candle one low ke neeche close kare.", useCase: "Safer bearish reversal entry.", entry: "Third candle close par ya breakdown retest par.", stopLoss: "Pattern high ke upar.", target: "Next support ya 1:2 risk reward.", confirmation: "Candle three se already confirmed.", mistakes: "Candle three close hone se pehle entry lena.", scenario: "Double top ke neeche Three Inside Down complete hota hai." },
        "rising-three-methods": { meaning: "Strong candle range ke andar brief pullback ke saath bullish continuation pattern.", beginnerExplanation: "Big green, small pullback candles, phir another green breakout.", psychology: "Bears pause create karne ki koshish karte hain par prior bullish range tod nahi paate.", rules: "Long bullish candle, uske andar three small bearish candles, phir bullish breakout.", useCase: "Strong uptrends me add-on setup.", entry: "Fifth candle high ke upar.", stopLoss: "Pattern low ke neeche.", target: "Trend extension ya next resistance.", confirmation: "Fifth candle strongly close kare.", mistakes: "Middle candles accept karna jo first candle low ke neeche break kar jati hain.", scenario: "Strong uptrend three candles rest karta hai aur phir continue hota hai." },
        "falling-three-methods": { meaning: "Strong bearish candle range ke andar brief bounce ke saath bearish continuation pattern.", beginnerExplanation: "Big red, small bounce candles, phir another red breakdown.", psychology: "Bulls pause create karne ki koshish karte hain par prior bearish range tod nahi paate.", rules: "Long bearish candle, uske andar three small bullish candles, phir bearish breakdown.", useCase: "Strong downtrends me add-on setup.", entry: "Fifth candle low ke neeche.", stopLoss: "Pattern high ke upar.", target: "Trend extension ya next support.", confirmation: "Fifth candle strongly close kare.", mistakes: "Middle candles accept karna jo first candle high ke upar break kar jati hain.", scenario: "Strong downtrend three candles rest karta hai aur phir continue hota hai." },
        "abandoned-baby-bullish": { meaning: "Decline ke baad Doji ke around gaps ke saath rare bottom reversal.", beginnerExplanation: "Falling market Doji par gap down karta hai, phir gap up karke reverse hota hai.", psychology: "Sellers exhaust hote hain aur buyers urgency ke saath control wapas lete hain.", rules: "Bearish candle, gap down Doji, gap up bullish candle.", useCase: "Jahan gaps meaningful hon wahan major reversal.", entry: "Bullish confirmation candle ke upar.", stopLoss: "Doji low ke neeche.", target: "Prior supply ya measured range.", confirmation: "Gaps open rahen aur volume reversal support kare.", mistakes: "24-hour markets me force karna jahan gaps rare hote hain.", scenario: "Stock panic me gap down karta hai aur next session gap up hota hai." },
        "abandoned-baby-bearish": { meaning: "Rally ke baad Doji ke around gaps ke saath rare top reversal.", beginnerExplanation: "Rally Doji par gap up karti hai, phir gap down karke reverse hoti hai.", psychology: "Buyers exhaust hote hain aur sellers urgency ke saath control wapas lete hain.", rules: "Bullish candle, gap up Doji, gap down bearish candle.", useCase: "Jahan gaps meaningful hon wahan major reversal.", entry: "Bearish confirmation candle ke neeche.", stopLoss: "Doji high ke upar.", target: "Prior demand ya measured range.", confirmation: "Gaps open rahen aur volume reversal support kare.", mistakes: "Continuous crypto ya forex sessions me force karna.", scenario: "Stock euphoria me gap up karta hai aur next session gap down hota hai." },
        "kicker-bullish": { meaning: "Sudden gap aur opposite candle sharp bullish sentiment shift mark karte hain.", beginnerExplanation: "Market red se immediately strong green me flip hota hai.", psychology: "Major catalyst positioning change karta hai aur sellers trap ho jate hain.", rules: "Bearish candle ke baad bullish candle prior open ke upar gap ke saath open ho.", useCase: "News-driven trend shift aur institutional repricing.", entry: "Bullish Kicker close ke baad ya controlled retest par.", stopLoss: "Kicker candle low ke neeche.", target: "Measured gap extension ya next resistance.", confirmation: "High volume aur immediate gap fill na ho.", mistakes: "Gap se bahut upar poor reward ke saath chase karna.", scenario: "Earnings gap resistance ke upar bullish Kicker create karta hai." },
        "kicker-bearish": { meaning: "Sudden gap aur opposite candle sharp bearish sentiment shift mark karte hain.", beginnerExplanation: "Market green se immediately strong red me flip hota hai.", psychology: "Major catalyst positioning change karta hai aur buyers trap ho jate hain.", rules: "Bullish candle ke baad bearish candle prior open ke neeche gap ke saath open ho.", useCase: "News-driven trend shift aur institutional repricing.", entry: "Bearish Kicker close ke baad ya controlled retest par.", stopLoss: "Kicker candle high ke upar.", target: "Measured gap extension ya next support.", confirmation: "High volume aur immediate gap fill na ho.", mistakes: "Move already bahut travel kar chuka ho tab short karna.", scenario: "Bad guidance support ke neeche bearish Kicker create karta hai." }
    },
    chartPatterns: {
        "head-shoulders": { structure: "Left shoulder, higher head, weaker right shoulder, aur neckline support.", description: "Distribution pattern jahan buyers final rally sustain nahi kar paate.", psychology: "Buyers ek last higher high banate hain, par right shoulder dikhata hai demand weak ho chuki hai.", entry: "Neckline ke neeche close ya neckline ka failed retest.", stopLoss: "Right shoulder ke upar ya failed retest high ke upar.", target: "Head-to-neckline distance breakdown ke neeche project karo.", confirmation: "Breakdown par rising volume aur neckline loss se pehle lower high.", invalidation: "Neckline ke upar clean close.", mistake: "Neckline break hone se pehle short karna." },
        "inverse-head-shoulders": { structure: "Left shoulder, deeper head, higher right shoulder, aur neckline resistance.", description: "Accumulation pattern jahan sellers downtrend continue nahi kar paate.", psychology: "Sellers new low banate hain, phir right shoulder par same pressure repeat nahi kar paate.", entry: "Neckline ke upar close ya breakout ke baad retest hold.", stopLoss: "Right shoulder ke neeche ya retest low ke neeche.", target: "Head-to-neckline distance breakout ke upar project karo.", confirmation: "Neckline ke through strong close aur volume expansion.", invalidation: "Neckline ke neeche clean close.", mistake: "Jab neckline abhi resistance ho tab buy karna." },
        "double-top": { structure: "Do similar highs aur unke beech valley.", description: "Same resistance par do failed attempts ke baad breakdown.", psychology: "Buyers resistance ke upar price accept nahi kar paate, isliye valley ke neeche trapped longs exit karte hain.", entry: "Valley low ke neeche break aur close.", stopLoss: "Second top ke upar.", target: "Top-to-valley height ko downside me project karo.", confirmation: "Second top quickly reject ho aur breakdown me momentum ho.", invalidation: "Dono tops ke upar close.", mistake: "Valley break se pehle ise double top bolna." },
        "double-bottom": { structure: "Do similar lows aur middle peak neckline.", description: "Support todne ki do failed attempts ke baad bullish breakout.", psychology: "Sellers same floor par do baar fail hote hain; breakout shorts ko cover karne par force karta hai.", entry: "Middle peak ke upar break aur close.", stopLoss: "Second bottom ke neeche.", target: "Bottom-to-neckline height ko upside me project karo.", confirmation: "Second bottom stronger buying pressure ke saath reject ho.", invalidation: "Dono bottoms ke neeche close.", mistake: "Neckline confirmation se pehle second low buy karna." },
        "triple-top": { structure: "Similar resistance shelf se teen rejections.", description: "Larger topping pattern jo support break ke baad active hota hai.", psychology: "Distribution build hoti hai kyunki har rally resistance par supply se milti hai.", entry: "Range support ke neeche close.", stopLoss: "Third top ke upar.", target: "Range height support ke neeche project karo.", confirmation: "Third rejection weaker ho aur breakdown low ke paas close ho.", invalidation: "Resistance shelf ke upar close.", mistake: "Breakdown ke bina range ke andar short karna." },
        "triple-bottom": { structure: "Similar support shelf se teen rejections.", description: "Larger bottoming pattern jo resistance break ke baad active hota hai.", psychology: "Accumulation build hoti hai kyunki sellers repeatedly support ke neeche push karne me fail hote hain.", entry: "Range resistance ke upar close.", stopLoss: "Third bottom ke neeche.", target: "Range height resistance ke upar project karo.", confirmation: "Third test quickly hold kare aur breakout me volume ho.", invalidation: "Support shelf ke neeche close.", mistake: "Range resistance break hone se pehle buy karna." },
        "bull-flag": { structure: "Sharp impulse pole ke baad small downward ya sideways channel.", description: "Continuation se pehle controlled profit-taking ke through trend pause hota hai.", psychology: "Early buyers profit lete hain, par sellers impulse reverse nahi kar paate.", entry: "Flag resistance ke upar break aur close.", stopLoss: "Flag low ke neeche ya last higher low ke neeche.", target: "Pole length breakout se project karo.", confirmation: "Flag shallow rahe aur breakout volume expand ho.", invalidation: "Flag base ke neeche close.", mistake: "Aisi flag buy karna jo bahut deep retrace ho chuki ho." },
        "bear-flag": { structure: "Sharp impulse drop ke baad small upward ya sideways channel.", description: "Continuation se pehle short covering ke through downtrend pause hota hai.", psychology: "Short covering price lift karti hai, par buyers impulse breakdown reclaim nahi kar paate.", entry: "Flag support ke neeche break aur close.", stopLoss: "Flag high ke upar ya last lower high ke upar.", target: "Pole length breakdown se project karo.", confirmation: "Flag shallow rahe aur breakdown volume expand ho.", invalidation: "Flag base ke upar close.", mistake: "Major support hit hone ke baad flag short karna." },
        "ascending-triangle": { structure: "Flat resistance aur rising lows supply me press karte hain.", description: "Compression pattern jahan buyers resistance ke neeche more aggressive hote hain.", psychology: "Sellers ek level defend karte hain, par buyers higher prices accept karte rehte hain.", entry: "Flat resistance ke upar close ya retest hold.", stopLoss: "Last higher low ke neeche.", target: "Triangle height upward project karo.", confirmation: "Breakout candle volume ke saath resistance ke upar close kare.", invalidation: "Rising trendline ke neeche break.", mistake: "Price resistance clear karne se pehle buy karna." },
        "descending-triangle": { structure: "Flat support aur lower highs demand me press karte hain.", description: "Compression pattern jahan sellers support ke upar more aggressive hote hain.", psychology: "Buyers ek level defend karte hain, par sellers lower prices accept karte rehte hain.", entry: "Flat support ke neeche close ya retest failure.", stopLoss: "Last lower high ke upar.", target: "Triangle height downward project karo.", confirmation: "Breakdown candle volume ke saath support ke neeche close kare.", invalidation: "Falling trendline ke upar break.", mistake: "Support actually lose hone se pehle short karna." },
        "symmetrical-triangle": { structure: "Lower highs aur higher lows apex me compress hote hain.", description: "Volatility compression pattern jo kisi bhi direction me break kar sakta hai.", psychology: "Dono sides commitment reduce karte hain jab tak breakout next move force nahi karta.", entry: "Kisi bhi trendline ke bahar close, ideally final apex se pehle.", stopLoss: "Triangle ki opposite side ke andar.", target: "Widest triangle height breakout se project karo.", confirmation: "Range aur volume ke saath expansion candle.", invalidation: "Breakout triangle ke andar wapas close ho jaye.", mistake: "Break ka wait karne ke bajay direction predict karna." },
        "cup-handle": { structure: "Rounded base, resistance par return, phir smaller handle pullback.", description: "Long accumulation structure ke baad controlled shakeout.", psychology: "Cup ke through supply dry hoti hai, phir handle late buyers ko remove karta hai before breakout.", entry: "Handle resistance ke upar break.", stopLoss: "Handle low ke neeche.", target: "Cup depth upward project karo.", confirmation: "Rounded cup, shallow handle, aur breakout volume.", invalidation: "Handle cup ke midpoint ke neeche break ho.", mistake: "V-shaped bounce ko cup maan lena." },
        "rising-wedge": { structure: "Narrowing upward channel ke andar higher highs aur higher lows.", description: "Price rise karta hai, par har push me momentum kam hota jata hai.", psychology: "Buyers price lift karte rehte hain, par demand weak hoti hai aur late longs vulnerable hote hain.", entry: "Wedge support ke neeche break aur close.", stopLoss: "Last wedge high ke upar.", target: "Wedge base ya measured height.", confirmation: "Bearish divergence ya strong support loss.", invalidation: "Wedge resistance ke upar wapas close.", mistake: "Support hold karte waqt wedge short karna." },
        "falling-wedge": { structure: "Narrowing downward channel ke andar lower highs aur lower lows.", description: "Price fall karta hai, par har sell-off me momentum kam hota jata hai.", psychology: "Sellers lower push karte rehte hain, par supply weak hoti hai aur shorts vulnerable hote hain.", entry: "Wedge resistance ke upar break aur close.", stopLoss: "Last wedge low ke neeche.", target: "Wedge base ya measured height.", confirmation: "Bullish divergence ya strong resistance reclaim.", invalidation: "Wedge support ke neeche wapas close.", mistake: "Wedge resistance break hone se pehle buy karna." },
        "rectangle": { structure: "Horizontal support aur resistance price ko contain karte hain.", description: "Balanced auction jo tab useful hoti hai jab ek side range ke bahar price accept karti hai.", psychology: "Dono sides known levels defend karte hain jab tak breakout inventory change nahi karta.", entry: "Breakout close aur retest, ya range hold kare to extremes fade karo.", stopLoss: "Breakout ki opposite side ya range extreme ke beyond.", target: "Range height breakout se project karo.", confirmation: "Follow-through ke saath range ke bahar close.", invalidation: "Failed breakout range ke andar wapas.", mistake: "Range ke middle me trade karna." },
        "pennant": { structure: "Fast impulse pole ke baad small symmetrical compression.", description: "Compact continuation pattern jo zyada der sideways drift nahi karna chahiye.", psychology: "Impulse briefly pause hota hai, phir trend traders continuation dhoondte hain.", entry: "Pole ki direction me break.", stopLoss: "Pennant ki opposite side.", target: "Pole breakout se project karo.", confirmation: "Pennant tight, short-lived, aur momentum ke saath break ho.", invalidation: "Pole direction ke against break.", mistake: "Strong pole ke bina har tiny triangle ko pennant bolna." }
    },
    indicators: {
        rsi: { description: "Recent gains versus losses ki speed measure karta hai.", useCase: "Overbought/oversold context, divergence, aur momentum regime.", settings: "14 period; 70/30 classic, strong trends ke liye 80/20.", confirmation: "Structure, trendline breaks, aur divergence ke saath best kaam karta hai.", mistake: "Strong uptrend me RSI 70 ke upar aate hi har baar short karna." },
        ema: { description: "Weighted moving average jo recent price par faster react karta hai.", useCase: "Trend direction, dynamic support/resistance, aur pullback zones.", settings: "Short trend ke liye 20 EMA, swing ke liye 50 EMA, macro filter ke liye 200 EMA.", confirmation: "Slope, candle reaction, aur higher timeframe alignment.", mistake: "Price action confirmation ke bina har touch ko support maan lena." },
        sma: { description: "Fixed number of candles ka average price.", useCase: "Long-term trend filter aur mean reversion context.", settings: "50 SMA, 100 SMA, 200 SMA.", confirmation: "Liquid markets aur higher timeframes par best kaam karta hai.", mistake: "Itni averages use karna ki chart noisy ho jaye." },
        macd: { description: "Do moving averages ke relationship ko show karta hai.", useCase: "Momentum shifts, crossovers, aur histogram expansion.", settings: "12, 26, 9 standard.", confirmation: "Structure breakout ke saath histogram zero cross kare.", mistake: "Move extended hone ke baad late crossovers ko entry banana." },
        bollinger: { description: "Standard deviation ke basis par moving average ke around bands.", useCase: "Volatility expansion, squeeze, mean reversion, aur trend riding.", settings: "20 period, 2 standard deviations.", confirmation: "Volume ke saath band squeeze breakout.", mistake: "Strong trend expansion me upper band ko blindly fade karna." },
        atr: { description: "Average True Range normal price movement estimate karta hai.", useCase: "Stop distance, target planning, aur volatility regime.", settings: "14 period standard.", confirmation: "Structure ke saath use karo taki stops bahut tight na hon.", mistake: "ATR ko direction signal banana; ye movement measure karta hai, bias nahi." },
        vwap: { description: "Session ka volume-weighted average price.", useCase: "Intraday fair value, mean reversion, aur trend validation.", settings: "Session VWAP; events ya swing lows ke liye anchored VWAP.", confirmation: "Price VWAP ke upar hold kare to bullish intraday bias support hota hai.", mistake: "Higher timeframe swing trades par context ke bina regular VWAP use karna." },
        volume: { description: "Candle ke during kitni trading activity hui ye dikhata hai.", useCase: "Breakouts, exhaustion, absorption, aur accumulation confirm karna.", settings: "Raw volume plus 20-period volume average.", confirmation: "Volume average se upar expand ho to breakouts stronger hote hain.", mistake: "Market-specific volume quality aur session timing ignore karna." },
        stochastic: { description: "Close ko recent high-low range se compare karta hai.", useCase: "Ranges ya slower trends me pullback timing.", settings: "14, 3, 3 standard.", confirmation: "Range extremes ke paas support/resistance ke saath crossovers use karo.", mistake: "Har overbought reading ko sell signal samajhna." },
        adx: { description: "Trend strength measure karta hai, direction nahi batata.", useCase: "Trend strategies ko range strategies se filter karna.", settings: "14 period; 25 ke upar aksar stronger trend hota hai.", confirmation: "Direction ke liye moving averages ya structure ke saath pair karo.", mistake: "Bhool jana ki ADX uptrend aur downtrend dono me rise kar sakta hai." },
        fibonacci: { description: "Swing high aur swing low ke beech common pullback zones map karta hai.", useCase: "Support, resistance, trendlines, aur candles ke saath confluence.", settings: "38.2%, 50%, 61.8%, 78.6%.", confirmation: "Structure ke paas fib level par candle rejection.", mistake: "Unclear ya tiny swings par fibs draw karna." },
        ichimoku: { description: "Trend, momentum, aur support/resistance ke liye multi-line system.", useCase: "Trend qualification, cloud support, aur momentum confirmation.", settings: "9, 26, 52 standard.", confirmation: "Price cloud ke upar, Tenkan Kijun ke upar, aur Chikou confirmation.", mistake: "Higher timeframe context ke bina mechanically use karna." }
    },
    strategies: {
        "trend-pullback": { description: "Confirmed trend ki direction me controlled pullback ke baad trade karo.", setup: "Longs ke liye higher highs aur higher lows; shorts ke liye lower highs aur lower lows.", trigger: "Moving average ya structure par engulfing candle, pin bar, ya inside bar breakout.", risk: "Stop pullback swing ke beyond, target next impulse leg.", avoid: "Jab pullback market structure break kare to avoid karo." },
        "breakout-retest": { description: "Price level break kare, uska retest kare, phir continue kare - is wait ko use karo.", setup: "Multiple touches ke saath clear horizontal support ya resistance.", trigger: "Retest rejection candle ya bullish/bearish engulfing.", risk: "Stop retest extreme ke beyond, target measured range.", avoid: "Breakout candle bahut large ho aur retest far away ho to avoid karo." },
        "failed-breakout": { description: "Aise breakout ke against trade karo jo quickly old range ke andar wapas aa jaye.", setup: "Price prior high/low sweep kare aur range ke andar wapas close ho.", trigger: "Pin bar, engulfing candle, ya level ke through strong close back.", risk: "Stop sweep extreme ke beyond, target range ki opposite side.", avoid: "Strong news-driven trend days ke against avoid karo." },
        "opening-range": { description: "First session range ko decision zone ke roop me use karo.", setup: "First 15 to 60 minutes ka high aur low define karo.", trigger: "Volume aur VWAP alignment ke saath range ke bahar close.", risk: "Stop range ke andar ya retest ke beyond.", avoid: "Low-volume sessions aur confirmation ke bina fakeouts avoid karo." },
        "mean-reversion": { description: "Jab price stretched ho aur structure mean par return support kare, extremes fade karo.", setup: "Range-bound market jahan price support ya resistance par ho.", trigger: "Rejection candle plus RSI divergence ya Bollinger Band rejection.", risk: "Stop range extreme ke beyond, target pehle midpoint.", avoid: "Trend strength high ho ya ADX sharply rise kar raha ho to avoid karo." },
        "multi-timeframe": { description: "Higher timeframe bias aur lower timeframe trigger use karo.", setup: "Weekly/daily direction define kare, H4/H1 zone define kare, M15/M5 entry define kare.", trigger: "Higher timeframe zone par market structure shift.", risk: "Stop entry timeframe invalidation ke beyond, target higher timeframe level.", avoid: "Lower timeframe signal higher timeframe trend ke against ho to avoid karo." },
        "liquidity-sweep": { description: "Price obvious highs ya lows take karke reject kare uske baad trade karo.", setup: "Visible equal highs/lows, prior day high/low, ya range extreme.", trigger: "Sweep plus close back inside aur follow-through candle.", risk: "Stop sweep wick ke beyond, target internal liquidity ya opposite range.", avoid: "Jab sweep accepted breakout me turn ho jaye to avoid karo." },
        "risk-first": { description: "Profit sochne se pehle har trade invalidation aur reward se build karo.", setup: "Order se pehle clear entry, stop, target, aur maximum loss defined ho.", trigger: "Sirf tab execute karo jab reward risk se kam se kam 1.5 to 2 times ho.", risk: "Consistent hone tak per trade 0.25% to 1% risk rakho.", avoid: "Revenge trades, stops wider move karna, aur losers me add karna avoid karo." }
    },
    roadmapSteps: [
        { title: "Level 1: Market Basics", items: ["Candlestick anatomy", "Bid, ask, spread, liquidity", "Trend, range, aur volatility", "Timeframe selection"] },
        { title: "Level 2: Price Action", items: ["Support aur resistance", "Market structure", "Candlestick psychology", "Breakout aur retest logic"] },
        { title: "Level 3: Pattern Mastery", items: ["Single, double, aur triple candles", "Chart pattern measurement", "Confirmation aur invalidation", "Pattern failure analysis"] },
        { title: "Level 4: Risk Management", items: ["Position sizing", "Risk reward planning", "Max daily loss", "Correlation aur exposure control"] },
        { title: "Level 5: Strategy Building", items: ["Trend pullbacks", "Range reversions", "Breakout playbooks", "Multi-timeframe execution"] },
        { title: "Level 6: Professional Process", items: ["Trading journal", "Psychology review", "Weekly playbook audit", "Data-driven improvement"] }
    ],
    glossary: {
        Support: { definition: "Price area jahan demand pehle selling ko pause ya reverse karne ke liye strong rahi hai." },
        Resistance: { definition: "Price area jahan supply pehle buying ko pause ya reverse karne ke liye strong rahi hai." },
        Liquidity: { definition: "Kisi price par orders ki availability. Obvious highs aur lows aksar liquidity attract karte hain." },
        "Market Structure": { definition: "Swing highs aur lows ki sequence jo trend ya range behavior define karti hai." },
        "Higher High": { definition: "Swing high jo previous swing high ke upar form hota hai, aksar uptrend ka part." },
        "Lower Low": { definition: "Swing low jo previous swing low ke neeche form hota hai, aksar downtrend ka part." },
        "Break of Structure": { definition: "Prior swing level ke through decisive move jo market map change karta hai." },
        Retest: { definition: "Price broken level par wapas aata hai check karne ke liye ki role flip hua ya nahi." },
        Invalidation: { definition: "Woh price level jahan tumhari trade idea wrong prove hoti hai." },
        "Risk Reward": { definition: "Trade par possible loss aur possible gain ka relationship." },
        "R Multiple": { definition: "Risk units me measured result. 2R win risked amount ka double earn karti hai." },
        ATR: { definition: "Average True Range, ek tool jo normal candle movement estimate karta hai." },
        Divergence: { definition: "Jab price new extreme banata hai par oscillator usko confirm nahi karta." },
        Confluence: { definition: "Multiple independent reasons jo same trade idea support karte hain." },
        Absorption: { definition: "Large buying ya selling pressure opposite side absorb kar leti hai bina zyada price progress ke." },
        Distribution: { definition: "Phase jahan stronger hands highs ke paas demand me sell kar sakte hain." },
        Accumulation: { definition: "Phase jahan stronger hands lows ke paas supply me buy kar sakte hain." },
        VWAP: { definition: "Volume Weighted Average Price, intraday fair value ke roop me aksar use hota hai." },
        "Stop Hunt": { definition: "Obvious stops ke through move jo breakout accept na ho to quickly reverse ho sakta hai." },
        Drawdown: { definition: "Account peak se later low tak ka decline." },
        "Win Rate": { definition: "Trades ka percentage jo profitably close hota hai." },
        Expectancy: { definition: "Win rate aur average win/loss consider karne ke baad per trade average outcome." },
        Slippage: { definition: "Expected execution price aur actual execution price ke beech ka difference." },
        "Position Size": { definition: "Risk aur stop distance ke basis par chosen units, shares, ya contracts ki quantity." }
    },
    checklistItems: [
        "Higher timeframe bias clear hai",
        "Setup support, resistance, trendline, VWAP, ya demand/supply par hai",
        "Entry trigger visible hai aur close ho chuka hai",
        "Entry se pehle invalidation level defined hai",
        "Reward kam se kam 1.5R hai",
        "Position size risk limit ke match me hai",
        "Koi major emotional impulse trade drive nahi kar raha",
        "Execution se pehle trade note ready hai"
    ]
};

applyHinglishCopy();

const appState = {
    activeSection: "candlesticksSection",
    activeChartFilter: "all",
    advanced: false,
    favoritesOnly: false,
    favorites: new Set(readStoredArray("candleFavs")),
    quiz: null
};

const moneyFormatter = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });
const numberFormatter = new Intl.NumberFormat("en-US", { maximumFractionDigits: 4 });
const labelTranslations = {
    "Single Candlestick": "Single Candle",
    "Double Candlestick": "Double Candle",
    "Triple Candlestick": "Triple Candle",
    "Bullish Reversal": "Bullish Reversal",
    "Bearish Reversal": "Bearish Reversal",
    Continuation: "Continuation",
    Indecision: "Indecision",
    Beginner: "Beginner",
    Intermediate: "Intermediate",
    Advanced: "Advanced",
    "Bullish/Bearish": "Bullish/Bearish",
    Bullish: "Bullish",
    Bearish: "Bearish",
    Neutral: "Neutral",
    reversal: "Reversal",
    continuation: "Continuation",
    bilateral: "Bilateral",
    indicator: "Indicator",
    strategy: "Strategy",
    Knowledge: "Knowledge",
    Glossary: "Glossary"
};

const dom = {};

document.addEventListener("DOMContentLoaded", init);

function init() {
    cacheDom();
    setupEvents();
    document.body.dataset.section = appState.activeSection;
    syncActiveSection();
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
    syncActiveSection();
    drawMarketCanvas();
}

function syncActiveSection() {
    dom.tabs.forEach((tab) => {
        const isActive = tab.dataset.section === appState.activeSection;
        tab.classList.toggle("active", isActive);
        tab.setAttribute("aria-current", isActive ? "page" : "false");
    });
    dom.tabContents.forEach((section) => section.classList.toggle("active", section.id === appState.activeSection));
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
        dom.patternGrid.appendChild(emptyState("Current filters se koi candlestick pattern match nahi ho raha."));
    } else {
        filtered.forEach((pattern) => dom.patternGrid.appendChild(createPatternCard(pattern)));
    }

    const resultCount = document.getElementById("patternResultCount");
    resultCount.textContent = `${filtered.length} dikh rahe hain`;
}

function renderChartPatterns() {
    const query = getQuery();
    const filtered = chartPatterns.filter((pattern) => {
        const matchesType = appState.activeChartFilter === "all" || pattern.type === appState.activeChartFilter;
        return matchesType && matchesSearch(pattern, query);
    });

    dom.chartPatternGrid.innerHTML = "";
    if (!filtered.length) {
        dom.chartPatternGrid.appendChild(emptyState("Current filters se koi chart pattern match nahi ho raha."));
    } else {
        filtered.forEach((pattern) => dom.chartPatternGrid.appendChild(createChartPatternCard(pattern)));
    }

    const resultCount = document.getElementById("chartPatternResultCount");
    resultCount.textContent = `${filtered.length} visual setups dikh rahe hain`;
}

function renderIndicators() {
    const query = getQuery();
    const filtered = indicators.filter((indicator) => matchesSearch(indicator, query));

    dom.indicatorGrid.innerHTML = "";
    if (!filtered.length) {
        dom.indicatorGrid.appendChild(emptyState("Current search se koi indicator match nahi ho raha."));
    } else {
        filtered.forEach((indicator) => dom.indicatorGrid.appendChild(createKnowledgeCard(indicator, "indicator")));
    }
}

function renderStrategies() {
    const query = getQuery();
    const filtered = strategies.filter((strategy) => matchesSearch(strategy, query));

    dom.strategyGrid.innerHTML = "";
    if (!filtered.length) {
        dom.strategyGrid.appendChild(emptyState("Current search se koi playbook match nahi ho raha."));
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
        dom.glossaryGrid.appendChild(emptyState("Current search se koi glossary term match nahi ho raha."));
    } else {
        filtered.forEach((item) => {
            const card = document.createElement("article");
            card.className = "card";
            card.innerHTML = `
                <span class="tag">Glossary</span>
                <h3>${item.term}</h3>
                <p>${item.definition}</p>
            `;
            activateCard(card, () => showGenericModal({
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
        <button type="button" class="favorite-btn ${appState.favorites.has(pattern.id) ? "active" : ""}" aria-label="Favorite toggle karo" aria-pressed="${appState.favorites.has(pattern.id)}" title="Favorite toggle karo">${appState.favorites.has(pattern.id) ? "Saved" : "Save"}</button>
        <div class="mini-viz">${generateSVG(pattern.viz, sentiment, 118)}</div>
        <h3>${pattern.name}</h3>
        <div class="tag-row">
            <span class="tag">${displayLabel(pattern.category)}</span>
            <span class="sentiment-pill ${sentiment}">${displayLabel(pattern.sentiment)}</span>
            <span class="level-pill">${displayLabel(pattern.difficulty)}</span>
        </div>
        <p>${appState.advanced ? pattern.meaning : pattern.beginnerExplanation}</p>
        <div class="card-footer">
            ${reliabilityBars(pattern.reliability)}
            <span class="tag">${pattern.timeframe}</span>
        </div>
    `;

    activateCard(card, () => showPatternModal(pattern));
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
        <span class="tag">${displayLabel(label)}</span>
        <h3>${title}</h3>
        <p>${description}</p>
        <div class="card-footer">
            <span class="sentiment-pill ${sentiment}">${displayLabel(item.sentiment || kind)}</span>
            <span class="tag">${displayLabel(kind)}</span>
        </div>
    `;
    activateCard(card, () => showGenericModal(item));
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
            <span class="tag">${displayLabel(pattern.type)}</span>
            <span class="sentiment-pill ${sentiment}">${displayLabel(pattern.sentiment)}</span>
            <span class="level-pill">${pattern.timeframe}</span>
        </div>
        <p>${pattern.description}</p>
        <div class="chart-analysis">
            <div class="chart-analysis-row"><strong>Structure</strong><span>${pattern.structure}</span></div>
            <div class="chart-analysis-row"><strong>Entry</strong><span>${pattern.entry}</span></div>
            <div class="chart-analysis-row"><strong>Target</strong><span>${pattern.target}</span></div>
        </div>
    `;
    activateCard(card, () => showGenericModal(pattern));
    return card;
}

function activateCard(card, onActivate) {
    card.setAttribute("role", "button");
    card.tabIndex = 0;
    card.addEventListener("click", onActivate);
    card.addEventListener("keydown", (event) => {
        if (event.target.closest?.(".favorite-btn")) return;
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            onActivate();
        }
    });
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
                        <span class="tag">${displayLabel(pattern.category)}</span>
                        <span class="sentiment-pill ${sentiment}">${displayLabel(pattern.sentiment)}</span>
                        <span class="level-pill">${displayLabel(pattern.difficulty)}</span>
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
                ${infoBlock("Matlab", appState.advanced ? pattern.meaning : pattern.beginnerExplanation)}
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
            <span class="eyebrow">${displayLabel(item.category || item.type || "Knowledge")}</span>
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

function displayLabel(label) {
    return labelTranslations[label] || label;
}

function applyHinglishCopy() {
    mergeLocalizedItems(patterns, hinglishCopy.patterns);
    mergeLocalizedItems(chartPatterns, hinglishCopy.chartPatterns);
    mergeLocalizedItems(indicators, hinglishCopy.indicators);
    mergeLocalizedItems(strategies, hinglishCopy.strategies);
    roadmapSteps.forEach((step, index) => Object.assign(step, hinglishCopy.roadmapSteps[index] || {}));
    glossary.forEach((item) => Object.assign(item, hinglishCopy.glossary[item.term] || {}));
    checklistItems.splice(0, checklistItems.length, ...hinglishCopy.checklistItems);
}

function mergeLocalizedItems(items, localizedById) {
    items.forEach((item) => Object.assign(item, localizedById[item.id] || {}));
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

function readStoredArray(key) {
    try {
        const parsed = JSON.parse(localStorage.getItem(key) || "[]");
        return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
        return [];
    }
}

function readStorage(key, fallback = "") {
    try {
        return localStorage.getItem(key) || fallback;
    } catch (error) {
        return fallback;
    }
}

function writeStorage(key, value) {
    try {
        localStorage.setItem(key, value);
    } catch (error) {
        // Local storage may be unavailable in strict privacy modes.
    }
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
    writeStorage("candleFavs", JSON.stringify([...appState.favorites]));
    updateFavCount();
    renderCandlesticks();
}

function toggleFavoritesView() {
    appState.favoritesOnly = !appState.favoritesOnly;
    const favoritesButton = document.getElementById("favsBtn");
    favoritesButton.classList.toggle("active", appState.favoritesOnly);
    favoritesButton.setAttribute("aria-pressed", String(appState.favoritesOnly));
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
        output.innerHTML = `<p class="result-item">Valid balance, risk, entry, aur stop enter karo.</p>`;
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
        output.innerHTML = `<p class="result-item">Valid entry, stop, target, aur direction enter karo.</p>`;
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
        output.innerHTML = `<p class="result-item">Valid capital aur months enter karo.</p>`;
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
    const saved = readStoredArray("tradeChecklist");
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
    writeStorage("tradeChecklist", JSON.stringify(checked));
    const score = checks.length ? Math.round((checked.length / checks.length) * 100) : 0;
    document.getElementById("readinessScore").textContent = `Tayyari: ${score}%`;
}

function saveJournal() {
    const note = document.getElementById("journalNote").value.trim();
    writeStorage("tradeJournalNote", note);
    const status = document.getElementById("journalStatus");
    status.textContent = "Locally save ho gaya.";
    setTimeout(() => {
        status.textContent = "";
    }, 1600);
}

function loadJournal() {
    const note = readStorage("tradeJournalNote");
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
            <p class="info-section">Jo patterns miss hue unhe review karo, phir confirmation rules study karke quiz repeat karo.</p>
            <button type="button" class="primary-btn" id="restartQuizBtn">Quiz Restart Karo</button>
        `;
        document.getElementById("restartQuizBtn").addEventListener("click", startQuiz);
        return;
    }

    const correct = randomItem(patterns);
    const options = shuffle([correct, ...shuffle(patterns.filter((pattern) => pattern.id !== correct.id)).slice(0, 3)]);
    quiz.current = correct;
    quiz.asked += 1;

    dom.quizBody.innerHTML = `
        <span class="eyebrow">Question ${quiz.asked}/${quiz.total}</span>
        <h2>Is pattern ko identify karo</h2>
        <div class="candle-viz">${generateSVG(correct.viz, sentimentClass(correct.sentiment), 190)}</div>
        <div id="quizOptions">
            ${options.map((option) => `<button type="button" class="quiz-option" data-id="${option.id}">${option.name}</button>`).join("")}
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
        <h4>${isCorrect ? "Sahi" : "Review"}</h4>
        <p>${quiz.current.name}: ${quiz.current.beginnerExplanation}</p>
        <button type="button" class="primary-btn" id="nextQuizBtn">Next</button>
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

    context.strokeStyle = "rgba(212,220,232,0.12)";
    context.lineWidth = 1;
    for (let i = 0; i < 5; i += 1) {
        const y = padding + i * ((height - padding * 2) / 4);
        context.beginPath();
        context.moveTo(padding, y);
        context.lineTo(width - padding, y);
        context.stroke();
    }

    context.strokeStyle = "rgba(77,163,255,0.5)";
    context.lineWidth = 2;
    context.beginPath();
    context.moveTo(padding, scaleY(82));
    context.lineTo(width - padding, scaleY(116));
    context.stroke();

    candles.forEach(([open, high, low, close], index) => {
        const x = padding + index * spacing + spacing / 2;
        const bullish = close >= open;
        const color = bullish ? "#22c55e" : "#ff5c65";
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

    context.fillStyle = "rgba(117,185,255,0.98)";
    context.font = "700 13px system-ui, sans-serif";
    context.fillText("Breakout zone", padding, scaleY(109) - 10);
}

function generateChartPatternSVG(id, width = 320, height = 178) {
    const blue = "#4da3ff";
    const green = "#22c55e";
    const red = "#ff5c65";
    const ink = "#d8dee9";
    const muted = "#9aa4b2";
    const grid = "rgba(212,220,232,0.12)";
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
    const color = sentiment === "bullish" ? "#22c55e" : sentiment === "bearish" ? "#ff5c65" : "#9aa4b2";
    const green = "#22c55e";
    const red = "#ff5c65";
    const gray = "#9aa4b2";
    const wick = (x, y1, y2, stroke = "#cbd5e1") => `<line x1="${x}" y1="${y1}" x2="${x}" y2="${y2}" stroke="${stroke}" stroke-width="3" stroke-linecap="round"/>`;
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
