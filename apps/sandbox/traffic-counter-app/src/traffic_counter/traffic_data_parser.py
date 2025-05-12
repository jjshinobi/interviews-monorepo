from datetime import datetime

from traffic_counter.entities import TrafficCount


def parse_traffic_data(file_path: str) -> list[TrafficCount]:
    """
    Parses the traffic data from a file and returns a list of TrafficCount objects.
    Args:
        file_path (str): The path to the traffic data file.
    Returns:
        list[TrafficCount]: List of TrafficCount objects.
    """

    result: list[TrafficCount] = []

    for line in open(file_path, "r"):
        start_timestamp, traffic_count = line.split(" ")
        result.append(TrafficCount(
            start_timestamp=datetime.fromisoformat(start_timestamp),
            traffic_count=int(traffic_count.strip())
        ))

    return result
