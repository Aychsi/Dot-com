#!/usr/bin/env python3
"""Test script to check what data is available from yfinance"""

import yfinance as yf
import pandas as pd

lly = yf.Ticker("LLY")
info = lly.info

print("=== Available Financial Data ===")
print(f"Current Price: ${info.get('currentPrice', 'N/A')}")
print(f"Market Cap: ${info.get('marketCap', 0)/1e9:.1f}B")
print(f"Total Revenue (TTM): ${info.get('totalRevenue', 0)/1e9:.1f}B")
print(f"Trailing EPS: ${info.get('trailingEps', 'N/A')}")
print(f"Forward EPS: ${info.get('forwardEps', 'N/A')}")
print(f"Operating Margin: {info.get('operatingMargins', 0)*100:.1f}%")
print(f"Profit Margin: {info.get('profitMargins', 0)*100:.1f}%")
print(f"Revenue Growth: {info.get('revenueGrowth', 0)*100:.1f}%")
print(f"Earnings Growth: {info.get('earningsGrowth', 0)*100:.1f}%")

print("\n=== Analyst Estimates ===")
try:
    targets = lly.analyst_price_targets
    print(f"Price Targets: {targets}")
except:
    print("No price targets available")

print("\n=== Financial Statements ===")
try:
    financials = lly.financials
    print("Financials DataFrame shape:", financials.shape)
    print("\nRevenue by year:")
    if 'Total Revenue' in financials.index:
        print(financials.loc['Total Revenue'])
except Exception as e:
    print(f"Error fetching financials: {e}")

try:
    balance_sheet = lly.balance_sheet
    print("\nBalance Sheet shape:", balance_sheet.shape)
except Exception as e:
    print(f"Error fetching balance sheet: {e}")

try:
    cashflow = lly.cashflow
    print("\nCash Flow shape:", cashflow.shape)
    if 'Free Cash Flow' in cashflow.index or 'Operating Cash Flow' in cashflow.index:
        print("Cash flow available")
except Exception as e:
    print(f"Error fetching cashflow: {e}")

print("\n=== Key Metrics for DCF ===")
print(f"Beta: {info.get('beta', 'N/A')}")
print(f"Debt to Equity: {info.get('debtToEquity', 'N/A')}")
print(f"Total Debt: ${info.get('totalDebt', 0)/1e9:.1f}B" if info.get('totalDebt') else "N/A")
print(f"Cash: ${info.get('totalCash', 0)/1e9:.1f}B" if info.get('totalCash') else "N/A")

