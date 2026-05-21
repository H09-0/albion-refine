# Refining Profit Calculations

## Basic Profit Formula

```
Net Profit = Sell Revenue - Material Cost - Station Fees + Journal Profit
```

### Where:
- **Sell Revenue** = Refined material quantity × Sell price
- **Material Cost** = Raw material quantity × Buy price
- **Station Fees** = Usage tax set by station owner (typically 10-50%)
- **Journal Profit** = Value of filled journals - cost of empty journals

## Accounting for RRR

The effective material cost changes based on RRR:

```
Effective Material Cost = Raw Cost × (1 - RRR)
Effective Output per Batch = Base Output × (1 + ProductionBonus/100)
```

### Example Calculation

Refining T4 Wood in Fort Sterling with Focus:

| Variable | Value |
|----------|-------|
| Raw T4 Wood cost per unit | 50 silver |
| T4 Planks sell price per unit | 120 silver |
| RRR with Focus in FS | 53.9% |
| Station fee | 15% |
| Batch size | 100 wood |

**Per 100 wood:**
- Material cost: 100 × 50 = 5,000 silver
- Materials returned (RRR): ~54 wood
- Net materials consumed: 100 - 54 = 46 wood
- Planks produced: 100
- Sell revenue: 100 × 120 = 12,000 silver
- Station fee (15% of profit): varies
- **Gross profit**: 12,000 - (46 × 50) = 12,000 - 2,300 = 9,700 silver

## Profit with Focus

Compare Focus ON vs Focus OFF:

| Metric | No Focus | With Focus |
|--------|----------|------------|
| RRR | 36.7% | 53.9% |
| Net mats consumed (per 100) | ~63 | ~46 |
| Effective cost | 3,150 | 2,300 |
| Sell revenue | 12,000 | 12,000 |
| Gross profit | 8,850 | 9,700 |
| Extra profit from Focus | — | +850 |
| Focus cost | 0 | 54 |
| **Silver per Focus** | — | **15.7** |

## Market Strategy

### Buy Orders
- Place buy orders for raw materials to get lower prices
- Takes time to fill but increases margin significantly

### Sell Orders
- Sell refined materials with sell orders (not instant) for higher prices
- Factor in the market tax (~4% without Premium, ~2% with Premium)

### Transport Arbitrage
- Raw materials are often cheapest in the city where they're gathered
- Refined materials may sell for more in different cities
- Example: Buy ore in Thetford, refine, sell planks in Fort Sterling
