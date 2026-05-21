# Resource Return Rate (RRR)

Resource Return Rate determines how many of your raw materials are refunded after refining a batch. This is the core mechanic that makes refining profitable.

## Formula

```
RRR = TotalProductionBonus / (100 + TotalProductionBonus)
```

## Production Bonus Sources

| Source | Bonus Amount |
|--------|-------------|
| Base city production bonus | +18% |
| City refining specialization | +40% |
| Using Focus (Premium) | +59% |
| Daily bonus (varies per item) | +10% or +20% |
| Hideout general bonus | Up to +26% |
| Hideout specialized bonus | Up to +30% |

## RRR Values at a Glance

### Refining in the Bonus City (e.g., Wood in Fort Sterling)

| Focus | Daily Bonus | Total Bonus | RRR |
|-------|-------------|-------------|-----|
| No | None | 58% | 36.7% |
| No | +10% | 68% | 40.5% |
| No | +20% | 78% | 43.8% |
| Yes | None | 117% | 53.9% |
| Yes | +10% | 127% | 55.9% |
| Yes | +20% | 137% | 57.8% |

### Refining in a Non-Bonus City

| Focus | Total Bonus | RRR |
|-------|-------------|-----|
| No | 18% | 15.3% |
| Yes | 77% | 43.5% |

## How Returns Are Calculated

When you refine a batch, the game calculates how many materials to return:

- **Fractional returns** are handled through a random rounding system that averages out to the correct RRR over many crafts
- Example: At 53.9% RRR with 100 wood input, you'd get ~54 wood back on average

## Daily Bonus

- Two random items receive a production bonus each day
- One gets +10%, the other gets +20%
- Check the Activities menu (default: `J`) in-game to see current bonuses
- This rotates daily, so timing your refining to match bonus days increases profit

## Hideout Refining

Black Zone hideouts provide an alternative to city refining:

- **Base**: 15% refining bonus (worse than city base of 18%)
- **General bonus**: Up to +26% from Power Cores (applies to all production)
- **Specialized bonus**: Up to +30% from Power Cores (applies to crafting specializations, not refining)
- **Max refining potential**: 15 + 26 = 41% + Focus 59% = 100% (RRR = 50%)

Hideouts are useful if:
- You want to avoid city usage taxes
- You have a well-powered hideout in a safe(ish) black zone
- You're transporting raw materials from the black zone directly
