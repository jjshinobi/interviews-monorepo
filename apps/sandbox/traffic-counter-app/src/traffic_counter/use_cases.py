import sys
from datetime import datetime
from functools import reduce

from traffic_counter.entities import TrafficCount
from traffic_counter.utils import split_into_sliding_windows


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


def top_x_traffic_count(traffic_data: list[TrafficCount], x: int) -> list[TrafficCount]:
    """
    Get the top x traffic counts from the given traffic data.

    Args:
        traffic_data (list): A list of TrafficCount objects.
        x (int): The number of top traffic counts to return.

    Returns:
        list: A list of the top x TrafficCount objects.
    """
    return sorted(traffic_data, key=lambda y: y["traffic_count"], reverse=True)[:x]


def least_contiguous_x_traffic_count(
    traffic_data: list[TrafficCount], x: int
) -> list[TrafficCount]:
    """
    Get the least contiguous x traffic counts from the given traffic data.

    Args:
        traffic_data (list): A list of TrafficCount objects.
        x (int): The number of the least contiguous traffic counts to return.

    Returns:
        list: A list of the least x contiguous TrafficCount objects.
    """

    windows = split_into_sliding_windows(traffic_data, x)
    min_value = sys.maxsize
    index = 0

    for i in range(len(windows)):
        total = total_count(windows[i])

        if total < min_value:
            min_value = total
            index = i

    return windows[index]
