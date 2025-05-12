from datetime import datetime
from functools import reduce

from traffic_counter.entities import TrafficCount


def total_count(traffic_data: list[TrafficCount]) -> int:
    """
    Calculate the total traffic count from the given traffic data.

    Args:
        traffic_data (list): A list of TrafficCount objects.

    Returns:
        int: The total traffic count.
    """

    def _reduce_fn(acc: int, item: TrafficCount) -> int:
        return acc + item["traffic_count"]

    return reduce(_reduce_fn, traffic_data, 0)


def aggregate_by_day(traffic_data: list[TrafficCount]) -> list[TrafficCount]:
    """
    Aggregate the traffic data by day.

    Args:
        traffic_data (list): A list of TrafficCount objects.

    Returns:
        list: A list of TrafficCount objects aggregated by day.
    """

    def _reduce_fn(acc: dict[datetime, int], item: TrafficCount) -> dict[datetime, int]:
        day = item["start_timestamp"].replace(hour=0, minute=0, second=0, microsecond=0)

        if day not in acc:
            acc[day] = item["traffic_count"]
        else:
            acc[day] += item["traffic_count"]

        return acc

    return list(
        map(
            lambda x: TrafficCount(start_timestamp=x[0], traffic_count=x[1]),
            reduce(_reduce_fn, traffic_data, {}).items(),
        )
    )
