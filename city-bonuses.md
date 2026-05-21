# City Refining Bonuses

Each royal city has a **+40% refining bonus** for one specific resource type on top of the base **+18%** production bonus.

## Refining Bonus by City

| City | Refining Bonus | Resource |
|------|---------------|----------|
| **Fort Sterling** | +40% Wood | Planks |
| **Thetford** | +40% Ore | Metal Bars |
| **Lymhurst** | +40% Fiber | Cloth |
| **Martlock** | +40% Hide | Leather |
| **Bridgewatch** | +40% Stone | Stone Blocks |
| **Caerleon** | No refining bonus | — |
| **Brecilien** | No refining bonus | — |

## How City Bonuses Affect RRR

The base production bonus in any city is **18%**. The city-specific refining bonus adds **+40%**, giving a total production bonus of **+58%** when refining the city's specialty resource.

With Focus (+59%), the total becomes **+117%**.

With a +20% daily bonus on top, it reaches **+137%**.

## RRR Formula

```
RRR = ProductionBonus / (100 + ProductionBonus)
```

### Example: Refining Wood in Fort Sterling

| Scenario | Production Bonus | RRR |
|----------|-----------------|-----|
| No Focus, no daily | 18 + 40 = 58% | 58/158 = **36.7%** |
| With Focus | 18 + 40 + 59 = 117% | 117/217 = **53.9%** |
| Focus + 20% daily | 18 + 40 + 59 + 20 = 137% | 137/237 = **57.8%** |

## Transporting Resources

A common strategy:
1. Buy raw resources at buy order price in the city where they're gathered
2. Transport them to the bonus city for that resource
3. Refine with maximum RRR
4. Sell refined materials (possibly back in the original city)

**Optimal Route** for each resource:
- **Planks**: Refine in Fort Sterling
- **Metal Bars**: Refine in Thetford
- **Cloth**: Refine in Lymhurst
- **Leather**: Refine in Martlock
- **Stone Blocks**: Refine in Bridgewatch
