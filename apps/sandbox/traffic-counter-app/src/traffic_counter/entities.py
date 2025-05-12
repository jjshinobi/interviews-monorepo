from datetime import datetime
from typing import TypedDict


class TrafficCount(TypedDict):
    start_timestamp: datetime
    traffic_count: int
