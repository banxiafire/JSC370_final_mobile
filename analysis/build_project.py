"""
Render the consolidated JSC370 final project.

All data cleaning, modeling, analysis, and visualization logic lives in
analysis/analysis.qmd. This script only orchestrates Quarto rendering.
"""

from __future__ import annotations

import os
import subprocess
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
QMD = ROOT / "analysis" / "analysis.qmd"
DOCS = ROOT / "docs"


def run_quarto(target: str, output: str) -> None:
    env = os.environ.copy()
    env.setdefault("MPLCONFIGDIR", str((ROOT / "tmp" / "matplotlib").resolve()))
    subprocess.run(
        [
            "quarto",
            "render",
            str(QMD),
            "--to",
            target,
            "--output-dir",
            str(DOCS),
            "--output",
            output,
        ],
        cwd=ROOT,
        env=env,
        check=True,
    )
    generated = ROOT / output
    if generated.exists():
        generated.replace(DOCS / output)


def main() -> None:
    DOCS.mkdir(parents=True, exist_ok=True)
    run_quarto("html", "report.html")
    run_quarto("typst", "report.pdf")


if __name__ == "__main__":
    main()
