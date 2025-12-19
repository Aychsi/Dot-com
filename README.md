# Dot-Com vs. AI Bubble: Comparative Analysis

I compared the Dot-Com bubble era (1998-2002) with the current AI market rally (2022-present) using machine learning and statistical methods.

## What I Did

• Data Collection: I pulled historical stock data for representative companies from both eras using yfinance
  - Dot-Com era: Cisco, Intel, Microsoft, Oracle, Amazon, eBay, AT&T
  - AI era: NVIDIA, Microsoft, Apple, Alphabet, Meta, AMD, Tesla, Palantir, SMCI, Broadcom

• Feature Engineering: I created 36 machine learning features including:
  - Returns (daily, logarithmic)
  - Rolling volatility (30, 60, 90-day windows)
  - Momentum indicators (5, 20, 60-day)
  - Technical indicators (RSI, MACD)
  - Volume features
  - Market correlation features

• Machine Learning Models: I trained and compared multiple models:
  - Linear models (Linear Regression, Logistic Regression)
  - Regularized models (Ridge, Lasso, ElasticNet)
  - Dimension reduction (PCA, Factor Analysis)
  - Tree-based models (Random Forest, Gradient Boosting, XGBoost, LightGBM)
  - Neural networks (MLP, LSTM)

• Performance Analysis: I calculated and compared key metrics:
  - Total returns
  - Volatility (rolling and average)
  - Maximum drawdowns
  - Risk-adjusted returns
  - Current valuations (P/E ratios, market caps)

## Key Results

### Performance Comparison
• Returns: AI era shows 273% average return vs Dot-com era 186% (47% higher)
• Volatility: AI era shows 51% volatility vs Dot-com era 67% (24% lower)
• Max Drawdown: AI era shows -57% vs Dot-com era -79% (28% less severe)
• Risk-Adjusted Returns: AI era shows 5.36x Sharpe ratio vs Dot-com 2.77x (93% better)

### Key Findings
• Lower volatility in the AI era suggests more institutional participation and fundamental backing
• Less severe drawdowns indicate better risk management and faster recovery potential
• Stock selection matters: Even in bubbles, not all stocks participate equally (Dot-com had losers like Intel at -12%)
• Selective bubble: Some AI companies trade at extreme valuations (PLTR: 450x P/E) while others are reasonable (MSFT: 35x P/E)

### Model Performance
• Return prediction: Most models struggle (negative R² means worse than guessing the average) - this confirms efficient market theory
• Bubble classification: Performs much better (ROC-AUC around 0.99) - identifying bubble conditions is feasible
• Most important features: 5-day moving average, 60-day momentum, day of year, volatility of volatility

### Current AI Valuations
• Total market cap: $21.5 trillion across 10 companies
• Concentration risk: Top 3 companies (NVDA, MSFT, AAPL) = $12.2T (57% of total)
• Extreme valuations: PLTR (450x P/E), TSLA (332x P/E), AMD (112x P/E)
• Reasonable valuations: SMCI (24x), META (29x), MSFT (35x)

## Investment Implications

Positive Signs:
- Superior risk-adjusted returns
- Lower volatility suggests a more sustainable rally
- Better downside protection

Caution Signs:
- Extreme valuations in some names are unsustainable
- High concentration risk
- Wide return dispersion (21% to 902%)

## Files

- notebook.ipynb: Complete analysis with all code, visualizations, and findings

## Technologies Used

- Python 3.12
- Libraries: yfinance, pandas, numpy, matplotlib, seaborn, scikit-learn, xgboost, lightgbm, tensorflow
