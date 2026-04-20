# JSC370 Final Project: The Impact of 5G on Global Mobile Traffic

**Website:** https://banxiafire.github.io/JSC370_final_mobile  
**Data sources:**  
- ITU DataHub: https://datahub.itu.int/data/  
- World Bank Open Data: https://data.worldbank.org  

This project analyzes the relationship between 5G network penetration and mobile data traffic growth across countries from 2019 to 2024, using Random Forest and XGBoost regression models with interactive visualizations.

## Reproducibility

Run the complete project from the repository root:

~~~bash
python3 analysis/build_project.py
~~~

All analysis, cleaning, modeling, and visualization code lives in `analysis/analysis.qmd`. The Python script only orchestrates rendering.
