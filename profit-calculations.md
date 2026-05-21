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

The effective material cost changes based on RRR. The actual raw-to-refined ratio varies by tier (e.g., T4 is 3 raw → 2 refined).

```
Effective Material Cost = Raw Cost × (1 - RRR)
```

### Example: T4 Wood → Planks in Fort Sterling

Refining ratio: 3 Timber → 2 Planks. With RRR, some Timber is returned.

| Variable | Value |
|----------|-------|
| Raw T4 Timber cost per unit | 50 silver |
| T4 Planks sell price per unit | 120 silver |
| RRR with Focus in FS | 53.9% |
| Batch | 300 Timber → 200 Planks |

**Per 300 Timber:**
- Material cost: 300 × 50 = 15,000 silver
- Materials returned (RRR 53.9%): ~162 Timber
- Net consumed: 300 - 162 = 138 Timber
- Planks produced: 200
- Sell revenue: 200 × 120 = 24,000 silver
- **Gross profit**: 24,000 - (138 × 50) = 24,000 - 6,900 = **17,100 silver**

## Profit with Focus

Compare Focus ON vs Focus OFF (300 Timber batch):

| Metric | No Focus | With Focus |
|--------|----------|------------|
| RRR | 36.7% | 53.9% |
| Net mats consumed | ~190 Timber | ~138 Timber |
| Effective cost | 9,500 | 6,900 |
| Sell revenue | 24,000 | 24,000 |
| Gross profit | 14,500 | 17,100 |
| Extra profit from Focus | — | +2,600 |
| Focus cost (per 3 Timber) | 0 | ~54 |
| Total Focus for batch | 0 | ~5,400 |
| **Silver per Focus** | — | **~0.48** |

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
