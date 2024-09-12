from typing import Optional
from dataclasses import dataclass
from pathlib import Path


@dataclass
class Component:
    working_dir: Path
    command: Optional[str] = None

    def name(self) -> str:
        return "-".join(self.working_dir.parts)


COMPONENTS = (
    Component(working_dir=Path('.'), command="python app.py"),
    Component(working_dir=Path("frontend"), command="npm run dev"),
)


# vim: set et ts=4 sw=4:
